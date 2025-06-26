
import InteractiveMap from "@/components/InteractiveMap";
import { mockProperties } from "@/data/mockData";

const InteractiveMapPage = () => {
  // Convert mock properties to map format with coordinates
  const mapProperties = mockProperties.slice(0, 6).map((property, index) => {
    // Sample coordinates for major Indian cities
    const coordinates: { [key: string]: [number, number] } = {
      'Mumbai': [72.8777, 19.0760],
      'Delhi': [77.1025, 28.7041],
      'Bangalore': [77.5946, 12.9716],
      'Chennai': [80.2707, 13.0827],
      'Hyderabad': [78.4867, 17.3850],
      'Pune': [73.8567, 18.5204],
    };
    
    const cities = Object.keys(coordinates);
    const randomCity = cities[index % cities.length];
    
    return {
      id: property.id,
      title: property.title,
      price: property.price,
      location: randomCity,
      coordinates: coordinates[randomCity],
    };
  });

  return (
    <div className="container py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Interactive Property Map</h1>
        <p className="text-muted-foreground">
          Explore properties with advanced map features including search areas, commute calculator, and nearby amenities.
        </p>
      </div>
      
      <InteractiveMap 
        properties={mapProperties}
        height="600px"
      />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 border rounded-lg">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="font-semibold mb-2">Draw Search Areas</h3>
          <p className="text-sm text-muted-foreground">
            Define custom search boundaries on the map to focus on specific neighborhoods.
          </p>
        </div>
        
        <div className="text-center p-6 border rounded-lg">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚗</span>
          </div>
          <h3 className="font-semibold mb-2">Commute Calculator</h3>
          <p className="text-sm text-muted-foreground">
            Calculate travel time from properties to your workplace or important locations.
          </p>
        </div>
        
        <div className="text-center p-6 border rounded-lg">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏪</span>
          </div>
          <h3 className="font-semibold mb-2">Nearby Amenities</h3>
          <p className="text-sm text-muted-foreground">
            Discover schools, hospitals, shopping centers, and transport links near each property.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMapPage;
