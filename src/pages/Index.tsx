
import HeroSection from "@/components/HeroSection";
import FeaturedProperties from "@/components/FeaturedProperties";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, MessageSquare, User } from "lucide-react";

const Index = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProperties />
      
      {/* How it works section */}
      <section className="bg-secondary/50 py-16">
        <div className="container px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground">
              Simple steps to find your dream property
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-background p-6 text-center shadow">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Home className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Browse Properties</h3>
              <p className="text-muted-foreground">
                Explore thousands of properties for sale and rent across the country
              </p>
            </div>
            
            <div className="rounded-lg bg-background p-6 text-center shadow">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Contact Vendors</h3>
              <p className="text-muted-foreground">
                Directly message or call property owners and agents with your inquiries
              </p>
            </div>
            
            <div className="rounded-lg bg-background p-6 text-center shadow">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Close the Deal</h3>
              <p className="text-muted-foreground">
                Finalize your purchase or rental agreement with confidence
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container px-4">
          <div className="rounded-xl bg-primary p-8 text-center text-white md:p-12">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to Find Your Next Property?
            </h2>
            <p className="mx-auto mb-6 max-w-2xl text-lg text-primary-foreground/90">
              Whether you're looking to buy, sell, or rent, we've got you covered with the best selection of properties.
            </p>
            <div className="flex flex-col justify-center gap-4 md:flex-row">
              <Button size="lg" asChild variant="secondary">
                <Link to="/properties?type=sale">Browse Properties For Sale</Link>
              </Button>
              <Button size="lg" asChild variant="outline" className="bg-transparent text-white hover:bg-white/10">
                <Link to="/properties?type=hire">Browse Properties For Rent</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
