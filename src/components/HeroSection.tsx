
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
    <div className="hero-section flex items-center justify-center">
      <div className="container px-4 py-16 text-center md:py-24">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
          Find Your Perfect Property
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-blue-100 md:text-xl">
          Browse thousands of properties for sale and rent from trusted vendors
        </p>

        <form 
          onSubmit={handleSearch}
          className="mx-auto flex max-w-3xl flex-col gap-4 rounded-lg bg-white p-4 shadow-lg md:flex-row"
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
          <Button type="submit" className="h-12">Search</Button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
