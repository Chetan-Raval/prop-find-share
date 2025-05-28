
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/services/messageService";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversationListProps {
  conversations: Message[];
  selectedConversation: string | null;
  onSelectConversation: (conversationId: string) => void;
  currentUser: any;
  isVendor: boolean;
}

const ConversationList = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  currentUser,
  isVendor
}: ConversationListProps) => {
  // Group conversations by property or contact
  const groupedConversations = conversations.reduce((acc, message) => {
    const key = `${message.propertyId}-${isVendor ? message.senderId : message.recipientId}`;
    if (!acc[key]) {
      acc[key] = {
        id: key,
        propertyId: message.propertyId,
        contactId: isVendor ? message.senderId : message.recipientId,
        contactName: isVendor ? "Customer" : "Vendor",
        lastMessage: message,
        unreadCount: 0,
        messages: []
      };
    }
    
    if (!message.isRead && message.recipientId === currentUser?.id) {
      acc[key].unreadCount++;
    }
    
    if (new Date(message.createdAt) > new Date(acc[key].lastMessage.createdAt)) {
      acc[key].lastMessage = message;
    }
    
    acc[key].messages.push(message);
    return acc;
  }, {} as Record<string, any>);

  const conversationsList = Object.values(groupedConversations).sort(
    (a: any, b: any) => new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime()
  );

  if (conversationsList.length === 0) {
    return (
      <div className="p-6 text-center">
        <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="font-semibold mb-2">No conversations yet</h3>
        <p className="text-sm text-muted-foreground">
          {isVendor 
            ? "When customers message you about properties, they'll appear here."
            : "Start chatting with vendors about properties you're interested in."
          }
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[500px]">
      <div className="space-y-1 p-2">
        {conversationsList.map((conversation: any) => (
          <Button
            key={conversation.id}
            variant="ghost"
            className={cn(
              "w-full justify-start p-4 h-auto relative",
              selectedConversation === conversation.id && "bg-primary/10 border-l-4 border-primary"
            )}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="flex items-start space-x-3 w-full">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-600 text-white">
                  {conversation.contactName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-left space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm">{conversation.contactName}</h4>
                  <div className="flex items-center space-x-2">
                    {conversation.unreadCount > 0 && (
                      <Badge className="bg-red-500 text-white text-xs h-5 w-5 p-0 flex items-center justify-center">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDistanceToNow(new Date(conversation.lastMessage.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  Property ID: {conversation.propertyId}
                </p>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {conversation.lastMessage.content}
                </p>
              </div>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ConversationList;
