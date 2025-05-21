
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";

export type UserRole = "vendor" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
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
      
      // Create mock user for demo purposes
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name: email.split("@")[0],
        email: email,
        // For demo: Determine role based on email
        role: email.toLowerCase().includes("vendor") ? "vendor" : "customer"
      };
      
      // Save to localStorage
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      toast.success("Successfully logged in!");
      
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
      
      // Mock user creation
      const mockUser: User = {
        id: "user_" + Math.random().toString(36).substr(2, 9),
        name,
        email,
        role
      };
      
      // Save to localStorage for persistence
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mockUser));
      
      // Update state
      setUser(mockUser);
      toast.success(`Account created successfully as a ${role}!`);
      
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

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isLoading, 
        login, 
        register, 
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
