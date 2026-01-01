import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Send, Mail, Building2, User, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SectionDivider from "./SectionDivider";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    
    setFormData({ name: "", email: "", company: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <SectionDivider 
        title="Get In Touch" 
        subtitle="Start your sustainability journey with NettZero"
        sectionNumber="07"
      />
      
      <section ref={ref} className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden" id="contact">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(142 76% 45%) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            className="glass-card p-5 sm:p-8 md:p-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <motion.h3
                className="text-xl sm:text-2xl md:text-3xl font-display text-foreground mb-3 sm:mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Let's Build a <span className="text-gradient">Sustainable Future</span> Together
              </motion.h3>
              <motion.p
                className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Whether you're looking to measure your carbon footprint, explore carbon credits, 
                or partner with us on climate projects, we'd love to hear from you.
              </motion.p>
            </div>

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-secondary/50 border-border focus:border-primary"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="pl-10 bg-secondary/50 border-border focus:border-primary"
                  />
                </div>
              </div>
              
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  name="company"
                  placeholder="Company Name (Optional)"
                  value={formData.company}
                  onChange={handleChange}
                  className="pl-10 bg-secondary/50 border-border focus:border-primary"
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-muted-foreground" />
                <Textarea
                  name="message"
                  placeholder="Tell us about your sustainability goals..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="pl-10 bg-secondary/50 border-border focus:border-primary resize-none"
                />
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
