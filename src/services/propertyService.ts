
import api from './api';
import { PropertyData } from '@/components/PropertyCard';

export interface CreatePropertyRequest {
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: "sale" | "hire";
  imageUrl: string;
  address?: string;
  description?: string;
}

export const propertyService = {
  // Get all properties
  getAllProperties: async (): Promise<PropertyData[]> => {
    const response = await api.get('/properties');
    return response.data;
  },

  // Get property by ID
  getPropertyById: async (id: string): Promise<PropertyData> => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  // Create new property (vendor only)
  createProperty: async (propertyData: CreatePropertyRequest): Promise<PropertyData> => {
    const response = await api.post('/properties', propertyData);
    return response.data;
  },

  // Update property (vendor only)
  updateProperty: async (id: string, propertyData: Partial<CreatePropertyRequest>): Promise<PropertyData> => {
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data;
  },

  // Delete property (vendor only)
  deleteProperty: async (id: string): Promise<void> => {
    await api.delete(`/properties/${id}`);
  },

  // Get vendor's properties
  getVendorProperties: async (): Promise<PropertyData[]> => {
    const response = await api.get('/properties/vendor/my-properties');
    return response.data;
  },

  // Search properties
  searchProperties: async (query: string): Promise<PropertyData[]> => {
    const response = await api.get(`/properties/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
};
