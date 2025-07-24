import { create } from "zustand";
import type { Vehicle, VehicleStore, vehicleTelemetry } from "@/types/vehicle";

//mock API

const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Honda City",
    status: "ACTIVE",
    speed: 60,
    updated_at: "2025-07-23T09:30:00Z",
  },
  {
    id: 2,
    name: "Toyota Corolla",
    status: "INACTIVE",
    speed: 45,
    updated_at: "2025-07-22T14:15:00Z",
  },
  {
    id: 3,
    name: "Mitsubishi Xpander",
    status: "MAINTENANCE",
    speed: 75,
    updated_at: "2025-07-21T11:45:00Z",
  },
  {
    id: 4,
    name: "Daihatsu Terios",
    status: "ACTIVE",
    speed: 80,
    updated_at: "2025-07-23T10:00:00Z",
  },
  {
    id: 5,
    name: "Suzuki Ertiga",
    status: "ACTIVE",
    speed: 55,
    updated_at: "2025-07-23T10:30:00Z",
  },
];

const mockTelemetryData: Record<number, vehicleTelemetry> = {
  1: {
    vehicleId: 1,
    odometer: 15000,
    fuel_level: 75,
    timestamp: "2025-07-23T09:30:00Z",
    latitude: 37.7749,
    longitude: -122.4194,
    speed: 60,
  },
  2: {
    vehicleId: 2,
    odometer: 20000,
    fuel_level: 50,
    timestamp: "2025-07-22T14:15:00Z",
    latitude: 34.0522,
    longitude: -118.2437,
    speed: 45,
  },
  3: {
    vehicleId: 3,
    odometer: 12000,
    fuel_level: 60,
    timestamp: "2025-07-21T11:45:00Z",
    latitude: 40.7128,
    longitude: -74.006,
    speed: 75,
  },
  4: {
    vehicleId: 4,
    odometer: 18000,
    fuel_level: 80,
    timestamp: "2025-07-23T10:00:00Z",
    latitude: 34.0522,
    longitude: -118.2437,
    speed: 80,
  },
  5: {
    vehicleId: 5,
    odometer: 5000,
    fuel_level: 90,
    timestamp: "2025-07-23T10:30:00Z",
    latitude: 36.1699,
    longitude: -115.1398,
    speed: 55,
  },
};

const mockApiDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const useVehicleStore = create<VehicleStore>((set) => ({
  vehicles: [],
  selectedVehicle: null,
  isLoading: false,
  error: null,

  fetchVehicles: async () => {
    set({ isLoading: true, error: null });
    try {
      await mockApiDelay(800); //simulasi API delay
      set({ vehicles: mockVehicles, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: "Failed to fetch vehicles" });
    }
  },
  fetchVehicleDetail: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      await mockApiDelay(600);
      const telemetry = mockTelemetryData[id];
      if (!telemetry) {
        throw new Error("Vehicle not found");
      }
      set({ selectedVehicle: telemetry, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: "Failed to fetch vehicle detail" });
    }
  },
  clearError: () => set({ error: null }),
}));
