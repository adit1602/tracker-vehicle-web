import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, Gauge, MapPin } from "lucide-react";
import type { Vehicle } from "@/types/vehicle";
import { Link } from "react-router-dom";

interface VehicleCardProps {
  vehicle: Vehicle;
}

const getStatusVariant = (status: Vehicle["status"]) => {
  switch (status) {
    case "ACTIVE":
      return "default";
    case "INACTIVE":
      return "secondary";
    case "MAINTENANCE":
      return "destructive";

    default:
      return "secondary";
  }
};

const getStatusColor = (status: Vehicle["status"]) => {
  switch (status) {
    case "ACTIVE":
      return "text-status-active";
    case "INACTIVE":
      return "text-status-inactive";
    case "MAINTENANCE":
      return "text-status-danger";
    default:
      return "text-muted-foreground";
  }
};

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card className="bg-gradient-card border-border hover:border-primary/50 transisition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between ">
          <CardTitle className="text-lg font-semibold">
            {vehicle.name}
          </CardTitle>
        </div>
        <Badge
          variant={getStatusVariant(vehicle.status)}
          className={` ${getStatusColor(vehicle.status)} font-medium`}
        ></Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Gauge className="h-4 w-4 text-metric-speed" />
            <div>
              <p className="text-sm text-muted-foreground">Speed</p>
              <p className="font-semibold text-metric-speed">
                {vehicle.speed} km/h
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Last Update</p>
              <p className="text-sm font-medium text-foreground">
                {formatDate(vehicle.updated_at)}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Link to={`/vehicles/${vehicle.id}`}>
            <Button
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              size="sm"
            >
              <MapPin className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
