import { motion } from "framer-motion";
import indiaSvg from "@/assets/india-map.svg";

interface IndiaMapProps {
  locationX?: number;
  locationY?: number;
  isInView: boolean;
}

const IndiaMap = ({ locationX, locationY, isInView }: IndiaMapProps) => {
  const hasLocation = locationX !== undefined && locationY !== undefined;

  return (
    <div className="relative w-full aspect-[4/5] max-w-[160px]">
      <motion.div
        className="w-full h-full relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.9 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img 
          src={indiaSvg} 
          alt="Map of India" 
          className="w-full h-full object-contain"
          style={{ 
            filter: "brightness(0) saturate(100%) invert(52%) sepia(87%) saturate(401%) hue-rotate(93deg) brightness(94%) contrast(88%)",
            opacity: 0.7
          }}
        />
        
        {/* Location marker overlay - only show if coordinates provided */}
        {hasLocation && (
          <svg 
            viewBox="0 0 612 696"
            className="absolute inset-0 w-full h-full"
            style={{ filter: "drop-shadow(0 0 8px hsl(142 76% 45% / 0.6))" }}
          >
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: isInView ? 1 : 0, opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
              style={{ transformOrigin: `${locationX}px ${locationY}px` }}
            >
              {/* Pulsing ring */}
              <motion.circle
                cx={locationX}
                cy={locationY}
                r="20"
                fill="none"
                stroke="hsl(142 76% 45%)"
                strokeWidth="2"
                initial={{ opacity: 0.8, scale: 1 }}
                animate={{ opacity: 0, scale: 2.5 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
              />
              
              {/* Pin circle */}
              <circle
                cx={locationX}
                cy={locationY}
                r="10"
                fill="hsl(142 76% 45%)"
              />
              <circle
                cx={locationX}
                cy={locationY}
                r="4"
                fill="hsl(0 0% 2%)"
              />
            </motion.g>
          </svg>
        )}
      </motion.div>
    </div>
  );
};

export default IndiaMap;
