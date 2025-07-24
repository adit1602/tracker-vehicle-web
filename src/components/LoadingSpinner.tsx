import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  classname?: string;
  size?: "sm" | "md" | "lg";
}

export const LoadingSpinner = ({
  classname,
  size = "md",
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  return (
    <div className="flex itenms-center justify-center">
      <Loader2
        className={cn(
          "animate-spin text-primary",
          sizeClasses[size],
          classname
        )}
        aria-label="Loading"
      />
    </div>
  );
};
