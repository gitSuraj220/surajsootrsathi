import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function checkToken(secret: string, phone: string, otp: string, token: string): Promise<boolean> {
  try {
    const { expiresAt, sig } = JSON.parse(atob(token));

    if (Date.now() > expiresAt) return false;

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
    const expectedSig = btoa(String.fromCharCode(...new Uint8Array(signature)));

    return sig === expectedSig;
  } catch {
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone, otp, token } = await req.json();

    if (!phone || !otp || !token) {
      return new Response(
        JSON.stringify({ error: "phone, otp and token are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const secret = Deno.env.get("OTP_SECRET") ?? "sootr-sathi-otp-2026";
    const valid = await checkToken(secret, phone, otp, token);

    if (!valid) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired OTP" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ verified: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("verify-otp error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
