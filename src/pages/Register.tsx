import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UserIcon, KeyIcon, EyeIcon, EyeOffIcon, MailIcon, CheckCircle2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string(),
  role: z.enum(["vendor", "customer"], {
    message: "Please select a role",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "customer",
    },
  });

  const watchedRole = form.watch("role");

  const onSubmit = async (values: RegisterFormValues) => {
    setError(null);
    setIsLoading(true);
    
    try {
      await register(values.name, values.email, values.password, values.role);
      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Registration Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center">
            <div className="mb-6 lg:hidden">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserIcon className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join PropertyHub</h2>
            <p className="text-gray-600">
              Create your account and start your property journey
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 scale-in">
            {error && (
              <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input
                            placeholder="Enter your full name"
                            className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg transition-all duration-200"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                      <div className="relative">
                        <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input
                            placeholder="Enter your email"
                            className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg transition-all duration-200"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                      <div className="relative">
                        <KeyIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a password"
                            className="pl-10 pr-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg transition-all duration-200"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 font-medium">Confirm Password</FormLabel>
                      <div className="relative">
                        <KeyIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="pl-10 pr-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-lg transition-all duration-200"
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="text-gray-700 font-medium text-lg">Account Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          value={field.value}
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                          <div className="relative">
                            <RadioGroupItem value="customer" id="customer" className="sr-only" />
                            <label
                              htmlFor="customer"
                              className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                                watchedRole === "customer"
                                  ? "border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg ring-2 ring-blue-200"
                                  : "border-gray-200 bg-gradient-to-br from-blue-50/30 to-blue-100/30 hover:border-blue-300"
                              }`}
                            >
                              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                                watchedRole === "customer"
                                  ? "bg-blue-500 shadow-lg"
                                  : "bg-blue-400"
                              }`}>
                                <UserIcon className="w-8 h-8 text-white" />
                              </div>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className={`font-bold text-lg ${
                                  watchedRole === "customer" ? "text-blue-700" : "text-blue-600"
                                }`}>
                                  Customer
                                </span>
                                {watchedRole === "customer" && (
                                  <CheckCircle2 className="w-5 h-5 text-blue-500 animate-scale-in" />
                                )}
                              </div>
                              <span className="text-sm text-blue-600 text-center font-medium">
                                Find and rent properties
                              </span>
                              <div className="mt-3 text-xs text-blue-500 text-center">
                                • Browse listings • Save favorites • Contact vendors
                              </div>
                            </label>
                          </div>
                          
                          <div className="relative">
                            <RadioGroupItem value="vendor" id="vendor" className="sr-only" />
                            <label
                              htmlFor="vendor"
                              className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                                watchedRole === "vendor"
                                  ? "border-green-500 bg-gradient-to-br from-green-50 to-green-100 shadow-lg ring-2 ring-green-200"
                                  : "border-gray-200 bg-gradient-to-br from-green-50/30 to-green-100/30 hover:border-green-300"
                              }`}
                            >
                              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                                watchedRole === "vendor"
                                  ? "bg-green-500 shadow-lg"
                                  : "bg-green-400"
                              }`}>
                                <UserIcon className="w-8 h-8 text-white" />
                              </div>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className={`font-bold text-lg ${
                                  watchedRole === "vendor" ? "text-green-700" : "text-green-600"
                                }`}>
                                  Vendor
                                </span>
                                {watchedRole === "vendor" && (
                                  <CheckCircle2 className="w-5 h-5 text-green-500 animate-scale-in" />
                                )}
                              </div>
                              <span className="text-sm text-green-600 text-center font-medium">
                                List and manage properties
                              </span>
                              <div className="mt-3 text-xs text-green-500 text-center">
                                • Create listings • Manage properties • Handle inquiries
                              </div>
                            </label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <UserIcon className="w-4 h-4" />
                      <span>Create Account</span>
                    </div>
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="mt-8 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>
              <div className="mt-4">
                <Link 
                  to="/login" 
                  className="text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Sign in here →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image/Gradient */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white">
          <div className="mb-8 animate-fade-in">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <UserIcon className="w-10 h-10" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4 text-center animate-fade-in">
            Start Your Property Journey
          </h1>
          <p className="text-xl text-center text-green-100 animate-fade-in mb-8">
            Join thousands of users who trust PropertyHub for their real estate needs
          </p>
          <div className="grid grid-cols-1 gap-6 max-w-sm">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm animate-fade-in text-center">
              <div className="text-3xl mb-2">🏘️</div>
              <div className="font-semibold mb-2">For Customers</div>
              <p className="text-green-100 text-sm">Discover your dream property with advanced search and filtering</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm animate-fade-in text-center">
              <div className="text-3xl mb-2">💼</div>
              <div className="font-semibold mb-2">For Vendors</div>
              <p className="text-green-100 text-sm">List and manage your properties with powerful tools and analytics</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-48 -translate-x-48"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tr from-green-500/20 to-transparent rounded-full translate-y-36 translate-x-36"></div>
      </div>
    </div>
  );
};

export default Register;
