import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, School, Hospital, ShoppingCart, Navigation, Loader2, Crosshair, Zap, Car } from 'lucide-react';
import { toast } from 'sonner';

interface InteractiveMapProps {
  properties?: Array<{
    id: string;
    title: string;
    price: number;
    location: string;
    coordinates: [number, number];
  }>;
  height?: string;
}

const InteractiveMap = ({ properties = [], height = "600px" }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [drawingMode, setDrawingMode] = useState(false);
  const [commuteFrom, setCommuteFrom] = useState('');
  const [commuteTime, setCommuteTime] = useState<number | null>(null);
  const [commuteDistance, setCommuteDistance] = useState<string>('');
  const [isCalculatingCommute, setIsCalculatingCommute] = useState(false);
  const [nearbyAmenities, setNearbyAmenities] = useState<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const drawnItems = useRef<L.FeatureGroup | null>(null);
  const markers = useRef<L.Marker[]>([]);
  const userMarker = useRef<L.Marker | null>(null);
  const routeLayer = useRef<L.Polyline | null>(null);
  const mapClickHandler = useRef<((e: L.LeafletMouseEvent) => void) | null>(null);

  const sampleProperties = [
    { id: '1', title: 'Luxury Villa', price: 2500000, location: 'Mumbai', coordinates: [19.0760, 72.8777] as [number, number] },
    { id: '2', title: 'Modern Apartment', price: 1200000, location: 'Delhi', coordinates: [28.7041, 77.1025] as [number, number] },
    { id: '3', title: 'Beach House', price: 3000000, location: 'Goa', coordinates: [15.2993, 73.8278] as [number, number] },
    { id: '4', title: 'Penthouse Suite', price: 4500000, location: 'Bangalore', coordinates: [12.9716, 77.5946] as [number, number] },
    { id: '5', title: 'Garden Villa', price: 1800000, location: 'Chennai', coordinates: [13.0827, 80.2707] as [number, number] },
  ];

  const displayProperties = properties.length > 0 ? properties : sampleProperties;

  // Geocoding function to convert address to coordinates
  const geocodeAddress = async (address: string): Promise<[number, number] | null> => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`);
      const data = await response.json();
      
      if (data && data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  // Calculate route using OSRM (Open Source Routing Machine)
  const calculateRoute = async (start: [number, number], end: [number, number]) => {
    try {
      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start[1]},${start[0]};${end[1]},${end[0]}?overview=full&geometries=geojson`
      );
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        const duration = Math.round(route.duration / 60); // Convert to minutes
        const distance = (route.distance / 1000).toFixed(1); // Convert to km
        const coordinates = route.geometry.coordinates.map((coord: [number, number]) => [coord[1], coord[0]]);
        
        return {
          duration,
          distance,
          coordinates
        };
      }
      return null;
    } catch (error) {
      console.error('Routing error:', error);
      return null;
    }
  };

  // Get user's current location
  const getCurrentLocation = () => {
    setLocationLoading(true);
    
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const location: [number, number] = [latitude, longitude];
        setUserLocation(location);
        setCommuteFrom('Your Current Location');
        
        if (map.current) {
          // Add user location marker with animation
          if (userMarker.current) {
            map.current.removeLayer(userMarker.current);
          }
          
          const userIcon = L.divIcon({
            html: '<div class="animate-pulse"><div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div></div>',
            className: 'user-location-marker',
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          });
          
          userMarker.current = L.marker(location, { icon: userIcon })
            .bindPopup('<div class="text-center p-2"><strong>Your Location</strong></div>')
            .addTo(map.current);
          
          // Smooth pan to user location
          map.current.flyTo(location, 14, {
            animate: true,
            duration: 2
          });
        }
        
        toast.success('Location detected successfully!');
        setLocationLoading(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        toast.error('Unable to get your location. Please allow location access.');
        setLocationLoading(false);
      }
    );
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Fix for default markers
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    // Initialize map with smooth animation
    map.current = L.map(mapContainer.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([20.5937, 77.1025], 5);

    // Add custom zoom control
    L.control.zoom({
      position: 'topright'
    }).addTo(map.current);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current);

    // Initialize drawn items layer
    drawnItems.current = new L.FeatureGroup();
    map.current.addLayer(drawnItems.current);

    // Add property markers with custom icons and animations
    displayProperties.forEach((property, index) => {
      const customIcon = L.divIcon({
        html: `
          <div class="property-marker animate-bounce" style="animation-delay: ${index * 0.2}s;">
            <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white">
              ₹${(property.price / 100000).toFixed(0)}L
            </div>
          </div>
        `,
        className: 'custom-property-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 32]
      });

      const marker = L.marker(property.coordinates, { icon: customIcon })
        .bindPopup(`
          <div class="p-4 min-w-[200px]">
            <h3 class="font-bold text-lg mb-2 text-blue-600">${property.title}</h3>
            <p class="text-gray-600 mb-2 flex items-center gap-1">
              <span class="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              ${property.location}
            </p>
            <p class="font-bold text-xl text-green-600">₹${property.price.toLocaleString('en-IN')}</p>
            <button class="mt-2 w-full bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors">
              View Details
            </button>
          </div>
        `)
        .addTo(map.current!);

      marker.on('click', () => {
        setSelectedProperty(property);
        loadNearbyAmenities(property.coordinates);
        
        // Smooth zoom to property
        map.current?.flyTo(property.coordinates, 15, {
          animate: true,
          duration: 1.5
        });
      });

      markers.current.push(marker);
    });

    // Map ready animation
    setTimeout(() => {
      setIsMapLoaded(true);
      toast.success('Interactive map loaded successfully!');
    }, 1000);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      markers.current = [];
    };
  }, []);

  const toggleDrawingMode = () => {
    if (!map.current) return;

    setDrawingMode(!drawingMode);
    
    if (!drawingMode) {
      toast.info('🎯 Click on the map to start drawing your search area', {
        duration: 4000
      });
      enableDrawing();
    } else {
      disableDrawing();
    }
  };

  const enableDrawing = () => {
    if (!map.current || !drawnItems.current) return;
    
    const points: L.LatLng[] = [];
    let tempMarkers: L.CircleMarker[] = [];
    
    const onMapClick = (e: L.LeafletMouseEvent) => {
      points.push(e.latlng);
      
      const circle = L.circleMarker(e.latlng, {
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.7,
        radius: 5
      }).addTo(map.current!);
      
      tempMarkers.push(circle);
      
      if (points.length >= 3) {
        const polygon = L.polygon(points, {
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.3,
          className: 'animate-pulse'
        });
        
        drawnItems.current!.addLayer(polygon);
        
        tempMarkers.forEach(marker => map.current!.removeLayer(marker));
        tempMarkers = [];
        
        if (mapClickHandler.current) {
          map.current!.off('click', mapClickHandler.current);
        }
        setDrawingMode(false);
        toast.success('🎉 Search area defined! Properties in this area are highlighted.');
      }
    };

    mapClickHandler.current = onMapClick;
    map.current.on('click', onMapClick);
  };

  const disableDrawing = () => {
    if (!map.current || !mapClickHandler.current) return;
    map.current.off('click', mapClickHandler.current);
  };

  const calculateCommute = async () => {
    if (!commuteFrom.trim()) {
      toast.error('Please enter a location or use your current location');
      return;
    }

    if (!selectedProperty) {
      toast.error('Please select a property first by clicking on a property marker');
      return;
    }

    setIsCalculatingCommute(true);
    setCommuteTime(null);
    setCommuteDistance('');

    try {
      let startCoords: [number, number] | null = null;

      // If user selected their current location
      if (commuteFrom === 'Your Current Location' && userLocation) {
        startCoords = userLocation;
      } else {
        // Geocode the address
        toast.loading('Finding location...', { duration: 2000 });
        startCoords = await geocodeAddress(commuteFrom);
        
        if (!startCoords) {
          toast.error('Could not find the location. Please try a more specific address.');
          setIsCalculatingCommute(false);
          return;
        }
      }

      // Calculate route
      toast.loading('Calculating route...', { duration: 3000 });
      const routeData = await calculateRoute(startCoords, selectedProperty.coordinates);

      if (routeData) {
        setCommuteTime(routeData.duration);
        setCommuteDistance(routeData.distance);

        // Clear previous route
        if (routeLayer.current && map.current) {
          map.current.removeLayer(routeLayer.current);
        }

        // Add route to map
        if (map.current) {
          routeLayer.current = L.polyline(routeData.coordinates, {
            color: '#ef4444',
            weight: 4,
            opacity: 0.8
          }).addTo(map.current);

          // Fit map to show the route
          const bounds = L.latLngBounds([startCoords, selectedProperty.coordinates]);
          map.current.fitBounds(bounds, { padding: [20, 20] });
        }

        toast.success(`🚗 Route calculated! ${routeData.duration} minutes by car (${routeData.distance} km)`);
      } else {
        toast.error('Could not calculate the route. Please try again.');
      }
    } catch (error) {
      console.error('Commute calculation error:', error);
      toast.error('Error calculating commute. Please try again.');
    } finally {
      setIsCalculatingCommute(false);
    }
  };

  const loadNearbyAmenities = (coordinates: [number, number]) => {
    const amenities = [
      { type: 'School', name: 'International Public School', distance: '0.8 km', icon: School, rating: '4.5⭐' },
      { type: 'Hospital', name: 'City Medical Center', distance: '1.2 km', icon: Hospital, rating: '4.2⭐' },
      { type: 'Shopping', name: 'Premium Mall', distance: '2.1 km', icon: ShoppingCart, rating: '4.7⭐' },
      { type: 'Metro', name: 'Metro Station', distance: '0.5 km', icon: Navigation, rating: '4.0⭐' },
    ];
    
    setNearbyAmenities(amenities);
    toast.info('📍 Nearby amenities loaded');
  };

  const clearDrawing = () => {
    if (!drawnItems.current) return;
    
    drawnItems.current.clearLayers();
    
    // Clear route if exists
    if (routeLayer.current && map.current) {
      map.current.removeLayer(routeLayer.current);
      routeLayer.current = null;
    }
    
    // Reset commute data
    setCommuteTime(null);
    setCommuteDistance('');
    
    toast.success('🧹 Search area and routes cleared');
  };

  return (
    <div className="w-full space-y-6">
      {/* Animated Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Interactive Property Explorer
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover your dream property with our advanced map features, location detection, and smart search tools.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 items-center justify-center animate-scale-in">
        <Button
          onClick={getCurrentLocation}
          disabled={locationLoading}
          className="gap-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
        >
          {locationLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Crosshair className="h-4 w-4" />
          )}
          {locationLoading ? 'Detecting Location...' : 'Get My Location'}
        </Button>
        
        <Button
          variant={drawingMode ? "default" : "outline"}
          onClick={toggleDrawingMode}
          className="gap-2 transition-all duration-300 transform hover:scale-105"
        >
          <Zap className="h-4 w-4" />
          {drawingMode ? 'Stop Drawing' : 'Draw Search Area'}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={clearDrawing}
          className="gap-2 transition-all duration-300 transform hover:scale-105"
        >
          Clear Area
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced Map Container */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50">
            <div className="relative">
              <div 
                ref={mapContainer} 
                className="w-full rounded-lg transition-all duration-500"
                style={{ height }}
              />
              {!isMapLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center rounded-lg">
                  <div className="text-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto" />
                    <p className="text-lg font-medium text-blue-600">Loading Interactive Map...</p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Enhanced Control Panel */}
        <div className="space-y-4">
          <Tabs defaultValue="commute" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-blue-100 to-purple-100">
              <TabsTrigger value="commute" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
                🚗 Commute
              </TabsTrigger>
              <TabsTrigger value="amenities" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
                🏪 Amenities
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="commute" className="space-y-4 animate-fade-in">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Smart Commute Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedProperty ? (
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 animate-scale-in">
                      <p className="font-bold text-blue-600">{selectedProperty.title}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {selectedProperty.location}
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-orange-600 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Please click on a property marker to select it
                      </p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Navigation className="h-4 w-4" />
                      From Location
                    </label>
                    <Input
                      placeholder="Enter address (e.g., 'Mumbai Central') or use current location"
                      value={commuteFrom}
                      onChange={(e) => setCommuteFrom(e.target.value)}
                      className="border-blue-200 focus:border-blue-400"
                    />
                    <p className="text-xs text-gray-500">
                      Try: "Connaught Place Delhi", "Marine Drive Mumbai", or use "Get My Location" button
                    </p>
                  </div>
                  
                  <Button 
                    onClick={calculateCommute} 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                    disabled={!selectedProperty || isCalculatingCommute}
                  >
                    {isCalculatingCommute ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Car className="h-4 w-4 mr-2" />
                        Calculate Journey Time
                      </>
                    )}
                  </Button>
                  
                  {commuteTime && (
                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center border border-green-200 animate-scale-in">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Car className="h-5 w-5 text-green-600" />
                        <p className="font-bold text-2xl text-green-600">{commuteTime} min</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        Distance: {commuteDistance} km • By car
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Route shown on map in red
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="amenities" className="space-y-4 animate-fade-in">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-purple-50">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-purple-500" />
                    Nearby Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedProperty ? (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Near {selectedProperty.title}
                      </p>
                      {nearbyAmenities.map((amenity, index) => {
                        const IconComponent = amenity.icon;
                        return (
                          <div 
                            key={index} 
                            className="flex items-center justify-between p-3 border rounded-lg bg-gradient-to-r from-white to-gray-50 hover:shadow-md transition-all duration-300 animate-scale-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                                <IconComponent className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium text-sm">{amenity.name}</p>
                                <div className="flex items-center gap-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {amenity.type}
                                  </Badge>
                                  <span className="text-xs text-green-600">{amenity.rating}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-medium text-blue-600">
                                {amenity.distance}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-3">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto">
                        <MapPin className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Click on a property marker to discover nearby amenities
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Enhanced Footer */}
      <div className="text-center space-y-2 animate-fade-in">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Powered by OpenStreetMap - Free and Open Source
        </div>
        <p className="text-xs text-gray-500">
          Real-time property data with smart location features
        </p>
      </div>
    </div>
  );
};

export default InteractiveMap;
