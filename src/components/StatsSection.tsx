import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StatItem {
  value: string;
  label: string;
  description: string;
  backgroundImage: string;
}

interface StatsSectionProps {
  stat: StatItem;
  index: number;
  position?: "left" | "right";
}

const StatsSection = ({ stat, index, position = "left" }: StatsSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });

  return (
    <section ref={ref} className="section-panel">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${stat.backgroundImage})` }}
        initial={{ scale: 1.15 }}
        animate={{ scale: isInView ? 1.05 : 1.15 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex ${position === "right" ? "justify-end" : "justify-start"}`}>
        <motion.div
          className="content-box max-w-2xl"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 60 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Index */}
          <motion.span
            className="text-primary/30 text-7xl md:text-8xl font-display font-bold absolute -top-4 -left-4 md:-top-8 md:-left-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {String(index + 1).padStart(2, '0')}
          </motion.span>

          {/* Stat Value */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <span className="text-5xl md:text-7xl font-display font-bold text-gradient">
              {stat.value}
            </span>
          </motion.div>

          {/* Label */}
          <motion.h3
            className="text-2xl md:text-3xl font-semibold text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stat.label}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-muted-foreground text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {stat.description}
          </motion.p>

          {/* Decorative line */}
          <motion.div
            className="mt-8 w-20 h-1 bg-gradient-to-r from-primary to-primary/30 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isInView ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>
      </div>

      {/* Ambient glow */}
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(ellipse at bottom right, hsl(142 76% 45% / 0.3), transparent 70%)' }}
      />
    </section>
  );
};

export default StatsSection;