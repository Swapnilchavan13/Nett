import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface PlaceholderSectionProps {
  title: string;
  subtitle: string;
  sectionNumber: string;
}

const PlaceholderSection = ({ title, subtitle, sectionNumber }: PlaceholderSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });

  return (
    <section ref={ref} className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(142 76% 45% / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(142 76% 45% / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Central content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Large section number */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[12rem] md:text-[16rem] font-display font-bold text-primary/5 leading-none">
            {sectionNumber}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="heading-display text-5xl md:text-7xl text-foreground mb-6 -mt-32 md:-mt-40"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="text-muted-foreground text-xl md:text-2xl mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {subtitle}
        </motion.p>

        {/* Coming soon badge */}
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-primary/5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.div 
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-primary font-medium tracking-wider uppercase text-sm">Coming Soon</span>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div 
        className="absolute top-1/4 left-10 w-32 h-32 border border-primary/10 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute bottom-1/4 right-10 w-48 h-48 border border-primary/10 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </section>
  );
};

export default PlaceholderSection;