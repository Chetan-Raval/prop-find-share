
import { useState, useEffect } from "react";
import PropertyCard, { PropertyData } from "./PropertyCard";
import { mockProperties } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Building, ListFilter, Home, TrendingUp, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [filter, setFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Filter properties based on selected filter
    let filteredProps = [...mockProperties];
    
    if (filter === "sale") {
      filteredProps = filteredProps.filter(p => p.type === "sale");
    } else if (filter === "hire") {
      filteredProps = filteredProps.filter(p => p.type === "hire");
    }
    
    // Get random properties from filtered list
    filteredProps = filteredProps.sort(() => 0.5 - Math.random()).slice(0, 6);
    setProperties(filteredProps);

    // Set visibility for animations
    setIsVisible(true);
  }, [filter]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-blue-50/50 to-background">
      <div className="container px-4">
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-2 px-4 py-2 bg-blue-100 text-primary rounded-full font-medium text-sm"
          >
            <Star className="inline-block mr-2 h-4 w-4" /> Handpicked for You
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-4 text-3xl font-bold md:text-5xl lg:text-6xl"
          >
            Featured <span className="text-primary">Properties</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto max-w-2xl text-muted-foreground text-lg md:text-xl"
          >
            Discover our exclusive selection of the finest properties available in top locations
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 inline-flex items-center rounded-full border bg-card/80 backdrop-blur-sm p-1.5 shadow-lg mb-8"
          >
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
              className="rounded-full gap-1.5 px-5"
            >
              <Building size={18} />
              All
            </Button>
            <Button
              variant={filter === "sale" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("sale")}
              className="rounded-full gap-1.5 px-5"
            >
              <Home size={18} />
              For Sale
            </Button>
            <Button
              variant={filter === "hire" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("hire")}
              className="rounded-full gap-1.5 px-5"
            >
              <TrendingUp size={18} />
              For Rent
            </Button>
          </motion.div>
        </div>

        {/* Desktop view - Grid with animations */}
        <motion.div 
          initial="hidden"
          animate={isVisible ? "show" : "hidden"}
          variants={container}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {properties.map((property, index) => (
            <motion.div 
              key={property.id} 
              className="transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              variants={item}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Mobile view - Enhanced Carousel */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {properties.map((property) => (
                <CarouselItem key={property.id} className="pl-4 sm:basis-1/2">
                  <div className="p-1">
                    <PropertyCard property={property} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6 gap-2">
              <CarouselPrevious className="relative -left-0 -translate-y-0 bg-primary/10 hover:bg-primary/20 text-primary" />
              <CarouselNext className="relative -right-0 -translate-y-0 bg-primary/10 hover:bg-primary/20 text-primary" />
            </div>
          </Carousel>
        </div>
        
        {/* Trending cities section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-24 text-center"
        >
          <h3 className="mb-12 text-2xl md:text-3xl font-bold">Trending Cities</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9", count: "1,423" },
              { name: "Los Angeles", image: "https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da", count: "863" },
              { name: "Miami", image: "https://images.unsplash.com/photo-1535498730771-e735b998cd64", count: "531" }, 
              { name: "Chicago", image: "https://images.unsplash.com/photo-1494522358652-f30e61a5d653", count: "482" }
            ].map((city, index) => (
              <Link key={index} to={`/properties?search=${city.name}`}>
                <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300">
                  <div className="relative h-44 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/20 z-10"></div>
                    <img 
                      src={`${city.image}?auto=format&fit=crop&w=600&h=350&q=80`} 
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-20">
                      <h4 className="font-bold text-lg">{city.name}</h4>
                      <p className="text-sm text-gray-200">{city.count} properties</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <Button asChild size="lg" className="px-10 py-7 text-base rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-primary hover:bg-primary/90">
            <Link to="/properties" className="flex items-center gap-2">
              <ListFilter size={20} />
              View All Properties
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
