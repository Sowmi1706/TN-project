import { 
  User, 
  UserPreferences, 
  Destination, 
  TourPackage, 
  Booking, 
  SpinReward, 
  SpinHistory, 
  WeatherInfo, 
  BeachFacility, 
  BeachBooking, 
  Sponsor, 
  Review, 
  BusQuotationRequest 
} from '../types';
import { 
  INITIAL_DESTINATIONS, 
  INITIAL_PACKAGES, 
  INITIAL_SPIN_REWARDS, 
  INITIAL_WEATHER_ALERTS, 
  INITIAL_BEACH_FACILITIES, 
  INITIAL_SPONSORS, 
  INITIAL_REVIEWS 
} from '../data/mockData';

const STORAGE_KEYS = {
  USER: 'tn_stories_user_v2',
  PREFERENCES: 'tn_stories_preferences_v2',
  LANGUAGE: 'tn_stories_lang_v2',
  DESTINATIONS: 'tn_stories_destinations_v2',
  PACKAGES: 'tn_stories_packages_v2',
  BOOKINGS: 'tn_stories_bookings_v2',
  SPIN_HISTORY: 'tn_stories_spin_history_v2',
  SPIN_REWARDS_CONFIG: 'tn_stories_spin_rewards_v2',
  WEATHER_ALERTS: 'tn_stories_weather_v2',
  BEACH_FACILITIES: 'tn_stories_beach_facilities_v2',
  BEACH_BOOKINGS: 'tn_stories_beach_bookings_v2',
  SPONSORS: 'tn_stories_sponsors_v2',
  REVIEWS: 'tn_stories_reviews_v2',
  BUS_QUOTATIONS: 'tn_stories_bus_quotations_v2',
  OFFLINE_TRIP_DATA: 'tn_stories_offline_cache_v2',
  TERMS_VERSION: 'v2.4'
};

export const DEFAULT_USER: User = {
  id: 'usr-guest-01',
  name: 'Kavitha Ramasamy',
  email: 'kavitha.tourist@example.com',
  username: 'kavitha_tn',
  role: 'tourist',
  termsAcceptedVersion: 'v2.4',
  termsAcceptedAt: new Date().toISOString(),
  firstBookingDiscountUsed: false,
  phone: '+91 98401 23456'
};

export const DEFAULT_PREFERENCES: UserPreferences = {
  groupType: 'family',
  categories: ['temple_spiritual', 'nature_wildlife'],
  tripPurpose: 'devotional',
  budgetLevel: 'standard',
  approxBudget: 15000,
  planningStyle: 'planned',
  adults: 2,
  children: 1,
  startLocation: 'Chennai',
  transportPreference: 'bus'
};

export class StorageService {
  // User & Auth
  static getUser(): User {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    if (!raw) {
      this.setUser(DEFAULT_USER);
      return DEFAULT_USER;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_USER;
    }
  }

  static setUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  // Terms & Conditions
  static hasAcceptedTerms(user: User): boolean {
    return user.termsAcceptedVersion === STORAGE_KEYS.TERMS_VERSION;
  }

  static acceptTerms(user: User): User {
    const updated: User = {
      ...user,
      termsAcceptedVersion: STORAGE_KEYS.TERMS_VERSION,
      termsAcceptedAt: new Date().toISOString()
    };
    this.setUser(updated);
    return updated;
  }

  // Preferences
  static getPreferences(): UserPreferences {
    const raw = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
    if (!raw) {
      this.setPreferences(DEFAULT_PREFERENCES);
      return DEFAULT_PREFERENCES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return DEFAULT_PREFERENCES;
    }
  }

