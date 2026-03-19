import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const categories = [
  { id: "corruption", label: "भ्रष्टाचार" },
  { id: "crime", label: "अपराध/एक्सपोज" },
  { id: "humanrights", label: "मानवाधिकार" },
  { id: "environment", label: "पर्यावरण/स्वास्थ्य" },
  { id: "watchdog", label: "वॉचडॉग रिपोर्टिंग" },
  { id: "data", label: "डेटा स्टोरीज" },
  { id: "other", label: "All" },
];

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    mobile: "",
    whatsapp: "",
    email: "",
    city: "",
    state: "",
  });

  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  useEffect(() => {
    if (otpTimer <= 0) return;
    const interval = setInterval(() => setOtpTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories(prev =>
      checked ? [...prev, categoryId] : prev.filter(id => id !== categoryId)
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === "whatsapp") {
      setOtpSent(false);
      setOtpVerified(false);
      setOtpToken("");
      setOtpValue("");
      setOtpTimer(0);
    }
  };

  const handleSendOtp = async () => {
    if (!formData.whatsapp || !/^[6-9]\d{9}$/.test(formData.whatsapp)) {
      toast.error("कृपया सही 10 अंक का व्हाट्सएप नंबर दर्ज करें");
      return;
    }
    setOtpLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-otp", {
        body: { phone: formData.whatsapp },
      });
      if (error) throw error;
      setOtpToken(data.token);
      setOtpSent(true);
      setOtpTimer(60);
      toast.success(`OTP ${formData.whatsapp} पर भेजा गया!`);
    } catch (err: any) {
      toast.error("OTP भेजने में त्रुटि। पुनः प्रयास करें।");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpValue || otpValue.length !== 6) {
      toast.error("6 अंक का OTP दर्ज करें");
      return;
    }
    setOtpLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("verify-otp", {
        body: { phone: formData.whatsapp, otp: otpValue, token: otpToken },
      });
      if (error) throw error;
      setOtpVerified(true);
      toast.success("व्हाट्सएप नंबर सत्यापित हो गया!");
    } catch (err: any) {
      toast.error("गलत OTP। पुनः प्रयास करें।");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.whatsapp && !otpVerified) {
      toast.error("कृपया पहले व्हाट्सएप नंबर OTP से सत्यापित करें");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("submit-to-sheets", {
        body: {
          ...formData,
          categories: selectedCategories,
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("धन्यवाद! आपका रजिस्ट्रेशन सफल रहा।");
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error("सबमिशन में त्रुटि हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="registration" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center bg-card border border-border rounded-2xl p-12"
          >
            <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-accent" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-4 font-hindi">
              स्वागत है, सूत्र साथी!
            </h3>
            <p className="text-muted-foreground text-lg">
              आपका रजिस्ट्रेशन सफलतापूर्वक हो गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="registration" className="py-24 bg-background relative">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-hindi">
            <span className="text-accent">सूत्र साथी</span> बनें
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            अपनी जानकारी भरें और हमारे खोजी पत्रकारों के नेटवर्क का हिस्सा बनें
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-card border border-border rounded-2xl p-8 md:p-12"
        >
          <div className="grid gap-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                आपका नाम *
              </Label>
              <Input
                id="name"
                required
                placeholder="पूरा नाम लिखें"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="form-input-dark h-12"
              />
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <Label htmlFor="experience" className="text-foreground font-medium">
                अनुभव *
              </Label>
              <Select
                value={formData.experience}
                onValueChange={(value) => handleInputChange("experience", value)}
                required
              >
                <SelectTrigger className="form-input-dark h-12">
                  <SelectValue placeholder="अनुभव चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fresher">फ्रेशर/नॉन-जर्नलिस्ट</SelectItem>
                  <SelectItem value="less-than-5">5 वर्ष से कम</SelectItem>
                  <SelectItem value="more-than-5">5 वर्ष से ज्यादा</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Contact Info */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mobile" className="text-foreground font-medium">
                  मोबाइल नंबर *
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  required
                  placeholder="10 अंक"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  className="form-input-dark h-12"
                />
              </div>

              {/* WhatsApp with OTP */}
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-foreground font-medium">
                  व्हाट्सएप नंबर
                  {otpVerified && (
                    <span className="ml-2 text-green-400 text-xs font-normal inline-flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> सत्यापित
                    </span>
                  )}
                </Label>
                <div className="relative">
                  <Input
                    id="whatsapp"
                    type="tel"
                    placeholder="10 अंक"
                    value={formData.whatsapp}
                    onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                    className={`form-input-dark h-12 ${otpVerified ? "border-green-500 pr-10" : ""}`}
                    disabled={otpVerified}
                  />
                  {otpVerified && (
                    <ShieldCheck className="absolute right-3 top-3.5 w-5 h-5 text-green-400" />
                  )}
                </div>
                {formData.whatsapp.length === 10 && !otpVerified && (
                  <Button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={otpLoading || otpTimer > 0}
                    variant="outline"
                    size="sm"
                    className="w-full text-xs h-8 border-accent/50 text-accent hover:bg-accent/10"
                  >
                    {otpLoading
                      ? "भेज रहे हैं..."
                      : otpTimer > 0
                      ? `पुनः भेजें (${otpTimer}s)`
                      : otpSent
                      ? "OTP पुनः भेजें"
                      : "OTP भेजें"}
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">
                  ईमेल आईडी *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="form-input-dark h-12"
                />
              </div>
            </div>

            {/* OTP Input Row */}
            {otpSent && !otpVerified && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
              >
                <Label className="text-foreground font-medium">OTP दर्ज करें</Label>
                <div className="flex gap-3">
                  <Input
                    type="tel"
                    placeholder="6 अंक का OTP"
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    maxLength={6}
                    className="form-input-dark h-12 text-center text-xl tracking-[0.5em]"
                  />
                  <Button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={otpLoading || otpValue.length !== 6}
                    className="h-12 bg-accent hover:bg-accent/90 text-accent-foreground px-6 shrink-0"
                  >
                    {otpLoading ? (
                      <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    ) : (
                      "सत्यापित करें"
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  OTP {formData.whatsapp} पर SMS द्वारा भेजा गया है।
                  {otpTimer > 0 && ` ${otpTimer} सेकंड बाद पुनः भेज सकते हैं।`}
                </p>
              </motion.div>
            )}

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-foreground font-medium">
                  शहर *
                </Label>
                <Input
                  id="city"
                  required
                  placeholder="आपका शहर"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="form-input-dark h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-foreground font-medium">
                  प्रदेश *
                </Label>
                <Input
                  id="state"
                  required
                  placeholder="आपका राज्य"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="form-input-dark h-12"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <Label className="text-foreground font-medium">
                आप किन विषयों पर रिपोर्ट करना चाहते हैं? *
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedCategories.includes(category.id)
                        ? "border-accent bg-accent/10"
                        : "border-border bg-secondary/30 hover:border-accent/50"
                    }`}
                  >
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category.id, checked as boolean)
                      }
                      className="border-muted-foreground data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                    />
                    <span className="text-sm text-foreground">{category.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={
                isSubmitting ||
                selectedCategories.length === 0 ||
                (!!formData.whatsapp && !otpVerified)
              }
              className="w-full h-14 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg mt-4 glow-red"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                  प्रोसेसिंग...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  सूत्र साथी बनें
                  <Send className="w-5 h-5" />
                </span>
              )}
            </Button>

            {!!formData.whatsapp && !otpVerified && (
              <p className="text-center text-xs text-muted-foreground -mt-3">
                सबमिट करने से पहले व्हाट्सएप नंबर OTP से सत्यापित करें
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default RegistrationForm;
