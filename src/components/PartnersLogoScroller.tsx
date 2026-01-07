import { motion } from "framer-motion";
import sectionPartnersImg from "@/assets/section-partners.jpg";

const logos = [
  "https://iili.io/famRxPp.jpg",
"https://iili.io/famRIKN.jpg",
"https://iili.io/famRnov.jpg",
"https://iili.io/famRoVR.jpg",
"https://iili.io/famR5Rn.jpg",
"https://iili.io/famRTlI.jpg",
"https://iili.io/famRuSt.jpg",
"https://iili.io/famRRHX.jpg",
"https://iili.io/famRYDG.jpg",
  "https://iili.io/famKCrv.jpg",

'https://iili.io/fTzwHJe.jpg',
'https://iili.io/fTzAXiQ.jpg',
'https://iili.io/fTzAWWx.jpg',
'https://iili.io/fTzAGDb.jpg',
'https://iili.io/fTzAEOu.jpg',
'https://iili.io/fTzA1Re.jpg',
'https://iili.io/fTzA0J9.jpg'
];


// Duplicate for seamless infinite scroll
const duplicatedLogos = [...logos, ...logos];

const PartnersLogoScroller = () => {
  return (
    <div className="relative py-12 sm:py-14 md:py-16 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${sectionPartnersImg})` }}
      >
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
      </div>

      {/* Heading */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-display mb-2">
            Trusted by Industry Leaders
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base">
            Working with organizations committed to climate action
          </p>
        </motion.div>
      </div>

      {/* Scroller */}
      <div className="relative z-10">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-background/90 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-background/90 to-transparent z-10" />

        <motion.div
          className="flex gap-8 sm:gap-10 md:gap-12"
          animate={{
            x: [0, -220 * logos.length],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 80,
            ease: "linear",
          }}
        >
          {duplicatedLogos.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-40 sm:w-48 md:w-56 h-16 sm:h-20 md:h-24 flex items-center justify-center"
            >
              <div className="w-full h-full flex items-center justify-center rounded-lg bg-card/60 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition">
                <img
                  src={src}
                  alt={`Partner logo ${index + 1}`}
                  className="max-h-12 sm:max-h-14 md:max-h-20 w-auto object-contain opacity-90 hover:opacity-100 transition"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PartnersLogoScroller;
