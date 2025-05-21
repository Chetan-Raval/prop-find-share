
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { mockProperties } from "@/data/mockData";
import PropertyCard, { PropertyData } from "@/components/PropertyCard";
import { Home, MessageSquare, User } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [userProperties, setUserProperties] = useState<PropertyData[]>([]);
  const isVendor = user?.role === "vendor";
  
  useEffect(() => {
    if (isVendor) {
      // Simulate vendor's properties (first 3 from mock data)
      setUserProperties(mockProperties.slice(0, 3));
    } else {
      // Simulate saved properties for customer (random 3 from mock data)
      const saved = [...mockProperties].sort(() => 0.5 - Math.random()).slice(0, 3);
      setUserProperties(saved);
    }
  }, [isVendor]);
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">
          {isVendor
            ? "Manage your property listings and communications"
            : "Browse properties and manage your saved listings"}
        </p>
      </div>
      
      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              {isVendor ? "My Properties" : "Saved Properties"}
            </CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userProperties.length}</div>
            <p className="text-xs text-muted-foreground">
              {isVendor ? "Active listings" : "Properties saved"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Unread messages</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Properties section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {isVendor ? "My Properties" : "Saved Properties"}
          </h2>
          {isVendor && (
            <Button asChild>
              <Link to="/dashboard/create-property">Add New Property</Link>
            </Button>
          )}
        </div>
        
        {userProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <Card className="flex h-40 items-center justify-center">
            <div className="text-center">
              <p className="mb-4 text-muted-foreground">
                {isVendor
                  ? "You haven't listed any properties yet"
                  : "You haven't saved any properties yet"}
              </p>
              <Button asChild>
                <Link to={isVendor ? "/dashboard/create-property" : "/properties"}>
                  {isVendor ? "Add Your First Property" : "Browse Properties"}
                </Link>
              </Button>
            </div>
          </Card>
        )}
      </div>
      
      {/* Recent activity section */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
        <Card>
          <div className="divide-y">
            <div className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">New message received</p>
                <p className="text-sm text-muted-foreground">
                  You have a new message about{" "}
                  {isVendor ? "your property listing" : "a property you inquired about"}
                </p>
              </div>
              <p className="ml-auto text-sm text-muted-foreground">
                2 hours ago
              </p>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                <User className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Profile updated</p>
                <p className="text-sm text-muted-foreground">
                  Your profile information was updated successfully
                </p>
              </div>
              <p className="ml-auto text-sm text-muted-foreground">
                Yesterday
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
