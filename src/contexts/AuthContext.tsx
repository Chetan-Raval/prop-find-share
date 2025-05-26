
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";
import { authService } from "@/services/authService";

export type UserRole = "vendor" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  isVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isVendor: boolean;
  isCustomer: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const USER_STORAGE_KEY = "propertyHubUser";
const TOKEN_STORAGE_KEY = "authToken";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem(USER_STORAGE_KEY);
      const token = localStorage.getItem(TOKEN_STORAGE_KEY);
      
      if (savedUser && token) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error("Failed to parse saved user:", error);
          localStorage.removeItem(USER_STORAGE_KEY);
          localStorage.removeItem(TOKEN_STORAGE_KEY);
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
      
      setIsLoading(true);
      
      // Call API for login
      const response = await authService.login({ email, password });
      
      // Store user and token
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));
      localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
      
      setUser(response.user);
      toast.success(response.message || `Welcome back, ${response.user.name}!`);
      
    } catch (error: any) {
      console.error("Login error:", error);
      
      const errorMessage = error.response?.data?.message || error.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      if (!name || !email || !password || !role) {
        throw new Error("All fields are required");
      }
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      setIsLoading(true);
      
      // Call API for registration
      const response = await authService.register({ name, email, password, role });
      
      // Store user and token
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(response.user));
      localStorage.setItem(TOKEN_STORAGE_KEY, response.token);
      
      setUser(response.user);
      
      const successMessage = role === "vendor" 
        ? "Vendor account created successfully! You can now list properties."
        : "Account created successfully! You can now browse and save properties.";
      
      toast.success(response.message || successMessage);
      
    } catch (error: any) {
      console.error("Registration error:", error);
      
      const errorMessage = error.response?.data?.message || error.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Remove from storage regardless of API call success
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      
      setUser(null);
      toast.success("Logged out successfully");
    }
  };

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
