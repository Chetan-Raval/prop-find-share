
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home as HomeIcon, Building, ArrowRight, CheckCircle, Star, Heart, Zap, Sparkles, TrendingUp } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// Lightweight Custom Cursor Component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    
    const interactiveElements = document.querySelectorAll('button, a, input, select, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-difference">
      <motion.div
        className="absolute w-6 h-6 bg-white rounded-full border-2 border-white shadow-lg"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25
        }}
      />
      
      <motion.div
        className="absolute w-1 h-1 bg-white rounded-full"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: "spring",
          stiffness: 600,
          damping: 30
        }}
      />
    </div>
  );
};

// Simplified Animated House Icon
const AnimatedHouseIcon = ({ className = "" }) => (
  <motion.div
    className={`relative ${className}`}
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className="drop-shadow-lg"
      whileHover={{ scale: 1.1 }}
    >
      <defs>
        <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
      </defs>
      
      {/* House base */}
      <rect
        x="25" y="50" width="50" height="35"
        fill="url(#houseGradient)"
        rx="5"
      />
      
      {/* Roof */}
      <polygon
        points="20,55 50,30 80,55"
        fill="url(#roofGradient)"
      />
      
      {/* Door */}
      <rect
        x="45" y="65" width="10" height="20"
        fill="#FCD34D"
        rx="5"
      />
      
      {/* Windows */}
      <circle cx="35" cy="60" r="4" fill="#FEF3C7" />
      <circle cx="65" cy="60" r="4" fill="#FEF3C7" />
    </motion.svg>
  </motion.div>
);

// Simplified Floating Arrow
const FloatingArrow = ({ delay = 0, direction = "right", color = "#3B82F6" }) => (
  <motion.div
    className="absolute"
    initial={{ opacity: 0, x: direction === "right" ? -20 : 20 }}
    animate={{
      opacity: [0, 0.7, 0],
      x: direction === "right" ? [0, 80, 160] : [0, -80, -160],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  >
    <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
      <ArrowRight className={`w-4 h-4 ${direction === "left" ? "rotate-180" : ""}`} style={{ color }} />
    </div>
  </motion.div>
);

// Simplified Interactive Orb
const InteractiveOrb = ({ size = "w-16 h-16", delay = 0, className = "", color = "#3B82F6" }) => (
  <motion.div
    className={`${size} rounded-full absolute ${className} cursor-pointer opacity-20`}
    style={{
      background: `radial-gradient(circle, ${color}, transparent)`,
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{
      duration: 4 + delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    whileHover={{
      scale: 1.3,
      opacity: 0.6,
      transition: { duration: 0.3 }
    }}
  />
);

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const swappingTexts = [
    "Dream Home",
    "Perfect Property", 
    "Ideal Space",
    "Future Investment"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties?search=${searchTerm}&type=${propertyType}`);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Simplified text animation effect
  useEffect(() => {
    const currentWord = swappingTexts[currentTextIndex];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 50);
      } else {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % swappingTexts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentTextIndex, swappingTexts]);

  return (
    <div className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <CustomCursor />
      
      {/* Lightweight Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Simplified Gradient Mesh */}
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, #3B82F6 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, #8B5CF6 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, #3B82F6 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        
        {/* Simplified Interactive Orbs */}
        <InteractiveOrb size="w-24 h-24" color="#3B82F6" delay={0} className="top-20 left-20" />
        <InteractiveOrb size="w-20 h-20" color="#8B5CF6" delay={1} className="top-40 right-32" />
        <InteractiveOrb size="w-16 h-16" color="#06B6D4" delay={2} className="bottom-40 left-32" />
        <InteractiveOrb size="w-18 h-18" color="#F59E0B" delay={1.5} className="bottom-20 right-20" />
        
        {/* Simplified Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -60, 0],
                rotate: [0, 180],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut",
              }}
            >
              {i % 4 === 0 ? <Star className="w-6 h-6 text-blue-500" /> :
               i % 4 === 1 ? <Heart className="w-5 h-5 text-purple-500" /> :
               i % 4 === 2 ? <HomeIcon className="w-5 h-5 text-cyan-500" /> :
               <Sparkles className="w-4 h-4 text-yellow-500" />}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={`container relative z-30 px-4 py-20 text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Animated House Icon */}
        <motion.div className="absolute -top-10 -right-10 md:-top-20 md:-right-20">
          <AnimatedHouseIcon />
          <FloatingArrow delay={0} direction="right" color="#3B82F6" />
          <FloatingArrow delay={1.5} direction="left" color="#8B5CF6" />
        </motion.div>

        {/* Simplified Interactive Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { Icon: HomeIcon, color: "#3B82F6" },
            { Icon: Building, color: "#8B5CF6" },
            { Icon: MapPin, color: "#06B6D4" }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-auto cursor-pointer opacity-40"
              style={{
                left: `${20 + i * 25}%`,
                top: `${20 + i * 15}%`,
              }}
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              whileHover={{ 
                scale: 1.3,
                opacity: 0.8,
                transition: { duration: 0.3 }
              }}
            >
              <div 
                className="p-3 backdrop-blur-sm rounded-full border shadow-lg bg-white/20"
                style={{
                  borderColor: item.color,
                }}
              >
                <item.Icon className="w-6 h-6" style={{ color: item.color }} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Main Heading - Fixed and User Friendly */}
          <h1 className="mb-8 text-4xl font-bold md:text-6xl lg:text-7xl text-gray-800 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Find Your{" "}
            </span>
            <br />
            <span className="relative inline-block min-w-[250px] md:min-w-[400px] lg:min-w-[500px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${currentTextIndex}-${displayText}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
                >
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    className="ml-1 border-r-2 border-blue-600 inline-block h-[0.8em] align-middle"
                  />
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p 
            className="mx-auto mb-12 max-w-2xl text-lg text-gray-600 md:text-xl font-medium"
            whileHover={{
              scale: 1.02,
            }}
          >
            Your perfect property is just a click away. Explore thousands of listings curated just for you.
          </motion.p>
        </motion.div>

        {/* Enhanced Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <form 
            onSubmit={handleSearch}
            className="mx-auto flex max-w-4xl flex-col gap-4 rounded-2xl bg-white/90 backdrop-blur-sm p-6 shadow-xl border border-white/50 md:flex-row hover:shadow-2xl transition-all duration-300"
          >
            {/* Search Input */}
            <div className="flex-1">
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                type="submit" 
                className="h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 rounded-xl shadow-lg"
                size="lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </form>
        </motion.div>
        
        {/* Popular searches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-8"
        >
          <div className="flex flex-wrap justify-center gap-3 text-sm md:text-base">
            <div className="text-gray-600 font-medium mr-2">Popular:</div>
            {[
              { text: "Apartments for Rent", search: "apartment", type: "hire", color: "#3B82F6" },
              { text: "Houses for Sale", search: "house", type: "sale", color: "#8B5CF6" },
              { text: "Luxury Properties", search: "luxury", type: "all", color: "#06B6D4" }
            ].map((item, i) => (
              <motion.button 
                key={i}
                onClick={() => navigate(`/properties?search=${item.search}&type=${item.type}`)} 
                className="flex items-center text-gray-700 hover:text-white bg-white/70 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 border border-gray-200 hover:border-transparent px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {item.text}
                <ArrowRight size={14} className="ml-1" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
