import { Helmet } from "react-helmet";
import LeaderCarousel from "@/components/LeaderCarousel";
import ScrollSection from "@/components/ScrollSection";
import SectionDivider from "@/components/SectionDivider";
import StatsSection from "@/components/StatsSection";
import PartnersSection from "@/components/PartnersSection";
import FootprintSection from "@/components/FootprintSection";
import NettZeroForYou from "@/components/NettZeroForYou";

// Carousel images
import carouselClimeScore from "@/assets/carousel-climescore.jpg";
import carouselClimeGrove from "@/assets/carousel-climegrove.jpg";
import carouselClimeSchool from "@/assets/carousel-climeschool.jpg";
import carouselClimeStore from "@/assets/carousel-climestore.jpg";
import carouselClimeFolio from "@/assets/carousel-climefolio.jpg";

// Section images
import sectionMeasure from "@/assets/section-measure.jpg";
import sectionReduce from "@/assets/section-reduce.jpg";
import sectionOffset from "@/assets/section-offset.jpg";
import sectionDevelop from "@/assets/section-develop.jpg";
import sectionPurchase from "@/assets/section-purchase.jpg";
import sectionInvest from "@/assets/section-invest.jpg";
import sectionScope3 from "@/assets/section-scope3.jpg";
import sectionGreenBiz from "@/assets/section-greenbiz.jpg";
import sectionVendors from "@/assets/section-vendors.jpg";
import sectionLeaders from "@/assets/section-leaders.jpg";
import sectionFaculty from "@/assets/section-faculty.jpg";
import sectionOnline from "@/assets/section-online.jpg";
import sectionBiochar from "@/assets/section-biochar.jpg";
import sectionFarmers from "@/assets/section-farmers.jpg";
import sectionStraw from "@/assets/section-straw.jpg";
import sectionSoil from "@/assets/section-soil.jpg";
import sectionTrees from "@/assets/section-trees.jpg";
import sectionErw from "@/assets/section-erw.jpg";
import sectionDac from "@/assets/section-dac.jpg";
import sectionPartners from "@/assets/section-partners.jpg";
import sectionStandards from "@/assets/section-standards.jpg";

// Footprint images
import footprintNubra from "@/assets/footprint-nubra.jpg";
import footprintRajgarh from "@/assets/footprint-rajgarh.jpg";
import footprintPuranpur from "@/assets/footprint-puranpur.jpg";
import footprintMandawa from "@/assets/footprint-mandawa.jpg";
import footprintBandhavgarh from "@/assets/footprint-bandhavgarh.jpg";
import footprintDamoh from "@/assets/footprint-damoh.jpg";
import footprintLonavala from "@/assets/footprint-lonavala.jpg";
import footprintCoorg from "@/assets/footprint-coorg.jpg";

const carouselItems = [
  { name: "ClimeScore", image: carouselClimeScore, tagline: "Measure your carbon footprint" },
  { name: "ClimeGrove", image: carouselClimeGrove, tagline: "Grow your green legacy" },
  { name: "ClimeSchool", image: carouselClimeSchool, tagline: "Learn climate action" },
  { name: "ClimeStore", image: carouselClimeStore, tagline: "Shop sustainably" },
  { name: "ClimeFolio", image: carouselClimeFolio, tagline: "Invest in the future" },
];

