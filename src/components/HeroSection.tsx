
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home as HomeIcon, Building, ArrowRight, CheckCircle, Star, Heart, Zap } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

// SVG Components for custom animations
const AnimatedHouseIcon = ({ className = "" }) => (
  <motion.div
    className={`relative ${className}`}
    animate={{
      y: [0, -10, 0],
      rotateY: [0, 15, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <motion.svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      className="drop-shadow-2xl"
      whileHover={{ scale: 1.1, rotateZ: 5 }}
    >
      <defs>
        <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* House base */}
      <motion.rect
        x="30" y="60" width="60" height="45"
        fill="url(#houseGradient)"
        rx="8"
        filter="url(#glow)"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Roof */}
      <motion.polygon
        points="25,65 60,35 95,65"
        fill="#FF6B6B"
        filter="url(#glow)"
        animate={{
          rotateZ: [0, 2, 0],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      
      {/* Door */}
      <motion.rect
        x="50" y="80" width="20" height="25"
        fill="#4ECDC4"
        rx="10"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
      
      {/* Windows */}
      <motion.circle
        cx="40" cy="72" r="6"
        fill="#FFE66D"
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.circle
        cx="80" cy="72" r="6"
        fill="#FFE66D"
        animate={{
          opacity: [1, 0.7, 1],
        }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}
      />
      
      {/* Chimney with smoke */}
      <rect x="75" y="45" width="8" height="20" fill="#8B4513" />
      <motion.circle
        cx="79" cy="40" r="2"
        fill="#CCCCCC"
        animate={{
          y: [0, -20, -40],
          opacity: [1, 0.5, 0],
          scale: [1, 1.5, 2],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0 }}
      />
      <motion.circle
        cx="82" cy="35" r="2"
        fill="#CCCCCC"
        animate={{
          y: [0, -25, -50],
          opacity: [1, 0.5, 0],
          scale: [1, 1.8, 2.5],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
      />
    </motion.svg>
  </motion.div>
);

const FloatingArrow = ({ delay = 0, direction = "right" }) => (
  <motion.div
    className="absolute"
    initial={{ opacity: 0, x: direction === "right" ? -20 : 20 }}
    animate={{
      opacity: [0, 1, 0],
      x: direction === "right" ? [0, 100, 200] : [0, -100, -200],
      y: [0, -10, 0],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  >
    <ArrowRight className={`w-6 h-6 text-cyan-400 ${direction === "left" ? "rotate-180" : ""}`} />
  </motion.div>
);

const InteractiveOrb = ({ size = "w-20 h-20", color = "bg-cyan-400", delay = 0, className = "" }) => (
  <motion.div
    className={`${size} ${color} rounded-full absolute ${className} cursor-pointer`}
    style={{
      background: `radial-gradient(circle, ${color.replace('bg-', '').replace('-400', '')}, transparent)`,
      filter: 'blur(1px)',
    }}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.3, 0.8, 0.3],
      x: [0, 50, 0],
      y: [0, -30, 0],
    }}
    transition={{
      duration: 4 + delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
    whileHover={{
      scale: 2,
      opacity: 1,
      transition: { duration: 0.3 }
    }}
  />
);

const CursorTrail = () => {
  const [trails, setTrails] = useState([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      setTrails(prev => [
        ...prev.slice(-10),
        {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
        }
      ]);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
          initial={{
            x: trail.x - 8,
            y: trail.y - 8,
            scale: 1,
            opacity: 0.8,
          }}
          animate={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

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
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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
      <CursorTrail />
      
      {/* Ultra Dynamic Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Dynamic Gradient Mesh */}
        <motion.div 
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, #60A5FA 0%, transparent 50%), radial-gradient(circle at 80% 80%, #A78BFA 0%, transparent 50%), radial-gradient(circle at 40% 40%, #F472B6 0%, transparent 50%)",
              "radial-gradient(circle at 60% 20%, #34D399 0%, transparent 50%), radial-gradient(circle at 20% 80%, #F59E0B 0%, transparent 50%), radial-gradient(circle at 80% 40%, #EF4444 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, #60A5FA 0%, transparent 50%), radial-gradient(circle at 80% 80%, #A78BFA 0%, transparent 50%), radial-gradient(circle at 40% 40%, #F472B6 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        {/* Interactive Orbs */}
        <InteractiveOrb size="w-32 h-32" color="bg-cyan-400" delay={0} className="top-20 left-20" />
        <InteractiveOrb size="w-24 h-24" color="bg-purple-400" delay={1} className="top-40 right-32" />
        <InteractiveOrb size="w-16 h-16" color="bg-pink-400" delay={2} className="bottom-40 left-32" />
        <InteractiveOrb size="w-20 h-20" color="bg-yellow-400" delay={1.5} className="bottom-20 right-20" />
        
        {/* SVG Pattern Background */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern id="heroPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="2" fill="url(#patternGradient)" />
                <circle cx="25" cy="25" r="1" fill="url(#patternGradient)" />
                <circle cx="75" cy="75" r="1" fill="url(#patternGradient)" />
              </pattern>
              <linearGradient id="patternGradient">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#heroPattern)" />
          </svg>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 200 - 100, 0],
                rotate: [0, 360],
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 8 + Math.random() * 12,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            >
              {i % 4 === 0 ? <Star className="w-8 h-8 text-cyan-400" /> :
               i % 4 === 1 ? <Heart className="w-6 h-6 text-pink-400" /> :
               i % 4 === 2 ? <Zap className="w-7 h-7 text-yellow-400" /> :
               <HomeIcon className="w-6 h-6 text-purple-400" />}
            </motion.div>
          ))}
        </div>

        {/* Dynamic Light Rays */}
        <motion.div
          className="absolute inset-0 overflow-hidden"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-conic from-transparent via-cyan-500/10 to-transparent" />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className={`container relative z-30 px-4 py-20 text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Animated House Icon */}
        <motion.div
          className="absolute -top-10 -right-10 md:-top-20 md:-right-20"
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
        >
          <AnimatedHouseIcon />
          {/* Floating Arrows around house */}
          <FloatingArrow delay={0} direction="right" />
          <FloatingArrow delay={1} direction="left" />
          <FloatingArrow delay={2} direction="right" />
        </motion.div>

        {/* Interactive Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[HomeIcon, Building, MapPin, Star, Heart].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 15, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              whileHover={{ 
                scale: 1.5, 
                rotate: 360,
                transition: { duration: 0.5 }
              }}
            >
              <div className="p-4 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-full border border-white/30 shadow-2xl">
                <Icon className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Main Heading with 3D Effect */}
          <h1 className="mb-8 text-4xl font-black md:text-7xl lg:text-8xl text-white relative">
            <motion.span 
              className="relative inline-block"
              animate={{
                textShadow: [
                  "0 0 20px #60A5FA, 0 0 40px #A78BFA, 0 0 60px #F472B6",
                  "0 0 40px #34D399, 0 0 60px #F59E0B, 0 0 80px #EF4444",
                  "0 0 20px #60A5FA, 0 0 40px #A78BFA, 0 0 60px #F472B6"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
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
                  transition={{ 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 200,
                    damping: 20
                  }}
                  className="inline-block relative"
                  style={{
                    background: 'linear-gradient(45deg, #60A5FA, #34D399, #F59E0B, #F472B6, #A78BFA)',
                    backgroundSize: '400% 400%',
                    animation: 'gradient-shift 4s ease infinite',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 30px rgba(96, 165, 250, 0.5))',
                  }}
                >
                  {displayText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    className="ml-2 border-r-4 border-cyan-400 inline-block h-[0.8em] align-middle"
                  />
                </motion.span>
              </AnimatePresence>
            </span>
          </h1>

          {/* Subtitle with Interactive Glow */}
          <motion.p 
            className="mx-auto mb-16 max-w-3xl text-xl text-white md:text-2xl lg:text-3xl relative cursor-pointer"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 30px rgba(255, 255, 255, 0.8)",
            }}
            animate={{
              textShadow: [
                '0 0 10px rgba(59, 130, 246, 0.5)',
                '0 0 20px rgba(59, 130, 246, 0.8)',
                '0 0 10px rgba(59, 130, 246, 0.5)',
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Your perfect property is just a click away. Explore thousands of listings curated just for you.
          </motion.p>
        </motion.div>

        {/* Enhanced Search Form with Interactions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <form 
            onSubmit={handleSearch}
            className="mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl bg-white/10 backdrop-blur-2xl p-10 shadow-2xl border border-white/30 sm:p-10 md:flex-row hover:bg-white/15 transition-all duration-500 relative overflow-hidden group"
          >
            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(45deg, #60A5FA, #A78BFA, #F472B6, #34D399)',
                backgroundSize: '400% 400%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="flex-1 relative z-10">
              <Input
                type="text"
                placeholder="Search by location, keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-16 w-full pl-14 bg-white/95 backdrop-blur-sm text-xl border-0 shadow-inner text-gray-800 placeholder:text-gray-500 rounded-2xl hover:bg-white transition-all duration-300"
              />
              <Search className="absolute left-5 top-5 h-6 w-6 text-primary" />
            </div>
            
            <div className="w-full md:w-64 relative z-10">
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="h-16 w-full bg-white/95 backdrop-blur-sm text-xl border-0 shadow-inner text-gray-800 rounded-2xl hover:bg-white transition-all duration-300">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="hire">For Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10"
            >
              <Button 
                type="submit" 
                className="h-16 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 text-xl shadow-2xl shadow-cyan-500/25 text-white font-bold px-10 rounded-2xl relative overflow-hidden group"
                size="lg"
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
        
        {/* Enhanced Features and Popular Searches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-12"
        >
          {/* Features list */}
          <div className="mb-10 flex flex-wrap justify-center gap-3 text-sm text-white md:text-base">
            {["Verified Properties", "No Hidden Fees", "Top Locations", "Support 24/7"].map((item, i) => (
              <motion.div 
                key={i} 
                className="flex items-center bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(255, 255, 255, 0.2)",
                    "0 0 20px rgba(255, 255, 255, 0.4)",
                    "0 0 10px rgba(255, 255, 255, 0.2)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
              >
                <CheckCircle size={16} className="mr-2 text-cyan-400" />
                <span className="text-white font-medium">{item}</span>
              </motion.div>
            ))}
          </div>

          {/* Popular searches with arrows */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-blue-100 md:text-base">
            <div className="popular-searches-title mr-2 text-white font-medium">Popular:</div>
            {[
              { text: "Apartments for Rent", icon: Building, search: "apartment", type: "hire" },
              { text: "Houses for Sale", icon: HomeIcon, search: "house", type: "sale" },
              { text: "Luxury Properties", icon: MapPin, search: "luxury", type: "all" }
            ].map((item, i) => (
              <motion.button 
                key={i}
                onClick={() => navigate(`/properties?search=${item.search}&type=${item.type}`)} 
                className="flex items-center hover:text-white bg-white/10 backdrop-blur-md px-6 py-3 rounded-full hover:bg-white/20 transition-all duration-300 text-white font-medium border border-white/20 relative overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                animate={{
                  borderColor: [
                    "rgba(255, 255, 255, 0.2)",
                    "rgba(96, 165, 250, 0.5)",
                    "rgba(255, 255, 255, 0.2)"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.3 }}
              >
                <item.icon size={16} className="mr-2" />
                {item.text}
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                
                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
          </div>
          
          {/* CTA Buttons with Enhanced Animations */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => navigate("/properties?type=sale")} 
                variant="secondary"
                size="lg" 
                className="group text-lg px-8 py-4 transition-all duration-300 shadow-lg flex-1 sm:flex-none min-w-[200px] text-gray-800 font-semibold relative overflow-hidden bg-white hover:bg-gray-50"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Browse Properties</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => navigate("/register")} 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/80 text-white hover:bg-white/20 hover:text-white hover:border-white text-lg px-8 py-4 transition-all duration-300 flex-1 sm:flex-none min-w-[200px] font-semibold relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">List Your Property</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0 z-30">
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block h-[80px] w-full"
          animate={{
            x: [0, -50, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.2,141.14,329.17,141.14,404.67,91.45,521.39,56.44Z" 
            fill="url(#waveGradient)"
          />
        </motion.svg>
      </div>

      {/* Enhanced CSS Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            25% { background-position: 100% 50%; }
            50% { background-position: 100% 100%; }
            75% { background-position: 0% 100%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes pulse-glow {
            0%, 100% { box-shadow: 0 0 20px rgba(96, 165, 250, 0.3); }
            50% { box-shadow: 0 0 40px rgba(96, 165, 250, 0.8); }
          }
          
          body {
            cursor: none;
          }
          
          * {
            cursor: none !important;
          }
          
          button, a, input, select {
            cursor: pointer !important;
          }
        `
      }} />
    </div>
  );
};

export default HeroSection;
