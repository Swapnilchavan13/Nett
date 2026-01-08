import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface GalleryImageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  images: string[];
}

const GalleryImageDialog = ({
  isOpen,
  onClose,
  projectName,
  images,
}: GalleryImageDialogProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <>
      {/* Main Gallery Dialog */}
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
                onClick={() => {
                  setSelectedImage(img);
                  setIsImageOpen(true);
                }}
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

      {/* Zoom Image Dialog */}
      <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
        <DialogContent className="max-w-6xl p-2 bg-black">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Zoomed image"
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryImageDialog;
