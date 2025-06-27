import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { MapPin, Clock, School, Hospital, ShoppingCart, Navigation, Loader2, Crosshair, Zap, Car, Sun, Moon, Layers, Eye } from 'lucide-react';
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [is3DMode, setIs3DMode] = useState(true);
  const [mapStyle, setMapStyle] = useState('satellite');
  const drawnItems = useRef<L.FeatureGroup | null>(null);
  const markers = useRef<L.Marker[]>([]);
  const userMarker = useRef<L.Marker | null>(null);
  const routeLayer = useRef<L.Polyline | null>(null);
  const mapClickHandler = useRef<((e: L.LeafletMouseEvent) => void) | null>(null);
  const currentTileLayer = useRef<L.TileLayer | null>(null);

  const sampleProperties = [
    { id: '1', title: 'Luxury Villa', price: 2500000, location: 'Mumbai', coordinates: [19.0760, 72.8777] as [number, number] },
    { id: '2', title: 'Modern Apartment', price: 1200000, location: 'Delhi', coordinates: [28.7041, 77.1025] as [number, number] },
    { id: '3', title: 'Beach House', price: 3000000, location: 'Goa', coordinates: [15.2993, 73.8278] as [number, number] },
    { id: '4', title: 'Penthouse Suite', price: 4500000, location: 'Bangalore', coordinates: [12.9716, 77.5946] as [number, number] },
    { id: '5', title: 'Garden Villa', price: 1800000, location: 'Chennai', coordinates: [13.0827, 80.2707] as [number, number] },
  ];

  const displayProperties = properties.length > 0 ? properties : sampleProperties;

  // Map style configurations
  const mapStyles = {
    standard: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '© OpenStreetMap contributors'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '© Esri, Maxar, Earthstar Geographics'
    },
    terrain: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '© OpenTopoMap contributors'
    },
    dark: {
      url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
      attribution: '© Stadia Maps © OpenMapTiles © OpenStreetMap contributors'
    }
  };

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
        const duration = Math.round(route.duration / 60);
        const distance = (route.distance / 1000).toFixed(1);
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

  // Switch map style
  const switchMapStyle = (style: string) => {
    if (!map.current || !currentTileLayer.current) return;
    
    map.current.removeLayer(currentTileLayer.current);
    
    const styleConfig = mapStyles[style as keyof typeof mapStyles];
    currentTileLayer.current = L.tileLayer(styleConfig.url, {
      attribution: styleConfig.attribution,
      maxZoom: 19
    }).addTo(map.current);
    
    setMapStyle(style);
    toast.success(`🎨 Switched to ${style} view`);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      switchMapStyle('dark');
    } else {
      switchMapStyle('standard');
    }
  };

  // Create 3D property marker
  const create3DMarker = (property: any, index: number) => {
    const markerHtml = `
      <div class="property-marker-3d ${is3DMode ? 'mode-3d' : ''}" style="animation-delay: ${index * 0.2}s;">
        <div class="marker-container">
          <div class="marker-shadow"></div>
          <div class="marker-pin">
            <div class="marker-content">
              <div class="price-tag">₹${(property.price / 100000).toFixed(0)}L</div>
              <div class="property-type">${property.title.split(' ')[0]}</div>
            </div>
            <div class="marker-pulse"></div>
          </div>
        </div>
      </div>
    `;

    return L.divIcon({
      html: markerHtml,
      className: 'custom-3d-marker',
      iconSize: [60, 80],
      iconAnchor: [30, 80],
      popupAnchor: [0, -80]
    });
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
          if (userMarker.current) {
            map.current.removeLayer(userMarker.current);
          }
          
          const userIcon = L.divIcon({
            html: '<div class="user-location-3d"><div class="location-pulse"></div><div class="location-dot"></div></div>',
            className: 'user-location-marker',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
          });
          
          userMarker.current = L.marker(location, { icon: userIcon })
            .bindPopup('<div class="location-popup"><strong>📍 Your Location</strong></div>')
            .addTo(map.current);
          
          map.current.flyTo(location, 14, {
            animate: true,
            duration: 2
          });
        }
        
        toast.success('🎯 Location detected successfully!');
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

    // Add custom 3D CSS styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      .property-marker-3d {
        transform-style: preserve-3d;
        animation: markerFloat 3s ease-in-out infinite;
      }
      
      .mode-3d .marker-container {
        transform: perspective(100px) rotateX(20deg);
        transition: all 0.3s ease;
      }
      
      .marker-container:hover {
        transform: perspective(100px) rotateX(0deg) scale(1.1);
      }
      
      .marker-shadow {
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 20px;
        background: rgba(0,0,0,0.3);
        border-radius: 50%;
        filter: blur(4px);
        animation: shadowPulse 3s ease-in-out infinite;
      }
      
      .marker-pin {
        position: relative;
        width: 50px;
        height: 60px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 25px 25px 25px 5px;
        border: 3px solid white;
        box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transform: rotate(-45deg);
      }
      
      .marker-content {
        transform: rotate(45deg);
        text-align: center;
        color: white;
        font-size: 10px;
        font-weight: bold;
      }
      
      .price-tag {
        font-size: 11px;
        margin-bottom: 2px;
      }
      
      .property-type {
        font-size: 8px;
        opacity: 0.8;
      }
      
      .marker-pulse {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;
        border: 2px solid #667eea;
        border-radius: 50%;
        animation: pulse 2s ease-out infinite;
      }
      
      .user-location-3d {
        position: relative;
        width: 24px;
        height: 24px;
      }
      
      .location-pulse {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 2px solid #3b82f6;
        border-radius: 50%;
        animation: pulse 2s ease-out infinite;
      }
      
      .location-dot {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 12px;
        height: 12px;
        background: #3b82f6;
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(59,130,246,0.4);
      }
      
      @keyframes markerFloat {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      
      @keyframes shadowPulse {
        0%, 100% { opacity: 0.3; transform: translateX(-50%) scale(1); }
        50% { opacity: 0.1; transform: translateX(-50%) scale(1.2); }
      }
      
      @keyframes pulse {
        0% { opacity: 1; transform: translate(-50%, -50%) scale(0.8); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(2.5); }
      }
      
      .location-popup {
        padding: 8px 12px;
        text-align: center;
        font-weight: bold;
        color: #3b82f6;
      }
      
      .leaflet-container {
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      }
    `;
    document.head.appendChild(styleSheet);

    // Fix for default markers
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    // Initialize map
    map.current = L.map(mapContainer.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([20.5937, 77.1025], 5);

    // Add custom zoom control
    L.control.zoom({
      position: 'topright'
    }).addTo(map.current);

    // Add initial tile layer
    const initialStyle = mapStyles.satellite;
    currentTileLayer.current = L.tileLayer(initialStyle.url, {
      attribution: initialStyle.attribution,
      maxZoom: 19
    }).addTo(map.current);

    // Initialize drawn items layer
    drawnItems.current = new L.FeatureGroup();
    map.current.addLayer(drawnItems.current);

    // Add property markers with 3D effects
    displayProperties.forEach((property, index) => {
      const customIcon = create3DMarker(property, index);

      const marker = L.marker(property.coordinates, { icon: customIcon })
        .bindPopup(`
          <div class="property-popup" style="font-family: sans-serif; min-width: 200px;">
            <div class="popup-header" style="margin-bottom: 6px;">
              <h3 style="margin: 0; font-weight: 700; color: #3b82f6;">${property.title}</h3>
              <div class="popup-location" style="display: flex; align-items: center; gap: 4px; color: #555;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 6-9 13-9 13S3 16 3 10a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${property.location}
              </div>
            </div>
            <div class="popup-price" style="font-weight: 700; font-size: 1.25rem; color: #16a34a; margin-bottom: 8px;">₹${property.price.toLocaleString('en-IN')}</div>
            <button class="popup-button" style="width: 100%; padding: 8px; background: #3b82f6; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; transition: background-color 0.3s;">
              View Details
            </button>
          </div>
        `)
        .addTo(map.current!);

      marker.on('click', () => {
        setSelectedProperty(property);
        loadNearbyAmenities(property.coordinates);
        
        map.current?.flyTo(property.coordinates, 15, {
          animate: true,
          duration: 1.5
        });
      });

      markers.current.push(marker);
    });

    setTimeout(() => {
      setIsMapLoaded(true);
      toast.success('🚀 Amazing 3D Map loaded successfully!');
    }, 1000);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      markers.current = [];
      if (styleSheet.parentNode) {
        styleSheet.parentNode.removeChild(styleSheet);
      }
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

      if (commuteFrom === 'Your Current Location' && userLocation) {
        startCoords = userLocation;
      } else {
        toast.loading('Finding location...', { duration: 2000 });
        startCoords = await geocodeAddress(commuteFrom);
        
        if (!startCoords) {
          toast.error('Could not find the location. Please try a more specific address.');
          setIsCalculatingCommute(false);
          return;
        }
      }

      toast.loading('Calculating route...', { duration: 3000 });
      const routeData = await calculateRoute(startCoords, selectedProperty.coordinates);

      if (routeData) {
        setCommuteTime(routeData.duration);
        setCommuteDistance(routeData.distance);

        if (routeLayer.current && map.current) {
          map.current.removeLayer(routeLayer.current);
        }

        if (map.current) {
          routeLayer.current = L.polyline(routeData.coordinates, {
            color: '#ef4444',
            weight: 4,
            opacity: 0.8
          }).addTo(map.current);

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
    
    if (routeLayer.current && map.current) {
      map.current.removeLayer(routeLayer.current);
      routeLayer.current = null;
    }
    
    setCommuteTime(null);
    setCommuteDistance('');
    
    toast.success('🧹 Search area and routes cleared');
  };

  return (
    <div className="w-full space-y-6">
      {/* Enhanced Header with Controls */}
      <div className="text-center space-y-6 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
            <MapPin className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Amazing 3D Property Explorer
          </h1>
        </div>
        
        {/* Control Panel */}
        <div className="flex flex-wrap gap-4 items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-blue-100">
          {/* Theme Toggle */}
          <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
            <Sun className="h-4 w-4 text-yellow-500" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
            />
            <Moon className="h-4 w-4 text-blue-500" />
          </div>

          {/* 3D Mode Toggle */}
          <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
            <Eye className="h-4 w-4 text-purple-500" />
            <Switch
              checked={is3DMode}
              onCheckedChange={setIs3DMode}
            />
            <Layers className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium">3D View</span>
          </div>

          {/* Map Style Selector */}
          <div className="flex gap-2">
            {Object.keys(mapStyles).map((style) => (
              <Button
                key={style}
                variant={mapStyle === style ? "default" : "outline"}
                size="sm"
                onClick={() => switchMapStyle(style)}
                className="capitalize"
              >
                {style}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 items-center justify-center animate-scale-in">
        <Button
          onClick={getCurrentLocation}
          disabled={locationLoading}
          className="gap-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
          className="gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <Zap className="h-4 w-4" />
          {drawingMode ? 'Stop Drawing' : 'Draw Search Area'}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={clearDrawing}
          className="gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Clear Area
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced 3D Map Container */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50 transform transition-all duration-500 hover:scale-[1.02]">
            <div className="relative">
              <div 
                ref={mapContainer} 
                className="w-full rounded-lg transition-all duration-500"
                style={{ height }}
              />
              {!isMapLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center rounded-lg">
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto" />
                      <div className="absolute inset-0 h-12 w-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
                    </div>
                    <p className="text-lg font-medium text-blue-600">Loading Amazing 3D Map...</p>
                    <div className="flex justify-center gap-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Enhanced Control Panel */}
        <div className="space-y-4">
          <Tabs defaultValue="commute" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-blue-100 to-purple-100 shadow-lg">
              <TabsTrigger value="commute" className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                🚗 Commute
              </TabsTrigger>
              <TabsTrigger value="amenities" className="data-[state=active]:bg-white data-[state=active]:shadow-md transition-all">
                🏪 Amenities
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="commute" className="space-y-4 animate-fade-in">
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50 transform transition-all duration-300 hover:shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Smart Commute Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedProperty ? (
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200 animate-scale-in shadow-lg">
                      <p className="font-bold text-blue-600">{selectedProperty.title}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {selectedProperty.location}
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg shadow-lg">
                      <p className="text-sm text-orange-600 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Please click on a 3D property marker to select it
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
                      className="border-blue-200 focus:border-blue-400 shadow-lg"
                    />
                  </div>
                  
                  <Button 
                    onClick={calculateCommute} 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
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
                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg text-center border border-green-200 animate-scale-in shadow-lg">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Car className="h-5 w-5 text-green-600" />
                        <p className="font-bold text-2xl text-green-600">{commuteTime} min</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        Distance: {commuteDistance} km • By car
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="amenities" className="space-y-4 animate-fade-in">
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50 transform transition-all duration-300 hover:shadow-2xl">
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
                            className="flex items-center justify-between p-3 border rounded-lg bg-gradient-to-r from-white to-gray-50 hover:shadow-lg transition-all duration-300 animate-scale-in transform hover:scale-105"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
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
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto shadow-lg">
                        <MapPin className="h-8 w-8 text-gray-400" />
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Click on a 3D property marker to discover nearby amenities
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
          Powered by OpenStreetMap & Free 3D Technology
        </div>
        <p className="text-xs text-gray-500">
          🚀 Amazing 3D property visualization with real-time data
        </p>
      </div>
    </div>
  );
};

export default InteractiveMap;
