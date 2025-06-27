
import InteractiveMap from "@/components/InteractiveMap";
import { mockProperties } from "@/data/mockData";
import { MapPin, Zap, Navigation } from "lucide-react";

const InteractiveMapPage = () => {
  // Convert mock properties to map format with coordinates
  const mapProperties = mockProperties.slice(0, 8).map((property, index) => {
    // Sample coordinates for major Indian cities
    const coordinates: { [key: string]: [number, number] } = {
      'Mumbai': [19.0760, 72.8777],
      'Delhi': [28.7041, 77.1025],
      'Bangalore': [12.9716, 77.5946],
      'Chennai': [13.0827, 80.2707],
      'Hyderabad': [17.3850, 78.4867],
      'Pune': [18.5204, 73.8567],
      'Kolkata': [22.5726, 88.3639],
      'Ahmedabad': [23.0225, 72.5714],
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container py-8 space-y-8">
        {/* Enhanced Hero Section */}
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-700 animate-pulse">
            <Zap className="h-4 w-4" />
            New: Auto Location Detection
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Smart Property Explorer
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of property search with our intelligent map that automatically detects your location, 
            calculates commute times, and shows nearby amenities with stunning animations.
          </p>
        </div>

        {/* Interactive Map Component */}
        <div className="animate-scale-in">
          <InteractiveMap 
            properties={mapProperties}
            height="700px"
          />
        </div>
        
        {/* Enhanced Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in border border-blue-200">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-600/5 group-hover:from-blue-400/10 group-hover:to-blue-600/20 transition-all duration-500"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-blue-900">Auto Location Detection</h3>
              <p className="text-blue-700 leading-relaxed">
                Instantly detect your current location and find properties near you. 
                Our smart system automatically centers the map on your position for the best experience.
              </p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in border border-green-200" style={{ animationDelay: '0.2s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-600/5 group-hover:from-green-400/10 group-hover:to-green-600/20 transition-all duration-500"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <Navigation className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-green-900">Smart Commute Calculator</h3>
              <p className="text-green-700 leading-relaxed">
                Calculate travel time from any property to your workplace or important locations. 
                Make informed decisions with accurate commute estimates.
              </p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in border border-purple-200" style={{ animationDelay: '0.4s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-purple-600/5 group-hover:from-purple-400/10 group-hover:to-purple-600/20 transition-all duration-500"></div>
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-900">Interactive Search Areas</h3>
              <p className="text-purple-700 leading-relaxed">
                Draw custom search boundaries on the map to focus on specific neighborhoods. 
                Define your perfect area with precision and ease.
              </p>
            </div>
          </div>
        </div>

        {/* New Stats Section */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                1000+
              </div>
              <p className="text-sm text-muted-foreground">Properties Listed</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                50+
              </div>
              <p className="text-sm text-muted-foreground">Cities Covered</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                24/7
              </div>
              <p className="text-sm text-muted-foreground">Support Available</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                99%
              </div>
              <p className="text-sm text-muted-foreground">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMapPage;
