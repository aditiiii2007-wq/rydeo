import { Location } from './types';

export const PUNE_LOCATIONS: Location[] = [
  { name: 'Akurdi', lat: 18.6498, lng: 73.7667 },
  { name: 'Pimpri', lat: 18.6298, lng: 73.7997 },
  { name: 'Chinchwad', lat: 18.6229, lng: 73.7717 },
  { name: 'Hinjewadi', lat: 18.5913, lng: 73.7389 },
  { name: 'Wakad', lat: 18.5987, lng: 73.7707 },
  { name: 'Kothrud', lat: 18.5074, lng: 73.8077 },
  { name: 'Shivajinagar', lat: 18.5308, lng: 73.8475 },
  { name: 'Swargate', lat: 18.5018, lng: 73.8636 },
  { name: 'FC Road', lat: 18.5204, lng: 73.8436 },
  { name: 'Baner', lat: 18.5590, lng: 73.7799 },
  { name: 'Viman Nagar', lat: 18.5679, lng: 73.9143 },
  { name: 'Hadapsar', lat: 18.5089, lng: 73.9259 },
  { name: 'Sinhagad Road', lat: 18.4555, lng: 73.8202 },
  { name: 'Pune Station', lat: 18.5289, lng: 73.8744 },
  { name: 'Nigdi', lat: 18.6657, lng: 73.7656 },
  { name: 'Deccan', lat: 18.5173, lng: 73.8415 },
  { name: 'Aundh', lat: 18.5580, lng: 73.8075 },
  { name: 'Pashan', lat: 18.5398, lng: 73.7935 },
  { name: 'Magarpatta', lat: 18.5137, lng: 73.9242 },
  { name: 'Bavdhan', lat: 18.5074, lng: 73.7820 }
];

export const VEHICLE_CONFIG = {
  bike: { label: 'Bike', icon: 'Bike', baseFare: 20, ratePerKm: 10 },
  auto: { label: 'Auto', icon: 'Car', baseFare: 30, ratePerKm: 15 },
  'shared-auto': { label: 'Shared Auto', icon: 'Users', baseFare: 15, ratePerKm: 8 },
  mini: { label: 'Mini Cab', icon: 'CarFront', baseFare: 60, ratePerKm: 20 },
  sedan: { label: 'Sedan', icon: 'CarFront', baseFare: 80, ratePerKm: 25 },
  suv: { label: 'SUV', icon: 'CarFront', baseFare: 120, ratePerKm: 35 },
  ev: { label: 'Electric', icon: 'Zap', baseFare: 50, ratePerKm: 18 },
};
