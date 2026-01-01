import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Images } from "lucide-react";
import IndiaMap from "./IndiaMap";
import GalleryImageDialog from "./GalleryImageDialog";
import { Button } from "./ui/button";

interface GalleryProject {
  name: string;
  state: string;
  headline: string;
  description: string;
  backgroundImage: string;
  mapX: number;
  mapY: number;
}

interface GallerySectionProps {
  project: GalleryProject;
  index: number;
  position?: "left" | "right";
}

const GallerySection = ({ project, index, position = "left" }: GallerySectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <GalleryImageDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        projectName={project.name}
      />
    <section ref={ref} className="section-panel">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${project.backgroundImage})` }}
        initial={{ scale: 1.15 }}
        animate={{ scale: isInView ? 1.05 : 1.15 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-background/55" />
        <div className={`absolute inset-0 bg-gradient-to-${position === 'left' ? 'r' : 'l'} from-background via-background/40 to-transparent`} />
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
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
            {/* Left content */}
            <div className="flex-1 w-full">
              {/* Location badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/30 bg-primary/10 mb-3 sm:mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-primary text-xs sm:text-sm font-medium tracking-wider uppercase">{project.state}</span>
              </motion.div>

              {/* Project name */}
              <motion.h2
                className="heading-display text-2xl sm:text-3xl md:text-4xl text-foreground mb-1 sm:mb-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                {project.name}
              </motion.h2>

              {/* Headline */}
              <motion.h3
                className="text-base sm:text-lg md:text-xl text-primary font-medium mb-2 sm:mb-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                {project.headline}
              </motion.h3>

              {/* Description */}
              <motion.p
                className="text-muted-foreground text-sm sm:text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {project.description}
              </motion.p>

              {/* View More Images Button */}
              <motion.div
                className="mt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDialogOpen(true)}
                  className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
                >
                  <Images className="w-4 h-4 mr-2" />
                  View More Images
                </Button>
              </motion.div>

              {/* Index */}
              <motion.div
                className="mt-4 flex items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: isInView ? 0.6 : 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <span className="text-3xl font-display font-bold text-primary/30">{String(index + 1).padStart(2, '0')}</span>
                <div className="w-12 h-px bg-primary/30" />
              </motion.div>
            </div>

            {/* India Map - responsive sizing for all screens */}
            <motion.div
              className="flex-shrink-0 w-20 sm:w-28 md:w-32 lg:w-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <IndiaMap 
                locationX={project.mapX} 
                locationY={project.mapY} 
                isInView={isInView} 
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default GallerySection;
