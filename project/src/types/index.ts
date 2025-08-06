export interface User {
  userId: number;
  name: string;
  email: string;
  phone: string;
  role: 'super_admin' | 'admin' | 'resident' | 'security_staff';
  societyId?: number;
  flatId?: number;
  isVerified: boolean;
}

export interface Society {
  societyId: number;
  name: string;
  address: string;
  state: string;
  country: string;
  city: string;
  pincode: number;
  createdAt: string;
  isVerified: boolean;
}

export interface Wing {
  wingId: number;
  name: string;
  totalFloors: number;
  flatsPerFloor: number;
  societyId: number;
}

export interface Flat {
  flatId: number;
  wingId: number;
  flatNumber: string;
  floorNumber: string;
  area: number;
  status: string;
  wing?: Wing;
}

export interface Amenity {
  amenityId: number;
  societyId: number;
  name: string;
  description: string;
  hourlyRate: number;
  maxCapacity: number;
  openingTime: string;
  closingTime: string;
}

export interface Booking {
  bookingId: number;
  userId: number;
  flatId: number;
  amenityId: number;
  createdAt: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  amount: number;
  paid: boolean;
  transactionId?: string;
  status: string;
  amenity?: Amenity;
  flat?: Flat;
  user?: User;
}

export interface Complaint {
  complaintId: number;
  flatId: number;
  raisedBy: number;
  title: string;
  description: string;
  category: string;
  status: string;
  createdAt: string;
  resolvedAt?: string;
  flat?: Flat;
  user?: User;
}

export interface Announcement {
  aId: number;
  title: string;
  content: string;
  createdAt: string;
  createdBy: number;
  societyId: number;
  isGlobal: boolean;
  user?: User;
}

export interface Visitor {
  visitorId: number;
  flatId: number;
  name: string;
  visitorType: string;
  phone: string;
  vehicleNo?: string;
  purpose: string;
  entryTime: string;
  exitTime?: string;
  recordedBy: number;
  flat?: Flat;
  recordedByUser?: User;
}

export interface MaintenanceBill {
  mbId: number;
  flatId: number;
  mfid: number;
  periodStart: string;
  periodEnd: string;
  dueDate: string;
  amount: number;
  paidDate?: string;
  paid: boolean;
  transactionId?: string;
  flat?: Flat;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
  loading: boolean;
}