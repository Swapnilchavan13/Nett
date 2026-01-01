import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { BarChart3, Trees, GraduationCap, Wallet, ShoppingBag, ArrowRight } from "lucide-react";

const pillars = [
  {
    name: "ClimeScore",
    icon: BarChart3,
    description: "Measure and track your carbon footprint with precision analytics and actionable insights.",
    color: "from-primary/20 to-primary/5",
  },
  {
    name: "ClimeGrove",
    icon: Trees,
    description: "Offset emissions through verified reforestation and carbon dioxide removal projects.",
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    name: "ClimeSchool",
    icon: GraduationCap,
    description: "Build climate literacy across your organization with expert-led training programs.",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    name: "ClimeFolio",
    icon: Wallet,
    description: "Invest in sustainable assets and carbon credits that deliver both returns and impact.",
    color: "from-amber-500/20 to-amber-500/5",
  },
  {
    name: "ClimeStore",
    icon: ShoppingBag,
    description: "Access a curated marketplace of verified sustainable products and services.",
    color: "from-purple-500/20 to-purple-500/5",
  },
];

const NettZeroForYou = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section ref={ref} className="min-h-screen relative bg-background py-12 sm:py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
          backgroundSize: '36px 36px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/30 bg-primary/10 mb-4 sm:mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-primary text-xs sm:text-sm font-medium tracking-wider uppercase">Section 05</span>
          </motion.div>
          
          <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground mb-2 sm:mb-4">
            NettZero <span className="text-gradient">for You</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto px-4">
            Five pillars of comprehensive climate action, designed for organizations ready to lead the sustainability transition.
          </p>
        </motion.div>

        {/* Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.name}
              className={`relative p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-border/50 bg-gradient-to-br ${pillar.color} backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group ${index === 4 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-background/50 border border-border/50 group-hover:border-primary/30 transition-colors flex-shrink-0">
                  <pillar.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-foreground mt-1 sm:mt-2">{pillar.name}</h3>
              </div>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="inline-flex flex-col items-center gap-4 sm:gap-6 p-5 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-primary/20 bg-gradient-to-b from-primary/10 to-transparent">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-display text-foreground text-center">
              Ready to start your climate journey?
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base max-w-lg text-center">
              Join the growing community of organizations committed to measurable climate action.
            </p>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base md:text-lg font-medium rounded-full group"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NettZeroForYou;
