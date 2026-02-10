import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
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

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSelectedCategories(prev =>
      checked
        ? [...prev, categoryId]
        : prev.filter(id => id !== categoryId)
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("धन्यवाद! आपका रजिस्ट्रेशन सफल रहा।");
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
                  <SelectItem value="fresher">फ्रेशर</SelectItem>
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
              <div className="space-y-2">
                <Label htmlFor="whatsapp" className="text-foreground font-medium">
                  व्हाट्सएप नंबर
                </Label>
                <Input
                  id="whatsapp"
                  type="tel"
                  placeholder="10 अंक"
                  value={formData.whatsapp}
                  onChange={(e) => handleInputChange("whatsapp", e.target.value)}
                  className="form-input-dark h-12"
                />
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
              disabled={isSubmitting || selectedCategories.length === 0}
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
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default RegistrationForm;
