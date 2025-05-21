
import { useState, useEffect } from "react";
import PropertyCard, { PropertyData } from "./PropertyCard";
import { mockProperties } from "@/data/mockData";

const FeaturedProperties = () => {
  const [properties, setProperties] = useState<PropertyData[]>([]);

  useEffect(() => {
    // Get 6 random properties from mock data
    const featuredProps = [...mockProperties].sort(() => 0.5 - Math.random()).slice(0, 6);
    setProperties(featuredProps);
  }, []);

  return (
    <section className="py-12">
      <div className="container px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold">Featured Properties</h2>
          <p className="text-muted-foreground">
            Discover our handpicked selection of premier properties
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
