import { motion } from "framer-motion";
import { FileText, MessageSquare, Upload, Wallet } from "lucide-react";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "स्टोरी प्लान/आइडिया सबमिट करें",
    description: "फॉर्म भरें और अपनी स्टोरी का आइडिया हमारे साथ शेयर करें। बताएं कि आपके पास क्या सबूत हैं।",
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "एप्रूवल और मानदेय पर चर्चाा",
    description: "हमारी टीम आपसे संपर्क करेगी। स्टोरी अप्रूव होने पर मानदेय तय होगा।",
  },
  {
    icon: Upload,
    step: "03",
    title: "स्टोरी सबमिट करें",
    description: "अपनी पूरी रिपोर्ट सबूतों के साथ सबमिट करें। हमारी टीम एडिटिंग करेगी।",
  },
  {
    icon: Wallet,
    step: "04",
    title: "भुगतान प्राप्त करें",
    description: "स्टोरी प्रकाशित होने के बाद अगले महीने की 15 तारीख तक भुगतान।",
  },
];

const ProcessSection = () => {
  return (
    <section className="py-24 bg-background relative">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-hindi">
            कैसे <span className="text-accent">काम करता है?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            सूत्र साथी बनने से लेकर भुगतान तक की सरल प्रक्रिया
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                {/* Step card */}
                <div className="bg-card border border-border rounded-xl p-6 h-full card-lift relative z-10">
                  {/* Step number */}
                  <div className="absolute -top-4 left-6 bg-accent text-accent-foreground font-bold text-sm px-3 py-1 rounded-full">
                    Step {item.step}
                  </div>

                  {/* Icon */}
                  <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mt-4 mb-6">
                    <item.icon className="w-7 h-7 text-accent" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 font-hindi">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Arrow connector (mobile/tablet) */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center py-4">
                    <div className="w-0.5 h-8 bg-border" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            क्या आप तैयार हैं सच को सामने लाने के लिए?
          </p>
          <a
            href="#registration"
            className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
          >
            अभी रजिस्ट्रेशन करें →
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProcessSection;
