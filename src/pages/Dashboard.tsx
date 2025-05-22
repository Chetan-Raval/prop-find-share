
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { mockProperties } from "@/data/mockData";
import PropertyCard, { PropertyData } from "@/components/PropertyCard";
import { 
  Home, 
  MessageSquare, 
  User, 
  ArrowRight, 
  Plus, 
  Calendar,
  ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const { user } = useAuth();
  const [userProperties, setUserProperties] = useState<PropertyData[]>([]);
  const isVendor = user?.role === "vendor";
  const [progressValue, setProgressValue] = useState(0);
  
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
  
  useEffect(() => {
    if (isVendor) {
      // Simulate vendor's properties (first 3 from mock data)
      setUserProperties(mockProperties.slice(0, 3));
    } else {
      // Simulate saved properties for customer (random 3 from mock data)
      const saved = [...mockProperties].sort(() => 0.5 - Math.random()).slice(0, 3);
      setUserProperties(saved);
    }
    
    // Animate progress bars on load
    const timer = setTimeout(() => {
      setProgressValue(78);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isVendor]);
  
  // Vendor-specific dashboard stats
  const vendorStats = [
    { title: "Property Views", value: "324", change: "+12%", icon: <Home className="h-4 w-4" /> },
    { title: "Inquiries", value: "28", change: "+5%", icon: <MessageSquare className="h-4 w-4" /> },
    { title: "Appointments", value: "16", change: "+25%", icon: <Calendar className="h-4 w-4" /> },
  ];
  
  // Recent inquiries (vendor only)
  const recentInquiries = [
    { id: 1, property: "Modern Apartment", date: "Today", name: "John Smith", status: "New", message: "I would like to schedule a viewing this weekend." },
    { id: 2, property: "Family Home", date: "Yesterday", name: "Sarah Williams", status: "Responded", message: "Is the price negotiable?" },
    { id: 3, property: "Beach Villa", date: "2 days ago", name: "Michael Jones", status: "New", message: "Are pets allowed in this property?" },
  ];
  
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
      
      {/* Stats cards with animation */}
      <motion.div 
        className="grid gap-4 md:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {isVendor ? (
          // Vendor-specific stats
          vendorStats.map((stat, index) => (
            <motion.div key={index} variants={item}>
              <Card className="overflow-hidden transition-all hover:shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2 bg-primary/5">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {stat.icon}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-end">
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full">
                      {stat.change}
                    </div>
                  </div>
                  <div className="mt-2">
                    <Progress value={progressValue} className="h-1.5" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          // Customer stats (original)
          <>
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
          </>
        )}
      </motion.div>
      
      {/* Properties section with enhanced UI */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {isVendor ? "My Properties" : "Saved Properties"}
          </h2>
          {isVendor && (
            <Button asChild className="hover-scale">
              <Link to="/dashboard/create-property">
                <Plus className="mr-2 h-4 w-4" />
                Add New Property
              </Link>
            </Button>
          )}
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
                {isVendor
                  ? "You haven't listed any properties yet"
                  : "You haven't saved any properties yet"}
              </p>
              <Button asChild className="hover-scale">
                <Link to={isVendor ? "/dashboard/create-property" : "/properties"}>
                  {isVendor ? "Add Your First Property" : "Browse Properties"}
                </Link>
              </Button>
            </div>
          </Card>
        )}
      </motion.div>
      
      {/* Vendor-specific: Recent inquiries section */}
      {isVendor && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Inquiries</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/messages" className="text-primary">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentInquiries.map((inquiry) => (
              <Card key={inquiry.id} className="transition-all hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-medium">{inquiry.property}</div>
                    <div className="text-sm text-muted-foreground">{inquiry.date}</div>
                  </div>
                  <div className="text-sm mb-2">
                    From: <span className="font-medium">{inquiry.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                    {inquiry.message}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className={cn(
                      "text-xs px-2 py-1 rounded-full font-medium",
                      inquiry.status === "New" ? "bg-primary/10 text-primary" : "bg-green-100 text-green-700"
                    )}>
                      {inquiry.status}
                    </div>
                    <Button size="sm" variant="outline" className="h-8">
                      Respond
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      )}
      
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
      </motion.div>
    </div>
  );
};

export default Dashboard;
