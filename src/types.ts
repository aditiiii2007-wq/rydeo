export type VehicleType = 'bike' | 'auto' | 'shared-auto' | 'mini' | 'sedan' | 'suv' | 'ev';
export type RideStatus = 'pending' | 'searching' | 'accepted' | 'ongoing' | 'completed' | 'cancelled';
export type UserRole = 'user' | 'driver' | 'admin';
export type Gender = 'male' | 'female' | 'other';

export interface Location {
  name: string;
  lat: number;
  lng: number;
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  phone?: string;
  gender?: Gender;
  photoURL?: string;
  role: UserRole;
  collegeName?: string;
  isStudentVerified: boolean;
  studentBadge?: string;
  walletBalance: number;
  rideCount: number;
  ratings: number;
  createdAt: string;
}

export interface Ride {
  id: string;
  passengerId: string;
  driverId?: string;
  pickup: Location;
  destination: Location;
  status: RideStatus;
  type: VehicleType;
  fare: number;
  isWomenOnly: boolean;
  isShared: boolean;
  passengerIds: string[];
  createdAt: string;
  updatedAt: string;
}
