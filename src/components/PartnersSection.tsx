import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Testimonial {
  quote: string;
  name: string;
  company: string;
}

interface Partner {
  name: string;
  description: string;
  backgroundImage: string;
  testimonial?: Testimonial;
}

interface PartnersSectionProps {
  partner: Partner;
  category: string;
  index: number;
  position?: "left" | "right";
}

const PartnersSection = ({ partner, category, index, position = "left" }: PartnersSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });

  return (
    <section ref={ref} className="section-panel">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${partner.backgroundImage})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: isInView ? 1 : 1.1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-background/50" />
        <div className={`absolute inset-0 bg-gradient-to-${position === 'left' ? 'r' : 'l'} from-background via-background/35 to-transparent`} />
      </motion.div>

      {/* Content */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex ${position === "right" ? "justify-end" : "justify-start"}`}>
        <motion.div
          className="content-box"
          initial={{ opacity: 0, x: position === "left" ? -60 : 60 }}
          animate={{ 
            opacity: isInView ? 1 : 0,
            x: isInView ? 0 : (position === "left" ? -60 : 60)
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Category badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/30 bg-primary/10 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-primary text-xs sm:text-sm font-medium tracking-wider uppercase">{category}</span>
          </motion.div>

          {/* Partner name */}
          <motion.h2
            className="heading-display text-2xl sm:text-4xl md:text-5xl text-foreground mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {partner.name}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {partner.description}
          </motion.p>

          {/* Index indicator */}
          <motion.div
            className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 0.6 : 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="text-2xl sm:text-4xl font-display font-bold text-primary/30">{String(index + 1).padStart(2, '0')}</span>
            <div className="w-8 sm:w-12 h-px bg-primary/30" />
          </motion.div>
        </motion.div>
      </div>

      {/* Testimonial Speech Blurb - positioned on the opposite side of the content */}
      {partner.testimonial && (
        <motion.div
          className={`absolute z-20 ${position === "left" ? "right-4 sm:right-8 md:right-16 lg:right-24" : "left-4 sm:left-8 md:left-16 lg:left-24"} bottom-16 sm:bottom-20 md:bottom-24 max-w-[280px] sm:max-w-xs md:max-w-sm`}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 30,
            scale: isInView ? 1 : 0.9
          }}
          transition={{ duration: 0.7, delay: 0.8, ease: "easeOut" }}
        >
          {/* Speech bubble with logo emergence effect */}
          <div className="relative">
            {/* Logo circle that the speech emerges from */}
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary/20 backdrop-blur-md border border-primary/40 flex items-center justify-center z-10">
              <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-primary/60 flex items-center justify-center">
                <span className="text-[8px] sm:text-[10px] md:text-xs font-bold text-background">★</span>
              </div>
            </div>
            
            {/* Speech bubble */}
            <div className="relative bg-background/80 backdrop-blur-md rounded-lg sm:rounded-xl border border-primary/20 p-3 sm:p-4 md:p-5 shadow-xl ml-3 sm:ml-4">
              {/* Speech pointer */}
              <div className="absolute -left-2 top-4 sm:top-5 w-0 h-0 border-t-[6px] sm:border-t-8 border-t-transparent border-b-[6px] sm:border-b-8 border-b-transparent border-r-[8px] sm:border-r-10 border-r-background/80" />
              
              {/* Quote */}
              <p className="text-foreground/90 text-xs sm:text-sm leading-relaxed mb-2 sm:mb-3 italic">
                "{partner.testimonial.quote}"
              </p>
              
              {/* Attribution */}
              <div className="flex items-center gap-2 pt-2 sm:pt-3 border-t border-primary/10">
                <div className="w-1 h-6 sm:h-8 bg-primary/40 rounded-full" />
                <div>
                  <p className="text-foreground font-medium text-xs sm:text-sm">{partner.testimonial.name}</p>
                  <p className="text-primary/80 text-[10px] sm:text-xs">{partner.testimonial.company}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default PartnersSection;