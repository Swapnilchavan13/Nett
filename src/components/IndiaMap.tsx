import { motion } from "framer-motion";
import indiaSvg from "@/assets/india-map.svg";

interface IndiaMapProps {
  locationX?: number;
  locationY?: number;
  isInView: boolean;
}

const IndiaMap = ({ isInView }: IndiaMapProps) => {
  return (
    <div className="relative w-full aspect-[4/5] max-w-[160px]">
      <motion.div
        className="w-full h-full"
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
      </motion.div>
    </div>
  );
};

export default IndiaMap;
