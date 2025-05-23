
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home as HomeIcon, Building, ArrowRight, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="hero-section relative flex min-h-[700px] md:min-h-[800px] items-center justify-center overflow-hidden">
      {/* Animated background with overlay and gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/85 to-blue-900/90 z-20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80')] bg-cover bg-center z-10 animate-[pulse_15s_ease-in-out_infinite]"></div>
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-900/90 to-transparent z-30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-900/90 to-transparent z-30"></div>
      </div>

      {/* Decorative floating elements */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.15 }}
          transition={{ duration: 1, delay: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 5 }}
          className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-400 rounded-full opacity-15 blur-3xl"
        ></motion.div>
        <motion.div 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 0.1 }}
          transition={{ duration: 1.5, delay: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 7 }}
          className="absolute -top-40 -right-20 w-96 h-96 bg-indigo-500 rounded-full opacity-10 blur-3xl"
        ></motion.div>
      </div>

      <div 
        className={`container relative z-30 px-4 py-20 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="mb-6 text-4xl font-bold md:text-6xl lg:text-7xl text-white drop-shadow-lg">
            Find Your <span className="text-blue-300">Dream Home</span>
          </h1>
          <p className="mx-auto mb-12 max-w-2xl text-lg text-blue-100 md:text-xl lg:text-2xl">
            Your perfect property is just a click away. Explore thousands of listings curated just for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Stats above search */}
          <div className="mx-auto mb-10 flex max-w-3xl justify-center gap-8 text-white">
            <div className="flex flex-col items-center">
              <p className="text-2xl md:text-3xl font-bold text-white">5,000+</p>
              <p className="text-sm md:text-base text-blue-200">Properties</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl md:text-3xl font-bold text-white">3,200+</p>
              <p className="text-sm md:text-base text-blue-200">Happy Clients</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-2xl md:text-3xl font-bold text-white">1,500+</p>
              <p className="text-sm md:text-base text-blue-200">Cities</p>
            </div>
          </div>

          {/* Search form with glass effect */}
          <form 
            onSubmit={handleSearch}
            className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl bg-white/10 backdrop-blur-lg p-8 shadow-2xl border border-white/20 sm:p-8 md:flex-row hover:bg-white/15 transition-all duration-300"
          >
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search by location, keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-14 w-full pl-12 bg-white/80 backdrop-blur-sm text-lg border-0 shadow-inner"
              />
              <Search className="absolute left-4 top-4 h-6 w-6 text-primary" />
            </div>
            <div className="w-full md:w-56">
              <Select
                value={propertyType}
                onValueChange={setPropertyType}
              >
                <SelectTrigger className="h-14 w-full bg-white/80 backdrop-blur-sm text-lg border-0 shadow-inner">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="hire">For Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="h-14 bg-primary hover:bg-blue-600 transition-all duration-300 hover:scale-105 text-lg shadow-lg shadow-blue-900/20" size="lg">
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </form>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12"
        >
          {/* Features list */}
          <div className="mb-10 flex flex-wrap justify-center gap-3 text-sm text-white md:text-base">
            {["Verified Properties", "No Hidden Fees", "Top Locations", "Support 24/7"].map((item, i) => (
              <div key={i} className="flex items-center bg-white/10 px-4 py-2 rounded-full">
                <CheckCircle size={16} className="mr-2 text-blue-300" />
                {item}
              </div>
            ))}
          </div>

          {/* Popular searches */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-blue-100 md:text-base">
            <div className="popular-searches-title mr-2 text-white font-medium">Popular:</div>
            <button 
              onClick={() => navigate("/properties?search=apartment&type=hire")} 
              className="flex items-center hover:text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <Building size={16} className="mr-2" />
              Apartments for Rent
            </button>
            <button 
              onClick={() => navigate("/properties?search=house&type=sale")} 
              className="flex items-center hover:text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <HomeIcon size={16} className="mr-2" />
              Houses for Sale
            </button>
            <button 
              onClick={() => navigate("/properties?search=luxury")} 
              className="flex items-center hover:text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <MapPin size={16} className="mr-2" />
              Luxury Properties
            </button>
          </div>
          
          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => navigate("/properties?type=sale")} 
              variant="secondary"
              size="lg" 
              className="group text-lg px-6 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Browse Properties
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button 
              onClick={() => navigate("/register")} 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/20 hover:text-white text-lg px-6 hover:scale-105 transition-all duration-300"
            >
              List Your Property
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-30">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-[60px] w-full">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.2,141.14,329.17,141.14,404.67,91.45,521.39,56.44Z" 
                className="fill-background"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;
