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
  images: string[]; // 👈 ADD THIS
}


const GalleryImageDialog = ({
  isOpen,
  onClose,
  projectName,
  images,
}: GalleryImageDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-display text-foreground">
            {projectName} - Gallery
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {images.map((img, index) => (
            <div
              key={index}
              className="aspect-video rounded-lg overflow-hidden border border-border hover:border-primary/30 transition-colors cursor-pointer"
            >
              <img
                src={img}
                alt={`${projectName} image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <p className="text-sm text-muted-foreground text-center mt-4">
            No images available for this gallery
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};


export default GalleryImageDialog;
