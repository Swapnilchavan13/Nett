import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ScrollSectionProps {
  backgroundImage: string;
  title: string;
  headline: string;
  description: string;
  position?: "left" | "right";
  index?: number;
}

const ScrollSection = ({
  backgroundImage,
  title,
  headline,
  description,
  position = "left",
  index = 0,
}: ScrollSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });

  return (
    <section ref={ref} className="section-panel">
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: isInView ? 1 : 1.1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />
      </motion.div>

      {/* Floating Content Box */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex ${position === "right" ? "justify-end" : "justify-start"}`}>
        <motion.div
          className="content-box"
          initial={{ 
            opacity: 0, 
            x: position === "left" ? -60 : 60 
          }}
          animate={{ 
            opacity: isInView ? 1 : 0,
            x: isInView ? 0 : (position === "left" ? -60 : 60)
          }}
          transition={{ 
            duration: 0.8, 
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {/* Section indicator */}
          <motion.div 
            className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="w-8 sm:w-12 h-0.5 bg-primary" />
            <span className="text-primary text-xs sm:text-sm font-medium tracking-widest uppercase">
              {String(index + 1).padStart(2, '0')}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2 
            className="heading-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-2 sm:mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {title}
          </motion.h2>

          {/* Headline */}
          <motion.h3 
            className="text-base sm:text-xl md:text-2xl font-semibold text-primary mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {headline}
          </motion.h3>

          {/* Description */}
          <motion.p 
            className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {description}
          </motion.p>

          {/* Decorative element */}
          <motion.div 
            className="mt-4 sm:mt-6 md:mt-8 flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 0.6 : 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            <span className="text-[10px] sm:text-xs text-muted-foreground tracking-wider">SCROLL TO CONTINUE</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Green glow ambient effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/3 pointer-events-none opacity-30"
        style={{ background: 'var(--gradient-glow)' }}
      />
    </section>
  );
};

export default ScrollSection;