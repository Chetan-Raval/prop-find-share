
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
}

interface PropertyCardProps {
  property: PropertyData;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <Link to={`/property/${property.id}`}>
      <Card className="overflow-hidden transition-shadow hover:shadow-lg">
        <div className="relative">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="property-image h-48 w-full"
          />
          <Badge
            className="absolute right-2 top-2"
            variant={property.type === "sale" ? "default" : "secondary"}
          >
            For {property.type === "sale" ? "Sale" : "Rent"}
          </Badge>
        </div>
        <CardContent className="pt-4">
          <h3 className="mb-1 line-clamp-1 text-lg font-semibold">{property.title}</h3>
          <p className="text-xl font-bold text-primary">
            ${property.price.toLocaleString()}
            {property.type === "hire" && "/month"}
          </p>
          <p className="mb-2 text-sm text-muted-foreground">{property.location}</p>
          <div className="flex justify-between text-sm">
            <span>{property.bedrooms} beds</span>
            <span>{property.bathrooms} baths</span>
            <span>{property.area} sqft</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertyCard;