// Section 1: The NettZero Suite
const nettZeroSuiteSections = {
  measureEmissions: [
    {
      title: "Measure",
      headline: "Know Your Carbon Footprint",
      description: "Accurately quantify your organization's greenhouse gas emissions across Scope 1, 2, and 3. Our comprehensive measurement tools provide granular insights into your environmental impact.",
      backgroundImage: sectionMeasure,
    },
    {
      title: "Reduce",
      headline: "Cut Emissions at Source",
      description: "Implement data-driven strategies to minimize your carbon output. From energy efficiency to process optimization, we identify the highest-impact reduction opportunities.",
      backgroundImage: sectionReduce,
    },
    {
      title: "Offset",
      headline: "Balance What Remains",
      description: "Neutralize unavoidable emissions through verified carbon offset projects. Support reforestation, renewable energy, and community initiatives that deliver real climate impact.",
      backgroundImage: sectionOffset,
    },
  ],
  manageCarbonCredits: [
    {
      title: "Develop",
      headline: "Create Carbon Assets",
      description: "Transform sustainable practices into certified carbon credits. Our development team guides you through project design, validation, and registration with leading standards.",
      backgroundImage: sectionDevelop,
    },
    {
      title: "Purchase",
      headline: "Acquire Quality Credits",
      description: "Access a curated marketplace of verified carbon credits from diverse project types. Every credit is traceable, transparent, and aligned with your sustainability goals.",
      backgroundImage: sectionPurchase,
    },
    {
      title: "Invest",
      headline: "Grow Sustainable Wealth",
      description: "Build a portfolio of climate-positive investments. From green bonds to carbon credit funds, we help you align financial returns with environmental outcomes.",
      backgroundImage: sectionInvest,
    },
  ],
  sustainableMarketplace: [
    {
      title: "Reduce Your Scope 3",
      headline: "Tackle Supply Chain Emissions",
      description: "Partner with verified sustainable suppliers to dramatically reduce your Scope 3 footprint. Our marketplace connects you with eco-conscious vendors across every category.",
      backgroundImage: sectionScope3,
    },
    {
      title: "Support Green Businesses",
      headline: "Amplify Sustainable Commerce",
      description: "Every purchase powers the green economy. Discover and support businesses that share your commitment to environmental stewardship and responsible practices.",
      backgroundImage: sectionGreenBiz,
    },
    {
      title: "Work with Verified Vendors",
      headline: "Trust Through Transparency",
      description: "All marketplace vendors are rigorously vetted against sustainability standards. Build your supply chain with confidence knowing each partner meets strict environmental criteria.",
      backgroundImage: sectionVendors,
    },
  ],
  climateLiteracy: [
    {
      title: "Train Your Leaders",
      headline: "Executive Climate Fluency",
      description: "Equip your leadership team with the knowledge to drive strategic sustainability decisions. Our executive programs cover ESG integration, climate risk, and stakeholder communication.",
      backgroundImage: sectionLeaders,
    },
    {
      title: "Train Your Faculty",
      headline: "Academic Excellence in Sustainability",
      description: "Empower educators to inspire the next generation of climate leaders. Our faculty development programs integrate cutting-edge climate science into curricula across disciplines.",
      backgroundImage: sectionFaculty,
    },
    {
      title: "Join Our Online Programs",
      headline: "Learn at Your Own Pace",
      description: "Access world-class climate education from anywhere. Our online courses combine expert instruction, interactive modules, and real-world case studies for maximum impact.",
      backgroundImage: sectionOnline,
    },
  ],
};

// Section 2: NettZero in Numbers
const statsData = {
  measurement: [
    {
      value: "300,000+",
      label: "tCO₂e Measured",
      description: "Over 300,000 tonnes of CO₂ equivalent measured across diverse industries, from manufacturing to technology, providing actionable insights for emission reduction.",
      backgroundImage: sectionMeasure,
    },
    {
      value: "25+",
      label: "Industry Leaders",
      description: "More than 25 leading companies trust NettZero to measure, manage, and reduce their carbon footprint, spanning sectors from finance to agriculture.",
      backgroundImage: sectionDevelop,
    },
  ],
  carbonRemoval: [
    {
      value: "500,000+",
      label: "Litres of Biochar",
      description: "Our biochar production facilities have created over half a million litres of this powerful carbon-negative material, permanently sequestering carbon in soil.",
      backgroundImage: sectionBiochar,
    },
    {
      value: "15,000+",
      label: "Farmers in Network",
      description: "A thriving network of over 15,000 farmers participate in our rice-straw collection program, transforming agricultural waste into climate solutions.",
      backgroundImage: sectionFarmers,
    },
    {
      value: "2M+",
      label: "Kgs of Straw Saved",
      description: "Over 2 million kilograms of rice straw diverted from burning, preventing massive CO₂ emissions and improving local air quality for communities.",
      backgroundImage: sectionStraw,
    },
    {
      value: "20,000+",
      label: "Acres Enriched",
      description: "More than 20,000 acres of farmland have been enhanced with our fortified soil conditioner, improving crop yields while sequestering atmospheric carbon.",
      backgroundImage: sectionSoil,
    },
    {
      value: "40,000+",
      label: "Trees Planted",
      description: "Our reforestation initiatives have planted over 40,000 trees across degraded landscapes, restoring ecosystems and creating long-term carbon sinks.",
      backgroundImage: sectionTrees,
    },
    {
      value: "140+",
      label: "Hectares Under ERW",
      description: "Over 140 hectares are actively participating in our Enhanced Rock Weathering program, accelerating natural carbon capture through mineral carbonation.",
      backgroundImage: sectionErw,
    },
    {
      value: "DAC",
      label: "Prototype for Home Use",
      description: "Pioneering Direct Air Capture technology scaled for residential use, enabling individuals to actively remove CO₂ from their immediate environment.",
      backgroundImage: sectionDac,
    },
  ],
};

