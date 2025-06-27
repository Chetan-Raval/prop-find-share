
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { showSuccessToast, showErrorToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { messageService } from "@/services/messageService";

interface MessageFormProps {
  recipientId: string;
  propertyId: string;
}

const MessageForm = ({ recipientId, propertyId }: MessageFormProps) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      showErrorToast("Authentication Required", "Please log in to send messages");
      navigate("/login");
      return;
    }
    
    if (!message.trim()) {
      showErrorToast("Message Required", "Please enter a message before sending");
      return;
    }
    
    setIsSending(true);
    
    try {
      await messageService.sendMessage({
        recipientId,
        propertyId,
        content: message.trim(),
      });
      
      showSuccessToast("Message Sent Successfully!", "Your message has been delivered to the vendor");
      setMessage("");
    } catch (error: any) {
      console.error("Send message error:", error);
      const errorMessage = error.response?.data?.message || "Failed to send message. Please try again.";
      showErrorToast("Message Failed", errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="Write your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="min-h-32"
      />
      <Button 
        type="submit" 
        disabled={isSending}
        className="w-full"
      >
        {isSending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
};

export default MessageForm;
