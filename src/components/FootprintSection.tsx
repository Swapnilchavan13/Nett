import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";

interface FootprintLocation {
  name: string;
  state: string;
  headline: string;
  description: string;
  backgroundImage: string;
}

interface FootprintSectionProps {
  location: FootprintLocation;
  index: number;
  position?: "left" | "right";
}

const FootprintSection = ({ location, index, position = "left" }: FootprintSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });

  return (
    <section ref={ref} className="section-panel">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${location.backgroundImage})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: isInView ? 1 : 1.1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-background/75" />
        <div className={`absolute inset-0 bg-gradient-to-${position === 'left' ? 'r' : 'l'} from-background via-background/50 to-transparent`} />
      </motion.div>

      {/* Content */}
      <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex ${position === "right" ? "justify-end" : "justify-start"}`}>
        <motion.div
          className="content-box"
          initial={{ opacity: 0, x: position === "left" ? -60 : 60 }}
          animate={{ 
            opacity: isInView ? 1 : 0,
            x: isInView ? 0 : (position === "left" ? -60 : 60)
          }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Location badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-medium tracking-wider uppercase">{location.state}</span>
          </motion.div>

          {/* Location name */}
          <motion.h2
            className="heading-display text-4xl md:text-5xl text-foreground mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {location.name}
          </motion.h2>

          {/* Headline */}
          <motion.h3
            className="text-xl md:text-2xl text-primary font-medium mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            {location.headline}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-muted-foreground text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {location.description}
          </motion.p>

          {/* Index indicator */}
          <motion.div
            className="mt-8 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 0.6 : 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <span className="text-4xl font-display font-bold text-primary/30">{String(index + 1).padStart(2, '0')}</span>
            <div className="w-12 h-px bg-primary/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FootprintSection;
