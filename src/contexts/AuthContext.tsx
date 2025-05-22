
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";

export type UserRole = "vendor" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string; // Added for extra vendor metadata
  isVerified?: boolean; // Added for verification status
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isVendor: boolean; // Added for convenience
  isCustomer: boolean; // Added for convenience
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Storage keys
const USER_STORAGE_KEY = "propertyHubUser";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on initial render
  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Failed to parse saved user:", error);
          localStorage.removeItem(USER_STORAGE_KEY);
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      
      // For demo: Show loading state
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (password.length < 6) {
        throw new Error("Invalid password. Must be at least 6 characters.");
      }
      
      // Determine role based on email for demo purposes
      const role: UserRole = email.toLowerCase().includes("vendor") ? "vendor" : "customer";
      
      // Create mock user for demo purposes with additional metadata
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email: email,
        role: role,
        createdAt: new Date().toISOString(),
        isVerified: role === "vendor", // Auto-verify vendors for demo
      };
      
      // Save to localStorage
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      toast.success(`Welcome back, ${mockUser.name}! You're logged in as a ${role}.`);
      
    } catch (error) {
      console.error("Login error:", error);
      
      // Display friendly error message
      if (error instanceof Error) {
        toast.error(error.message);
        throw error;
      } else {
        const genericError = new Error("Login failed. Please check your credentials.");
        toast.error(genericError.message);
        throw genericError;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      // Validate inputs
      if (!name || !email || !password || !role) {
        throw new Error("All fields are required");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      // Show loading state
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation with additional metadata
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        role,
        createdAt: new Date().toISOString(),
        isVerified: role === "customer", // Vendors require verification in a real app
      };
      
      // Save to localStorage for persistence
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      
      // Show role-specific success message
      if (role === "vendor") {
        toast.success("Vendor account created successfully! You can now list properties.");
      } else {
        toast.success("Account created successfully! You can now browse and save properties.");
      }
      
    } catch (error) {
      console.error("Registration error:", error);
      
      // Display friendly error message
      if (error instanceof Error) {
        toast.error(error.message);
        throw error;
      } else {
        const genericError = new Error("Registration failed. Please try again.");
        toast.error(genericError.message);
        throw genericError;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Remove from storage
    localStorage.removeItem(USER_STORAGE_KEY);
    
    // Update state
    setUser(null);
    toast.success("Logged out successfully");
  };

  // Convenience booleans for role checks
  const isVendor = user?.role === "vendor";
  const isCustomer = user?.role === "customer";

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        register, 
        logout,
        isAuthenticated: !!user,
        isVendor,
        isCustomer
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
