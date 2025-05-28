
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Image } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyImageCarouselProps {
  images: string[];
  title: string;
  className?: string;
}

const PropertyImageCarousel = ({ images, title, className = "" }: PropertyImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={`bg-muted rounded-lg flex items-center justify-center h-60 ${className}`}>
        <div className="text-center text-muted-foreground">
          <Image className="h-12 w-12 mx-auto mb-2" />
          <p>No images available</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Card className={`overflow-hidden relative group ${className}`}>
      {/* Main Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Image Counter */}
        <Badge className="absolute top-3 right-3 bg-black/70 text-white">
          {currentIndex + 1} / {images.length}
        </Badge>

        {/* Navigation Arrows - Only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation - Only show if more than 1 image */}
      {images.length > 1 && (
        <div className="p-3 bg-muted/50">
          <div className="flex gap-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={`flex-shrink-0 w-12 h-12 rounded-md overflow-hidden border-2 transition-all ${
                  index === currentIndex 
                    ? "border-primary shadow-md" 
                    : "border-transparent hover:border-muted-foreground"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default PropertyImageCarousel;
