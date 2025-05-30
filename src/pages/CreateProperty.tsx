
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import ImageUpload from "@/components/ImageUpload";

const CreateProperty = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    currency: "USD",
    type: "sale",
    bedrooms: "",
    bathrooms: "",
    hall: "",
    floor: "",
    location: "",
  });
  
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Check if user is a vendor
  if (user?.role !== "vendor") {
    navigate("/dashboard");
    return null;
  }
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form data
      if (
        !formData.title ||
        !formData.price ||
        !formData.location ||
        !formData.bedrooms ||
        !formData.bathrooms ||
        !formData.hall ||
        !formData.floor
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      // Validate images
      if (images.length === 0) {
        toast.error("Please upload at least one property image");
        return;
      }
      
      // Simulate API delay for image upload and property creation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      console.log("Property data:", formData);
      console.log("Images to upload:", images.length);
      
      toast.success(`Property listing created successfully with ${images.length} image(s)!`);
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create property listing");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-2 text-3xl font-bold">Create Property Listing</h1>
        <p className="text-muted-foreground">
          Fill out the form below to list your property
        </p>
      </div>
      
      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Details */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Basic Details</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Modern Apartment in City Center"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="123 Main St, City, State"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <div className="flex gap-2">
                  <Select
                    value={formData.currency}
                    onValueChange={(value) => handleSelectChange("currency", value)}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="350000"
                    className="flex-1"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Listing Type *</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleSelectChange("type", value)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="hire">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your property in detail..."
                className="min-h-32"
              />
            </div>
          </div>
          
          {/* Property Features */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Property Features</h2>
            
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms *</Label>
                <Select
                  value={formData.bedrooms}
                  onValueChange={(value) => handleSelectChange("bedrooms", value)}
                >
                  <SelectTrigger id="bedrooms">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hall">Hall *</Label>
                <Select
                  value={formData.hall}
                  onValueChange={(value) => handleSelectChange("hall", value)}
                >
                  <SelectTrigger id="hall">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="floor">Floor *</Label>
                <Select
                  value={formData.floor}
                  onValueChange={(value) => handleSelectChange("floor", value)}
                >
                  <SelectTrigger id="floor">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms *</Label>
                <Select
                  value={formData.bathrooms}
                  onValueChange={(value) => handleSelectChange("bathrooms", value)}
                >
                  <SelectTrigger id="bathrooms">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Images */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Property Images</h2>
            <ImageUpload 
              images={images} 
              onImagesChange={setImages}
              maxImages={5}
            />
          </div>
          
          {/* Submit */}
          <div className="flex items-center justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Listing"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateProperty;
