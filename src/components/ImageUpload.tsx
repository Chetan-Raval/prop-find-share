
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, X, Image } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  images: File[];
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
}

const ImageUpload = ({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      addImages(newFiles);
    }
  };

  const addImages = (newFiles: File[]) => {
    const totalImages = images.length + newFiles.length;
    
    if (totalImages > maxImages) {
      toast.error(`You can only upload up to ${maxImages} images`);
      return;
    }

    // Validate file types
    const validFiles = newFiles.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not a valid image file`);
        return false;
      }
      return true;
    });

    onImagesChange([...images, ...validFiles]);
    toast.success(`${validFiles.length} image(s) added successfully`);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
    toast.success("Image removed");
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files);
      addImages(newFiles);
    }
  };

  return (
    <div className="space-y-4">
      <Label>Property Images (Max {maxImages})</Label>
      
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 transition-all ${
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        } ${images.length >= maxImages ? "opacity-50 pointer-events-none" : "cursor-pointer hover:border-primary"}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={images.length >= maxImages}
        />
        
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <div className="mt-2">
            <p className="text-sm font-medium">
              {images.length >= maxImages ? "Maximum images reached" : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG, GIF up to 10MB each ({images.length}/{maxImages})
            </p>
          </div>
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {images.map((image, index) => (
            <Card key={index} className="relative group overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={() => removeImage(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                    Main
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Image className="mx-auto h-12 w-12 mb-2" />
          <p>No images uploaded yet</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
