import { motion } from "framer-motion";
import { Users, FileText, Globe } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "सूत्र साथी" },
  { icon: FileText, value: "1000+", label: "स्टोरीज प्रकाशित" },
  { icon: Globe, value: "28", label: "राज्यों में उपस्थिति" },
];

const AboutSection = () => {
  return (
    <section className="py-24 bg-card relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-8xl font-bold text-foreground rotate-12">सच</div>
        <div className="absolute bottom-20 right-20 text-8xl font-bold text-foreground -rotate-6">न्याय</div>
        <div className="absolute top-1/2 left-1/4 text-6xl font-bold text-foreground rotate-3">आवाज़</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 font-hindi">
              <span className="text-accent">Sootr Sathi</span> कौन हैं?
            </h2>
            
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Sootr Sathi</strong> देशभर के रिपोर्टर्स का ऐसा पैनल है, 
                जो जनहित के मुद्दों को <strong className="text-accent">बिना किसी डर</strong> के 
                सबूतों के साथ दुनिया के सामने लाता है।
              </p>
              
              <p>
                हमारे नेटवर्क में नामी पत्रकारों के साथ फ्रीलांस जर्नलिस्ट शामिल हैं जो अपने-अपने 
                क्षेत्रों की सच्चाई को राष्ट्रीय मंच पर लाने का जज़्बा रखते हैं।
              </p>

              <p>
                हम <strong className="text-foreground">आपकी पहचान की रक्षा</strong> करते हैं, 
                आपकी स्टोरी को सही प्लेटफॉर्म देते हैं, और आपकी मेहनत का 
                <strong className="text-accent"> उचित मानदेय</strong> सुनिश्चित करते हैं।
              </p>
            </div>

            {/* Stamp */}
            <div className="mt-8">
              <span className="inline-block stamp text-accent font-bold">
                सच की आवाज़ • निडर पत्रकारिता
              </span>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-6 bg-secondary/50 border border-border rounded-xl p-6 card-lift"
              >
                <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <stat.icon className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <div className="text-4xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
