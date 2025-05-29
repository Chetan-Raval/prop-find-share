import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import PropertyFeatures from "@/components/PropertyFeatures";
import MessageForm from "@/components/MessageForm";
import PropertyImageCarousel from "@/components/PropertyImageCarousel";
import { mockProperties } from "@/data/mockData";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Phone, Share, Heart, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { PropertyData } from "@/components/PropertyCard";
import { Link } from "react-router-dom";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundProperty = mockProperties.find(p => p.id === id);
    
    // Simulate API delay
    setTimeout(() => {
      setProperty(foundProperty || null);
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <div className="container flex h-96 items-center justify-center py-8">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p>Loading property details...</p>
        </div>
      </div>
    );
  }
  
  if (!property) {
    return (
      <div className="container py-8">
        <div className="rounded-lg border bg-card p-8 text-center shadow-sm">
          <h1 className="mb-4 text-2xl font-bold">Property Not Found</h1>
          <p className="mb-4">The property you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <a href="/properties">Browse Other Properties</a>
          </Button>
        </div>
      </div>
    );
  }
  
  const handleSaveProperty = () => {
    if (!user) {
      toast.error("Please log in to save properties");
      return;
    }
    
    setIsSaved(prev => !prev);
    
    if (!isSaved) {
      toast.success("Property saved to favorites!");
    } else {
      toast.success("Property removed from favorites");
    }
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };
  
  const handleCallVendor = () => {
    if (!user) {
      toast.error("Please log in to contact vendors");
      return;
    }
    
    // In a real app, this would show the vendor's number or initiate a call
    toast.success("Connecting you to the vendor...");
  };

  // Use images array if available, otherwise fallback to single imageUrl
  const propertyImages = property.images && property.images.length > 0 
    ? property.images 
    : [property.imageUrl];
  
  return (
    <div className="container py-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-1 text-3xl font-bold">{property.title}</h1>
          <p className="text-lg text-muted-foreground">{property.location}</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-primary">
            ${property.price.toLocaleString()}
            {property.type === "hire" && "/month"}
          </p>
          <Badge className="ml-2">{property.type === "sale" ? "For Sale" : "For Rent"}</Badge>
        </div>
      </div>
      
      {/* Property images carousel with detail variant for larger height */}
      <div className="mb-8">
        <PropertyImageCarousel 
          images={propertyImages}
          title={property.title}
          variant="detail"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Property details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="details">
            <TabsList className="mb-6">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-6">
              <div>
                <h2 className="mb-4 text-2xl font-semibold">Property Details</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="rounded-md bg-secondary p-4 text-center">
                    <p className="text-sm text-muted-foreground">Bedrooms</p>
                    <p className="text-lg font-semibold">{property.bedrooms}</p>
                  </div>
                  <div className="rounded-md bg-secondary p-4 text-center">
                    <p className="text-sm text-muted-foreground">Bathrooms</p>
                    <p className="text-lg font-semibold">{property.bathrooms}</p>
                  </div>
                  <div className="rounded-md bg-secondary p-4 text-center">
                    <p className="text-sm text-muted-foreground">Area</p>
                    <p className="text-lg font-semibold">{property.area} sqft</p>
                  </div>
                  <div className="rounded-md bg-secondary p-4 text-center">
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="text-lg font-semibold capitalize">{property.type}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="mb-2 text-xl font-semibold">Description</h3>
                <p className="text-muted-foreground">
                  This beautiful property offers comfortable living in a prime location. 
                  The spacious interior features modern amenities and plenty of natural light.
                  Perfect for families or professionals looking for a high-quality home in a 
                  desirable neighborhood with excellent schools and amenities nearby.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="features">
              <h2 className="mb-4 text-2xl font-semibold">Property Features</h2>
              <PropertyFeatures 
                features={[
                  "Air Conditioning",
                  "Central Heating",
                  "Fully Furnished",
                  "Garden",
                  "High-Speed Internet",
                  "Modern Kitchen",
                  "Parking Space",
                  "Security System",
                  "Swimming Pool",
                  "Wheelchair Accessible"
                ]}
              />
            </TabsContent>
            
            <TabsContent value="location">
              <h2 className="mb-4 text-2xl font-semibold">Location</h2>
              <div className="h-96 rounded-md bg-muted">
                <div className="flex h-full items-center justify-center">
                  <p className="text-muted-foreground">Map would be displayed here</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Contact sidebar */}
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-xl font-semibold">Contact Vendor</h3>
            
            <div className="space-y-4">
              <Button 
                className="w-full gap-2"
                onClick={handleCallVendor}
              >
                <Phone className="h-4 w-4" />
                Call Vendor
              </Button>
              
              <Button 
                asChild
                variant="outline"
                className="w-full gap-2"
              >
                <Link to="/dashboard/messages">
                  <MessageSquare className="h-4 w-4" />
                  Open Chat
                </Link>
              </Button>
              
              <Separator />
              
              <MessageForm recipientId="vendor123" propertyId={property.id} />
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={handleSaveProperty}
            >
              <Heart className={`h-4 w-4 ${isSaved ? "fill-current text-red-500" : ""}`} />
              {isSaved ? "Saved" : "Save"}
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 gap-2"
              onClick={handleShare}
            >
              <Share className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
