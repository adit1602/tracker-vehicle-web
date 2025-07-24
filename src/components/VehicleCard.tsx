import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, Gauge } from "lucide-react";
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
      return "bg-green-500 text-green-50";
    case "INACTIVE":
      return "bg-primary-50 text-primary-50";
    case "MAINTENANCE":
      return "bg-yellow-600 text-yellow-50";
    default:
      return "text-muted-foreground";
  }
};

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card className="bg-gradient-card border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-foreground">
            {vehicle.name}
          </CardTitle>
          <Badge
            variant={getStatusVariant(vehicle.status)}
            className={`${getStatusColor(
              vehicle.status
            )} font-medium flex-shrink-0`}
          >
            {vehicle.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        <div className="grid grid-cols-2 gap-4 flex-1">
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

        <div className="pt-2 mt-auto">
          <Link to={`/vehicles/${vehicle.id}`}>
            <Button
              className="w-full hover:opacity-90 transition-opacity"
              size="sm"
            >
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
