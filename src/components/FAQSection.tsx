import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqSet1 = [
  {
    q: "यह पैनल क्या है और इसमें कैसे भाग लूं?",
    a: "यह एक ऑनलाइन प्लेटफॉर्म है, जहां फ्रीलांस जर्नलिस्ट्स अपना स्टोरी आइडिया सबमिट कर सकते हैं। रजिस्ट्रेशन फ्री है- साइन अप करें, प्रोफाइल बनाएं और आइडिया सबमिट करें।",
  },
  {
    q: "स्टोरी आइडिया कब और कैसे एक्सेप्ट होता है?",
    a: "आइडिया सबमिट करने के 7-10 दिनों में हमारी एडिटोरियल टीम रिव्यू करेगी। एक्सेप्टेंस ईमेल से कन्फर्म होगा, जिसमें अगले स्टेप्स बताए जाएंगे।",
  },
  {
    q: "पेमेंट कितना मिलेगा और कब?",
    a: "एक्सेप्टेड आइडिया पर शुरुआती पेमेंट ₹5,000 से ₹20,000 तक (स्टोरी के महत्व और इम्पेक्ट पर निर्भर)। पूरी स्टोरी डिलीवर और पब्लिश होने पर फाइनल पेमेंट 30 दिनों में बैंक ट्रांसफर से।",
  },
  {
    q: "कौन से टॉपिक्स पर स्टोरी आइडिया सबमिट कर सकता हूं?",
    a: "आप स्वतंत्र हैं। किसी भी टॉपिक पर स्टोरी कर सकते हैं। ध्यान रखें कि एक्सपोज, एक्सक्लुसिव और राज्य या देश स्तर के मुद्दे हों।",
  },
  {
    q: "क्या कोई मिनिमम योग्यता या अनुभव जरूरी है?",
    a: "फ्रीलांस जर्नलिस्ट्स, रिसर्चर्स या कंटेंट क्रिएटर्स आवेदन कर सकते हैं। पोर्टफोलियो जरूरी; न्यूबीज के लिए भी मौका, लेकिन क्वालिटी चेक होगी।",
  },
  {
    q: "स्टोरी आइडिया रिजेक्ट होने पर क्या करें?",
    a: "फीडबैक ईमेल से मिलेगा। फोन पर भी बात हो सकती है। सुधार कर दोबारा सबमिट करें या नया आइडिया ट्राई करें। कोई लिमिट नहीं।",
  },
  {
    q: "पेमेंट के लिए क्या डॉक्यूमेंट्स चाहिए?",
    a: "PAN कार्ड, बैंक अकाउंट डिटेल्स और GST (अगर लागू)। मांगा जाएगा।",
  },
  {
    q: "कॉपीराइट और ओरिजिनलिटी कैसे सुनिश्चित करें?",
    a: "सभी सबमिशन ओरिजिनल होने चाहिए। हम कई AI Tools से चेक करते हैं। प्लेजरिज्म पर पेमेंट कैंसल और ब्लैकलिस्ट।",
  },
  {
    q: "एक समय में कितने आइडिया सबमिट कर सकता हूं?",
    a: "अनलिमिटेड, लेकिन पहले सबमिटेड पर अपडेट का इंतजार करें। एक्टिव आइडियाज एक सप्ताह तक रिव्यू में रह सकते हैं।",
  },
  {
    q: "सपोर्ट या शिकायत के लिए कहां संपर्क करें?",
    a: "support@thesootr.com पर ईमेल करें या हेल्पडेस्क चैट यूज करें। रिस्पॉन्स 24-48 घंटों में मिलेगा।",
  },
];

