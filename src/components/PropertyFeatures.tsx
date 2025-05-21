
import { Check } from "lucide-react";

interface PropertyFeaturesProps {
  features: string[];
}

const PropertyFeatures = ({ features }: PropertyFeaturesProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="flex items-center rounded-lg bg-muted/50 p-2 transition-all hover:bg-muted"
        >
          <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-4 w-4 text-primary" />
          </div>
          <span className="text-sm font-medium">{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default PropertyFeatures;
