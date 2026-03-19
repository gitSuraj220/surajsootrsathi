import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function buildToken(secret: string, phone: string, otp: string, expiresAt: number): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const message = `${phone}|${otp}|${expiresAt}`;
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  const sig = btoa(String.fromCharCode(...new Uint8Array(signature)));
  return btoa(JSON.stringify({ expiresAt, sig }));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone } = await req.json();

    if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
      return new Response(
        JSON.stringify({ error: "Invalid Indian mobile number (must be 10 digits starting with 6-9)" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    const secret = Deno.env.get("OTP_SECRET") ?? "sootr-sathi-otp-2026";
    const token = await buildToken(secret, phone, otp, expiresAt);

    // Send SMS via Fast2SMS
    const apiKey = Deno.env.get("FAST2SMS_API_KEY")!;
    const smsResp = await fetch("https://www.fast2sms.com/dev/bulkV2", {
      method: "POST",
      headers: {
        authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        route: "q",
        message: `${otp} is your OTP for Sootr Sathi verification. Valid for 10 minutes. Do not share with anyone.`,
        language: "english",
        flash: 0,
        numbers: phone,
      }),
    });

    const smsData = await smsResp.json();

    if (!smsData.return) {
      console.error("Fast2SMS error:", JSON.stringify(smsData));
      return new Response(
        JSON.stringify({ error: "Failed to send OTP SMS", detail: smsData.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, token }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("send-otp error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
