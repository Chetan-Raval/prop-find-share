import { PropertyData } from "@/components/PropertyCard";

// Mock property data
export interface PropertyData {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "sale" | "hire";
  imageUrl: string;
  images?: string[];
  status?: string;
  address?: string;
}

export const mockProperties: PropertyData[] = [
  {
    id: "1",
    title: "Luxury Modern Apartment",
    price: 450000,
    location: "Downtown, New York",
    bedrooms: 3,
    bathrooms: 2,
    area: 1200,
    type: "sale",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"
    ],
    status: "active"
  },
  {
    id: "2",
    title: "Cozy Family House",
    price: 2500,
    location: "Brooklyn, NY",
    bedrooms: 4,
    bathrooms: 3,
    area: 1800,
    type: "hire",
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&h=600&fit=crop"
    ],
    status: "active"
  },
  {
    id: "3",
    title: "Studio Apartment",
    price: 1800,
    location: "Manhattan, NY",
    bedrooms: 1,
    bathrooms: 1,
    area: 600,
    type: "hire",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"
    ],
    status: "active"
  },
  {
    id: "4",
    title: "Penthouse with City View",
    price: 1200000,
    location: "Upper East Side, NY",
    bedrooms: 5,
    bathrooms: 4,
    area: 2500,
    type: "sale",
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&h=600&fit=crop"
    ],
    status: "active"
  }
];

// Keep existing users and other exports
export const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "customer" as const,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: "2", 
    name: "Jane Smith",
    email: "jane@example.com",
    role: "vendor" as const,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  }
];

export const mockMessages = [
  {
    id: "1",
    senderId: "1",
    receiverId: "2", 
    content: "Hi, I'm interested in the luxury apartment listing.",
    timestamp: new Date(Date.now() - 3600000),
    propertyId: "1",
    read: true
  },
  {
    id: "2",
    senderId: "2",
    receiverId: "1",
    content: "Thank you for your interest! I'd be happy to schedule a viewing.",
    timestamp: new Date(Date.now() - 3000000),
    propertyId: "1", 
    read: false
  }
];
