
import { Check } from "lucide-react";

interface PropertyFeaturesProps {
  features: string[];
}

const PropertyFeatures = ({ features }: PropertyFeaturesProps) => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center">
          <Check className="mr-2 h-4 w-4 text-primary" />
          <span>{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default PropertyFeatures;
