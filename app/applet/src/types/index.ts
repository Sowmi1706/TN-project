export type Language = 'en' | 'ta' | 'hi' | 'ml' | 'te';

export type UserRole = 'tourist' | 'admin' | 'sponsor' | 'partner';

export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  role: UserRole;
  termsAcceptedVersion?: string;
  termsAcceptedAt?: string;
  firstBookingDiscountUsed: boolean;
  phone?: string;
}

export type TravelGroupType = 'solo' | 'family' | 'friends' | 'couple' | 'group_connect';

export type TravelerCategory = 
  | 'temple_spiritual'
  | 'historical_heritage'
  | 'nature_wildlife'
  | 'photography'
  | 'food_culture'
  | 'educational_research'
  | 'general_tourist';

export type TripPurpose = 
  | 'devotional'
  | 'temple_circuit'
  | 'nature_hills'
  | 'beaches'
  | 'adventure'
  | 'relaxation'
  | 'food_culture'
  | 'historical_research'
  | 'photography'
  | 'shopping'
  | 'entertainment'
  | 'wildlife'
  | 'weekend_getaway'
  | 'educational'
  | 'festival';

export type BudgetLevel = 'budget' | 'standard' | 'premium' | 'luxury' | 'not_sure';

export type PlanningStyle = 'planned' | 'unplanned' | 'flexible';

export interface UserPreferences {
  groupType: TravelGroupType;
  categories: TravelerCategory[];
  tripPurpose: TripPurpose;
  budgetLevel: BudgetLevel;
  approxBudget: number;
  planningStyle: PlanningStyle;
  // Specific details
  adults?: number;
  children?: number;
  friendsCount?: number;
  nightlifeInterest?: boolean;
  startDate?: string;
  returnDate?: string;
  startLocation?: string;
  currentLocation?: string;
  transportPreference?: 'bus' | 'mini_bus' | 'tempo_traveller' | 'car' | 'train' | 'flight' | 'any';
  needBusQuote?: boolean;
}

export type WeatherAlertSeverity = 'green' | 'yellow' | 'orange' | 'red';

export interface WeatherInfo {
  district: string;
  temperature: number;
  condition: string;
  rainfall: string;
  windSpeed: string;
  severity: WeatherAlertSeverity;
  alertHeadline?: string;
  bookingRestricted: boolean;
  alternativeSafePlaces?: string[];
  lastUpdated: string;
}

export interface Destination {
  id: string;
  name: string;
  district: string;
  category: TravelerCategory;
  shortDescription: string;
  longDescription: string;
  image: string;
  gallery: string[];
  popularAttractions: string[];
  estimatedCost: number; // in INR
  rating: number;
  reviewCount: number;
  isHidden: boolean;
  isTrending: boolean;
  bestTimeToVisit: string;
  tags: string[];
  // Special fields
  templeInfo?: {
    deity: string;
    darshanTimings: string;
    poojaTypes: string[];
    dressCode: string;
    specialFestivals: string[];
  };
  heritageInfo?: {
    dynasty: string;
    century: string;
    archaeologicalImportance: string;
    photographyRules: string;
  };
  weatherDangerStatus?: WeatherAlertSeverity;
  bookingRestricted?: boolean;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface TourPackage {
  id: string;
  destinationId: string;
  destinationName: string;
  title: string;
  days: number;
  nights: number;
  pricePerPerson: number;
  inclusions: string[];
  itinerarySummary: string[];
  availableSlots: number;
  badge?: string;
}

export type BookingServiceType = 'travel_and_hotel' | 'hotel_only' | 'travel_only';

export interface CaretakerGuideOption {
  caretaker: boolean;
  guide: boolean;
  caretakerFee: number;
  guideFee: number;
}

export interface Booking {
  id: string;
  bookingRef: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  destinationId: string;
  destinationName: string;
  bookingServiceType: BookingServiceType;
  startDate: string;
  returnDate: string;
  travellers: number;
  adults: number;
  children: number;
  companionType: TravelGroupType;
  arrangementPreference: 'plan_for_me' | 'plan_own';
  selectedPackageId?: string;
  hotelDetails?: {
    hotelName: string;
    roomType: string;
    nights: number;
    pricePerNight: number;
  };
  transportDetails?: {
    vehicleType: string;
    pickupLocation: string;
    dropLocation: string;
    price: number;
  };
  caretakerGuide: CaretakerGuideOption;
  addOnServices: {
    id: string;
    name: string;
    price: number;
  }[];
  originalPrice: number;
  appliedCoupon?: string;
  discountPercentage?: number;
  discountAmount: number;
  finalPrice: number;
  bookingStatus: 'confirmed' | 'pending_payment' | 'cancelled';
  paymentStatus: 'paid' | 'pending' | 'free';
  isFirstBookingDiscount: boolean;
  travelKitClaimed: boolean;
  travelKitQr: string;
  changingRoomBooked?: boolean;
  createdAt: string;
}

export interface SpinReward {
  id: string;
  label: string;
  subtext: string;
  probability: number; // percentage, e.g. 50
  isWinning: boolean;
  couponCode?: string;
  discountValue?: number;
  color: string;
}

export interface SpinHistory {
  id: string;
  userId: string;
  dateStr: string; // YYYY-MM-DD in IST
  timestamp: string;
  rewardId: string;
  rewardLabel: string;
  couponCode?: string;
  claimed: boolean;
}

export interface BeachFacility {
  id: string;
  beachName: string;
  district: string;
  facilityName: string;
  photo: string;
  amenities: string[];
  freeServiceNotice: string; // "No Booking Fee – Customer Payable: ₹0"
  optionalServices?: {
    name: string;
    price: number;
  }[];
  openHours: string;
  distanceFromShore: string;
  verified: boolean;
  phone: string;
}

export interface BeachBooking {
  id: string;
  bookingRef: string;
  facilityId: string;
  facilityName: string;
  beachName: string;
  userId: string;
  customerName: string;
  date: string;
  timeSlot: string;
  guests: number;
  qrCode: string;
  optionalAddons: string[];
  totalPayable: number; // 0 for standard
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface Sponsor {
  id: string;
  brandName: string;
  companyName: string;
  category: string;
  logo: string;
  description: string;
  status: 'active' | 'pending';
  productsInKit: string[];
  activeCampaigns: string;
  kitsDistributed: number;
}

export interface Review {
  id: string;
  destinationId: string;
  destinationName: string;
  userId: string;
  userName: string;
  rating: number;
  tripDate: string;
  text: string;
  photoUrl?: string;
  verifiedBooking: boolean;
  createdAt: string;
}

export interface BusAgent {
  id: string;
  agencyName: string;
  operatorName: string;
  district: string;
  fleetTypes: {
    type: string;
    seats: number;
    ratePerKm: number;
    minCharge: number;
  }[];
  verified: boolean;
  phone: string;
  rating: number;
  specialties: string[];
}

export interface BusQuotationRequest {
  id: string;
  userId: string;
  customerName: string;
  phone: string;
  tripType: string;
  route: string;
  startDate: string;
  returnDate: string;
  passengerCount: number;
  preferredBusType: string;
  purpose: string;
  status: 'quotation_sent' | 'pending' | 'booked';
  createdAt: string;
}
