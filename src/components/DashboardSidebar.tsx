
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { 
  Home, 
  MessageSquare, 
  Phone, 
  User, 
  LogOut, 
  Plus, 
  ChevronRight,
  Calendar,
  Settings,
  Search,
  Bell,
  BarChart,
  PieChart
} from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";

const DashboardSidebar = () => {
  const { user, logout, isVendor } = useAuth();
  const location = useLocation();
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  
  const navGroups = [
    {
      id: "main",
      label: "Main",
      items: [
        {
          title: isVendor ? "Vendor Dashboard" : "Dashboard",
          path: isVendor ? "/dashboard/vendor" : "/dashboard",
          icon: <Home className="mr-2 h-4 w-4" />,
          show: true,
        },
        {
          title: "Create Property",
          path: "/dashboard/create-property",
          icon: <Plus className="mr-2 h-4 w-4" />,
          show: isVendor,
          highlight: true,
        },
        {
          title: "My Properties",
          path: "/dashboard/properties",
          icon: <Home className="mr-2 h-4 w-4" />,
          show: isVendor,
          badge: "3",
        },
        {
          title: "Saved Properties",
          path: "/dashboard/saved-properties",
          icon: <Search className="mr-2 h-4 w-4" />,
          show: !isVendor,
        },
      ],
    },
    {
      id: "analytics",
      label: "Analytics",
      items: [
        {
          title: "Performance",
          path: "/dashboard/performance",
          icon: <BarChart className="mr-2 h-4 w-4" />,
          show: isVendor,
        },
        {
          title: "Statistics",
          path: "/dashboard/statistics",
          icon: <PieChart className="mr-2 h-4 w-4" />,
          show: isVendor,
        },
      ],
    },
    {
      id: "communication",
      label: "Communication",
      items: [
        {
          title: "Messages",
          path: "/dashboard/messages",
          icon: <MessageSquare className="mr-2 h-4 w-4" />,
          show: true,
          badge: "2",
        },
        {
          title: "Appointments",
          path: "/dashboard/appointments",
          icon: <Calendar className="mr-2 h-4 w-4" />,
          show: isVendor,
        },
        {
          title: "Inquiries",
          path: "/dashboard/inquiries",
          icon: <Phone className="mr-2 h-4 w-4" />,
          show: isVendor,
          badge: "5",
        },
        {
          title: "Notifications",
          path: "/dashboard/notifications",
          icon: <Bell className="mr-2 h-4 w-4" />,
          show: true,
          badge: "4",
        },
      ],
    },
    {
      id: "account",
      label: "Account",
      items: [
        {
          title: "Profile",
          path: "/dashboard/profile",
          icon: <User className="mr-2 h-4 w-4" />,
          show: true,
        },
        {
          title: "Settings",
          path: "/dashboard/settings",
          icon: <Settings className="mr-2 h-4 w-4" />,
          show: true,
        },
      ],
    },
  ];

  // Check if the current path is in a group
  const findActiveGroup = () => {
    for (const group of navGroups) {
      if (group.items.some(item => item.path === location.pathname)) {
        return group.id;
      }
    }
    // Default to main group if no match found
    return "main";
  };

  // Set initial active group based on current path
  useEffect(() => {
    const activeGroupId = findActiveGroup();
    if (activeGroupId) {
      setActiveGroup(activeGroupId);
    }
  }, [location.pathname]);

  const toggleGroup = (groupId: string) => {
    setActiveGroup(activeGroup === groupId ? null : groupId);
  };

  return (
    <div className="flex h-full w-full flex-col border-r bg-background">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-4 mb-5">
          <span className={cn(
            "text-lg font-bold",
            isVendor ? "text-blue-600" : "text-primary"
          )}>
            PropertyHub {isVendor ? "Vendor" : ""}
          </span>
        </div>
        
        <nav className="flex-1 space-y-2 px-2">
          {navGroups.map((group) => {
            const visibleItems = group.items.filter(item => item.show);
            if (visibleItems.length === 0) return null;
            
            const isActive = activeGroup === group.id;
            
            return (
              <div key={group.id} className="mb-4">
                <button 
                  onClick={() => toggleGroup(group.id)}
                  className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-primary rounded-md hover:bg-primary/5 transition-all"
                >
                  <span>{group.label}</span>
                  <motion.div 
                    animate={{ rotate: isActive ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight className="h-4 w-4 opacity-70" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1 ml-2 pl-2 border-l border-primary/20 overflow-hidden"
                    >
                      {visibleItems.map((item) => {
                        const isItemActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                              "group flex items-center justify-between rounded-md px-3 py-2 text-sm my-1 transition-all",
                              isItemActive
                                ? "bg-primary text-primary-foreground font-medium shadow-sm"
                                : "text-foreground hover:bg-muted hover:text-primary",
                              item.highlight && !isItemActive && "bg-primary/10"
                            )}
                          >
                            <div className="flex items-center">
                              {item.icon}
                              <span>{item.title}</span>
                            </div>
                            
                            {item.badge && (
                              <Badge variant={isItemActive ? "outline" : "default"} className="ml-2 text-xs">
                                {item.badge}
                              </Badge>
                            )}
                            
                            {isItemActive && (
                              <motion.div 
                                className="absolute left-0 w-1 h-5 bg-primary-foreground rounded-r-full"
                                layoutId="sidebar-indicator"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                              />
                            )}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>
      </div>
      
      <div className="flex flex-shrink-0 border-t p-4">
        <div className="flex w-full items-center">
          <div className="flex-shrink-0">
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md",
              isVendor 
                ? "bg-gradient-to-br from-blue-500 to-violet-600" 
                : "bg-gradient-to-br from-primary to-primary/70"
            )}>
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-foreground">
              {user?.name}
              {isVendor && (
                <Badge variant="outline" className="ml-2 text-xs bg-blue-50">Vendor</Badge>
              )}
            </p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="ml-auto text-red-500 hover:bg-red-50 hover:text-red-600"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
