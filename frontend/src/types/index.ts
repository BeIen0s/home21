// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// User related types
export interface User extends BaseEntity {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

// Resident types
export enum ResidentStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  DEPARTURE_PENDING = 'departure_pending',
  DEPARTED = 'departed'
}

export interface Resident extends User {
  status: ResidentStatus;
  arrivalDate?: string;
  departureDate?: string;
  room?: Room;
  emergencyContact?: EmergencyContact;
}

// Housing types
export enum RoomStatus {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  MAINTENANCE = 'maintenance',
  RESERVED = 'reserved'
}

export interface House extends BaseEntity {
  number: string;
  totalRooms: number;
  rooms: Room[];
  occupancyRate: number;
}

export interface Room extends BaseEntity {
  number: string;
  status: RoomStatus;
  house: House;
  currentResident?: Resident;
}

// Task types
export enum TaskStatus {
  PENDING = 'pending',
  ASSIGNED = 'assigned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  OVERDUE = 'overdue'
}

export enum TaskType {
  CLEANING = 'cleaning',
  MAINTENANCE = 'maintenance',
  INSPECTION = 'inspection',
  REPAIR = 'repair'
}

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task extends BaseEntity {
  title: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  assigneeName?: string;
  dueDate: string;
  completedAt?: string;
  roomNumber?: string;
}

// Service types
export enum ServiceType {
  GROCERY = 'grocery',
  MEAL = 'meal',
  TRANSPORT = 'transport',
  RENTAL = 'rental'
}

export enum ServiceStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface ServiceRequestDetails {
  items?: string[];
  quantity?: number;
  notes?: string;
  deliveryDate?: string;
  pickupLocation?: string;
  destinationLocation?: string;
}

export interface ServiceRequest extends BaseEntity {
  type: ServiceType;
  status: ServiceStatus;
  details: ServiceRequestDetails;
  requesterId: string;
  requesterName: string;
  totalAmount?: number;
}

// Announcement types
export enum AnnouncementPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

export interface Announcement extends BaseEntity {
  title: string;
  content: string;
  priority: AnnouncementPriority;
  authorId: string;
  authorName: string;
  publishedAt?: string;
  expiresAt?: string;
  targetAudience?: string[];
}

// Statistics types
export interface DashboardStats {
  totalResidents: number;
  activeResidents: number;
  occupancyRate: number;
  pendingTasks: number;
  completedTasksToday: number;
  pendingServices: number;
  monthlyRevenue: number;
  newAnnouncementsCount: number;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Form types
export interface CreateResidentForm {
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  arrivalDate?: string;
  roomId?: string;
  emergencyContact?: Partial<EmergencyContact>;
}

export interface CreateTaskForm {
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  dueDate: string;
  assigneeId?: string;
  roomNumber?: string;
}

export interface CreateServiceRequestForm {
  type: ServiceType;
  details: ServiceRequestDetails;
}

// Navigation types
export interface NavigationItem {
  name: string;
  href: string;
  icon?: string;
  badge?: number;
  active?: boolean;
}