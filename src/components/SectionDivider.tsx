import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  title: string;
  subtitle?: string;
  sectionNumber?: string;
}

const SectionDivider = ({ title, subtitle, sectionNumber }: SectionDividerProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  return (
    <section ref={ref} className="min-h-[60vh] w-full relative flex items-center justify-center overflow-hidden bg-background">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(142 76% 45%) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Central glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, hsl(142 76% 45%), transparent 60%)' }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 text-center px-6">
        {/* Section number */}
        {sectionNumber && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-8xl md:text-9xl font-bold text-primary/10 font-display">
              {sectionNumber}
            </span>
          </motion.div>
        )}

        {/* Decorative line */}
        <motion.div 
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: isInView ? 1 : 0, scaleX: isInView ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-20 h-px bg-gradient-to-r from-transparent to-primary" />
          <div className="w-3 h-3 rotate-45 border border-primary" />
          <div className="w-20 h-px bg-gradient-to-l from-transparent to-primary" />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="heading-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default SectionDivider;