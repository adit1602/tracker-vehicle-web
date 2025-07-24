export interface Vehicle {
  id: number;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "MAINTENANCE";
  speed: number;
  updated_at: string;
}

export interface vehicleTelemetry {
  vehicleId: number;
  odometer: number;
  fuel_level: number;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
}

export interface VehicleStore {
  vehicles: Vehicle[];
  selectedVehicle: vehicleTelemetry | null;
  isLoading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  fetchVehicleDetail: (id: number) => Promise<void>;
  clearError: () => void;
}
