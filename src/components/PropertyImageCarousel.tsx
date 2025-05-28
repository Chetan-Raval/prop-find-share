
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
      <div className={`bg-muted rounded-lg flex items-center justify-center h-96 ${className}`}>
        <div className="text-center text-muted-foreground">
          <Image className="h-12 w-12 mx-auto mb-2" />
          <p>No images available</p>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    console.log("Next image clicked, current:", currentIndex, "total:", images.length);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    console.log("Previous image clicked, current:", currentIndex, "total:", images.length);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    console.log("Going to image:", index);
    setCurrentIndex(index);
  };

  console.log("PropertyImageCarousel rendered with", images.length, "images, current index:", currentIndex);

  return (
    <Card className={`overflow-hidden relative group ${className}`}>
      {/* Main Image - Increased height */}
      <div className="relative h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-100">
        <img
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          onError={(e) => {
            console.error("Image failed to load:", images[currentIndex]);
            e.currentTarget.style.display = 'none';
          }}
          onLoad={() => {
            console.log("Image loaded successfully:", images[currentIndex]);
          }}
        />
        
        {/* Image Counter */}
        <Badge className="absolute top-3 right-3 bg-black/80 text-white border-0 shadow-lg">
          {currentIndex + 1} / {images.length}
        </Badge>

        {/* Navigation Arrows - Only show if more than 1 image */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 h-12 w-12 shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prevImage();
              }}
              type="button"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-300 h-12 w-12 shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                nextImage();
              }}
              type="button"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Navigation - Only show if more than 1 image with increased height */}
      {images.length > 1 && (
        <div className="p-4 bg-gray-50/80 border-t">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  goToImage(index);
                }}
                className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-105 ${
                  index === currentIndex 
                    ? "border-primary shadow-lg ring-2 ring-primary/20" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
                type="button"
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Thumbnail failed to load:", image);
                  }}
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
