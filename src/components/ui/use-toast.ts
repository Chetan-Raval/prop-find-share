
import { useToast, toast } from "@/hooks/use-toast";

// Enhanced toast functions with amazing styling
export const showSuccessToast = (title: string, description?: string) => {
  toast({
    variant: "success",
    title,
    description,
  });
};

export const showErrorToast = (title: string, description?: string) => {
  toast({
    variant: "destructive", 
    title,
    description,
  });
};

export const showWarningToast = (title: string, description?: string) => {
  toast({
    variant: "warning",
    title,
    description,
  });
};

export const showInfoToast = (title: string, description?: string) => {
  toast({
    variant: "default",
    title,
    description,
  });
};

export { useToast, toast };
