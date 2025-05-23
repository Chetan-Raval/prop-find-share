
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import Header from "@/components/Header";
import { Menu, Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const DashboardLayout = () => {
  const { user, isVendor } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protect dashboard routes
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header>
        <div className="ml-auto flex items-center space-x-4">
          {/* Notification dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 px-1 min-w-5 h-5 flex items-center justify-center text-xs">
                  4
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-2 border-b">
                <p className="font-medium">Notifications</p>
                <Button variant="ghost" size="sm" className="text-xs">Mark all as read</Button>
              </div>
              <div className="max-h-80 overflow-auto py-1">
                <DropdownMenuItem className="p-3 border-l-2 border-primary cursor-default">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">New message received</p>
                    <p className="text-xs text-muted-foreground">Someone sent you a message about your property</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-default">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">Profile view</p>
                    <p className="text-xs text-muted-foreground">Someone viewed your profile</p>
                    <p className="text-xs text-muted-foreground">Yesterday</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-default">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">
                      {isVendor ? "New property inquiry" : "Property price update"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isVendor ? "Someone is interested in your property" : "A saved property's price has been updated"}
                    </p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </DropdownMenuItem>
              </div>
              <div className="p-2 border-t">
                <Button variant="outline" size="sm" className="w-full text-primary">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User dropdown - optional additional functionality */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="p-2 border-b">
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/dashboard/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/dashboard/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-50">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Header>
      
      <div className="flex flex-1 relative">
        {/* Mobile sidebar with Sheet component */}
        <div className="block lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 left-2 z-40"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[280px] border-r">
              <DashboardSidebar />
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0">
          <DashboardSidebar />
        </div>

        {/* Main content with animation */}
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-4 md:p-6 transition-all duration-300 ease-in-out overflow-auto"
        >
          <div className="py-4 px-1 md:px-0">
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;
