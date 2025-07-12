
import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, 
  MessageSquare, 
  User, 
  Star, 
  ArrowRight, 
  Phone, 
  CheckCircle,
  Shield,
  Clock,
  MapPin,
  Heart
} from "lucide-react";

const Index = () => {
  // Add scroll animation for elements
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      animatedElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div>
      <HeroSection />
      <FeaturedProperties />
      
      {/* How it works section - With improved design */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-blue-50 to-background">
        <div className="container px-4">
          <div className="mb-16 text-center animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <span className="inline-block mb-3 px-4 py-2 bg-blue-100 text-primary rounded-full text-sm font-medium">
              Simplified Process
            </span>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              Find your dream property in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {[
              {
                icon: Home,
                title: "Browse Properties",
                description: "Explore thousands of properties tailored to your preferences across the country",
                delay: "delay-100",
                link: "/properties",
                linkText: "Start Browsing"
              },
              {
                icon: MessageSquare,
                title: "Contact Vendors",
                description: "Connect directly with property owners and agents to schedule viewings or ask questions",
                delay: "delay-200",
                link: "/register",
                linkText: "Create Account"
              },
              {
                icon: Heart,
                title: "Find Your Match",
                description: "Save your favorites, compare options, and find the perfect property that feels like home",
                delay: "delay-300",
                link: "/about",
                linkText: "Learn More"
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className={`animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 ${item.delay} rounded-2xl bg-white border border-border p-8 text-center shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300 group`}
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300">
                  <item.icon className="h-10 w-10" />
                </div>
                <h3 className="mb-4 text-2xl font-semibold">{item.title}</h3>
                <p className="mb-6 text-muted-foreground">
                  {item.description}
                </p>
                <div className="mt-auto">
                  <Link 
                    to={item.link} 
                    className="inline-flex items-center text-primary font-medium hover:underline group"
                  >
                    {item.linkText}
                    <ArrowRight className="ml-1 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section - New */}
      <section className="py-24 bg-gradient-to-b from-background to-blue-50/50">
        <div className="container px-4">
          <div className="mb-16 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
              <span className="inline-block mb-3 px-4 py-2 bg-blue-100 text-primary rounded-full text-sm font-medium">
                Our Advantages
              </span>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                Why Choose <span className="text-primary">PropertyHub</span>
              </h2>
              <p className="mb-6 max-w-xl text-muted-foreground text-lg">
                We're committed to providing the best experience for property buyers, sellers, and renters with features designed to make your journey easier.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  { icon: Shield, text: "Verified properties and trusted vendors" },
                  { icon: Clock, text: "Quick and easy property search" },
                  { icon: MapPin, text: "Properties in prime locations" }
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="mr-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary">
                      <item.icon className="h-3 w-3" />
                    </div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="rounded-full">
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80" 
                  alt="Modern apartment interior"
                  className="rounded-2xl shadow-2xl object-cover h-[500px] w-full" 
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-lg">
                  <div className="flex items-center">
                    <div className="rounded-full bg-primary/20 p-3">
                      <Home className="h-6 w-6 text-primary" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-muted-foreground">Featured Property</p>
                      <h4 className="font-semibold">Modern Apartment in Downtown</h4>
                      <p className="text-primary font-bold">$2,500/month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section - Enhanced */}
      <section className="py-24 bg-gradient-to-b from-blue-50/50 to-background">
        <div className="container px-4">
          <div className="text-center mb-16 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <span className="inline-block mb-3 px-4 py-2 bg-blue-100 text-primary rounded-full text-sm font-medium">
              Testimonials
            </span>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              Trusted by thousands of satisfied buyers, sellers, and renters
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Testimonial cards with enhanced design */}
            {[
              {
                name: "Sarah Johnson",
                role: "Home Buyer",
                quote: "Found my dream home in just two weeks! The filtering options made it so easy to narrow down exactly what I was looking for.",
                delay: "delay-100"
              },
              {
                name: "Michael Chen",
                role: "Property Investor",
                quote: "As a property investor, this platform has been invaluable. I've been able to list multiple properties and manage all inquiries in one place.",
                delay: "delay-200"
              },
              {
                name: "Emily Rodriguez",
                role: "Tenant",
                quote: "The messaging system made it so easy to communicate with property owners. I found and secured a rental apartment within days!",
                delay: "delay-300"
              }
            ].map((testimonial, i) => (
              <div 
                key={i} 
                className={`animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 ${testimonial.delay} rounded-2xl bg-white p-8 shadow-lg border border-border hover:shadow-xl hover:border-primary/20 transition-all duration-300`}
              >
                <div className="flex mb-6">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="mb-8 text-muted-foreground italic">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-blue-700 text-white flex items-center justify-center mr-4">
                    <span className="font-bold text-lg">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - Completely redesigned */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-blue-700 p-10 md:p-16 text-white animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 relative">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-32 -mr-32 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -mb-32 -ml-32 blur-xl"></div>
            
            {/* Decorative floating elements */}
            <motion.div 
              className="absolute right-10 top-10 w-20 h-20 bg-white/10 rounded-full"
              animate={{
                y: [0, 15, 0],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="absolute left-1/4 bottom-10 w-12 h-12 bg-white/10 rounded-full"
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="md:max-w-xl">
                <span className="inline-block mb-3 px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
                  Ready to Start?
                </span>
                <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                  Find Your Perfect Property Today
                </h2>
                <p className="mb-8 text-lg text-blue-100">
                  Whether you're looking to buy, sell, or rent, we've got you covered with the best selection of properties and exceptional service.
                </p>
                <ul className="flex flex-col sm:flex-row flex-wrap gap-4 mb-8">
                  {["Verified listings", "Professional agents", "Secure transactions", "24/7 support"].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-300" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild variant="secondary" className="text-primary hover:scale-105 transition-transform">
                    <Link to="/properties" className="flex items-center gap-2">
                      <Home size={18} />
                      Browse Properties
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    asChild 
                    variant="outline" 
                    className="bg-transparent text-white hover:bg-white/10 border-white hover:scale-105 transition-transform"
                  >
                    <Link to="/contact" className="flex items-center gap-2">
                      <Phone size={18} />
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="hidden md:block relative">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl transform rotate-6"></div>
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl transform -rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                  alt="Modern home interior"
                  className="relative rounded-2xl shadow-2xl border-4 border-white/20 w-80 h-auto" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* App Download Section - New */}
      <section className="py-16 md:py-24 bg-blue-50/30">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Mobile app on smartphone"
                className="rounded-3xl shadow-2xl max-w-sm mx-auto" 
              />
            </div>
            <div className="md:w-1/2 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
              <span className="inline-block mb-3 px-4 py-2 bg-blue-100 text-primary rounded-full text-sm font-medium">
                Mobile Experience
              </span>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                Take PropertyHub <span className="text-primary">On The Go</span>
              </h2>
              <p className="mb-6 text-muted-foreground text-lg">
                Download our mobile app to search for properties, receive notifications, and communicate with vendors from anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-black hover:bg-gray-800 text-white rounded-xl h-16" size="lg">
                  <div className="flex items-center">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 mr-2" fill="currentColor">
                      <path d="M17.707,8.293a.999.999,0,0,0-1.414,0L13,11.586V2a1,1,0,0,0-2,0V11.586L7.707,8.293A1,1,0,1,0,6.293,9.707l5,5a1,1,0,0,0,1.414,0l5-5A.999.999,0,0,0,17.707,8.293ZM20,16H4a1,1,0,0,0,0,2H20a1,1,0,0,0,0-2Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">Download on the</div>
                      <div className="text-xl font-semibold">App Store</div>
                    </div>
                  </div>
                </Button>
                <Button className="bg-black hover:bg-gray-800 text-white rounded-xl h-16" size="lg">
                  <div className="flex items-center">
                    <svg viewBox="0 0 24 24" className="w-8 h-8 mr-2" fill="currentColor">
                      <path d="M3,20.59V3.75A1,1,0,0,1,4.29,2.9l16.7,8.84a1,1,0,0,1,0,1.76L4.29,22.34A1,1,0,0,1,3,21.5V20.59Z"/>
                    </svg>
                    <div className="text-left">
                      <div className="text-xs">GET IT ON</div>
                      <div className="text-xl font-semibold">Google Play</div>
                    </div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
