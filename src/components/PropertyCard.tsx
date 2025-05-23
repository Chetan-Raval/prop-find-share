
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Map, Bath, BedDouble, SquareCode, Heart } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export interface PropertyData {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "sale" | "hire";
  imageUrl: string;
  status?: string;
  address?: string;
}

interface PropertyCardProps {
  property: PropertyData;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card 
      className="property-card group overflow-hidden rounded-xl border shadow-sm transition-all hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="property-image h-60 w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Status badge */}
        <Badge
          className="absolute left-3 top-3 font-medium shadow-md"
          variant={property.type === "sale" ? "default" : "secondary"}
        >
          For {property.type === "sale" ? "Sale" : "Rent"}
        </Badge>
        
        {/* Favorite button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute right-3 top-3 h-8 w-8 rounded-full bg-white/90 flex items-center justify-center transition-all duration-300 hover:bg-white"
        >
          <Heart 
            className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} 
          />
        </button>

        <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
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
            ${property.price.toLocaleString()}
            {property.type === "hire" && "/month"}
          </p>
          <h3 className="mb-2 line-clamp-1 text-lg font-semibold group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <div className="mb-4 flex items-center text-sm text-muted-foreground">
            <Map className="mr-1 h-4 w-4" />
            <p className="line-clamp-1">{property.location}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 border-t pt-4 text-sm">
            <div className="flex items-center">
              <BedDouble className="mr-1 h-4 w-4 text-primary" />
              <span>{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="mr-1 h-4 w-4 text-primary" />
              <span>{property.bathrooms} baths</span>
            </div>
            <div className="flex items-center">
              <SquareCode className="mr-1 h-4 w-4 text-primary" />
              <span>{property.area} sqft</span>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
