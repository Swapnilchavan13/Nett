import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface CarouselItem {
  name: string;
  image: string;
  tagline?: string;
}

interface LeaderCarouselProps {
  items: CarouselItem[];
}

const LeaderCarousel = ({ items }: LeaderCarouselProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <section ref={ref} className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80" />
      
      {/* Ambient glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, hsl(142 76% 45% / 0.3), transparent 60%)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header Content */}
      <motion.div 
        className="relative z-10 text-center mb-16 px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div 
          className="flex items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">Welcome To</span>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </motion.div>

        <h1 className="heading-display text-5xl md:text-7xl lg:text-8xl text-foreground mb-6">
          Nett<span className="text-gradient">Zero</span>
        </h1>
        
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
          A comprehensive climate action platform — measuring, reducing, and offsetting carbon for a sustainable future.
        </p>
      </motion.div>

      {/* Carousel */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center gap-4 md:gap-6">
          {items.map((item, index) => {
            const isActive = index === activeIndex;
            const distance = Math.abs(index - activeIndex);
            
            return (
              <motion.div
                key={item.name}
                className="relative cursor-pointer group"
                initial={{ opacity: 0, y: 60 }}
                animate={{ 
                  opacity: isInView ? 1 : 0, 
                  y: isInView ? 0 : 60,
                  scale: isActive ? 1 : 0.85,
                  filter: isActive ? 'brightness(1)' : 'brightness(0.5)',
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  scale: { duration: 0.5 },
                  filter: { duration: 0.5 },
                }}
                onClick={() => setActiveIndex(index)}
                style={{ zIndex: isActive ? 10 : 10 - distance }}
              >
                {/* Card */}
                <div className={`
                  relative overflow-hidden rounded-2xl transition-all duration-500
                  ${isActive ? 'w-64 md:w-80 h-80 md:h-96' : 'w-32 md:w-48 h-64 md:h-80'}
                `}>
                  {/* Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.image})` }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  
                  {/* Glow border for active */}
                  {isActive && (
                    <motion.div 
                      className="absolute inset-0 rounded-2xl"
                      style={{ 
                        boxShadow: '0 0 40px hsl(142 76% 45% / 0.4), inset 0 0 0 1px hsl(142 76% 45% / 0.3)'
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <motion.h3 
                      className="font-display text-xl md:text-2xl text-foreground font-semibold"
                      animate={{ opacity: isActive ? 1 : 0.7 }}
                    >
                      {item.name}
                    </motion.h3>
                    {isActive && item.tagline && (
                      <motion.p 
                        className="text-primary text-sm mt-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {item.tagline}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel indicators */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                w-2 h-2 rounded-full transition-all duration-300
                ${index === activeIndex 
                  ? 'w-8 bg-primary' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll to explore</span>
        <motion.div 
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div 
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LeaderCarousel;