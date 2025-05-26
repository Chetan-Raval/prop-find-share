
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
  ChevronDown,
  Calendar,
  Settings,
  Search,
  Bell,
  BarChart,
  PieChart,
  Sparkles
} from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";

interface DashboardSidebarProps {
  isMobile?: boolean;
  onNavigate?: () => void;
}

const DashboardSidebar = ({ isMobile = false, onNavigate }: DashboardSidebarProps) => {
  const { user, logout, isVendor } = useAuth();
  const location = useLocation();
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  
  const navGroups = [
    {
      id: "main",
      label: "Main",
      icon: <Home className="h-4 w-4" />,
      items: [
        {
          title: isVendor ? "Vendor Dashboard" : "Dashboard",
          path: isVendor ? "/dashboard/vendor" : "/dashboard",
          icon: <Home className="mr-3 h-4 w-4" />,
          show: true,
          description: "Overview & stats"
        },
        {
          title: "Create Property",
          path: "/dashboard/create-property",
          icon: <Plus className="mr-3 h-4 w-4" />,
          show: isVendor,
          highlight: true,
          description: "Add new listing"
        },
        {
          title: "My Properties",
          path: "/dashboard/properties",
          icon: <Home className="mr-3 h-4 w-4" />,
          show: isVendor,
          badge: "3",
          description: "Manage listings"
        },
        {
          title: "Saved Properties",
          path: "/dashboard/saved-properties",
          icon: <Search className="mr-3 h-4 w-4" />,
          show: !isVendor,
          description: "Your favorites"
        },
      ],
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart className="h-4 w-4" />,
      items: [
        {
          title: "Performance",
          path: "/dashboard/performance",
          icon: <BarChart className="mr-3 h-4 w-4" />,
          show: isVendor,
          description: "View metrics"
        },
        {
          title: "Statistics",
          path: "/dashboard/statistics",
          icon: <PieChart className="mr-3 h-4 w-4" />,
          show: isVendor,
          description: "Detailed reports"
        },
      ],
    },
    {
      id: "communication",
      label: "Communication",
      icon: <MessageSquare className="h-4 w-4" />,
      items: [
        {
          title: "Messages",
          path: "/dashboard/messages",
          icon: <MessageSquare className="mr-3 h-4 w-4" />,
          show: true,
          badge: "2",
          description: "Chat with clients"
        },
        {
          title: "Appointments",
          path: "/dashboard/appointments",
          icon: <Calendar className="mr-3 h-4 w-4" />,
          show: isVendor,
          description: "Schedule meetings"
        },
        {
          title: "Inquiries",
          path: "/dashboard/inquiries",
          icon: <Phone className="mr-3 h-4 w-4" />,
          show: isVendor,
          badge: "5",
          description: "Customer requests"
        },
        {
          title: "Notifications",
          path: "/dashboard/notifications",
          icon: <Bell className="mr-3 h-4 w-4" />,
          show: true,
          badge: "4",
          description: "Latest updates"
        },
      ],
    },
    {
      id: "account",
      label: "Account",
      icon: <User className="h-4 w-4" />,
      items: [
        {
          title: "Profile",
          path: "/dashboard/profile",
          icon: <User className="mr-3 h-4 w-4" />,
          show: true,
          description: "Personal info"
        },
        {
          title: "Settings",
          path: "/dashboard/settings",
          icon: <Settings className="mr-3 h-4 w-4" />,
          show: true,
          description: "Preferences"
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

  const handleNavigation = () => {
    if (isMobile && onNavigate) {
      onNavigate();
    }
  };

  return (
    <div className={cn(
      "flex h-full w-full flex-col border-r bg-white/80 backdrop-blur-sm",
      isMobile && "border-r-0"
    )}>
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        {/* Desktop Header */}
        {!isMobile && (
          <div className="flex flex-shrink-0 items-center px-4 mb-6">
            <div className="flex items-center space-x-2">
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center",
                isVendor ? "bg-gradient-to-br from-blue-500 to-violet-600" : "bg-gradient-to-br from-primary to-primary/70"
              )}>
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className={cn(
                "text-lg font-bold bg-gradient-to-r bg-clip-text text-transparent",
                isVendor ? "from-blue-600 to-violet-600" : "from-primary to-blue-600"
              )}>
                PropertyHub {isVendor ? "Pro" : ""}
              </span>
            </div>
          </div>
        )}
        
        <nav className={cn("flex-1 space-y-2", isMobile ? "px-3" : "px-2")}>
          {navGroups.map((group) => {
            const visibleItems = group.items.filter(item => item.show);
            if (visibleItems.length === 0) return null;
            
            const isActive = activeGroup === group.id;
            
            return (
              <div key={group.id} className="mb-3">
                <button 
                  onClick={() => toggleGroup(group.id)}
                  className={cn(
                    "flex w-full items-center justify-between px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                    isMobile 
                      ? "hover:bg-primary/10 text-gray-700"
                      : "hover:bg-primary/5 text-primary",
                    isActive && "bg-primary/10 text-primary"
                  )}
                >
                  <div className="flex items-center space-x-2">
                    {group.icon}
                    <span className="font-semibold">{group.label}</span>
                  </div>
                  <motion.div 
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 opacity-70" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="mt-2 ml-2 pl-3 border-l-2 border-primary/20 overflow-hidden"
                    >
                      {visibleItems.map((item, index) => {
                        const isItemActive = location.pathname === item.path;
                        return (
                          <motion.div
                            key={item.path}
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Link
                              to={item.path}
                              onClick={handleNavigation}
                              className={cn(
                                "group flex items-center justify-between rounded-lg px-3 py-3 mb-1 text-sm transition-all duration-200 hover:scale-[1.02]",
                                isItemActive
                                  ? "bg-gradient-to-r from-primary to-primary/80 text-white font-medium shadow-md"
                                  : "text-gray-600 hover:bg-gradient-to-r hover:from-primary/10 hover:to-blue-50 hover:text-primary",
                                item.highlight && !isItemActive && "bg-gradient-to-r from-primary/5 to-blue-50/50 border border-primary/20"
                              )}
                            >
                              <div className="flex items-center flex-1">
                                <div className="flex items-center">
                                  {item.icon}
                                  <div>
                                    <div className="font-medium">{item.title}</div>
                                    {isMobile && item.description && (
                                      <div className={cn(
                                        "text-xs mt-0.5",
                                        isItemActive ? "text-white/80" : "text-gray-400"
                                      )}>
                                        {item.description}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              {item.badge && (
                                <Badge 
                                  variant={isItemActive ? "outline" : "default"} 
                                  className={cn(
                                    "ml-2 text-xs transition-all",
                                    isItemActive 
                                      ? "bg-white/20 text-white border-white/30" 
                                      : "bg-primary/20 text-primary"
                                  )}
                                >
                                  {item.badge}
                                </Badge>
                              )}
                              
                              {isItemActive && (
                                <motion.div 
                                  className="absolute left-0 w-1 h-6 bg-white rounded-r-full"
                                  layoutId="sidebar-indicator"
                                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                              )}
                            </Link>
                          </motion.div>
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
      
      {/* Footer */}
      {!isMobile && (
        <div className="flex flex-shrink-0 border-t bg-gradient-to-r from-gray-50 to-blue-50/30 p-4">
          <div className="flex w-full items-center">
            <div className="flex-shrink-0">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md",
                isVendor 
                  ? "bg-gradient-to-br from-blue-500 to-violet-600" 
                  : "bg-gradient-to-br from-primary to-primary/70"
              )}>
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {user?.name}
                {isVendor && (
                  <Badge variant="outline" className="ml-2 text-xs bg-blue-50 border-blue-200">
                    Pro
                  </Badge>
                )}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="ml-auto text-red-500 hover:bg-red-50 hover:text-red-600 rounded-lg"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardSidebar;
