
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, School, Hospital, ShoppingCart, Car, Navigation } from 'lucide-react';
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

const InteractiveMap = ({ properties = [], height = "500px" }: InteractiveMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const [drawingMode, setDrawingMode] = useState(false);
  const [commuteFrom, setCommuteFrom] = useState('');
  const [commuteTime, setCommuteTime] = useState<number | null>(null);
  const [nearbyAmenities, setNearbyAmenities] = useState<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const drawnItems = useRef<L.FeatureGroup | null>(null);
  const markers = useRef<L.Marker[]>([]);

  const sampleProperties = [
    { id: '1', title: 'Luxury Villa', price: 2500000, location: 'Mumbai', coordinates: [19.0760, 72.8777] as [number, number] },
    { id: '2', title: 'Modern Apartment', price: 1200000, location: 'Delhi', coordinates: [28.7041, 77.1025] as [number, number] },
    { id: '3', title: 'Beach House', price: 3000000, location: 'Goa', coordinates: [15.2993, 73.8278] as [number, number] },
  ];

  const displayProperties = properties.length > 0 ? properties : sampleProperties;

  useEffect(() => {
    if (!mapContainer.current) return;

    // Fix for default markers
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    // Initialize map
    map.current = L.map(mapContainer.current).setView([20.5937, 77.1025], 5);

    // Add OpenStreetMap tiles (free)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current);

    // Initialize drawn items layer
    drawnItems.current = new L.FeatureGroup();
    map.current.addLayer(drawnItems.current);

    // Add property markers
    displayProperties.forEach((property) => {
      const marker = L.marker(property.coordinates)
        .bindPopup(`
          <div style="padding: 8px;">
            <h3 style="font-weight: bold; margin: 0 0 4px 0;">${property.title}</h3>
            <p style="margin: 0 0 4px 0; color: #666;">${property.location}</p>
            <p style="margin: 0; font-weight: bold; color: #3b82f6;">₹${property.price.toLocaleString('en-IN')}</p>
          </div>
        `)
        .addTo(map.current!);

      marker.on('click', () => {
        setSelectedProperty(property);
        loadNearbyAmenities(property.coordinates);
      });

      markers.current.push(marker);
    });

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
      toast.info('Click on the map to start drawing your search area (minimum 3 points)');
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
      
      // Add a small circle to show the clicked point
      const circle = L.circleMarker(e.latlng, {
        color: '#3b82f6',
        fillColor: '#3b82f6',
        fillOpacity: 0.7,
        radius: 5
      }).addTo(map.current!);
      
      tempMarkers.push(circle);
      
      if (points.length >= 3) {
        // Create polygon
        const polygon = L.polygon(points, {
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.3
        });
        
        drawnItems.current!.addLayer(polygon);
        
        // Clean up temp markers
        tempMarkers.forEach(marker => map.current!.removeLayer(marker));
        tempMarkers = [];
        
        // Remove click event
        map.current!.off('click', onMapClick);
        setDrawingMode(false);
        toast.success('Search area defined! Properties in this area will be highlighted.');
      }
    };

    map.current.on('click', onMapClick);
  };

  const disableDrawing = () => {
    if (!map.current) return;
    map.current.off('click');
  };

  const calculateCommute = async () => {
    if (!commuteFrom.trim() || !selectedProperty) {
      toast.error('Please select a property and enter your commute location');
      return;
    }

    // Simulate commute calculation
    const simulatedTime = Math.floor(Math.random() * 60) + 15;
    setCommuteTime(simulatedTime);
    toast.success(`Estimated commute time: ${simulatedTime} minutes`);
  };

  const loadNearbyAmenities = (coordinates: [number, number]) => {
    // Simulate loading nearby amenities
    const amenities = [
      { type: 'School', name: 'Central Public School', distance: '0.8 km', icon: School },
      { type: 'Hospital', name: 'City Medical Center', distance: '1.2 km', icon: Hospital },
      { type: 'Shopping', name: 'Metro Mall', distance: '2.1 km', icon: ShoppingCart },
      { type: 'Metro', name: 'Metro Station', distance: '0.5 km', icon: Navigation },
    ];
    
    setNearbyAmenities(amenities);
  };

  const clearDrawing = () => {
    if (!drawnItems.current) return;
    
    drawnItems.current.clearLayers();
    toast.success('Search area cleared');
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MapPin className="h-6 w-6" />
          Interactive Property Map (Free Version)
        </h2>
        <div className="flex gap-2">
          <Button
            variant={drawingMode ? "default" : "outline"}
            onClick={toggleDrawingMode}
            size="sm"
          >
            {drawingMode ? 'Stop Drawing' : 'Draw Search Area'}
          </Button>
          <Button variant="outline" onClick={clearDrawing} size="sm">
            Clear Area
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Map */}
        <div className="lg:col-span-2">
          <div 
            ref={mapContainer} 
            className="w-full rounded-lg border shadow-sm"
            style={{ height }}
          />
        </div>

        {/* Controls and Info */}
        <div className="space-y-4">
          <Tabs defaultValue="commute" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="commute">Commute</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
            </TabsList>
            
            <TabsContent value="commute" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Commute Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedProperty && (
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="font-medium">{selectedProperty.title}</p>
                      <p className="text-sm text-gray-600">{selectedProperty.location}</p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">From (Your Location)</label>
                    <Input
                      placeholder="Enter your work/home address"
                      value={commuteFrom}
                      onChange={(e) => setCommuteFrom(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    onClick={calculateCommute} 
                    className="w-full"
                    disabled={!selectedProperty}
                  >
                    <Car className="mr-2 h-4 w-4" />
                    Calculate Commute
                  </Button>
                  
                  {commuteTime && (
                    <div className="p-3 bg-green-50 rounded-lg text-center">
                      <p className="font-bold text-lg">{commuteTime} minutes</p>
                      <p className="text-sm text-gray-600">Estimated commute time</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="amenities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Nearby Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedProperty ? (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground mb-3">
                        Amenities near {selectedProperty.title}
                      </p>
                      {nearbyAmenities.map((amenity, index) => {
                        const IconComponent = amenity.icon;
                        return (
                          <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4 text-primary" />
                              <div>
                                <p className="font-medium text-sm">{amenity.name}</p>
                                <Badge variant="secondary" className="text-xs">
                                  {amenity.type}
                                </Badge>
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {amenity.distance}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Click on a property marker to see nearby amenities
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="text-center text-sm text-muted-foreground">
        Powered by OpenStreetMap - Free and Open Source
      </div>
    </div>
  );
};

export default InteractiveMap;
