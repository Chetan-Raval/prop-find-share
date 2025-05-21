
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties?search=${searchTerm}&type=${propertyType}`);
  };

  return (
    <div className="hero-section flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="container px-4 py-12 text-center md:py-20 lg:py-24">
        <h1 className="mb-4 text-3xl font-bold md:text-5xl lg:text-6xl">
          Find Your Perfect Property
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-base text-blue-100 md:text-lg lg:text-xl">
          Browse thousands of properties for sale and rent from trusted vendors
        </p>

        <form 
          onSubmit={handleSearch}
          className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl bg-white p-4 shadow-lg sm:p-6 md:flex-row"
        >
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search by location, keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full"
            />
          </div>
          <div className="w-full md:w-48">
            <Select
              value={propertyType}
              onValueChange={setPropertyType}
            >
              <SelectTrigger className="h-12 w-full">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="hire">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="h-12" size="lg">Search</Button>
        </form>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-xs text-blue-100 md:text-sm">
          <span>Popular Searches:</span>
          <button onClick={() => navigate("/properties?search=apartment&type=hire")} className="hover:text-white">
            Apartments for Rent
          </button>
          <button onClick={() => navigate("/properties?search=house&type=sale")} className="hover:text-white">
            Houses for Sale
          </button>
          <button onClick={() => navigate("/properties?search=luxury")} className="hover:text-white">
            Luxury Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
