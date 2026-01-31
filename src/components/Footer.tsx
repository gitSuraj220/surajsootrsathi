import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Logo */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-foreground font-hindi">
              <span className="text-accent">सूत्र</span> साथी
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              सच की आवाज़ • Sootr Sathi
            </p>
          </div>

          {/* Tagline */}
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            भ्रष्टाचार और अन्याय के खिलाफ़ निडर पत्रकारिता का नेटवर्क
          </p>

          {/* Divider */}
          <div className="w-24 h-0.5 bg-accent/30 mx-auto mb-6" />

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © {currentYear} Sootr Sathi. All rights reserved.
          </p>
          <p className="text-muted-foreground/60 text-xs mt-2">
            गोपनीयता और सुरक्षा हमारी प्राथमिकता है।
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
