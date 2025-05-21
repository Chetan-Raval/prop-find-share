
import { createContext, useContext, useState, ReactNode } from "react";
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
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // In a real app, we would persist this to localStorage/sessionStorage
  const [user, setUser] = useState<User | null>(null);

  // Mock login function - would be replaced with real API calls
  const login = async (email: string, password: string) => {
    try {
      // Mock successful login
      if (email && password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Create mock user - in a real app this would come from API
        const mockUser: User = {
          id: "123",
          name: email.split("@")[0],
          email: email,
          // For demo purposes, we'll assign a role based on the email
          role: email.includes("vendor") ? "vendor" : "customer"
        };
        
        setUser(mockUser);
        toast.success("Successfully logged in!");
      } else {
        throw new Error("Email and password required");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
      throw error;
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      // Validate inputs
      if (!name || !email || !password || !role) {
        throw new Error("All fields are required");
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user creation
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email,
        role
      };
      
      setUser(mockUser);
      toast.success("Account created successfully!");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
