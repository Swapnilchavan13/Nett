import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Image } from "lucide-react";

interface GalleryImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

const GalleryImageDialog = ({ isOpen, onClose, projectName }: GalleryImageDialogProps) => {
  // Placeholder images - replace with actual project images
  const placeholderImages = [1, 2, 3, 4, 5, 6];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-display text-foreground">
            {projectName} - Gallery
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {placeholderImages.map((index) => (
            <div
              key={index}
              className="aspect-video bg-secondary/50 rounded-lg border border-border flex items-center justify-center hover:border-primary/30 transition-colors cursor-pointer group"
            >
              <div className="text-center">
                <Image className="w-8 h-8 text-muted-foreground mx-auto mb-2 group-hover:text-primary transition-colors" />
                <p className="text-xs text-muted-foreground">Image {index}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground text-center mt-4">
          Additional project images will be displayed here
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryImageDialog;
