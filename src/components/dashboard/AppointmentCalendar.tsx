
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Clock, MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Mock appointments data
const mockAppointments = [
  {
    id: 1,
    date: new Date(2025, 4, 25), // May 25, 2025
    time: "10:00 AM",
    property: "Modern Apartment",
    client: "John Smith",
    location: "123 Main St, Anytown",
    status: "confirmed",
  },
  {
    id: 2,
    date: new Date(2025, 4, 27), // May 27, 2025
    time: "2:30 PM",
    property: "Family Home",
    client: "Sarah Williams",
    location: "456 Oak Drive, Anytown",
    status: "pending",
  },
  {
    id: 3,
    date: new Date(2025, 4, 28), // May 28, 2025
    time: "11:15 AM",
    property: "Beach Villa",
    client: "Michael Jones",
    location: "789 Shore Rd, Beachside",
    status: "confirmed",
  },
  {
    id: 4,
    date: new Date(2025, 4, 28), // May 28, 2025 (second appointment same day)
    time: "3:00 PM",
    property: "Downtown Condo",
    client: "Emily Davis",
    location: "101 City Center, Downtown",
    status: "confirmed",
  }
];

const AppointmentCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Find appointments for the selected date
  const selectedDateAppointments = mockAppointments.filter(
    appointment => 
      date && 
      appointment.date.getDate() === date.getDate() &&
      appointment.date.getMonth() === date.getMonth() &&
      appointment.date.getFullYear() === date.getFullYear()
  );
  
  // Function to highlight dates with appointments
  const isDayWithAppointment = (day: Date) => {
    return mockAppointments.some(
      appointment => 
        appointment.date.getDate() === day.getDate() &&
        appointment.date.getMonth() === day.getMonth() &&
        appointment.date.getFullYear() === day.getFullYear()
    );
  };

  return (
    <div className="grid md:grid-cols-7 gap-6">
      <div className="md:col-span-3">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Calendar</CardTitle>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                hasAppointment: isDayWithAppointment
              }}
              modifiersClassNames={{
                hasAppointment: "bg-primary/10 font-bold text-primary"
              }}
              components={{
                DayContent: ({ date }) => (
                  <div className="relative">
                    {date.getDate()}
                    {isDayWithAppointment(date) && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                    )}
                  </div>
                )
              }}
            />
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-4">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>
              {date ? (
                <>Appointments for {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</>
              ) : (
                <>Select a date</>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDateAppointments.length > 0 ? (
              <div className="space-y-4">
                {selectedDateAppointments.map((appointment) => (
                  <Card key={appointment.id} className={cn(
                    "border-l-4 transition-all hover:shadow-md",
                    appointment.status === "confirmed" ? "border-l-green-500" : "border-l-amber-500"
                  )}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-semibold">{appointment.property}</h3>
                        <Badge className={cn(
                          appointment.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                        )}>
                          {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          {appointment.time}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <User className="h-4 w-4 mr-2" />
                          {appointment.client}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          {appointment.location}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1">Reschedule</Button>
                        <Button variant="outline" size="sm" className="flex-1">Cancel</Button>
                        <Button size="sm" className="flex-1">Confirm</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-muted-foreground mb-4">No appointments scheduled for this date</p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Appointment
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentCalendar;
