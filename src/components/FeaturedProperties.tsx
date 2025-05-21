
import { useState, useEffect } from "react";
import PropertyCard, { PropertyData } from "./PropertyCard";
import { mockProperties } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<PropertyData[]>([]);

  useEffect(() => {
    // Get 6 random properties from mock data
    const featuredProps = [...mockProperties].sort(() => 0.5 - Math.random()).slice(0, 6);
    setProperties(featuredProps);
  }, []);

  return (
    <section className="py-12 md:py-20">
      <div className="container px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">Featured Properties</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Discover our handpicked selection of premier properties
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, index) => (
            <div 
              key={property.id} 
              className="transform transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Button asChild className="px-8">
            <Link to="/properties">View All Properties</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
