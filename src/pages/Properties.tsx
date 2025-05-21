
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PropertyCard, { PropertyData } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { mockProperties } from "@/data/mockData";

const Properties = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get("type") || "all";
  const initialSearch = searchParams.get("search") || "";
  
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<PropertyData[]>([]);
  
  // Filter states
  const [propertyType, setPropertyType] = useState(initialType);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [bedrooms, setBedrooms] = useState("any");
  const [bathrooms, setBathrooms] = useState("any");
  
  useEffect(() => {
    // In a real app, this would be an API call
    setProperties(mockProperties);
  }, []);
  
  useEffect(() => {
    let filtered = [...properties];
    
    // Filter by type
    if (propertyType !== "all") {
      filtered = filtered.filter(prop => prop.type === propertyType);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        prop => 
          prop.title.toLowerCase().includes(term) || 
          prop.location.toLowerCase().includes(term)
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(
      prop => prop.price >= priceRange[0] && prop.price <= priceRange[1]
    );
    
    // Filter by bedrooms
    if (bedrooms !== "any") {
      filtered = filtered.filter(prop => prop.bedrooms === parseInt(bedrooms));
    }
    
    // Filter by bathrooms
    if (bathrooms !== "any") {
      filtered = filtered.filter(prop => prop.bathrooms === parseInt(bathrooms));
    }
    
    setFilteredProperties(filtered);
  }, [properties, propertyType, searchTerm, priceRange, bedrooms, bathrooms]);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Browse Properties</h1>
        <p className="text-muted-foreground">
          Find the perfect property for your needs
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Filters sidebar */}
        <div className="space-y-6 rounded-lg border bg-card p-4 shadow-sm">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Filters</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <Input
                  id="search"
                  placeholder="Location or keyword"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select
                  value={propertyType}
                  onValueChange={setPropertyType}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Properties</SelectItem>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="hire">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="pt-6">
                  <Slider
                    defaultValue={[0, 5000000]}
                    max={5000000}
                    step={50000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="mt-2 flex justify-between text-sm">
                    <span>${priceRange[0].toLocaleString()}</span>
                    <span>${priceRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Select
                  value={bedrooms}
                  onValueChange={setBedrooms}
                >
                  <SelectTrigger id="bedrooms">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Select
                  value={bathrooms}
                  onValueChange={setBathrooms}
                >
                  <SelectTrigger id="bathrooms">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                className="w-full"
                onClick={() => {
                  setSearchTerm("");
                  setPropertyType("all");
                  setPriceRange([0, 5000000]);
                  setBedrooms("any");
                  setBathrooms("any");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
        
        {/* Property grid */}
        <div className="lg:col-span-3">
          {filteredProperties.length > 0 ? (
            <>
              <p className="mb-4 text-muted-foreground">
                Showing {filteredProperties.length} properties
              </p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-48 items-center justify-center rounded-lg border bg-card shadow-sm">
              <p className="text-muted-foreground">
                No properties match your search criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
