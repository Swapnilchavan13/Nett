import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ExternalLink } from "lucide-react";

const sections = [
  { id: "suite", label: "The NettZero Suite" },
  { id: "gallery", label: "Gallery" },
  { id: "numbers", label: "In Numbers" },
  { id: "partners", label: "Partners" },
  { id: "footprint", label: "Footprint" },
  { id: "team", label: "Team" },
  { id: "for-you", label: "For You" },
];

const productLinks = [
  { label: "ClimeScore", href: "#" },
  { label: "MicroOffsets", href: "#" },
  { label: "ClimeGrove", href: "https://www.climegrove.com" },
  { label: "ClimeSchool", href: "#" },
  { label: "ClimeStore", href: "#" },
  { label: "ClimeFolio", href: "#" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/90 backdrop-blur-xl border-b border-border/50"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              {/* <span className="font-display text-xl md:text-2xl font-bold text-foreground"> */}
                {/* Nett<span className="text-gradient">Zero</span> */}
                     {/* </span> */}
     <div className="flex flex-col items-center text-center gap-3">
  <img
    src="https://iili.io/fOAcFsf.jpg"
    alt="NettZero Logo"
    className="w-40 h-auto object-contain rounded-lg opacity-90 transition-opacity duration-300 group-hover:opacity-100"
  />

</div>



            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                >
                  {section.label}
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-4/5" />
                </button>
              ))}
            </div>

            {/* Desktop Products Dropdown */}
         <div className="hidden lg:flex items-center gap-4">
  <div className="relative group">
    <button className="px-4 py-2 text-sm font-medium text-foreground border border-primary/30 rounded-full hover:bg-primary/10 transition-colors flex items-center gap-2">
      Products
      <ExternalLink className="w-3 h-3" />
    </button>

    <div className="absolute top-full right-0 mt-2 w-48 py-2 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
      {productLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
        >
          {link.label}
        </a>
      ))}
    </div>
  </div>
</div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-foreground"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute top-16 left-0 right-0 bg-card border-b border-border p-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <div className="space-y-4">
                <div className="pb-4 border-b border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Sections</p>
                  <div className="grid grid-cols-2 gap-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-colors"
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Products</p>
                  <div className="grid grid-cols-2 gap-2">
                    {productLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 rounded-lg transition-colors flex items-center gap-2"
                      >
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
