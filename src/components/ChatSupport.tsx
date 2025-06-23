
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      message: "Hi! Welcome to FindIndiaHome Support 🏠\n\nHow can I help you today? Select a topic or type your question below.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickOptions = [
    "How to search for properties?",
    "Property booking process",
    "Schedule property visit",
    "Property documentation help",
    "Contact property owner",
    "Payment and pricing queries"
  ];

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      message: message.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        message: getBotResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('search') || lowerMessage.includes('find')) {
      return "To search for properties on FindIndiaHome:\n\n1. Use the search bar on our homepage\n2. Filter by location, price, property type\n3. Use advanced filters for specific requirements\n\nNeed help with a specific search? Let me know your requirements!";
    } else if (lowerMessage.includes('booking') || lowerMessage.includes('book')) {
      return "Property booking process:\n\n1. Browse and select your desired property\n2. Click 'Contact Owner' or 'Book Now'\n3. Fill in your details and requirements\n4. Schedule a visit or direct booking\n\nOur team will connect you with the property owner within 24 hours.";
    } else if (lowerMessage.includes('visit') || lowerMessage.includes('schedule')) {
      return "To schedule a property visit:\n\n1. Go to the property details page\n2. Click 'Schedule Visit' button\n3. Choose your preferred date and time\n4. Add any special requirements\n\nProperty owners typically respond within 2-4 hours to confirm your visit.";
    } else if (lowerMessage.includes('document') || lowerMessage.includes('papers')) {
      return "For property documentation:\n\n• We verify all property documents\n• Legal verification reports available\n• Title deed, NOC, and approval documents\n• Our legal team can assist with documentation\n\nContact our legal support team for detailed document verification.";
    } else if (lowerMessage.includes('owner') || lowerMessage.includes('contact')) {
      return "To contact property owners:\n\n1. Visit the property details page\n2. Use 'Contact Owner' button\n3. Send direct message or request callback\n4. Schedule phone/video call\n\nAll owner contacts are verified for your safety and security.";
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Payment and pricing information:\n\n• No hidden charges or broker fees\n• Transparent pricing on all listings\n• Secure payment options available\n• EMI and loan assistance provided\n\nFor specific pricing queries, please share the property details and I'll help you connect with the right person.";
    } else {
      return "Thank you for contacting FindIndiaHome support! 🏠\n\nI understand you need help with: " + userMessage + "\n\nOur property experts will get back to you within 2-3 hours. You can also call us at +91-9876543210 or email support@findindiahome.com\n\nIs there anything else I can help you with?";
    }
  };

  const handleQuickOption = (option: string) => {
    handleSendMessage(option);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 pulse-glow"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-80 h-96 shadow-2xl animate-scale-in">
          <CardHeader className="pb-3 bg-gradient-to-r from-primary/10 to-blue-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-sm">FindIndiaHome Support</CardTitle>
                  <Badge variant="outline" className="text-xs">
                    Online
                  </Badge>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-full">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-start space-x-2 max-w-[80%]">
                      {msg.type === 'bot' && (
                        <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                          <Bot className="h-3 w-3 text-primary" />
                        </div>
                      )}
                      <div
                        className={`rounded-lg px-3 py-2 text-sm ${
                          msg.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.message}</p>
                      </div>
                      {msg.type === 'user' && (
                        <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center mt-1">
                          <User className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Quick Options */}
                {messages.length === 1 && (
                  <div className="space-y-2">
                    {quickOptions.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full text-xs h-auto py-2 px-3 text-left justify-start hover:bg-primary/5"
                        onClick={() => handleQuickOption(option)}
                      >
                        {option}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <Bot className="h-3 w-3 text-primary" />
                      </div>
                      <div className="bg-muted rounded-lg px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputMessage);
                }}
                className="flex space-x-2"
              >
                <Input
                  placeholder="Ask about properties..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 text-sm"
                />
                <Button type="submit" size="sm" disabled={!inputMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChatSupport;