const faqSet2 = [
  {
    q: "इस प्लेटफॉर्म पर स्टोरी आइडिया कैसे सबमिट कर सकते हैं?",
    a: "आपको बस हमारे पैनल में लॉग इन करना होगा और एक नया स्टोरी आइडिया सबमिट करना होगा। वहां आपको आइडिया के बारे में पूरी जानकारी और आपके विचार प्रस्तुत करने होंगे।",
  },
  {
    q: "स्टोरी आइडिया को कब तक स्वीकार या अस्वीकार किया जाएगा?",
    a: "हमारे संपादक आपके स्टोरी आइडिया की समीक्षा करेंगे और आमतौर पर 7-10 दिनों के भीतर आपको जवाब देंगे।",
  },
  {
    q: "क्या मुझे स्टोरी आइडिया स्वीकार किए जाने पर पहले से भुगतान मिलेगा?",
    a: "नहीं, भुगतान स्टोरी आइडिया को स्वीकार करने के बाद और लेखन कार्य पूरा होने के बाद किया जाएगा।",
  },
  {
    q: "भुगतान किस आधार पर किया जाएगा?",
    a: "भुगतान आइडिया के स्वीकृत होने के बाद और स्टोरी के सफलतापूर्वक प्रकाशित होने पर किया जाएगा।",
  },
  {
    q: "भुगतान कैसे किया जाएगा?",
    a: "भुगतान आपके द्वारा चुनी गई भुगतान विधि के अनुसार किया जाएगा, जैसे कि बैंक ट्रांसफर, PayPal, या अन्य प्लेटफॉर्म।",
  },
  {
    q: "क्या मुझे अपनी स्टोरी के लिए कोई विशेष दिशा-निर्देशों का पालन करना होगा?",
    a: "हां, हर स्टोरी के लिए संपादकीय दिशा-निर्देश दिए जाएंगे जिन्हें आपको अनुसरण करना होगा। यह सुनिश्चित करेगा कि स्टोरी प्लेटफॉर्म के मानकों के अनुसार हो।",
  },
  {
    q: "यदि मेरा स्टोरी आइडिया अस्वीकृत हो जाता है तो क्या मुझे कोई फीडबैक मिलेगा?",
    a: "हम पूरी कोशिश करेंगे कि अस्वीकृत आइडिया के साथ आपको फीडबैक भी मिले ताकि आप भविष्य में सुधार कर सकें और बेहतर आइडिया प्रस्तुत कर सकें।",
  },
  {
    q: "क्या मैं एक बार में एक से अधिक स्टोरी आइडिया सबमिट कर सकता हूं?",
    a: "हां, आप एक बार में कई स्टोरी आइडिया सबमिट कर सकते हैं, लेकिन ध्यान रखें कि हर आइडिया का ध्यानपूर्वक मूल्यांकन किया जाएगा।",
  },
  {
    q: "क्या मुझे कॉपीराइट या अधिकारों का ध्यान रखना होगा?",
    a: "आपको अपनी स्टोरी के सभी अधिकार खुद के पास रखना होगा, और स्टोरी की सामग्री को पूरी तरह से असली और स्वयं लिखी हुई होना चाहिए। कोई भी पब्लिशिंग या कॉपीराइट उल्लंघन नहीं होना चाहिए।",
  },
  {
    q: "क्या मुझे किसी निश्चित विषय या श्रेणी में आइडिया देना होगा?",
    a: "हम आम तौर पर सभी श्रेणियों में स्टोरी आइडिया स्वीकार करते हैं, लेकिन कुछ विशिष्ट और प्रासंगिक क्षेत्रों पर अधिक ध्यान दिया जाएगा, जैसे समाचार, सोशल इशूज, संस्कृति, और समकालीन घटनाएं।",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 bg-background relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-hindi">
            अक्सर पूछे जाने वाले <span className="text-accent">सवाल (FAQ)</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            फ्रीलांस जर्नलिस्ट पैनल से जुड़े आपके सभी सवालों के जवाब
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Set 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqSet1.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`set1-${index}`}
                  className="bg-card border border-border rounded-xl px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-hindi text-foreground hover:no-underline hover:text-accent transition-colors py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Set 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {faqSet2.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`set2-${index}`}
                  className="bg-card border border-border rounded-xl px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-hindi text-foreground hover:no-underline hover:text-accent transition-colors py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
