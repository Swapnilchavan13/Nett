import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TeamMemberCard from "./TeamMemberCard";
import SectionDivider from "./SectionDivider";

const teamMembers = [
  { name: "Placeholder Member 1", designation: "Founder & CEO", description: "Leading NettZero's mission to create a carbon-neutral future through innovative climate solutions. With over 15 years of experience in sustainability consulting, driving strategic initiatives across multiple continents.", linkedinUrl: "#", emission2025: 4.2, offset2025: 8.5 },
  { name: "Placeholder Member 2", designation: "Chief Technology Officer", description: "Driving technological innovation in carbon measurement and tracking systems. Previously led engineering teams at leading tech companies, specializing in IoT and data analytics platforms.", linkedinUrl: "#", emission2025: 3.8, offset2025: 7.2 },
  { name: "Placeholder Member 3", designation: "Chief Operating Officer", description: "Overseeing operations and ensuring seamless delivery of sustainability solutions. Expert in scaling operations across diverse geographies while maintaining quality and impact standards.", linkedinUrl: "#", emission2025: 4.5, offset2025: 9.0 },
  { name: "Placeholder Member 4", designation: "Chief Sustainability Officer", description: "Developing and implementing comprehensive sustainability strategies. Recognized thought leader with publications in leading environmental journals and advisory roles with global organizations.", linkedinUrl: "#", emission2025: 3.2, offset2025: 6.8 },
  { name: "Placeholder Member 5", designation: "Head of Carbon Credits", description: "Managing carbon credit development, verification, and trading operations. Deep expertise in carbon markets, registry protocols, and project validation methodologies across multiple standards.", linkedinUrl: "#", emission2025: 3.9, offset2025: 7.5 },
  { name: "Placeholder Member 6", designation: "Head of Biochar Operations", description: "Leading biochar production and distribution across multiple facilities. Agricultural engineer with hands-on experience in pyrolysis technology and soil carbon sequestration methods.", linkedinUrl: "#", emission2025: 4.1, offset2025: 8.2 },
  { name: "Placeholder Member 7", designation: "Head of Partnerships", description: "Building strategic alliances with corporates, NGOs, and government bodies. Extensive network across climate finance, policy-making circles, and international development organizations.", linkedinUrl: "#", emission2025: 3.5, offset2025: 7.0 },
  { name: "Placeholder Member 8", designation: "Head of Research", description: "Advancing climate science research and developing new carbon removal methodologies. PhD in Environmental Science with focus on nature-based solutions and emerging CDR technologies.", linkedinUrl: "#", emission2025: 2.8, offset2025: 5.6 },
  { name: "Placeholder Member 9", designation: "Senior Climate Scientist", description: "Conducting research on carbon sequestration and emission reduction technologies. Published researcher with expertise in life cycle assessment and carbon accounting methodologies.", linkedinUrl: "#", emission2025: 3.0, offset2025: 6.0 },
  { name: "Placeholder Member 10", designation: "Senior Engineer", description: "Developing cutting-edge measurement and monitoring systems for emissions. Background in embedded systems and sensor technologies, building precision instruments for carbon tracking.", linkedinUrl: "#", emission2025: 3.3, offset2025: 6.6 },
  { name: "Placeholder Member 11", designation: "Farmer Relations Lead", description: "Building and maintaining relationships with our network of 15,000+ farmers. Fluent in multiple regional languages, ensuring clear communication and trust with rural communities.", linkedinUrl: "#", emission2025: 4.0, offset2025: 8.0 },
  { name: "Placeholder Member 12", designation: "Community Manager", description: "Engaging with local communities and stakeholders across project sites. Expertise in participatory development approaches and community-based natural resource management.", linkedinUrl: "#", emission2025: 3.6, offset2025: 7.2 },
  { name: "Placeholder Member 13", designation: "Product Manager", description: "Driving product development for ClimeScore and other NettZero platforms. User-centered design advocate with experience shipping climate-tech products used by thousands.", linkedinUrl: "#", emission2025: 3.4, offset2025: 6.8 },
  { name: "Placeholder Member 14", designation: "Design Lead", description: "Creating intuitive and impactful user experiences across all platforms. Award-winning designer passionate about making sustainability data accessible and actionable for everyone.", linkedinUrl: "#", emission2025: 2.9, offset2025: 5.8 },
  { name: "Placeholder Member 15", designation: "Marketing Lead", description: "Spreading awareness about climate action and NettZero's mission. Storyteller and communications strategist with experience in purpose-driven brand building and ESG communications.", linkedinUrl: "#", emission2025: 3.7, offset2025: 7.4 },
  { name: "Placeholder Member 16", designation: "Finance Lead", description: "Managing financial operations and green investment portfolios. Chartered accountant with specialization in climate finance, carbon credit valuation, and sustainable investment analysis.", linkedinUrl: "#", emission2025: 3.1, offset2025: 6.2 },
];

const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <>
      <SectionDivider 
        title="Team NettZero" 
        subtitle="The passionate people driving climate action"
        sectionNumber="06"
      />
      
      <section ref={ref} className="py-12 sm:py-16 md:py-20 bg-background relative overflow-hidden" id="team">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(142 76% 45%) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          {/* Team grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                key={index}
                member={member}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Summary stats */}
          <motion.div
            className="mt-10 sm:mt-12 md:mt-16 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-16"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient">16</p>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">Team Members</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-destructive/80">
                {teamMembers.reduce((acc, m) => acc + m.emission2025, 0).toFixed(1)}
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">Total tCO₂e Emitted</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary">
                {teamMembers.reduce((acc, m) => acc + m.offset2025, 0).toFixed(1)}
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">Total tCO₂e Offset</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TeamSection;
