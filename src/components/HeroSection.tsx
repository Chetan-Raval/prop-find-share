import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home as HomeIcon, Building, ArrowRight, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";

// Lottie animation data (inline for amazing house animation)
const houseAnimation = {
  "v": "5.7.4",
  "fr": 30,
  "ip": 0,
  "op": 90,
  "w": 512,
  "h": 512,
  "nm": "House Animation",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "House",
      "sr": 1,
      "ks": {
        "o": {"a": 0, "k": 100},
        "r": {"a": 1, "k": [
          {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]},
          {"t": 90, "s": [360]}
        ]},
        "p": {"a": 0, "k": [256, 256, 0]},
        "a": {"a": 0, "k": [0, 0, 0]},
        "s": {"a": 1, "k": [
          {"i": {"x": [0.833, 0.833, 0.833], "y": [0.833, 0.833, 0.833]}, "o": {"x": [0.167, 0.167, 0.167], "y": [0.167, 0.167, 0.167]}, "t": 0, "s": [80, 80, 100]},
          {"i": {"x": [0.833, 0.833, 0.833], "y": [0.833, 0.833, 0.833]}, "o": {"x": [0.167, 0.167, 0.167], "y": [0.167, 0.167, 0.167]}, "t": 45, "s": [120, 120, 100]},
          {"t": 90, "s": [80, 80, 100]}
        ]}
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ty": "rc",
              "d": 1,
              "s": {"a": 0, "k": [200, 160]},
              "p": {"a": 0, "k": [0, 20]},
              "r": {"a": 0, "k": 10}
            },
            {
              "ty": "fl",
              "c": {"a": 0, "k": [0.2, 0.6, 1, 1]},
              "o": {"a": 0, "k": 100}
            }
          ]
        }
      ],
      "ip": 0,
      "op": 90,
      "st": 0
    }
  ]
};

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [propertiesCount, setPropertiesCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [citiesCount, setCitiesCount] = useState(0);

  // Text options for swapping animation
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

  // Enhanced typing animation effect
  useEffect(() => {
    const currentWord = swappingTexts[currentTextIndex];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      // Typing animation - one character at a time
      if (displayText.length < currentWord.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 150 + Math.random() * 100); // Variable typing speed for natural effect
      } else {
        // Pause before erasing - show complete word for 2 seconds
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, 2000);
      }
    } else {
      // Erasing animation - faster than typing
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 75 + Math.random() * 50); // Faster erasing
      } else {
        // Move to next word and start typing again
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % swappingTexts.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentTextIndex, swappingTexts]);

  // Counting animation effect
  useEffect(() => {
    const startCounting = () => {
      // Properties count animation
      let propertiesStart = 0;
      const propertiesTarget = 5000;
      const propertiesIncrement = propertiesTarget / 100;
      
      const propertiesTimer = setInterval(() => {
        propertiesStart += propertiesIncrement;
        if (propertiesStart >= propertiesTarget) {
          setPropertiesCount(propertiesTarget);
          clearInterval(propertiesTimer);
        } else {
          setPropertiesCount(Math.floor(propertiesStart));
        }
      }, 30);

      // Clients count animation  
      let clientsStart = 0;
      const clientsTarget = 3200;
      const clientsIncrement = clientsTarget / 100;
      
      const clientsTimer = setInterval(() => {
        clientsStart += clientsIncrement;
        if (clientsStart >= clientsTarget) {
          setClientsCount(clientsTarget);
          clearInterval(clientsTimer);
        } else {
          setClientsCount(Math.floor(clientsStart));
        }
      }, 35);

      // Cities count animation
      let citiesStart = 0;
      const citiesTarget = 1500;
      const citiesIncrement = citiesTarget / 100;
      
      const citiesTimer = setInterval(() => {
        citiesStart += citiesIncrement;
        if (citiesStart >= citiesTarget) {
          setCitiesCount(citiesTarget);
          clearInterval(citiesTimer);
        } else {
          setCitiesCount(Math.floor(citiesStart));
        }
      }, 40);
    };

    // Start counting after a delay
    const timeout = setTimeout(startCounting, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Ultra Amazing Animated Background */}
      <div className="absolute inset-0 z-0">
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 via-blue-800 to-cyan-900 animate-[gradient-shift_8s_ease-in-out_infinite]"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 60}px`,
                height: `${20 + Math.random() * 60}px`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                rotate: [0, 360],
                scale: [1, 1.5, 1],
                opacity: [0.1, 0.8, 0.1],
              }}
              transition={{
                duration: 8 + Math.random() * 12,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "easeInOut",
              }}
            >
              <div className={`w-full h-full ${
                i % 4 === 0 ? 'bg-cyan-400/20 rounded-full' :
                i % 4 === 1 ? 'bg-purple-400/20 rotate-45' :
                i % 4 === 2 ? 'bg-pink-400/20 rounded-lg' :
                'bg-yellow-400/20 rounded-full'
              } backdrop-blur-sm`}></div>
            </motion.div>
          ))}
        </div>

        {/* Particle System */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -window.innerHeight],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Dynamic Light Rays */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-conic from-transparent via-cyan-500/10 to-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -top-1/2 -right-1/2 w-[200%] h-[200%] bg-gradient-conic from-transparent via-purple-500/10 to-transparent"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Aurora Effect */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 w-full h-96 bg-gradient-to-b from-green-400/20 via-blue-400/10 to-transparent"
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className={`container relative z-30 px-4 py-20 text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        
        {/* Lottie Animation - Floating House */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute -top-20 -right-20 w-32 h-32 md:w-48 md:h-48 z-10"
        >
          <Lottie 
            animationData={houseAnimation} 
            loop={true}
            className="w-full h-full filter drop-shadow-2xl"
          />
        </motion.div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[HomeIcon, Building, MapPin].map((Icon, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 30}%`,
                top: `${20 + i * 15}%`,
              }}
              animate={{
                y: [0, -20, 0],
                rotate: [0, 10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            >
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                <Icon className="w-6 h-6 text-white" />
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
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent blur-sm">
              Find Your{" "}
            </span>
            <span className="relative bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Find Your{" "}
            </span>
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
                    textShadow: '0 0 30px rgba(96, 165, 250, 0.5)',
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
              
              {/* Enhanced 3D Floating Elements */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      left: `${10 + i * 8}%`,
                      top: `${10 + (i % 4) * 20}%`,
                      background: `linear-gradient(45deg, ${
                        ['#60A5FA', '#34D399', '#F59E0B', '#F472B6', '#A78BFA'][i % 5]
                      }, white)`,
                    }}
                    animate={{
                      y: [-30, 30, -30],
                      x: [-20, 20, -20],
                      opacity: [0.2, 1, 0.2],
                      scale: [0.5, 2, 0.5],
                      rotate: [0, 360, 720],
                    }}
                    transition={{
                      duration: 4 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </span>
          </h1>

          {/* Subtitle with Glow Effect */}
          <motion.p 
            className="mx-auto mb-16 max-w-3xl text-xl text-blue-100 md:text-2xl lg:text-3xl relative"
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
            <motion.span
              className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl -z-10"
              animate={{
                opacity: [0.3, 0.8, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </motion.p>
        </motion.div>

        {/* Stats with Amazing Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mx-auto mb-16 flex max-w-4xl justify-center gap-8 md:gap-16"
        >
          {[
            { count: propertiesCount, label: "Properties", icon: "🏠", color: "from-cyan-400 to-blue-500" },
            { count: clientsCount, label: "Happy Clients", icon: "😊", color: "from-purple-400 to-pink-500" },
            { count: citiesCount, label: "Cities", icon: "🌆", color: "from-yellow-400 to-orange-500" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              className="flex flex-col items-center relative group"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-300`}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.count.toLocaleString()}+
                </p>
                <p className="text-blue-200 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <form 
            onSubmit={handleSearch}
            className="mx-auto flex max-w-5xl flex-col gap-6 rounded-3xl bg-white/10 backdrop-blur-2xl p-10 shadow-2xl border border-white/30 sm:p-10 md:flex-row hover:bg-white/15 transition-all duration-500 relative overflow-hidden"
          >
            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'linear-gradient(45deg, transparent, rgba(96, 165, 250, 0.3), transparent)',
                backgroundSize: '400% 400%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 6, repeat: Infinity }}
            />
            
            <div className="flex-1 relative z-10">
              <Input
                type="text"
                placeholder="Search by location, keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-16 w-full pl-14 bg-white/95 backdrop-blur-sm text-xl border-0 shadow-inner text-gray-800 placeholder:text-gray-500 rounded-2xl"
              />
              <Search className="absolute left-5 top-5 h-6 w-6 text-primary" />
            </div>
            
            <div className="w-full md:w-64 relative z-10">
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="h-16 w-full bg-white/95 backdrop-blur-sm text-xl border-0 shadow-inner text-gray-800 rounded-2xl">
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
                className="h-16 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 text-xl shadow-2xl shadow-cyan-500/25 text-white font-bold px-10 rounded-2xl relative overflow-hidden"
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
              </Button>
            </motion.div>
          </form>
        </motion.div>
        
        {/* Rest of the component - keep existing features, popular searches, and CTA buttons */}
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
                <span className="text-white font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* Popular searches */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm text-blue-100 md:text-base">
            <div className="popular-searches-title mr-2 text-white font-medium">Popular:</div>
            <button 
              onClick={() => navigate("/properties?search=apartment&type=hire")} 
              className="flex items-center hover:text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 text-white font-medium"
            >
              <Building size={16} className="mr-2" />
              Apartments for Rent
            </button>
            <button 
              onClick={() => navigate("/properties?search=house&type=sale")} 
              className="flex items-center hover:text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 text-white font-medium"
            >
              <HomeIcon size={16} className="mr-2" />
              Houses for Sale
            </button>
            <button 
              onClick={() => navigate("/properties?search=luxury")} 
              className="flex items-center hover:text-white bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105 text-white font-medium"
            >
              <MapPin size={16} className="mr-2" />
              Luxury Properties
            </button>
          </div>
          
          {/* CTA Buttons - Fixed layout */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 max-w-2xl mx-auto">
            <Button 
              onClick={() => navigate("/properties?type=sale")} 
              variant="secondary"
              size="lg" 
              className="group text-lg px-8 py-4 hover:scale-105 transition-all duration-300 shadow-lg flex-1 sm:flex-none min-w-[200px] text-gray-800 font-semibold"
            >
              Browse Properties
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button 
              onClick={() => navigate("/register")} 
              variant="outline" 
              size="lg" 
              className="border-2 border-white/80 text-white hover:bg-white/20 hover:text-white hover:border-white text-lg px-8 py-4 hover:scale-105 transition-all duration-300 flex-1 sm:flex-none min-w-[200px] font-semibold"
            >
              List Your Property
            </Button>
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
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.11,130.83,141.14,213.2,141.14,329.17,141.14,404.67,91.45,521.39,56.44Z" 
            className="fill-background"
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
        `
      }} />
    </div>
  );
};

export default HeroSection;
