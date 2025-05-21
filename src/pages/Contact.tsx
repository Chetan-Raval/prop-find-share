
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { MessageSquare, Phone, MapPin, Mail } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate form data
      if (!formData.name || !formData.email || !formData.message) {
        toast.error("Please fill all required fields");
        return;
      }
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast.success("Message sent successfully!");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Contact Us</h1>
        <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
          Have questions or feedback? We'd love to hear from you!
        </p>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Get in Touch</h2>
            <p className="mb-6 text-muted-foreground">
              Feel free to reach out to us with any questions, feedback, or
              inquiries. Our team is here to help you with anything related to
              our platform or your property journey.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">(123) 456-7890</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">info@propertyhub.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">
                    123 Property Street
                    <br />
                    Real Estate City, RE 12345
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Social Media</p>
                  <div className="flex gap-3 text-muted-foreground">
                    <a href="#" className="hover:text-foreground">Facebook</a>
                    <a href="#" className="hover:text-foreground">Twitter</a>
                    <a href="#" className="hover:text-foreground">Instagram</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-60 rounded-lg bg-muted">
            {/* This would be a map in a real application */}
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Map would be displayed here</p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="min-h-32"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="mt-16">
        <h2 className="mb-8 text-center text-2xl font-bold">Frequently Asked Questions</h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              q: "How do I list my property?",
              a: "Register as a vendor, then click on 'Post a Property' in your dashboard and fill out the required details."
            },
            {
              q: "Is there a fee for listing properties?",
              a: "Basic listings are free. Premium features are available for a small fee to help your property stand out."
            },
            {
              q: "How do I contact a property owner?",
              a: "You can use the messaging system or call button on each property listing page."
            },
            {
              q: "Can I save properties to view later?",
              a: "Yes, registered customers can save properties to their favorites for easy access later."
            },
          ].map((faq, index) => (
            <div key={index} className="rounded-lg border bg-card p-6 shadow-sm">
              <h3 className="mb-2 font-semibold">{faq.q}</h3>
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
