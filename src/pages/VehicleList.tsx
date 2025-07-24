import { useEffect } from "react";
import { useVehicleStore } from "@/store/vehicleStore";
import { VehicleCard } from "@/components/VehicleCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Car, Activity } from "lucide-react";
import { ErrorAlert } from "@/components/ErrorAlert";

export const VehicleList = () => {
  const { vehicles, isLoading, error, fetchVehicles, clearError } =
    useVehicleStore();

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const activeVehicles = vehicles.filter((v) => v.status === "ACTIVE").length;
  const totalVehicles = vehicles.length;

  if (isLoading && vehicles.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-muted-foreground">Loading vehicles...</p>
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
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Vehicle Fleet
                </h1>
                <p className="text-muted-foreground">
                  Monitor and manage your vehicle fleet
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-status-active" />
                  <span className="text-2xl font-bold text-status-active">
                    {activeVehicles}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Active</p>
              </div>
              <div className="text-center">
                <div className="flex items-center space-x-2">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <span className="text-2xl font-bold text-foreground">
                    {totalVehicles}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="mb-6">
            <ErrorAlert
              error={error}
              onDismiss={clearError}
              onRetry={fetchVehicles}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {vehicles.length === 0 && !isLoading && !error && (
          <div className="text-center py-12">
            <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No vehicles found
            </h3>
            <p className="text-muted-foreground">
              Start by adding vehicles to your fleet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
