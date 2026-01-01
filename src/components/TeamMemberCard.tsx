import { motion } from "framer-motion";
import { Linkedin, User } from "lucide-react";

interface TeamMember {
  name: string;
  designation: string;
  description: string;
  linkedinUrl: string;
  emission2025: number;
  offset2025: number;
  image?: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
  isInView: boolean;
}

const TeamMemberCard = ({ member, index, isInView }: TeamMemberCardProps) => {
  return (
    <motion.div
      className="glass-card p-4 sm:p-6 group hover:border-primary/30 transition-colors"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {/* Avatar */}
      <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary border-2 border-primary/30 flex items-center justify-center overflow-hidden flex-shrink-0">
          {member.image ? (
            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground text-base sm:text-lg truncate">{member.name}</h4>
          <p className="text-primary text-xs sm:text-sm font-medium truncate">{member.designation}</p>
        </div>
        <a
          href={member.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-primary/20 transition-colors group/link flex-shrink-0"
        >
          <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover/link:text-primary transition-colors" />
        </a>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3 sm:line-clamp-4">
        {member.description}
      </p>

      {/* Carbon stats */}
      <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-border">
        <div className="flex-1 text-center p-1.5 sm:p-2 rounded-lg bg-destructive/10">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Emission 2025</p>
          <p className="text-base sm:text-lg font-bold text-destructive">{member.emission2025.toFixed(1)}</p>
          <p className="text-[8px] sm:text-[10px] text-muted-foreground">tCO₂e</p>
        </div>
        <div className="flex-1 text-center p-1.5 sm:p-2 rounded-lg bg-primary/10">
          <p className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">Offset 2025</p>
          <p className="text-base sm:text-lg font-bold text-primary">{member.offset2025.toFixed(1)}</p>
          <p className="text-[8px] sm:text-[10px] text-muted-foreground">tCO₂e</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard;