  static setPreferences(pref: UserPreferences): void {
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(pref));
  }

  // Destinations
  static getDestinations(): Destination[] {
    const raw = localStorage.getItem(STORAGE_KEYS.DESTINATIONS);
    if (!raw) {
      this.setDestinations(INITIAL_DESTINATIONS);
      return INITIAL_DESTINATIONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_DESTINATIONS;
    }
  }

  static setDestinations(destinations: Destination[]): void {
    localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(destinations));
  }

  static saveDestination(dest: Destination): void {
    const list = this.getDestinations();
    const index = list.findIndex(d => d.id === dest.id);
    if (index >= 0) {
      list[index] = dest;
    } else {
      list.unshift(dest);
    }
    this.setDestinations(list);
  }

  // Packages
  static getPackages(): TourPackage[] {
    const raw = localStorage.getItem(STORAGE_KEYS.PACKAGES);
    if (!raw) {
      this.setPackages(INITIAL_PACKAGES);
      return INITIAL_PACKAGES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_PACKAGES;
    }
  }

  static setPackages(packages: TourPackage[]): void {
    localStorage.setItem(STORAGE_KEYS.PACKAGES, JSON.stringify(packages));
  }

  // Bookings
  static getBookings(): Booking[] {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static saveBooking(booking: Booking): void {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.id === booking.id);
    if (index >= 0) {
      bookings[index] = booking;
    } else {
      bookings.unshift(booking);
    }
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

    // If first booking discount was applied, update user profile
    if (booking.isFirstBookingDiscount) {
      const user = this.getUser();
      user.firstBookingDiscountUsed = true;
      this.setUser(user);
    }
  }

  // Spin & Win History & Eligibility
  static getISTDateString(): string {
    // Current date in Indian Standard Time (UTC+5:30)
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istDate = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + istOffset);
    return istDate.toISOString().split('T')[0];
  }

  static getSpinHistory(): SpinHistory[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SPIN_HISTORY);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static hasUserSpunToday(userId: string): boolean {
    const today = this.getISTDateString();
    const history = this.getSpinHistory();
    return history.some(item => item.userId === userId && item.dateStr === today);
  }

  static recordSpin(userId: string, reward: SpinReward): SpinHistory {
    const today = this.getISTDateString();
    const history = this.getSpinHistory();
    const newSpin: SpinHistory = {
      id: `spin-${Date.now()}`,
      userId,
      dateStr: today,
      timestamp: new Date().toISOString(),
      rewardId: reward.id,
      rewardLabel: reward.label,
      couponCode: reward.couponCode,
      claimed: false
    };
    history.unshift(newSpin);
    localStorage.setItem(STORAGE_KEYS.SPIN_HISTORY, JSON.stringify(history));
    return newSpin;
  }

  static getTimeUntilNextSpin(): { hours: number; minutes: number; seconds: number } {
    const now = new Date();
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(now.getTime() + (now.getTimezoneOffset() * 60000) + istOffset);
    
    // Target next 12:00 AM IST
    const nextMidnight = new Date(istNow);
    nextMidnight.setHours(24, 0, 0, 0);

    const diffMs = nextMidnight.getTime() - istNow.getTime();
    const totalSecs = Math.max(0, Math.floor(diffMs / 1000));
    
    const hours = Math.floor(totalSecs / 3600);
    const minutes = Math.floor((totalSecs % 3600) / 60);
    const seconds = totalSecs % 60;

    return { hours, minutes, seconds };
  }

  static getSpinRewards(): SpinReward[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SPIN_REWARDS_CONFIG);
    if (!raw) {
      this.setSpinRewards(INITIAL_SPIN_REWARDS);
      return INITIAL_SPIN_REWARDS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_SPIN_REWARDS;
    }
  }

  static setSpinRewards(rewards: SpinReward[]): void {
    localStorage.setItem(STORAGE_KEYS.SPIN_REWARDS_CONFIG, JSON.stringify(rewards));
  }

  // Weather & Danger Zones
  static getWeatherAlerts(): WeatherInfo[] {
    const raw = localStorage.getItem(STORAGE_KEYS.WEATHER_ALERTS);
    if (!raw) {
      this.setWeatherAlerts(INITIAL_WEATHER_ALERTS);
      return INITIAL_WEATHER_ALERTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_WEATHER_ALERTS;
    }
  }

  static setWeatherAlerts(alerts: WeatherInfo[]): void {
    localStorage.setItem(STORAGE_KEYS.WEATHER_ALERTS, JSON.stringify(alerts));
  }

  // Beach Facilities & Bookings
  static getBeachFacilities(): BeachFacility[] {
    const raw = localStorage.getItem(STORAGE_KEYS.BEACH_FACILITIES);
    if (!raw) {
      this.setBeachFacilities(INITIAL_BEACH_FACILITIES);
      return INITIAL_BEACH_FACILITIES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_BEACH_FACILITIES;
    }
  }

  static setBeachFacilities(facilities: BeachFacility[]): void {
    localStorage.setItem(STORAGE_KEYS.BEACH_FACILITIES, JSON.stringify(facilities));
  }

  static getBeachBookings(): BeachBooking[] {
    const raw = localStorage.getItem(STORAGE_KEYS.BEACH_BOOKINGS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static saveBeachBooking(booking: BeachBooking): void {
    const list = this.getBeachBookings();
    list.unshift(booking);
    localStorage.setItem(STORAGE_KEYS.BEACH_BOOKINGS, JSON.stringify(list));
  }

  // Sponsors
  static getSponsors(): Sponsor[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SPONSORS);
    if (!raw) {
      this.setSponsors(INITIAL_SPONSORS);
      return INITIAL_SPONSORS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_SPONSORS;
    }
  }

  static setSponsors(sponsors: Sponsor[]): void {
    localStorage.setItem(STORAGE_KEYS.SPONSORS, JSON.stringify(sponsors));
  }

  static addSponsor(sponsor: Sponsor): void {
    const list = this.getSponsors();
    list.unshift(sponsor);
    this.setSponsors(list);
  }

  // Reviews
  static getReviews(): Review[] {
    const raw = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    if (!raw) {
      this.setReviews(INITIAL_REVIEWS);
      return INITIAL_REVIEWS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_REVIEWS;
    }
  }

  static setReviews(reviews: Review[]): void {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }

  static addReview(review: Review): void {
    const list = this.getReviews();
    list.unshift(review);
    this.setReviews(list);
  }

  static deleteReview(id: string): void {
    const list = this.getReviews().filter(r => r.id !== id);
    this.setReviews(list);
  }

  // Bus Quotations
  static getBusQuotations(): BusQuotationRequest[] {
    const raw = localStorage.getItem(STORAGE_KEYS.BUS_QUOTATIONS);
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  static saveBusQuotation(req: BusQuotationRequest): void {
    const list = this.getBusQuotations();
    list.unshift(req);
    localStorage.setItem(STORAGE_KEYS.BUS_QUOTATIONS, JSON.stringify(list));
  }

  // Offline Trip Mode Cache & Storage
  static getOfflineCache(): any {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFLINE_TRIP_DATA);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  static saveOfflineCache(data: any): void {
    localStorage.setItem(STORAGE_KEYS.OFFLINE_TRIP_DATA, JSON.stringify(data));
  }

  static clearOfflineCache(): void {
    localStorage.removeItem(STORAGE_KEYS.OFFLINE_TRIP_DATA);
  }

  static calculateStorageUsed(): string {
    let totalBytes = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('tn_stories_')) {
        const val = localStorage.getItem(key);
        if (val) {
          totalBytes += (key.length + val.length) * 2;
        }
      }
    }
    if (totalBytes < 1024) return `${totalBytes} B`;
    if (totalBytes < 1024 * 1024) return `${(totalBytes / 1024).toFixed(1)} KB`;
    return `${(totalBytes / (1024 * 1024)).toFixed(2)} MB`;
  }
}
