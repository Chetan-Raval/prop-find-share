
import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Home, 
  MessageSquare, 
  User, 
  Star, 
  ArrowRight, 
  Phone, 
  CheckCircle 
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
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4">
          <div className="mb-12 text-center animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl lg:text-5xl">How It Works</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
              Simple steps to find your dream property
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 rounded-xl bg-card border border-border p-8 text-center shadow-md hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Home className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Browse Properties</h3>
              <p className="text-muted-foreground">
                Explore thousands of properties for sale and rent across the country
              </p>
              <div className="mt-4">
                <Link 
                  to="/properties" 
                  className="inline-flex items-center text-primary font-medium hover:underline mt-4"
                >
                  Start Browsing
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 rounded-xl bg-card border border-border p-8 text-center shadow-md hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Contact Vendors</h3>
              <p className="text-muted-foreground">
                Directly message or call property owners and agents with your inquiries
              </p>
              <div className="mt-4">
                <Link 
                  to="/register" 
                  className="inline-flex items-center text-primary font-medium hover:underline mt-4"
                >
                  Create Account
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
            
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 rounded-xl bg-card border border-border p-8 text-center shadow-md hover:shadow-lg hover:border-primary/20 transition-all duration-300">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">Close the Deal</h3>
              <p className="text-muted-foreground">
                Finalize your purchase or rental agreement with confidence
              </p>
              <div className="mt-4">
                <Link 
                  to="/about" 
                  className="inline-flex items-center text-primary font-medium hover:underline mt-4"
                >
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section - New section */}
      <section className="py-16 bg-secondary/50">
        <div className="container px-4">
          <div className="text-center mb-12 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">What Our Clients Say</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Trusted by thousands of buyers, sellers, and renters
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Testimonial 1 */}
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100 bg-background rounded-lg p-6 shadow-md border border-border">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4 text-muted-foreground">
                "Found my dream home in just two weeks! The filtering options made it so easy to narrow down exactly what I was looking for."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">Home Buyer</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200 bg-background rounded-lg p-6 shadow-md border border-border">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4 text-muted-foreground">
                "As a property investor, this platform has been invaluable. I've been able to list multiple properties and manage all inquiries in one place."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Michael Chen</h4>
                  <p className="text-sm text-muted-foreground">Property Investor</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300 bg-background rounded-lg p-6 shadow-md border border-border">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="mb-4 text-muted-foreground">
                "The messaging system made it so easy to communicate with property owners. I found and secured a rental apartment within days!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Emily Rodriguez</h4>
                  <p className="text-sm text-muted-foreground">Tenant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section - New section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700">
              <p className="text-3xl md:text-4xl font-bold mb-2">5,000+</p>
              <p className="text-primary-foreground/80">Active Listings</p>
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-100">
              <p className="text-3xl md:text-4xl font-bold mb-2">3,200+</p>
              <p className="text-primary-foreground/80">Happy Customers</p>
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-200">
              <p className="text-3xl md:text-4xl font-bold mb-2">1,500+</p>
              <p className="text-primary-foreground/80">Verified Vendors</p>
            </div>
            <div className="animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 delay-300">
              <p className="text-3xl md:text-4xl font-bold mb-2">98%</p>
              <p className="text-primary-foreground/80">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section - Enhanced */}
      <section className="py-16 md:py-24">
        <div className="container px-4">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-blue-700 p-8 text-center text-white md:p-12 animate-on-scroll opacity-0 translate-y-4 transition-all duration-700 relative">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mt-32 -mr-32 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -mb-32 -ml-32 blur-xl"></div>
            
            <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Ready to Find Your Next Property?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
              Whether you're looking to buy, sell, or rent, we've got you covered with the best selection of properties.
            </p>
            <ul className="flex flex-col md:flex-row justify-center gap-6 items-center max-w-xl mx-auto mb-8">
              <li className="flex items-center gap-2 text-left">
                <CheckCircle className="h-5 w-5 text-blue-300" />
                <span>No hidden fees</span>
              </li>
              <li className="flex items-center gap-2 text-left">
                <CheckCircle className="h-5 w-5 text-blue-300" />
                <span>Verified properties</span>
              </li>
              <li className="flex items-center gap-2 text-left">
                <CheckCircle className="h-5 w-5 text-blue-300" />
                <span>Direct communication</span>
              </li>
            </ul>
            <div className="flex flex-col justify-center gap-4 md:flex-row">
              <Button size="lg" asChild variant="secondary" className="text-primary hover:scale-105 transition-transform">
                <Link to="/properties?type=sale" className="flex items-center gap-2">
                  <Home size={18} />
                  Browse Properties For Sale
                </Link>
              </Button>
              <Button 
                size="lg" 
                asChild 
                variant="outline" 
                className="bg-transparent text-white hover:bg-white/10 border-white hover:scale-105 transition-transform"
              >
                <Link to="/properties?type=hire" className="flex items-center gap-2">
                  <Home size={18} />
                  Browse Properties For Rent
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex justify-center">
              <Button variant="link" className="text-white" asChild>
                <Link to="/contact" className="flex items-center gap-2">
                  <Phone size={16} /> 
                  Contact our support team
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
