
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowRight } from "lucide-react";

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
    setIsVisible(true);
  }, []);

  return (
    <div className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      {/* Simple Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-blue-100/50 to-purple-100/50" />
      </div>

      {/* Main Content */}
      <div className={`container relative z-30 px-4 py-20 text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        <div className="opacity-100 translate-y-0 transition-opacity duration-1000 delay-300">
          {/* Main Heading - Simple and Clean */}
          <h1 className="mb-8 text-4xl font-bold md:text-6xl lg:text-7xl text-gray-800 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Find Your{" "}
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Dream Home
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-600 md:text-xl font-medium">
            Your perfect property is just a click away. Explore thousands of listings curated just for you.
          </p>
        </div>

        {/* Search Form - Simple Design */}
        <div className="opacity-100 translate-y-0 transition-opacity duration-800 delay-800">
          <form 
            onSubmit={handleSearch}
            className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-xl border border-white/50 md:flex-row hover:shadow-2xl transition-all duration-300"
          >
            {/* Search Input */}
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search by location, keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 w-full pl-12 bg-white text-lg border-gray-200 text-gray-800 placeholder:text-gray-500 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-4 top-3 h-6 w-6 text-blue-500" />
            </div>
            
            {/* Property Type Select */}
            <div className="w-full md:w-48">
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="h-12 w-full bg-white text-lg border-gray-200 text-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="hire">For Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Search Button */}
            <Button 
              type="submit" 
              className="h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              size="lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Search
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
        
        {/* Popular searches - Simple */}
        <div className="opacity-100 translate-y-0 transition-opacity duration-800 delay-900 mt-8">
          <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base">
            <div className="text-gray-600 font-medium mr-2">Popular:</div>
            {[
              { text: "Apartments for Rent", search: "apartment", type: "hire" },
              { text: "Houses for Sale", search: "house", type: "sale" },
              { text: "Luxury Properties", search: "luxury", type: "all" }
            ].map((item, i) => (
              <button 
                key={i}
                onClick={() => navigate(`/properties?search=${item.search}&type=${item.type}`)} 
                className="flex items-center text-gray-700 hover:text-white bg-white/70 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 border border-gray-200 hover:border-transparent px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
              >
                {item.text}
                <ArrowRight size={14} className="ml-1" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
