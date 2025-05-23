
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { mockProperties } from "@/data/mockData";
import PropertyCard from "@/components/PropertyCard";
import { 
  Home, 
  MessageSquare, 
  User,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const { user, isVendor } = useAuth();
  const navigate = useNavigate();
  
  // Redirect vendor users to the specialized vendor dashboard
  useEffect(() => {
    if (isVendor) {
      navigate('/dashboard/vendor');
    }
  }, [isVendor, navigate]);

  // If user is a vendor, don't render the customer dashboard
  if (isVendor) return null;
  
  // Customer dashboard starts here
  const userProperties = mockProperties.slice(0, 3);
  
  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold">Welcome, {user?.name}</h1>
        <p className="text-muted-foreground">
          Browse properties and manage your saved listings
        </p>
      </div>
      
      {/* Stats cards with animation */}
      <motion.div 
        className="grid gap-4 md:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <Card className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Saved Properties
              </CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userProperties.length}</div>
              <p className="text-xs text-muted-foreground">
                Properties saved
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Unread messages</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card className="transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
      
      {/* Properties section with enhanced UI */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Saved Properties
          </h2>
        </div>
        
        {userProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userProperties.map((property) => (
              <motion.div
                key={property.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="flex h-40 items-center justify-center">
            <div className="text-center">
              <p className="mb-4 text-muted-foreground">
                You haven't saved any properties yet
              </p>
              <Button asChild className="hover-scale">
                <Link to="/properties">
                  Browse Properties
                </Link>
              </Button>
            </div>
          </Card>
        )}
      </motion.div>
      
      {/* Recent activity section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
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
                  You have a new message about a property you inquired about
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
      </motion.div>
    </div>
  );
};

export default Dashboard;
