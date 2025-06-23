
import { Button } from "@/components/ui/button";
import PropertyCard from "@/components/PropertyCard";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { Heart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">Login Required</h1>
          <p className="text-muted-foreground mb-6">
            Please log in to view your favorite properties.
          </p>
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-4">No Favorites Yet</h1>
          <p className="text-muted-foreground mb-6">
            Start browsing properties and save your favorites to see them here.
          </p>
          <Button asChild>
            <Link to="/properties">Browse Properties</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Favorites</h1>
          <p className="text-muted-foreground">
            You have {favorites.length} favorite {favorites.length === 1 ? 'property' : 'properties'}
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={clearFavorites}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