// Section 3: Partners
const partnersData = {
  customers: [
    {
      name: "Enterprise Clients",
      description: "Fortune 500 companies and industry leaders trust NettZero to guide their sustainability journey, from initial assessment to net-zero achievement.",
      backgroundImage: sectionPartners,
    },
    {
      name: "SME Partners",
      description: "Small and medium enterprises access enterprise-grade sustainability tools tailored to their scale, enabling climate action at every business size.",
      backgroundImage: sectionGreenBiz,
    },
  ],
  partners: [
    {
      name: "Technology Partners",
      description: "Collaborating with leading tech companies to integrate climate data into business intelligence platforms and enterprise resource planning systems.",
      backgroundImage: sectionPurchase,
    },
    {
      name: "Implementation Partners",
      description: "A global network of certified consultants and implementation specialists ensuring seamless deployment of NettZero solutions across regions.",
      backgroundImage: sectionLeaders,
    },
  ],
  standards: [
    {
      name: "Certification Bodies",
      description: "Aligned with ISO 14001, GHG Protocol, Verra, Gold Standard, and other leading frameworks ensuring our methodologies meet the highest global standards.",
      backgroundImage: sectionStandards,
    },
    {
      name: "Research Institutions",
      description: "Partnering with universities and research centers to advance climate science and develop innovative carbon removal technologies.",
      backgroundImage: sectionFaculty,
    },
  ],
};

// Section 4: NettZero Footprint
const footprintData = [
  {
    name: "Nubra Valley",
    state: "Ladakh",
    headline: "Ladakh's First Carbon Neutral Resort",
    description: "We have created Ladakh's first carbon neutral resort called Stone Hedge, setting a new benchmark for sustainable hospitality in one of the world's most pristine mountain landscapes.",
    backgroundImage: footprintNubra,
  },
  {
    name: "Rajgarh",
    state: "Himachal Pradesh",
    headline: "Biochar from Orchard Prunings",
    description: "We are creating biochar using orchard prunings from over 100,000 trees — which were earlier getting burnt — transforming agricultural waste into a powerful carbon sequestration tool.",
    backgroundImage: footprintRajgarh,
  },
  {
    name: "Puranpur",
    state: "Uttar Pradesh",
    headline: "Protecting Air Quality Through Biochar",
    description: "We are creating biochar using rice-straw from over 5,000 farmers — directly preventing hundreds of tons of PM2.5 from affecting the AQI and improving regional air quality.",
    backgroundImage: footprintPuranpur,
  },
  {
    name: "Mandawa",
    state: "Rajasthan",
    headline: "Rajasthan's First Carbon Neutral Resort",
    description: "We have created Rajasthan's first carbon neutral resort — the legacy Mandawa — by measuring & reporting emissions for the past 4 years, setting a sustainability standard for heritage tourism.",
    backgroundImage: footprintMandawa,
  },
  {
    name: "Bandhavgarh",
    state: "Madhya Pradesh",
    headline: "Invasive Species to Biochar",
    description: "We are converting invasive species and rice straw into biochar for the last 2 years. We've covered nearly 10,000 farmers and prevented over 200,000 kgs of rice straw from being burnt.",
    backgroundImage: footprintBandhavgarh,
  },
  {
    name: "Damoh",
    state: "Madhya Pradesh",
    headline: "Farmer Cooperative Impact",
    description: "We are converting rice straw into biochar and working with a cooperative of over 20,000 farmers. This year, we will prevent 300,000 kgs of rice straw from being burnt.",
    backgroundImage: footprintDamoh,
  },
  {
    name: "Lonavala",
    state: "Maharashtra",
    headline: "Asia's First Carbon Neutral Resort",
    description: "We have created Asia's first carbon neutral resort by working with the prestigious eco-luxury retreat called The Machan, for the last four years — pioneering sustainable luxury tourism.",
    backgroundImage: footprintLonavala,
  },
  {
    name: "Coorg",
    state: "Karnataka",
    headline: "Comprehensive Emissions Tracking",
    description: "We are working with one of India's most admired resorts, The Tamara Coorg — by helping them accurately track and measure their emissions across Scope 1, 2 and 3, with reduction and sequestration strategies being developed.",
    backgroundImage: footprintCoorg,
  },
];

