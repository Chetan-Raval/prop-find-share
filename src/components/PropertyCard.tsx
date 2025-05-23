import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Map, Bath, BedDouble, SquareCode } from "lucide-react";

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
  status?: string; // Added status property
  address?: string; // Added address property
}

interface PropertyCardProps {
  property: PropertyData;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link to={`/property/${property.id}`}>
      <Card className="property-card group overflow-hidden rounded-xl border-0 bg-card shadow-sm transition-all hover:shadow-md">
        <div className="relative overflow-hidden">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="property-image h-52 w-full"
          />
          <Badge
            className="absolute right-3 top-3 font-medium"
            variant={property.type === "sale" ? "default" : "secondary"}
          >
            For {property.type === "sale" ? "Sale" : "Rent"}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-1 line-clamp-1 text-lg font-semibold group-hover:text-primary transition-colors">{property.title}</h3>
          <p className="mb-1 text-xl font-bold text-primary">
            ${property.price.toLocaleString()}
            {property.type === "hire" && "/month"}
          </p>
          <div className="mb-3 flex items-center text-sm text-muted-foreground">
            <Map className="mr-1 h-4 w-4" />
            <p className="line-clamp-1">{property.location}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 border-t pt-3 text-sm">
            <div className="flex items-center">
              <BedDouble className="mr-1 h-4 w-4 text-muted-foreground" />
              <span>{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="mr-1 h-4 w-4 text-muted-foreground" />
              <span>{property.bathrooms} baths</span>
            </div>
            <div className="flex items-center">
              <SquareCode className="mr-1 h-4 w-4 text-muted-foreground" />
              <span>{property.area} sqft</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
