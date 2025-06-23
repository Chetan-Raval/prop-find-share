
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
      message: "Hi, I'm FindIndiaHome Assistant. 👋\n\nWhat do you need help with? Select a topic or type your question below.",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickOptions = [
    "Where is my property listing?",
    "My verification status",
    "Payment is missing",
    "Update bank account for payout",
    "Customer's payment is failing"
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
    
    if (lowerMessage.includes('property') || lowerMessage.includes('listing')) {
      return "I can help you with property listings! Please check your vendor dashboard under 'My Properties' section. If you still can't find your listing, please provide your property ID and I'll look into it for you.";
    } else if (lowerMessage.includes('verification')) {
      return "For verification status, please go to your profile settings. Verification usually takes 24-48 hours. If it's been longer, please provide your account email and I'll check the status for you.";
    } else if (lowerMessage.includes('payment')) {
      return "For payment related issues, please check the 'Payments' section in your dashboard. If you're missing a payment, please provide the transaction ID or date, and I'll help you track it.";
    } else if (lowerMessage.includes('bank') || lowerMessage.includes('payout')) {
      return "To update your bank account for payouts, go to Settings > Payment Methods. Make sure to verify your new account details. Changes may take 1-2 business days to process.";
    } else {
      return "Thank you for your message! I understand you need help with: " + userMessage + "\n\nI'm connecting you with our support team who will get back to you within 2-3 hours. Is there anything else I can help you with right now?";
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
                  <CardTitle className="text-sm">Assistant</CardTitle>
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
                  placeholder="Ask a question"
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
