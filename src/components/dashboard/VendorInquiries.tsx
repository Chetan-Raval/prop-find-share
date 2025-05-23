
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for inquiries
const mockInquiries = [
  { 
    id: 1, 
    property: "Modern Apartment", 
    date: "Today", 
    name: "John Smith", 
    status: "New", 
    message: "I would like to schedule a viewing this weekend. Is the property available on Saturday morning?",
    propertyId: "prop123",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  },
  { 
    id: 2, 
    property: "Family Home", 
    date: "Yesterday", 
    name: "Sarah Williams", 
    status: "Responded", 
    message: "Is the price negotiable? I'm seriously interested in the property but it's slightly above my budget.",
    propertyId: "prop456",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG91c2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  { 
    id: 3, 
    property: "Beach Villa", 
    date: "2 days ago", 
    name: "Michael Jones", 
    status: "New", 
    message: "Are pets allowed in this property? I have a small dog and wanted to confirm before proceeding.",
    propertyId: "prop789",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
  },
  { 
    id: 4, 
    property: "Downtown Condo", 
    date: "3 days ago", 
    name: "Emily Davis", 
    status: "Responded", 
    message: "What amenities are included in the monthly HOA fee? Is parking included?",
    propertyId: "prop101",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29uZG98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
  },
  { 
    id: 5, 
    property: "Mountain Retreat", 
    date: "1 week ago", 
    name: "Robert Wilson", 
    status: "Closed", 
    message: "What's the internet connectivity like in the area? I need to work remotely occasionally.",
    propertyId: "prop202",
    image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW91bnRhaW4lMjBob21lfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
  }
];

interface VendorInquiriesProps {
  limit?: number;
}

const VendorInquiries = ({ limit }: VendorInquiriesProps) => {
  const [filter, setFilter] = useState<string>("all");
  
  const filteredInquiries = mockInquiries
    .filter(inquiry => {
      if (filter === "all") return true;
      return inquiry.status.toLowerCase() === filter.toLowerCase();
    })
    .slice(0, limit);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Inquiries</h2>
        <div className="flex items-center gap-3">
          <Select defaultValue="all" onValueChange={setFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="responded">Responded</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          {!limit && <Button variant="outline" size="sm">Export</Button>}
          
          {limit && (
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/inquiries" className="text-primary">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
      
      <div className="space-y-3">
        {filteredInquiries.map((inquiry) => (
          <Card key={inquiry.id} className="transition-all hover:shadow-md overflow-hidden">
            <CardContent className="p-0">
              <div className="flex">
                <div className="w-24 h-auto overflow-hidden">
                  <img src={inquiry.image} alt={inquiry.property} className="h-full w-full object-cover" />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <Link 
                      to={`/dashboard/property/${inquiry.propertyId}`} 
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {inquiry.property}
                    </Link>
                    <div className="text-sm text-muted-foreground">{inquiry.date}</div>
                  </div>
                  <div className="text-sm mb-2">
                    From: <span className="font-medium">{inquiry.name}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-3">
                    {inquiry.message}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className={cn(
                      "text-xs px-2 py-1 rounded-full font-medium",
                      inquiry.status === "New" ? "bg-primary/10 text-primary" : 
                      inquiry.status === "Responded" ? "bg-green-100 text-green-700" :
                      "bg-gray-100 text-gray-700"
                    )}>
                      {inquiry.status}
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="ghost" className="h-8">
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="h-8">
                        Respond
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredInquiries.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground mb-4">No inquiries match your filter</p>
            <Button onClick={() => setFilter("all")}>Show all inquiries</Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VendorInquiries;
