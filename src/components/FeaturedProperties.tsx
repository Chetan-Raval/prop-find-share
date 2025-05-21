
import { useState, useEffect } from "react";
import PropertyCard, { PropertyData } from "./PropertyCard";
import { mockProperties } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { Building, ListFilter } from "lucide-react";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [filter, setFilter] = useState("all");

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
  }, [filter]);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold md:text-4xl lg:text-5xl scale-in">
            Featured Properties
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
            Discover our handpicked selection of premier properties
          </p>
          
          <div className="mt-6 inline-flex items-center rounded-lg border bg-background p-1 mb-8">
            <Button
              variant={filter === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("all")}
              className="gap-1.5"
            >
              <Building size={16} />
              All
            </Button>
            <Button
              variant={filter === "sale" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("sale")}
              className="gap-1.5"
            >
              <Building size={16} />
              For Sale
            </Button>
            <Button
              variant={filter === "hire" ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilter("hire")}
              className="gap-1.5"
            >
              <Building size={16} />
              For Rent
            </Button>
          </div>
        </div>

        {/* Desktop view - Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property, index) => (
            <div 
              key={property.id} 
              className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
        
        {/* Mobile view - Carousel */}
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
                <CarouselItem key={property.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                  <div className="p-1">
                    <PropertyCard property={property} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-4 gap-2">
              <CarouselPrevious className="relative -left-0 -translate-y-0 bg-white" />
              <CarouselNext className="relative -right-0 -translate-y-0 bg-white" />
            </div>
          </Carousel>
        </div>
        
        <div className="mt-10 text-center">
          <Button asChild size="lg" className="px-8 py-6 text-base hover:scale-105 transition-transform">
            <Link to="/properties" className="flex items-center gap-2">
              <ListFilter size={18} />
              View All Properties
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
