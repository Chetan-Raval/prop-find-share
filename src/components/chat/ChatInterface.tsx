
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { messageService, Message } from "@/services/messageService";
import { formatDistanceToNow } from "date-fns";
import { Send, Phone, MoreVertical, Home } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  conversationId: string;
  currentUser: any;
  isVendor: boolean;
  onMessageSent: () => void;
}

const ChatInterface = ({ conversationId, currentUser, isVendor, onMessageSent }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Parse conversation ID to get propertyId and contactId
  const [propertyId, contactId] = conversationId.split('-');

  useEffect(() => {
    loadMessages();
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await messageService.getPropertyMessages(propertyId);
      // Filter messages for this specific conversation
      const conversationMessages = data.filter(msg => 
        (msg.senderId === contactId && msg.recipientId === currentUser?.id) ||
        (msg.senderId === currentUser?.id && msg.recipientId === contactId)
      );
      setMessages(conversationMessages);
      
      // Mark unread messages as read
      const unreadMessages = conversationMessages.filter(msg => 
        !msg.isRead && msg.recipientId === currentUser?.id
      );
      
      for (const msg of unreadMessages) {
        await messageService.markAsRead(msg.id);
      }
    } catch (error) {
      console.error("Failed to load messages:", error);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || sending) return;
    
    setSending(true);
    
    try {
      const messageData = {
        recipientId: contactId,
        propertyId: propertyId,
        content: newMessage.trim()
      };
      
      const sentMessage = await messageService.sendMessage(messageData);
      setMessages(prev => [...prev, sentMessage]);
      setNewMessage("");
      onMessageSent();
      toast.success("Message sent!");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading conversation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-blue-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-600 text-white">
                {isVendor ? "C" : "V"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">
                {isVendor ? "Customer" : "Vendor"}
              </CardTitle>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Home className="h-4 w-4" />
                <span>Property ID: {propertyId}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {/* Messages Area */}
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-[400px] p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((message) => {
                const isOwnMessage = message.senderId === currentUser?.id;
                return (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      isOwnMessage ? "justify-end" : "justify-start"
                    )}
                  >
                    <div className={cn(
                      "flex items-start space-x-2 max-w-[70%]",
                      isOwnMessage && "flex-row-reverse space-x-reverse"
                    )}>
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className={cn(
                          "text-white text-sm",
                          isOwnMessage 
                            ? "bg-gradient-to-br from-primary to-primary/70"
                            : "bg-gradient-to-br from-gray-500 to-gray-600"
                        )}>
                          {isOwnMessage ? "You" : (isVendor ? "C" : "V")}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className={cn(
                        "rounded-lg px-4 py-2 shadow-sm",
                        isOwnMessage
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}>
                        <p className="text-sm">{message.content}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className={cn(
                            "text-xs",
                            isOwnMessage ? "text-primary-foreground/70" : "text-muted-foreground"
                          )}>
                            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                          </p>
                          {isOwnMessage && (
                            <Badge variant="outline" className="text-xs ml-2">
                              {message.isRead ? "Read" : "Sent"}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Message Input */}
      <div className="border-t p-4 bg-white">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 min-h-[44px] max-h-[120px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <Button 
            type="submit" 
            disabled={!newMessage.trim() || sending}
            className="self-end"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;
