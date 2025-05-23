
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
  ChevronRight,
  PieChart,
  TrendingUp,
  Activity,
  BarChart
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VendorStats from "@/components/dashboard/VendorStats";
import VendorInquiries from "@/components/dashboard/VendorInquiries";
import VendorProperties from "@/components/dashboard/VendorProperties";
import AppointmentCalendar from "@/components/dashboard/AppointmentCalendar";

const VendorDashboard = () => {
  const { user } = useAuth();
  const [progressValue, setProgressValue] = useState(0);
  
  useEffect(() => {
    // Animate progress bars on load
    const timer = setTimeout(() => {
      setProgressValue(78);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
          Manage your property listings and communications
        </p>
      </div>

      {/* Key performance metrics */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="properties">My Properties</TabsTrigger>
          <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
          <TabsTrigger value="calendar">Appointments</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 md:grid-cols-4"
          >
            {/* Performance metrics */}
            <VendorStats />
            
            {/* Revenue chart */}
            <motion.div variants={item} className="col-span-full lg:col-span-2">
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-md font-medium">Monthly Revenue</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Monthly</Button>
                    <Button variant="ghost" size="sm">Yearly</Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 pb-2">
                  <div className="h-[240px] flex items-center justify-center">
                    <BarChart className="h-32 w-32 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">Revenue chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Traffic statistics */}
            <motion.div variants={item} className="col-span-full lg:col-span-2">
              <Card className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-md font-medium">Traffic Statistics</CardTitle>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="mr-1 h-4 w-4" /> Details
                  </Button>
                </CardHeader>
                <CardContent className="pt-4 pb-2">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">Website Visitors</p>
                        <p className="text-sm font-medium">1,245</p>
                      </div>
                      <Progress value={78} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">Property Views</p>
                        <p className="text-sm font-medium">876</p>
                      </div>
                      <Progress value={65} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">Inquiries Rate</p>
                        <p className="text-sm font-medium">23%</p>
                      </div>
                      <Progress value={23} className="h-1.5" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium">Conversion Rate</p>
                        <p className="text-sm font-medium">8.2%</p>
                      </div>
                      <Progress value={8.2} className="h-1.5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Recent inquiries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <VendorInquiries limit={3} />
          </motion.div>
          
          {/* Latest properties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <VendorProperties limit={3} />
          </motion.div>
        </TabsContent>

        <TabsContent value="properties">
          <VendorProperties />
        </TabsContent>

        <TabsContent value="inquiries">
          <VendorInquiries />
        </TabsContent>
        
        <TabsContent value="calendar">
          <AppointmentCalendar />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorDashboard;