const Index = () => {
  let globalIndex = 0;

  return (
    <>
      <Helmet>
        <title>ClimeScore by NettZero | Comprehensive Climate Action Platform</title>
        <meta name="description" content="ClimeScore by NettZero - A comprehensive climate action platform for measuring, reducing, and offsetting carbon emissions. Join the sustainability journey." />
        <meta name="keywords" content="carbon footprint, climate action, sustainability, carbon credits, ESG, net zero, emissions measurement" />
        <link rel="canonical" href="https://nettzero.com" />
      </Helmet>

      <main className="bg-background">
        {/* Hero Carousel */}
        <LeaderCarousel items={carouselItems} />

        {/* Section 1: The NettZero Suite */}
        <SectionDivider 
          title="The NettZero Suite" 
          subtitle="Comprehensive climate solutions for every stage of your sustainability journey"
          sectionNumber="01"
        />

        {/* Sub-Section A: Measure Emissions */}
        {nettZeroSuiteSections.measureEmissions.map((section, index) => (
          <ScrollSection
            key={`measure-${index}`}
            {...section}
            position={index % 2 === 0 ? "left" : "right"}
            index={globalIndex++}
          />
        ))}

        {/* Sub-Section B: Manage Carbon Credits */}
        {nettZeroSuiteSections.manageCarbonCredits.map((section, index) => (
          <ScrollSection
            key={`credits-${index}`}
            {...section}
            position={index % 2 === 0 ? "right" : "left"}
            index={globalIndex++}
          />
        ))}

        {/* Sub-Section C: Sustainable Marketplace */}
        {nettZeroSuiteSections.sustainableMarketplace.map((section, index) => (
          <ScrollSection
            key={`marketplace-${index}`}
            {...section}
            position={index % 2 === 0 ? "left" : "right"}
            index={globalIndex++}
          />
        ))}

        {/* Sub-Section D: Climate Literacy */}
        {nettZeroSuiteSections.climateLiteracy.map((section, index) => (
          <ScrollSection
            key={`literacy-${index}`}
            {...section}
            position={index % 2 === 0 ? "right" : "left"}
            index={globalIndex++}
          />
        ))}

        {/* Section 2: NettZero in Numbers */}
        <SectionDivider 
          title="NettZero in Numbers" 
          subtitle="Measurable impact across every dimension of climate action"
          sectionNumber="02"
        />

        {/* Measurement Stats */}
        {statsData.measurement.map((stat, index) => (
          <StatsSection
            key={`measurement-${index}`}
            stat={stat}
            index={index}
            position={index % 2 === 0 ? "left" : "right"}
          />
        ))}

        {/* Carbon Removal Stats */}
        {statsData.carbonRemoval.map((stat, index) => (
          <StatsSection
            key={`removal-${index}`}
            stat={stat}
            index={index + 2}
            position={index % 2 === 0 ? "right" : "left"}
          />
        ))}

        {/* Section 3: NettZero Partners */}
        <SectionDivider 
          title="NettZero Partners" 
          subtitle="Building a global ecosystem for climate action"
          sectionNumber="03"
        />

        {/* Customers */}
        {partnersData.customers.map((partner, index) => (
          <PartnersSection
            key={`customers-${index}`}
            partner={partner}
            category="Customers"
            index={index}
            position={index % 2 === 0 ? "left" : "right"}
          />
        ))}

        {/* Partners */}
        {partnersData.partners.map((partner, index) => (
          <PartnersSection
            key={`partners-${index}`}
            partner={partner}
            category="Partners"
            index={index + 2}
            position={index % 2 === 0 ? "right" : "left"}
          />
        ))}

        {/* Standards */}
        {partnersData.standards.map((partner, index) => (
          <PartnersSection
            key={`standards-${index}`}
            partner={partner}
            category="Standards"
            index={index + 4}
            position={index % 2 === 0 ? "left" : "right"}
          />
        ))}

        {/* Section 4: NettZero Footprint */}
        <SectionDivider 
          title="NettZero Footprint" 
          subtitle="Our on-ground impact across India's diverse landscapes"
          sectionNumber="04"
        />

        {footprintData.map((location, index) => (
          <FootprintSection
            key={`footprint-${index}`}
            location={location}
            index={index}
            position={index % 2 === 0 ? "left" : "right"}
          />
        ))}

        {/* Section 5: NettZero for You */}
        <NettZeroForYou />

        {/* Footer */}
        <footer className="py-16 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              <span className="text-primary text-sm font-medium tracking-[0.3em] uppercase">NettZero</span>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">
              Clime<span className="text-gradient">Score</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Building a sustainable future, one measurement at a time.
            </p>
            <p className="text-muted-foreground/60 text-sm">
              © {new Date().getFullYear()} NettZero. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Index;