import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Home, MessageSquare, Calendar, PieChart, Activity, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const VendorStats = () => {
  const [progressValues, setProgressValues] = useState({
    views: 0,
    inquiries: 0,
    appointments: 0,
    revenue: 0
  });
  
  // Animation variants
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };
  
  // Vendor-specific dashboard stats
  const stats = [
    { 
      title: "Property Views", 
      value: "324", 
      change: "+12%", 
      icon: <Home className="h-4 w-4" />,
      progressPercent: 78,
      color: "bg-blue-500" 
    },
    { 
      title: "Inquiries", 
      value: "28", 
      change: "+5%", 
      icon: <MessageSquare className="h-4 w-4" />,
      progressPercent: 65,
      color: "bg-green-500" 
    },
    { 
      title: "Appointments", 
      value: "16", 
      change: "+25%", 
      icon: <Calendar className="h-4 w-4" />,
      progressPercent: 45,
      color: "bg-purple-500" 
    },
    { 
      title: "Revenue", 
      value: "$12,580", 
      change: "+8%", 
      icon: <TrendingUp className="h-4 w-4" />,
      progressPercent: 82,
      color: "bg-amber-500" 
    },
  ];

  useEffect(() => {
    // Animate progress bars on load
    const timer = setTimeout(() => {
      setProgressValues({
        views: 78,
        inquiries: 65,
        appointments: 45,
        revenue: 82
      });
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const keys = Object.keys(progressValues) as Array<keyof typeof progressValues>;

  return (
    <>
      {stats.map((stat, index) => (
        <motion.div key={index} variants={item} className="col-span-2 md:col-span-1">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className={cn("flex flex-row items-center justify-between pb-2", 
              "bg-gradient-to-r from-primary/10 to-transparent")}>
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center",
                "bg-gradient-to-br from-primary/20 to-primary/5"
              )}>
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
                <Progress 
                  value={progressValues[keys[index]]} 
                  className={cn("h-1.5", stat.color.replace("bg-", "bg-opacity-50 "))} 
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </>
  );
};

export default VendorStats;
