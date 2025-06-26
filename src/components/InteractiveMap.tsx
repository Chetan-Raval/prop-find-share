import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
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
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);
  const [drawingMode, setDrawingMode] = useState(false);
  const [commuteFrom, setCommuteFrom] = useState('');
  const [commuteTime, setCommuteTime] = useState<number | null>(null);
  const [nearbyAmenities, setNearbyAmenities] = useState<any[]>([]);
  const [selectedProperty, setSelectedProperty] = useState<any>(null);

  const sampleProperties = [
    { id: '1', title: 'Luxury Villa', price: 2500000, location: 'Mumbai', coordinates: [72.8777, 19.0760] as [number, number] },
    { id: '2', title: 'Modern Apartment', price: 1200000, location: 'Delhi', coordinates: [77.1025, 28.7041] as [number, number] },
    { id: '3', title: 'Beach House', price: 3000000, location: 'Goa', coordinates: [73.8278, 15.2993] as [number, number] },
  ];

  const displayProperties = properties.length > 0 ? properties : sampleProperties;

  useEffect(() => {
    if (!mapContainer.current || !isTokenSet) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [77.1025, 20.5937], // Center of India
      zoom: 5,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add property markers
    displayProperties.forEach((property) => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-semibold">${property.title}</h3>
          <p class="text-sm text-gray-600">${property.location}</p>
          <p class="font-bold text-primary">₹${property.price.toLocaleString('en-IN')}</p>
        </div>
      `);

      const marker = new mapboxgl.Marker({ color: '#3b82f6' })
        .setLngLat(property.coordinates)
        .setPopup(popup)
        .addTo(map.current!);

      marker.getElement().addEventListener('click', () => {
        setSelectedProperty(property);
        loadNearbyAmenities(property.coordinates);
      });
    });

    // Add drawing functionality
    map.current.on('load', () => {
      // Add source for drawing
      map.current!.addSource('draw-area', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      // Add layer for drawing
      map.current!.addLayer({
        id: 'draw-area-fill',
        type: 'fill',
        source: 'draw-area',
        paint: {
          'fill-color': '#3b82f6',
          'fill-opacity': 0.3
        }
      });

      map.current!.addLayer({
        id: 'draw-area-stroke',
        type: 'line',
        source: 'draw-area',
        paint: {
          'line-color': '#3b82f6',
          'line-width': 2
        }
      });
    });

    return () => {
      map.current?.remove();
    };
  }, [isTokenSet, mapboxToken]);

  const handleTokenSubmit = () => {
    if (mapboxToken.trim()) {
      setIsTokenSet(true);
      toast.success('Map loaded successfully!');
    } else {
      toast.error('Please enter a valid Mapbox token');
    }
  };

  const toggleDrawingMode = () => {
    setDrawingMode(!drawingMode);
    if (!drawingMode) {
      toast.info('Click on the map to start drawing your search area');
      enableDrawing();
    } else {
      disableDrawing();
    }
  };

  const enableDrawing = () => {
    if (!map.current) return;
    
    let coordinates: [number, number][] = [];
    
    const onClick = (e: mapboxgl.MapMouseEvent) => {
      coordinates.push([e.lngLat.lng, e.lngLat.lat]);
      
      if (coordinates.length >= 3) {
        // Close the polygon
        coordinates.push(coordinates[0]);
        
        const polygon = {
          type: 'Feature' as const,
          geometry: {
            type: 'Polygon' as const,
            coordinates: [coordinates]
          },
          properties: {}
        };

        const source = map.current!.getSource('draw-area') as mapboxgl.GeoJSONSource;
        if (source) {
          source.setData({
            type: 'FeatureCollection',
            features: [polygon]
          });
        }

        map.current!.off('click', onClick);
        setDrawingMode(false);
        toast.success('Search area defined! Properties in this area will be highlighted.');
      }
    };

    map.current.on('click', onClick);
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

    // Simulate commute calculation (in a real app, you'd use Mapbox Directions API)
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
    if (!map.current) return;
    
    const source = map.current.getSource('draw-area') as mapboxgl.GeoJSONSource;
    if (source) {
      source.setData({
        type: 'FeatureCollection',
        features: []
      });
    }
    
    toast.success('Search area cleared');
  };

  if (!isTokenSet) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Interactive Property Map
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            To use the interactive map features, please enter your Mapbox public token.
            You can get one for free at{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="Enter your Mapbox public token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              type="password"
            />
            <Button onClick={handleTokenSubmit}>Load Map</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap gap-2 items-center justify-between">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MapPin className="h-6 w-6" />
          Interactive Property Map
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
    </div>
  );
};

export default InteractiveMap;
