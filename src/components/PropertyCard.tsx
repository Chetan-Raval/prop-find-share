
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, Bath, BedDouble, Home, Building, Heart } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import PropertyImageCarousel from "./PropertyImageCarousel";

export interface PropertyData {
  id: string;
  title: string;
  price: number;
  currency?: "USD" | "INR";
  location: string;
  bedrooms: number;
  bathrooms: number;
  area?: number; // Keep for backward compatibility
  hall?: number; // New field
  floor?: number; // New field
  type: "sale" | "hire";
  imageUrl: string;
  images?: string[];
  status?: string;
  address?: string;
}

interface PropertyCardProps {
  property: PropertyData;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Use images array if available, otherwise fallback to single imageUrl
  const propertyImages = property.images && property.images.length > 0 
    ? property.images 
    : [property.imageUrl];

  // Currency formatting
  const getCurrencySymbol = (currency: string = "USD") => {
    return currency === "INR" ? "₹" : "$";
  };

  const formatPrice = (price: number, currency: string = "USD") => {
    const symbol = getCurrencySymbol(currency);
    if (currency === "INR") {
      // Format Indian currency with proper comma placement
      return `${symbol}${price.toLocaleString('en-IN')}`;
    }
    return `${symbol}${price.toLocaleString()}`;
  };

  return (
    <Card 
      className="property-card group overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <PropertyImageCarousel 
          images={propertyImages}
          title={property.title}
          className="border-none shadow-none"
          variant="default"
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        {/* Status badge - positioned at top left */}
        <Badge
          className="absolute left-3 top-3 font-medium shadow-md z-10"
          variant={property.type === "sale" ? "default" : "secondary"}
        >
          For {property.type === "sale" ? "Sale" : "Rent"}
        </Badge>
        
        {/* Favorite button - positioned at top right */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center transition-all duration-300 hover:bg-white z-10"
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} 
          />
        </button>

        <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-10">
          <Link
            to={`/property/${property.id}`}
            className="inline-block w-full bg-primary hover:bg-primary/90 text-white text-center py-2 rounded-full shadow-lg"
          >
            View Details
          </Link>
        </div>
      </div>
      
      <CardContent className="p-5">
        <motion.div
          animate={{ y: isHovered ? -8 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="mb-1 text-xl font-bold text-primary">
            {formatPrice(property.price, property.currency)}
            {property.type === "hire" && "/month"}
          </p>
          <h3 className="mb-2 line-clamp-1 text-lg font-semibold group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <div className="mb-4 flex items-center text-sm text-muted-foreground">
            <Map className="mr-1 h-4 w-4" />
            <p className="line-clamp-1">{property.location}</p>
          </div>
          <div className="grid grid-cols-4 gap-2 border-t pt-4 text-sm">
            <div className="flex items-center">
              <BedDouble className="mr-1 h-4 w-4 text-primary" />
              <span>{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <Home className="mr-1 h-4 w-4 text-primary" />
              <span>{property.hall || 1} hall</span>
            </div>
            <div className="flex items-center">
              <Building className="mr-1 h-4 w-4 text-primary" />
              <span>{property.floor || 1} floor</span>
            </div>
            <div className="flex items-center">
              <Bath className="mr-1 h-4 w-4 text-primary" />
              <span>{property.bathrooms} baths</span>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
