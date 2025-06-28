
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home as HomeIcon, Building, ArrowRight, CheckCircle, Star, Heart, Zap, Sparkles, TrendingUp } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// Custom Cursor Component
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.addEventListener('mousemove', handleMouseMove);
    
    // Add hover listeners to interactive elements
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
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <motion.div
        className="absolute w-8 h-8 mix-blend-difference"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28
        }}
      >
        <div className="w-full h-full bg-white rounded-full border-2 border-white shadow-lg" />
      </motion.div>
      
      <motion.div
        className="absolute w-2 h-2"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        transition={{
          type: "spring",
          stiffness: 800,
          damping: 35
        }}
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>
    </div>
  );
};

// Animated SVG Icons with better colors
const AnimatedHouseIcon = ({ className = "" }) => (
  <motion.div
    className={`relative ${className}`}
    animate={{
      y: [0, -15, 0],
      rotateY: [0, 20, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <motion.svg
      width="140"
      height="140"
      viewBox="0 0 140 140"
      className="drop-shadow-2xl filter"
      whileHover={{ scale: 1.2, rotateZ: 10 }}
    >
      <defs>
        <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="50%" stopColor="#4ECDC4" />
          <stop offset="100%" stopColor="#45B7D1" />
        </linearGradient>
        <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8E53" />
          <stop offset="100%" stopColor="#FF6B6B" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* House base */}
      <motion.rect
        x="35" y="65" width="70" height="50"
        fill="url(#houseGradient)"
        rx="10"
        filter="url(#glow)"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Roof */}
      <motion.polygon
        points="30,70 70,40 110,70"
        fill="url(#roofGradient)"
        filter="url(#glow)"
        animate={{
          rotateZ: [0, 3, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Door */}
      <motion.rect
        x="60" y="85" width="20" height="30"
        fill="#FFA726"
        rx="10"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
      
      {/* Windows */}
      <motion.circle
        cx="50" cy="75" r="7"
        fill="#FFE082"
        animate={{
          opacity: [0.8, 1, 0.8],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.circle
        cx="90" cy="75" r="7"
        fill="#FFE082"
        animate={{
          opacity: [1, 0.8, 1],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 1 }}
      />
      
      {/* Animated Hearts floating around */}
      <motion.g>
        <motion.path
          d="M45,50 C45,45 40,45 40,50 C40,45 35,45 35,50 C35,55 40,60 45,60 C50,55 50,50 45,50 Z"
          fill="#FF69B4"
          animate={{
            y: [0, -20, -40],
            opacity: [1, 0.7, 0],
            scale: [1, 1.3, 1.8],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0 }}
        />
        <motion.path
          d="M95,45 C95,40 90,40 90,45 C90,40 85,40 85,45 C85,50 90,55 95,55 C100,50 100,45 95,45 Z"
          fill="#FF1493"
          animate={{
            y: [0, -25, -50],
            opacity: [1, 0.5, 0],
            scale: [1, 1.5, 2],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
      </motion.g>
    </motion.svg>
  </motion.div>
);

// Interactive Floating Arrow with better colors
const FloatingArrow = ({ delay = 0, direction = "right", color = "#00D4AA" }) => (
  <motion.div
    className="absolute"
    initial={{ opacity: 0, x: direction === "right" ? -30 : 30 }}
    animate={{
      opacity: [0, 1, 0],
      x: direction === "right" ? [0, 120, 240] : [0, -120, -240],
      y: [0, -15, 0],
      rotate: [0, 360, 720],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  >
    <div className="p-2 rounded-full" style={{ backgroundColor: color + '20', border: `2px solid ${color}` }}>
      <ArrowRight className={`w-6 h-6 ${direction === "left" ? "rotate-180" : ""}`} style={{ color }} />
    </div>
  </motion.div>
);

// Enhanced Interactive Orb with vibrant colors
const InteractiveOrb = ({ size = "w-24 h-24", delay = 0, className = "", colors = ["#FF6B6B", "#4ECDC4", "#45B7D1"] }) => (
  <motion.div
    className={`${size} rounded-full absolute ${className} cursor-pointer`}
    style={{
      background: `radial-gradient(circle, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
      boxShadow: `0 0 20px ${colors[0]}40`,
    }}
    animate={{
      scale: [1, 1.6, 1],
      opacity: [0.4, 0.9, 0.4],
      x: [0, 60, 0],
      y: [0, -40, 0],
    }}
    transition={{
      duration: 5 + delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    whileHover={{
      scale: 2.2,
      opacity: 1,
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
    "Future Investment",
    "New Beginning"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/properties?search=${searchTerm}&type=${propertyType}`);
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Text animation effect
  useEffect(() => {
    const currentWord = swappingTexts[currentTextIndex];
    let timeoutId;

    if (isTyping) {
      if (displayText.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 150 + Math.random() * 100);
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 75 + Math.random() * 50);
      } else {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % swappingTexts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentTextIndex, swappingTexts]);

  return (
    <div className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden">
      <CustomCursor />
      
      {/* Ultra Dynamic Animated Background with vibrant colors */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic Gradient Mesh */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, #FF6B6B 0%, transparent 50%), radial-gradient(circle at 80% 80%, #4ECDC4 0%, transparent 50%), radial-gradient(circle at 40% 40%, #45B7D1 0%, transparent 50%)",
              "radial-gradient(circle at 60% 20%, #26D0CE 0%, transparent 50%), radial-gradient(circle at 20% 80%, #FF8A65 0%, transparent 50%), radial-gradient(circle at 80% 40%, #AB47BC 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, #FF6B6B 0%, transparent 50%), radial-gradient(circle at 80% 80%, #4ECDC4 0%, transparent 50%), radial-gradient(circle at 40% 40%, #45B7D1 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Interactive Orbs with vibrant colors */}
        <InteractiveOrb size="w-36 h-36" colors={["#FF6B6B", "#FF8E53", "#FFA726"]} delay={0} className="top-20 left-20" />
        <InteractiveOrb size="w-28 h-28" colors={["#4ECDC4", "#26D0CE", "#00BCD4"]} delay={1} className="top-40 right-32" />
        <InteractiveOrb size="w-20 h-20" colors={["#AB47BC", "#E91E63", "#FF69B4"]} delay={2} className="bottom-40 left-32" />
        <InteractiveOrb size="w-24 h-24" colors={["#FFD54F", "#FFC107", "#FF9800"]} delay={1.5} className="bottom-20 right-20" />
        
        {/* Floating Elements with better colors */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -120, 0],
                x: [0, Math.random() * 240 - 120, 0],
                rotate: [0, 360],
                scale: [1, 1.8, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 10 + Math.random() * 15,
                repeat: Infinity,
                delay: Math.random() * 6,
                ease: "easeInOut",
              }}
            >
              {i % 5 === 0 ? <Star className="w-10 h-10 text-yellow-400" fill="currentColor" /> :
               i % 5 === 1 ? <Heart className="w-8 h-8 text-pink-400" fill="currentColor" /> :
               i % 5 === 2 ? <Zap className="w-9 h-9 text-blue-400" fill="currentColor" /> :
               i % 5 === 3 ? <HomeIcon className="w-8 h-8 text-green-400" fill="currentColor" /> :
               <Sparkles className="w-7 h-7 text-purple-400" fill="currentColor" />}
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
          {/* Floating Arrows with vibrant colors */}
          <FloatingArrow delay={0} direction="right" color="#FF6B6B" />
          <FloatingArrow delay={1} direction="left" color="#4ECDC4" />
          <FloatingArrow delay={2} direction="right" color="#45B7D1" />
        </motion.div>

        {/* Interactive Icons with vibrant colors */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { Icon: HomeIcon, color: "#FF6B6B" },
            { Icon: Building, color: "#4ECDC4" },
            { Icon: MapPin, color: "#45B7D1" },
            { Icon: Star, color: "#FFD54F" },
            { Icon: TrendingUp, color: "#AB47BC" }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                left: `${15 + i * 17}%`,
                top: `${15 + i * 12}%`,
              }}
              animate={{
                y: [0, -35, 0],
                rotate: [0, 20, 0],
                scale: [1, 1.4, 1],
              }}
              transition={{
                duration: 5 + i,
                repeat: Infinity,
                delay: i * 0.6,
              }}
              whileHover={{ 
                scale: 1.8, 
                rotate: 360,
                transition: { duration: 0.6 }
              }}
            >
              <div 
                className="p-5 backdrop-blur-md rounded-full border-2 shadow-2xl"
                style={{
                  backgroundColor: item.color + '20',
                  borderColor: item.color,
                  boxShadow: `0 0 25px ${item.color}40`
                }}
              >
                <item.Icon className="w-8 h-8" style={{ color: item.color }} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Main Heading with vibrant 3D Effect */}
          <h1 className="mb-8 text-4xl font-black md:text-7xl lg:text-8xl text-white relative">
            <motion.span 
              className="relative inline-block"
              animate={{
                textShadow: [
                  "0 0 20px #FF6B6B, 0 0 40px #4ECDC4, 0 0 60px #45B7D1",
                  "0 0 40px #26D0CE, 0 0 60px #FF8A65, 0 0 80px #AB47BC",
                  "0 0 20px #FF6B6B, 0 0 40px #4ECDC4, 0 0 60px #45B7D1"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Find Your{" "}
              </span>
            </motion.span>
            <br />
            <span className="relative inline-block min-w-[300px] md:min-w-[500px] lg:min-w-[600px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${currentTextIndex}-${displayText}`}
                  initial={{ 
                    opacity: 0,
                    y: 100,
                    scale: 0.5,
                    rotateX: -90
                  }}
                  animate={{ 
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateX: 0
                  }}
                  exit={{ 
                    opacity: 0,
                    y: -100,
                    scale: 1.5,
                    rotateX: 90
                  }}
                  className="inline-block relative"
                  style={{
                    background: 'linear-gradient(45deg, #FF6B6B, #26D0CE, #FFD54F, #AB47BC, #4ECDC4)',
                    backgroundSize: '400% 400%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 30px rgba(255, 107, 107, 0.5))',
                  }}
                >
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    className="ml-2 border-r-4 border-cyan-300 inline-block h-[0.8em] align-middle"
                  />
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subtitle with vibrant glow */}
          <motion.p 
            className="mx-auto mb-16 max-w-3xl text-xl text-white md:text-2xl lg:text-3xl relative cursor-pointer font-medium"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 30px rgba(255, 255, 255, 0.9)",
            }}
            animate={{
              textShadow: [
                '0 0 15px rgba(255, 107, 107, 0.6)',
                '0 0 25px rgba(78, 205, 196, 0.8)',
                '0 0 15px rgba(255, 107, 107, 0.6)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
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
            className="mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl bg-white/15 backdrop-blur-2xl p-10 shadow-2xl border-2 border-white/40 sm:p-10 md:flex-row hover:bg-white/20 transition-all duration-500 relative overflow-hidden group"
            style={{
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25), 0 0 50px rgba(255, 107, 107, 0.1)'
            }}
          >
            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #26D0CE)',
                backgroundSize: '400% 400%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Search Input */}
            <div className="flex-1 relative z-10">
              <Input
                type="text"
                placeholder="Search by location, keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-16 w-full pl-14 bg-white/98 backdrop-blur-sm text-xl border-0 shadow-inner text-gray-800 placeholder:text-gray-500 rounded-2xl hover:bg-white transition-all duration-300 font-medium"
              />
              <Search className="absolute left-5 top-5 h-6 w-6 text-blue-600" />
            </div>
            
            {/* Property Type Select */}
            <div className="w-full md:w-64 relative z-10">
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="h-16 w-full bg-white/98 backdrop-blur-sm text-xl border-0 shadow-inner text-gray-800 rounded-2xl hover:bg-white transition-all duration-300 font-medium">
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
              className="relative z-10"
            >
              <Button 
                type="submit" 
                className="h-16 text-xl shadow-2xl text-white font-bold px-10 rounded-2xl relative overflow-hidden group border-0"
                size="lg"
                style={{
                  background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                  boxShadow: '0 10px 25px rgba(255, 107, 107, 0.4)'
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
                <Search className="mr-3 h-6 w-6" />
                Search
                <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </form>
        </motion.div>
        
        {/* Popular searches with vibrant colors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12"
        >
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-blue-100 md:text-base">
            <div className="popular-searches-title mr-2 text-white font-bold text-lg">Popular:</div>
            {[
              { text: "Apartments for Rent", icon: Building, search: "apartment", type: "hire", color: "#FF6B6B" },
              { text: "Houses for Sale", icon: HomeIcon, search: "house", type: "sale", color: "#4ECDC4" },
              { text: "Luxury Properties", icon: MapPin, search: "luxury", type: "all", color: "#45B7D1" }
            ].map((item, i) => (
              <motion.button 
                key={i}
                onClick={() => navigate(`/properties?search=${item.search}&type=${item.type}`)} 
                className="flex items-center text-white font-semibold border-2 relative overflow-hidden group px-6 py-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: item.color + '20',
                  borderColor: item.color,
                  boxShadow: `0 5px 15px ${item.color}30`
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                animate={{
                  boxShadow: [
                    `0 5px 15px ${item.color}30`,
                    `0 10px 25px ${item.color}50`,
                    `0 5px 15px ${item.color}30`
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
              >
                <item.icon size={18} className="mr-2" style={{ color: item.color }} />
                {item.text}
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            cursor: none !important;
          }
          
          * {
            cursor: none !important;
          }
          
          button, a, input, select, [role="button"] {
            cursor: none !important;
          }
          
          button:hover, a:hover, input:hover, select:hover, [role="button"]:hover {
            cursor: none !important;
          }
        `
      }} />
    </div>
  );
};

export default HeroSection;
