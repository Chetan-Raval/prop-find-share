
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { PropertyData } from "@/components/PropertyCard";
import { toast } from "sonner";

interface FavoritesContextType {
  favorites: PropertyData[];
  addToFavorites: (property: PropertyData) => void;
  removeFromFavorites: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

const FAVORITES_STORAGE_KEY = "findIndiaHomeFavorites";

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<PropertyData[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Failed to parse saved favorites:", error);
        localStorage.removeItem(FAVORITES_STORAGE_KEY);
      }
    }
    setIsInitialized(true);
  }, []);

  const saveFavorites = (newFavorites: PropertyData[]) => {
    setFavorites(newFavorites);
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
  };

  const addToFavorites = (property: PropertyData) => {
    const isAlreadyFavorite = favorites.some(fav => fav.id === property.id);
    if (!isAlreadyFavorite) {
      const newFavorites = [...favorites, property];
      saveFavorites(newFavorites);
      toast.success("Property added to favorites!");
    }
  };

  const removeFromFavorites = (propertyId: string) => {
    const newFavorites = favorites.filter(fav => fav.id !== propertyId);
    saveFavorites(newFavorites);
    toast.success("Property removed from favorites");
  };

  const isFavorite = (propertyId: string) => {
    return favorites.some(fav => fav.id === propertyId);
  };

  const clearFavorites = () => {
    saveFavorites([]);
    toast.success("All favorites cleared");
  };

  // Don't render children until context is initialized
  if (!isInitialized) {
    return null;
  }

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites, 
        addToFavorites, 
        removeFromFavorites, 
        isFavorite, 
        clearFavorites 
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
