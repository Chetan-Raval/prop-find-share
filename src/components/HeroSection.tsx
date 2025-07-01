
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowRight, MapPin, Star } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);

  const titles = [
    "Dream Home",
    "Perfect Property", 
    "Ideal Space",
    "Next Investment",
    "Future Home"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties?search=${searchTerm}&type=${propertyType}`);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <div className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden">
      
      {/* Enhanced Modern Background */}
      <div className="absolute inset-0 z-0">
        {/* Rich gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
        
        {/* Animated glowing orbs */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        {/* Enhanced geometric patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-blue-500/20 to-transparent" 
               style={{
                 backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)',
                 backgroundSize: '50px 50px'
               }} />
        </div>
        
        {/* Elegant curved overlays */}
        <svg className="absolute top-0 right-0 w-full h-full opacity-30" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <path d="M1200,200 Q1400,400 1600,200 T1920,400 L1920,0 L1200,0 Z" fill="url(#gradient1)" />
          <path d="M1000,600 Q1200,800 1400,600 T1800,800 L1920,800 L1920,400 L1000,400 Z" fill="url(#gradient2)" />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
              <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(6, 182, 212, 0.3)" />
              <stop offset="100%" stopColor="rgba(59, 130, 246, 0.2)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Content */}
      <div className={`container relative z-30 px-4 py-20 text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        <div className="opacity-100 translate-y-0 transition-opacity duration-1000 delay-300">
          {/* Premium Badge */}
          <div className="inline-flex items-center mb-8 px-6 py-3 bg-white/15 backdrop-blur-md border border-white/30 rounded-full text-white text-sm font-medium shadow-lg">
            <MapPin className="w-4 h-4 mr-2 text-cyan-300" />
            Since 2015 - Your Trusted Property Partner
          </div>

          {/* Enhanced Main Heading with Perfect Text Animation */}
          <h1 className="mb-8 text-4xl font-bold md:text-6xl lg:text-7xl text-white leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
              Find Your{" "}
            </span>
            <br />
            <div className="relative inline-block h-[1.3em] overflow-hidden mt-2">
              {titles.map((title, index) => (
                <span 
                  key={index}
                  className={`absolute inset-0 bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent font-bold transition-all duration-1000 ease-in-out transform ${
                    index === currentTitleIndex 
                      ? 'opacity-100 translate-y-0' 
                      : index < currentTitleIndex
                        ? 'opacity-0 -translate-y-full'
                        : 'opacity-0 translate-y-full'
                  }`}
                  style={{
                    transitionDelay: index === currentTitleIndex ? '200ms' : '0ms'
                  }}
                >
                  {title}
                </span>
              ))}
            </div>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="mx-auto mb-12 max-w-2xl text-lg text-blue-100/90 md:text-xl font-medium leading-relaxed">
            We craft exceptional property experiences, and our clients create success stories.
            <br />
            <span className="text-cyan-200 font-semibold">Hear from our satisfied clients</span>
          </p>

          {/* Enhanced Stats/Reviews Bar */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-16 p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl max-w-4xl mx-auto shadow-2xl">
            {[
              { platform: "PropertyHub", rating: "4.9", reviews: "2,100+ REVIEWS" },
              { platform: "Google", rating: "4.8", reviews: "1,850+ REVIEWS" },
              { platform: "Trustpilot", rating: "4.9", reviews: "3,200+ REVIEWS" }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-3 text-white">
                <div className="flex items-center">
                  <span className="font-bold text-xl text-cyan-200">{item.rating}</span>
                  <div className="flex ml-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-blue-100">
                  <div className="font-semibold">{item.platform}</div>
                  <div className="text-xs opacity-90">{item.reviews}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Search Form */}
        <div className="opacity-100 translate-y-0 transition-opacity duration-800 delay-800">
          <form 
            onSubmit={handleSearch}
            className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl bg-white/95 backdrop-blur-lg p-6 shadow-2xl border border-white/30 md:flex-row hover:shadow-3xl transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Search Input */}
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Search by location, property type, or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 w-full pl-12 bg-white text-lg border-gray-200 text-gray-800 placeholder:text-gray-500 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
              />
              <Search className="absolute left-4 top-3 h-6 w-6 text-blue-500" />
            </div>
            
            {/* Property Type Select */}
            <div className="w-full md:w-48">
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="h-12 w-full bg-white text-lg border-gray-200 text-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="hire">For Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Enhanced Search Button */}
            <Button 
              type="submit" 
              className="h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
              size="lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Search Properties
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </div>
        
        {/* Enhanced Popular searches */}
        <div className="opacity-100 translate-y-0 transition-opacity duration-800 delay-1000 mt-8">
          <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base">
            <div className="text-blue-200 font-medium mr-2">Popular Searches:</div>
            {[
              { text: "Luxury Apartments", search: "luxury apartment", type: "hire" },
              { text: "Family Houses", search: "family house", type: "sale" },
              { text: "Downtown Properties", search: "downtown", type: "all" },
              { text: "Investment Properties", search: "investment", type: "sale" }
            ].map((item, i) => (
              <button 
                key={i}
                onClick={() => navigate(`/properties?search=${item.search}&type=${item.type}`)} 
                className="flex items-center text-white hover:text-cyan-200 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 hover:border-cyan-300/50 px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
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
