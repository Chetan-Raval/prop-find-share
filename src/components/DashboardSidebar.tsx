
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Home, MessageSquare, Phone, User, LogOut, Plus } from "lucide-react";
import { Button } from "./ui/button";

const DashboardSidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const isVendor = user?.role === "vendor";
  
  const navItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
      show: true,
    },
    {
      title: "Create Property",
      path: "/dashboard/create-property",
      icon: <Plus className="mr-2 h-4 w-4" />,
      show: isVendor,
    },
    {
      title: "My Properties",
      path: "/dashboard/my-properties",
      icon: <Home className="mr-2 h-4 w-4" />,
      show: isVendor,
    },
    {
      title: "Saved Properties",
      path: "/dashboard/saved-properties",
      icon: <Home className="mr-2 h-4 w-4" />,
      show: !isVendor,
    },
    {
      title: "Messages",
      path: "/dashboard/messages",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
      show: true,
    },
    {
      title: "Calls",
      path: "/dashboard/calls",
      icon: <Phone className="mr-2 h-4 w-4" />,
      show: true,
    },
    {
      title: "Profile",
      path: "/dashboard/profile",
      icon: <User className="mr-2 h-4 w-4" />,
      show: true,
    },
  ];

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5">
        <div className="flex flex-shrink-0 items-center px-4">
          <span className="text-lg font-semibold text-primary">
            {user?.role === "vendor" ? "Vendor" : "Customer"} Dashboard
          </span>
        </div>
        <nav className="mt-8 flex-1 space-y-1 px-2">
          {navItems
            .filter(item => item.show)
            .map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            ))}
        </nav>
      </div>
      <div className="flex flex-shrink-0 border-t p-4">
        <div className="flex w-full items-center">
          <div className="flex-shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              {user?.name?.[0]?.toUpperCase() || "U"}
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-foreground">{user?.name}</p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={logout}
          className="ml-auto"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
