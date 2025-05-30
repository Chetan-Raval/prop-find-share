
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronRight, Eye, MessageSquare, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { mockProperties } from "@/data/mockData";
import { PropertyData } from "@/components/PropertyCard";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VendorPropertiesProps {
  limit?: number;
}

const VendorProperties = ({ limit }: VendorPropertiesProps) => {
  const [filter, setFilter] = useState<string>("all");
  const properties = mockProperties.slice(0, limit || mockProperties.length);
  
  // Currency formatting function
  const formatPrice = (price: number, currency: string = "USD") => {
    const symbol = currency === "INR" ? "₹" : "$";
    if (currency === "INR") {
      return `${symbol}${price.toLocaleString('en-IN')}`;
    }
    return `${symbol}${price.toLocaleString()}`;
  };
  
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Properties</h2>
        <div className="flex items-center gap-3">
          {!limit && (
            <Select defaultValue="all" onValueChange={setFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
          
          <Button asChild className="hover-scale">
            <Link to="/dashboard/create-property">
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Link>
          </Button>
          
          {limit && (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/properties" className="text-primary">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden transition-all hover:shadow-md">
            <div className="aspect-[4/3] relative overflow-hidden">
              <img 
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <Badge className="absolute top-2 right-2 bg-primary">
                {property.type === "sale" ? "For Sale" : "For Rent"}
              </Badge>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-1">{property.title}</h3>
              <p className="text-muted-foreground text-sm mb-2 truncate">{property.location}</p>
              
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-xl">
                  {formatPrice(property.price, property.currency)}
                </span>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    124
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    8
                  </div>
                </div>
              </div>
              
              {/* Updated property details */}
              <div className="grid grid-cols-4 gap-1 text-xs text-muted-foreground mb-3">
                <div className="text-center">
                  <div className="font-medium">{property.bedrooms}</div>
                  <div>Beds</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{property.hall || 1}</div>
                  <div>Hall</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{property.floor || 1}</div>
                  <div>Floor</div>
                </div>
                <div className="text-center">
                  <div className="font-medium">{property.bathrooms}</div>
                  <div>Baths</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Manage
                </Button>
                <Button variant="ghost" size="icon" className="p-1" asChild>
                  <Link to={`/property/${property.id}`} target="_blank">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VendorProperties;
