
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">About PropertyHub</h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Connecting property owners and seekers with the perfect spaces since 2023
        </p>
      </div>
      
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
          <p className="mb-4 text-muted-foreground">
            PropertyHub's mission is to empower people in their property journey by providing a 
            transparent, efficient platform that connects property seekers with owners. 
            We believe everyone deserves access to quality housing options and a 
            seamless experience when buying, selling, or renting properties.
          </p>
          <p className="text-muted-foreground">
            Whether you're a first-time home buyer, an experienced investor, or someone 
            looking for your next rental, we strive to make the process as smooth as 
            possible with our intuitive platform and dedicated support.
          </p>
        </div>
        
        <div className="h-72 bg-muted lg:h-80">
          {/* This would be an image in a real application */}
          <div className="flex h-full items-center justify-center">
            <p className="text-muted-foreground">Company Image</p>
          </div>
        </div>
      </div>
      
      <div className="my-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Why Choose PropertyHub?</h2>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold">Wide Selection</h3>
            <p className="text-muted-foreground">
              Access thousands of properties across the country, from apartments and houses 
              to commercial spaces, all in one place.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold">Direct Communication</h3>
            <p className="text-muted-foreground">
              Connect directly with property owners or interested buyers without intermediaries, 
              saving time and reducing miscommunication.
            </p>
          </div>
          
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold">User-Friendly Platform</h3>
            <p className="text-muted-foreground">
              Enjoy our intuitive interface designed to make property searching, listing, 
              and management simple and hassle-free.
            </p>
          </div>
        </div>
      </div>
      
      <div className="my-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Our Team</h2>
        
        <div className="grid gap-6 md:grid-cols-4">
          {[
            "John Doe, CEO",
            "Jane Smith, CTO",
            "Alex Johnson, Head of Operations",
            "Sarah Williams, Customer Success Manager"
          ].map((person, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto mb-4 h-32 w-32 rounded-full bg-muted"></div>
              <h3 className="text-lg font-semibold">{person.split(",")[0]}</h3>
              <p className="text-sm text-muted-foreground">{person.split(",")[1]}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="my-16 rounded-xl bg-primary p-8 text-center text-white md:p-12">
        <h2 className="mb-4 text-3xl font-bold">Join Our Community</h2>
        <p className="mx-auto mb-6 max-w-2xl text-lg text-primary-foreground/90">
          Whether you're looking to buy, sell, or rent, PropertyHub is here to help you every step of the way.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild variant="secondary">
            <Link to="/properties">Browse Properties</Link>
          </Button>
          <Button size="lg" asChild variant="outline" className="border-white bg-transparent text-white hover:bg-white/10">
            <Link to="/register">Create Account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default About;
