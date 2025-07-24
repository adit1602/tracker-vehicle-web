import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("Page not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex-items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground">404 - Not Found</h1>
        <p className="text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <a href="/" className="text-primary hover:text-primary/80 underline">
          return to fleet dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
