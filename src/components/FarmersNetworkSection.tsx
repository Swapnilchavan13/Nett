import { motion } from "framer-motion";
import sectionFarmers from "@/assets/section-farmers.jpg";

const FarmersNetworkSection = () => {
  return (
    <section className="relative min-h-[70vh] md:min-h-[80vh] w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${sectionFarmers})` }}
      />
      
      {/* Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
      
      {/* Content */}
      <div className="relative z-10 h-full min-h-[70vh] md:min-h-[80vh] flex items-end justify-center pb-12 md:pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl text-center"
        >
          {/* Decorative Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-24 h-0.5 bg-primary mx-auto mb-6"
          />
          
          {/* Plus Symbol */}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-block text-primary text-4xl md:text-6xl font-bold mb-4"
          >
            PLUS
          </motion.span>
          
          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
          >
            An on-ground network of over{" "}
            <span className="text-primary">15,000+</span>
            <br className="hidden sm:block" />
            {" "}farmers and rapidly growing
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl text-white/80 font-light"
          >
            Spread across{" "}
            <span className="text-white font-medium">Madhya Pradesh</span>,{" "}
            <span className="text-white font-medium">Himachal Pradesh</span>,{" "}
            <span className="text-white font-medium">Uttar Pradesh</span> and{" "}
            <span className="text-white font-medium">Uttarakhand</span>
          </motion.p>
          
          {/* Decorative Bottom Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="w-24 h-0.5 bg-primary mx-auto mt-6"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default FarmersNetworkSection;
