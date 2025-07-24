import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, X } from "lucide-react";

interface ErrorAlertProps {
  error: string;
  onDismiss?: () => void;
  onRetry?: () => void;
}

export const ErrorAlert = ({ error, onDismiss, onRetry }: ErrorAlertProps) => {
  return (
    <Alert variant="destructive" className="relative">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="mt-2 pr-8">
        {error}
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-2 bg-background text-foreground border-border hover:bg-secondary"
          >
            Try Again
          </Button>
        )}
      </AlertDescription>
      {onDismiss && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-destructive/20"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </Alert>
  );
};
