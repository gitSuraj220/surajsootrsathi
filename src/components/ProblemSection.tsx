import { motion } from "framer-motion";
import { Eye, Users, Volume2, Quote } from "lucide-react";

const problems = [
  {
    icon: Eye,
    title: "भ्रष्टाचार उजागर करना",
    description: "सरकारी योजनाओं में धांधली, घूसखोरी और जनता के पैसे की लूट को सबूतों के साथ सामने लाएं।",
  },
  {
    icon: Users,
    title: "माफिया गठजोड़ को बेनकाब करना",
    description: "नेता-अफसर-माफिया के खतरनाक गठजोड़ की सच्चाई दुनिया के सामने रखें।",
  },
  {
    icon: Volume2,
    title: "स्थानीय मीडिया की चुप्पी तोड़ना",
    description: "जहाँ स्थानीय मीडिया डर या दबाव में चुप है, वहाँ हम आपकी कहानी को आवाज़ देंगे।",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-24 bg-card relative">
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
            हम क्यों <span className="text-accent">ज़रूरी</span> हैं?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            जब सच बोलना खतरनाक हो, तब सूत्र साथी आपके साथ है
          </p>
        </motion.div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-secondary/50 border border-border rounded-xl p-8 card-lift group"
            >
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <problem.icon className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 font-hindi">
                {problem.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-8 md:p-12"
        >
          <Quote className="absolute top-6 left-6 w-12 h-12 text-accent/20" />
          <blockquote className="text-xl md:text-2xl font-medium text-foreground text-center leading-relaxed font-hindi relative z-10">
            "अगर आप चाहेंगे तो आपका नाम उजागर नहीं होगा, और अगर चाहेंगे तो 
            <span className="text-accent"> पूरे देश में आपकी पत्रकारिता के चर्चे होंगे।</span>"
          </blockquote>
          <div className="text-center mt-6">
            <div className="inline-block stamp text-accent font-bold text-sm">
              सूत्र साथी गारंटी
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
