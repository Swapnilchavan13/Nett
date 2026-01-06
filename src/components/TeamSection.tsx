import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import TeamMemberCard from "./TeamMemberCard";
import SectionDivider from "./SectionDivider";

const teamMembers = [
  { name: "Ajay Miglani", designation: "Director & Board of Advisors", description: "Ajay Miglani is a senior professional with extensive experience in leadership, strategy, and advisory roles. As Director and Board Advisor, he provides strategic guidance, governance oversight, and industry insights to support the organization’s long-term vision and growth.", linkedinUrl: "https://www.linkedin.com/in/mig928/", emission2025: 4.2, offset2025: 8.5, image:'https://media.licdn.com/dms/image/v2/C4E03AQHZ1zRs1qTD6w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1570609000549?e=2147483647&v=beta&t=dX_T-imBCJpfxeV6JTXAKIG3DGhcVYxxyfYvDa8pEVU' },
  { name: "Ankit Singh", designation: "Supervisor – Operations", description: "Ankit Singh supports operational execution by supervising field activities and assisting with coordination across teams. His role ensures timely implementation, process adherence, and effective management of day-to-day operational requirements.", linkedinUrl: "https://www.linkedin.com/company/climescore/", emission2025: 3.8, offset2025: 7.2 },
  { name: "Dr. Abhinav Shukla", designation: "District Owner & Biochar Producer", description: "Dr. Abhinav Shukla is a District Owner and Biochar Producer with a strong focus on sustainable practices and climate-positive solutions. He supports the execution of biochar projects that promote soil health, carbon sequestration, and long-term environmental impact at the regional level.", linkedinUrl: "https://www.linkedin.com/company/climescore/", emission2025: 4.5, offset2025: 9.0, image:'https://iili.io/fOzycCP.jpg' },
  { name: "Gautam Shiknis", designation: "Founder & Chairman", description: "Gautam Shiknis is the architect of the NettZero Suite and its hands-on driving force. He brings nearly 30 years of entrepreneurial experience to this venture and has been a Climate Champion for over 20 years. Actively involved in greenhouse gas (GHG) accounting since 2008, Gautam combines strategic vision with on-ground execution to advance credible climate action and sustainability solutions. Under his leadership, the organization focuses on delivering transparent, data-driven climate solutions that enable measurable progress toward carbon neutrality. Gautam plays a key role in advancing initiatives related to carbon accounting, sustainability platforms, and biochar-based carbon removal. His approach emphasizes practical implementation, scalability, and long-term environmental impact.", linkedinUrl: "https://www.linkedin.com/in/shiknis/", emission2025: 3.2, offset2025: 6.8, image:'https://media.licdn.com/dms/image/v2/C4D03AQGwwJl0D_-OPw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1636129095656?e=2147483647&v=beta&t=CsmI_HoWJCNFGS3WuQ1kpdLpCaEFYqH6snv6_kyKZsc' },
  // { name: "Imran Baig", designation: "District Owner & Biochar Producer", description: "Imran Baig manages district-level biochar production activities, contributing to grassroots climate action initiatives. His work supports sustainable biomass utilization, operational coordination, and the scaling of biochar solutions for environmental impact.", linkedinUrl: "https://www.linkedin.com/company/climescore/", emission2025: 3.9, offset2025: 7.5 },
  { name: "Mukesh Kevad", designation: "Supervisor – Operations", description: "Mukesh Kevad works as a Supervisor in Operations, overseeing on-ground activities, coordinating teams, and ensuring smooth execution of projects. He plays a key role in maintaining operational efficiency, quality control, and adherence to processes across field operations.", linkedinUrl: "https://www.linkedin.com/company/climescore/", emission2025: 4.1, offset2025: 8.2 },
  { name: "Neelesh Kevat", designation: "Biochar Producer", description: "Neelesh Kevat is a Biochar Producer involved in sustainable biochar production processes that support carbon sequestration and climate-positive outcomes. He contributes to biomass conversion activities and on-ground production efforts aligned with long-term environmental impact goals.", linkedinUrl: "https://www.linkedin.com/company/climescore/", emission2025: 3.9, offset2025: 7.5, image:'https://iili.io/fOoPf3P.jpg' },
  { name: "Pratyusha Priyanka", designation: "District Owner & Biochar Producer", description: "Pratyusha Priyanka is a District Owner and Biochar Producer, actively involved in decentralized biochar production and sustainable waste-to-resource initiatives. She supports local climate action by managing district-level operations and contributing to carbon sequestration through biochar projects.", linkedinUrl: "https://www.linkedin.com/company/climescore/", emission2025: 3.5, offset2025: 7.0, image:'https://iili.io/fOzzHT7.jpg' },
  { name: "Priyanka Giri Shiknis", designation: "Board of Director", description: "Priyanka Giri Shiknis serves as a Board of Director, contributing to strategic decision-making, governance, and organizational oversight. She supports the leadership team by providing guidance on long-term vision, policy alignment, and sustainable growth of climate-focused initiatives.", linkedinUrl: "https://www.linkedin.com/in/priyanka-giri-shiknis-212b8b321/", emission2025: 3.5, offset2025: 7.0, image:'https://media.licdn.com/dms/image/v2/D5603AQFVpoOgOdigtQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1723144050987?e=1769040000&v=beta&t=6SdKy_ItOb2rq5o00ggLoc9kOPbwFsrANLcBoSjA7UU' },
 
  { name: "Rajeev Singh", designation: "District Owner & Biochar Producer", description: "Rajeev Singh oversees district-level biochar production operations, contributing to sustainable agriculture and carbon removal initiatives. His role focuses on implementation, coordination, and ensuring efficient biochar production aligned with environmental and climate goals.", linkedinUrl: "https://www.linkedin.com/company/climescore/", emission2025: 2.8, offset2025: 5.6, image:'https://iili.io/fOzubV9.jpg' },
  { name: "Rutuja Gaikwad", designation: "Research Analyst & Data Manager", description: "Rutuja Gaikwad works as a Research Analyst and Data Manager, supporting sustainability and climate initiatives through in-depth research, structured data management, and accurate documentation. She plays a key role in managing emissions data, supporting reports, and ensuring data integrity for GHG accounting and impact assessments..", linkedinUrl: "https://www.linkedin.com/in/rutuja-gaikwad-84b6b0286/", emission2025: 3.0, offset2025: 6.0, image:'https://media.licdn.com/dms/image/v2/D5603AQHvimcI4hHylQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1724742163116?e=1769040000&v=beta&t=fNdkSlVjAXoo8i6ZA0GGPSoT7J8anLC9yqCgE0dJ9G0' },
  { name: "Sapna Bisht", designation: "Head of ClimeSchool", description: "Sapna Bisht leads ClimeSchool, focusing on climate education, capacity building, and knowledge dissemination. She plays a pivotalrole in designing learning programs, training modules, andawareness initiatives that empower individuals and organizations tounderstand climate action, sustainability practices, and carbonmanagement.", linkedinUrl: "https://www.linkedin.com/in/sapna-bisht-813964104/", emission2025: 3.3, offset2025: 6.6, image:'https://media.licdn.com/dms/image/v2/D4E03AQHsod73NQO2lw/profile-displayphoto-crop_800_800/B4EZgd2tExHIAM-/0/1752847539273?e=1769040000&v=beta&t=yrkHGOwE8cruH3EzVYiMy1IQceDw4rNWnvCVcwhWuCo' },
  { name: "Sanjay Singh Rajput", designation: "Biochar Producer", description: "Sanjay Singh is a Biochar Producer involved in sustainable biochar production processes that support carbon sequestration and climate-positive outcomes. He contributes to biomass conversion activities and on-ground production efforts aligned with long-term environmental impact goals.", linkedinUrl: "https://www.linkedin.com/company/climescore/", emission2025: 3.7, offset2025: 7.4, image:'https://iili.io/fOzaMnp.jpg' },
  { name: "Swapnil Chavan", designation: "Full Stack Engineer", description: "Swapnil Chavan is a Full Stack Engineer responsible for developing, maintaining, and optimizing the organization’s digital platforms. He ensures smooth system functionality, scalability, and user-friendly interfaces, supporting the technical backbone of sustainability and climate-focused digital solutions.", linkedinUrl: "https://www.linkedin.com/in/swapnil-chavan-951103230/", emission2025: 4.0, offset2025: 8.0, image:'https://media.licdn.com/dms/image/v2/D4D03AQHd8ELPe0ZXbQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1706987647041?e=1769040000&v=beta&t=O-Ew44AMh_PNIwez6OAKdzvITBeQxlP3POFnM4UbJ8c' },
  { name: "Varun Hooja", designation: "Co-Founder", description: "Varun Hooja is the Co-Founder and plays a key role in shaping the organization’s vision and growth strategy. He contributes to business development, partnerships, and sustainability initiatives, ensuring alignment with the organization’s climate action objectives.", linkedinUrl: "https://www.linkedin.com/in/varun-hooja/", emission2025: 3.6, offset2025: 7.2, image:'https://media.licdn.com/dms/image/v2/C5103AQF2Y4a71PUg2g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1554216211845?e=1769040000&v=beta&t=Nsd-8XH0zVMjLfEAW6vaZBsIv61Leru-_PSwSkp3j2A' },
  { name: "Vidhi Gaur", designation: "GHG Assessor", description: "Vidhi Gaur is a GHG Assessor with expertise in greenhouse gas accounting and emissions assessment. She supports projects and clients by conducting accurate emissions calculations, ensuring compliance with relevant standards, and contributing to transparent and reliable sustainability reporting.", linkedinUrl: "https://www.linkedin.com/in/vidhigaur1/", emission2025: 3.4, offset2025: 6.8, image:'https://media.licdn.com/dms/image/v2/D5603AQHhaJzb3nkpEQ/profile-displayphoto-shrink_800_800/B56ZRgjvLrHoAc-/0/1736786770066?e=1769040000&v=beta&t=qINruZIJ0yH34jbrrZpjlNMtCxGoPCqNs-ucku2yj7Q' },
  { name: "Vishal Kashyap", designation: "Biochar Producer", description: "Vishal Kashyap is a Biochar Producer involved in sustainable biochar production processes. He contributes to climate mitigation efforts by supporting biomass conversion, production activities, and initiatives focused on long-term carbon sequestration.", linkedinUrl: "https://www.linkedin.com/company/climescore/", emission2025: 2.9, offset2025: 5.8, image:'https://iili.io/fOzbApp.jpg' },
  // { name: "Placeholder Member 16", designation: "Finance Lead", description: "Managing financial operations and green investment portfolios. Chartered accountant with specialization in climate finance, carbon credit valuation, and sustainable investment analysis.", linkedinUrl: "#", emission2025: 3.1, offset2025: 6.2 },
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
