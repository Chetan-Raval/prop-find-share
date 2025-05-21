
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home as HomeIcon } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [isVisible, setIsVisible] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties?search=${searchTerm}&type=${propertyType}`);
  };

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="hero-section relative flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-400 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-purple-400 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div 
        className={`container px-4 py-16 text-center md:py-24 lg:py-28 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="mb-6 text-3xl font-bold md:text-5xl lg:text-6xl text-white drop-shadow-lg">
          Find Your <span className="text-blue-300">Dream Property</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base text-blue-100 md:text-lg lg:text-xl">
          Browse thousands of properties for sale and rent from trusted vendors across the country
        </p>

        <form 
          onSubmit={handleSearch}
          className="mx-auto flex max-w-3xl flex-col gap-4 rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20 sm:p-6 md:flex-row scale-in"
        >
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search by location, keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 w-full pl-10 bg-white/80 backdrop-blur-sm"
            />
            <Search className="absolute left-3 top-3 h-6 w-6 text-muted-foreground" />
          </div>
          <div className="w-full md:w-48">
            <Select
              value={propertyType}
              onValueChange={setPropertyType}
            >
              <SelectTrigger className="h-12 w-full bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="hire">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="h-12 bg-primary hover:bg-blue-700 transition-all duration-300 hover:scale-105" size="lg">
            Search
          </Button>
        </form>
        
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-blue-100 md:text-base">
          <div className="popular-searches-title mr-2 text-white font-medium">Popular:</div>
          <button 
            onClick={() => navigate("/properties?search=apartment&type=hire")} 
            className="flex items-center hover:text-white bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            <HomeIcon size={14} className="mr-1" />
            Apartments for Rent
          </button>
          <button 
            onClick={() => navigate("/properties?search=house&type=sale")} 
            className="flex items-center hover:text-white bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            <MapPin size={14} className="mr-1" />
            Houses for Sale
          </button>
          <button 
            onClick={() => navigate("/properties?search=luxury")} 
            className="flex items-center hover:text-white bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-all duration-300"
          >
            <HomeIcon size={14} className="mr-1" />
            Luxury Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
