import { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useVehicleStore } from "@/store/vehicleStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorAlert } from "@/components/ErrorAlert";
import {
  ArrowLeft,
  Fuel,
  Gauge,
  MapPin,
  Clock,
  Navigation,
  Activity,
} from "lucide-react";

export const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    selectedVehicle,
    vehicles,
    isLoading,
    error,
    fetchVehicleDetail,
    clearError,
  } = useVehicleStore();

  const vehicleId = parseInt(id || "0");
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  useEffect(() => {
    if (vehicleId) {
      fetchVehicleDetail(vehicleId);
    }
  }, [vehicleId, fetchVehicleDetail]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const formatCoordinate = (coord: number, type: "lat" | "lng") => {
    const direction =
      type === "lat" ? (coord >= 0 ? "N" : "S") : coord >= 0 ? "E" : "W";
    return `${Math.abs(coord).toFixed(4)}° ${direction}`;
  };

  const getFuelLevelColor = (level: number) => {
    if (level > 50) return "text-green-500";
    if (level > 20) return "text-yellow-500";
    return "text-red-500";
  };

  const getFuelLevelBg = (level: number) => {
    if (level > 50) return "bg-green-500";
    if (level > 20) return "bg-yellow-500";
    return "bg-red-500";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground">Loading vehicle details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <ErrorAlert
            error={error}
            onDismiss={clearError}
            onRetry={() => fetchVehicleDetail(vehicleId)}
          />
          <div className="mt-6">
            <Button variant="outline" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Fleet
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedVehicle || !vehicle) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-foreground mb-2">
              Vehicle not found
            </h3>
            <p className="text-muted-foreground mb-4">
              The requested vehicle could not be found
            </p>
            <Button variant="outline" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Fleet
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-dashboard-header border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="hover:bg-secondary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Fleet
              </Button>
              <div className="h-6 border-l border-border" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {vehicle.name}
                </h1>
                <p className="text-muted-foreground">
                  Vehicle Telemetry Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-status-active" />
              <span className="text-sm font-medium text-status-active">
                Live Data
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Speed Card */}
          <Card className="bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Gauge className="h-5 w-5 text-metric-speed" />
                <span>Current Speed</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-metric-speed mb-2">
                {selectedVehicle.speed}{" "}
                <span className="text-lg text-muted-foreground">km/h</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Real-time vehicle speed
              </p>
            </CardContent>
          </Card>

          {/* Fuel Level Card */}
          <Card className="bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Fuel className="h-5 w-5 text-accent" />
                <span>Fuel Level</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div
                  className={`text-3xl font-bold ${getFuelLevelColor(
                    selectedVehicle.fuel_level
                  )}`}
                >
                  {selectedVehicle.fuel_level.toFixed(1)}%
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${getFuelLevelBg(
                      selectedVehicle.fuel_level
                    )}`}
                    style={{ width: `${selectedVehicle.fuel_level}%` }}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Current fuel percentage
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Odometer Card */}
          <Card className="bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Navigation className="h-5 w-5 text-primary" />
                <span>Odometer</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">
                {selectedVehicle.odometer.toLocaleString()}{" "}
                <span className="text-lg text-muted-foreground">km</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Total distance traveled
              </p>
            </CardContent>
          </Card>

          {/* Location Card */}
          <Card className="bg-gradient-card border-border lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <MapPin className="h-5 w-5 text-destructive" />
                <span>Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Latitude</p>
                  <p className="text-lg font-semibold text-foreground">
                    {formatCoordinate(selectedVehicle.latitude, "lat")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Longitude
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {formatCoordinate(selectedVehicle.longitude, "lng")}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Coordinates: {selectedVehicle.latitude},{" "}
                  {selectedVehicle.longitude}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Timestamp Card */}
          <Card className="bg-gradient-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>Last Update</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium text-foreground mb-1">
                {formatDate(selectedVehicle.timestamp)}
              </div>
              <p className="text-sm text-muted-foreground">
                Latest telemetry data
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
