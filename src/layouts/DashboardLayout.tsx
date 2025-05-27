
import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Menu, X, Bell } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

const DashboardLayout = () => {
  const { user, isLoading, isVendor } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col">
        <DashboardSidebar />
      </div>

      {/* Mobile Header with Enhanced Design */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between p-4 border-b bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-40">
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md ${
              isVendor 
                ? "bg-gradient-to-br from-blue-500 to-violet-600" 
                : "bg-gradient-to-br from-primary to-primary/70"
            }`}>
              <span className="text-white font-bold text-sm">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {isVendor ? "Vendor Dashboard" : "Dashboard"}
              </h1>
              <p className="text-xs text-muted-foreground">Welcome back, {user?.name}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Notification Bell */}
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 hover:bg-red-500">
                3
              </Badge>
            </Button>
            
            {/* Mobile Menu Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="relative overflow-hidden hover:bg-primary/10 transition-all duration-200"
                >
                  <div className="relative">
                    <Menu className={`h-5 w-5 transition-all duration-300 ${mobileMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`} />
                    <X className={`h-5 w-5 absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}`} />
                  </div>
                </Button>
              </SheetTrigger>
              <SheetContent 
                side="left" 
                className="p-0 w-80 bg-gradient-to-b from-white via-gray-50/50 to-blue-50/30 border-r-2 border-primary/10"
              >
                <SheetHeader className="sr-only">
                  <SheetTitle>Navigation Menu</SheetTitle>
                </SheetHeader>
                
                <div className="h-full flex flex-col">
                  {/* Mobile Sidebar Header */}
                  <div className="p-6 border-b bg-gradient-to-r from-primary/5 via-blue-50 to-violet-50/50">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg ${
                        isVendor 
                          ? "bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600" 
                          : "bg-gradient-to-br from-primary via-blue-500 to-primary/70"
                      }`}>
                        <span className="text-white font-bold text-xl">
                          {user?.name?.[0]?.toUpperCase() || "U"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h2 className="font-bold text-lg text-gray-900 mb-1">
                          {user?.name}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-2">{user?.email}</p>
                        {isVendor && (
                          <Badge className="bg-gradient-to-r from-blue-500 to-violet-500 text-white border-0 shadow-md">
                            <span className="text-xs font-medium">Vendor Account</span>
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Sidebar Content */}
                  <div className="flex-1 overflow-hidden">
                    <DashboardSidebar isMobile onNavigate={() => setMobileMenuOpen(false)} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto bg-white/50">
          <div className="min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
