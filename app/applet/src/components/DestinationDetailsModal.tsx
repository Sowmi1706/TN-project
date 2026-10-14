import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Star, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  Check, 
  Send, 
  Trash2, 
  Edit3, 
  Upload, 
  Clock, 
  Camera, 
  BookOpen, 
  Compass,
  ArrowRight
} from 'lucide-react';
import { Destination, Review, User, TourPackage } from '../types';
import { StorageService } from '../services/storageService';

interface DestinationDetailsModalProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  user: User;
  packages: TourPackage[];
  reviews: Review[];
  onBookNow: (destId: string) => void;
  onReviewAdded: () => void;
}

export const DestinationDetailsModal: React.FC<DestinationDetailsModalProps> = ({
  destination,
  isOpen,
  onClose,
  user,
  packages,
  reviews,
  onBookNow,
  onReviewAdded
}) => {
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'packages' | 'reviews'>('overview');

  if (!isOpen || !destination) return null;

  const destReviews = reviews.filter(r => r.destinationId === destination.id);
  const destPackages = packages.filter(p => p.destinationId === destination.id);
  const isRedAlert = destination.weatherDangerStatus === 'red' || destination.bookingRestricted;

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    if (editingReviewId) {
      // Edit existing
      const current = StorageService.getReviews();
      const updated = current.map(r => {
        if (r.id === editingReviewId) {
          return {
            ...r,
            rating,
            text: reviewText,
            photoUrl: photoUrl || r.photoUrl
          };
        }
        return r;
      });
      StorageService.setReviews(updated);
      setEditingReviewId(null);
    } else {
      // Create new
      const newReview: Review = {
        id: `rev-${Date.now()}`,
        destinationId: destination.id,
        destinationName: destination.name,
        userId: user.id,
        userName: user.name,
        rating,
        tripDate: 'Recent Journey',
        text: reviewText,
        photoUrl: photoUrl || undefined,
        verifiedBooking: true,
        createdAt: new Date().toISOString().split('T')[0]
      };
      StorageService.addReview(newReview);
    }

    setReviewText('');
    setPhotoUrl('');
    onReviewAdded();
  };

  const handleDeleteReview = (revId: string) => {
    if (confirm('Delete your review?')) {
      StorageService.deleteReview(revId);
      onReviewAdded();
    }
  };

  const handleEditClick = (rev: Review) => {
    setEditingReviewId(rev.id);
    setRating(rev.rating);
    setReviewText(rev.text);
    setPhotoUrl(rev.photoUrl || '');
    setActiveTab('reviews');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-6 flex flex-col max-h-[92vh]">
        {/* Modal Hero Banner */}
        <div className="relative h-64 sm:h-72 w-full shrink-0">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-900/70 hover:bg-stone-900 text-white cursor-pointer z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{destination.district} District, Tamil Nadu</span>
              </span>
              {isRedAlert && (
                <span className="text-[10px] font-extrabold bg-red-600 px-2 py-0.5 rounded-full text-white animate-pulse">
                  DANGER ZONE – RED ALERT
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              {destination.name}
            </h1>

            <div className="flex items-center gap-3 text-xs text-stone-200">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span>{destination.rating} ({destReviews.length + destination.reviewCount} Reviews)</span>
              </span>
              <span>•</span>
              <span>Est. ₹{destination.estimatedCost}/day</span>
              <span>•</span>
              <span>Best: {destination.bestTimeToVisit}</span>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex border-b border-stone-200 bg-stone-50 px-6 text-xs font-bold text-stone-600">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-4 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'overview' ? 'border-amber-600 text-amber-700' : 'border-transparent hover:text-stone-900'
            }`}
          >
            Overview & Sights
          </button>
          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3 px-4 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'packages' ? 'border-amber-600 text-amber-700' : 'border-transparent hover:text-stone-900'
            }`}
          >
            Tour Packages ({destPackages.length})
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-3 px-4 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'reviews' ? 'border-amber-600 text-amber-700' : 'border-transparent hover:text-stone-900'
            }`}
          >
            Customer Reviews ({destReviews.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-5">
              <div>
                <h3 className="font-bold text-sm text-stone-900 mb-1">About {destination.name}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  {destination.longDescription}
                </p>
              </div>

              {/* Special Temple or Heritage Information */}
              {destination.templeInfo && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                  <div className="font-bold text-xs text-amber-950 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span>Temple Darshan & Pilgrimage Guidance</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-900">
                    <div>
                      <span className="text-amber-700 font-bold block text-[10px]">Deity:</span>
                      <span>{destination.templeInfo.deity}</span>
                    </div>
                    <div>
                      <span className="text-amber-700 font-bold block text-[10px]">Darshan Hours:</span>
                      <span>{destination.templeInfo.darshanTimings}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-amber-700 font-bold block text-[10px]">Dress Code Guidelines:</span>
                      <span>{destination.templeInfo.dressCode}</span>
                    </div>
                  </div>
                </div>
              )}

              {destination.heritageInfo && (
                <div className="p-4 bg-stone-100 rounded-2xl border border-stone-200 space-y-2">
                  <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-stone-700" />
                    <span>Archaeological & Historical Research Insights</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    <div>
                      <span className="text-stone-500 font-bold block text-[10px]">Dynasty / Era:</span>
                      <span>{destination.heritageInfo.dynasty} ({destination.heritageInfo.century})</span>
                    </div>
                    <div>
                      <span className="text-stone-500 font-bold block text-[10px]">Photography Restrictions:</span>
                      <span>{destination.heritageInfo.photographyRules}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-stone-500 font-bold block text-[10px]">Significance:</span>
                      <span>{destination.heritageInfo.archaeologicalImportance}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Popular Attractions */}
              <div>
                <h3 className="font-bold text-sm text-stone-900 mb-2">Popular Attractions</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.popularAttractions.map(att => (
                    <span
                      key={att}
                      className="px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-200 text-stone-800 text-xs font-medium"
                    >
                      {att}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'packages' && (
            <div className="space-y-4">
              {destPackages.length === 0 ? (
                <div className="text-xs text-stone-500 text-center py-8">
                  Custom individual arrangements available. Open the booking wizard to customize your hotel and travel.
                </div>
              ) : (
                destPackages.map(pkg => (
                  <div
                    key={pkg.id}
                    className="p-5 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900">{pkg.title}</span>
                        {pkg.badge && (
                          <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-md">
                            {pkg.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-stone-500">
                        {pkg.days} Days / {pkg.nights} Nights • Inclusions: {pkg.inclusions.slice(0, 3).join(', ')}
                      </div>
                      <div className="text-sm font-extrabold text-amber-800">
                        ₹{pkg.pricePerPerson.toLocaleString('en-IN')} <span className="text-[10px] font-normal text-stone-500">/ person</span>
                      </div>
                    </div>

                    <button
                      onClick={() => onBookNow(destination.id)}
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold cursor-pointer shrink-0"
                    >
                      Select Package
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {/* Write Review Form */}
              <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
                <h4 className="font-bold text-xs text-stone-900">
                  {editingReviewId ? 'Edit Your Travel Review' : 'Write a Verified Travel Review'}
                </h4>

                <form onSubmit={handleReviewSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-600 mb-1 font-semibold">Your Rating</label>
                    <div className="flex gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          className="cursor-pointer"
                        >
                          <Star className={`w-5 h-5 ${s <= rating ? 'fill-amber-400 text-amber-500' : 'text-stone-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-semibold">Your Travel Experience</label>
                    <textarea
                      rows={3}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Share tips about local sights, darshan queues, food spots, or caretaker assistance..."
                      className="w-full p-2 border border-stone-300 rounded-xl bg-white"
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-stone-600 mb-1 font-semibold">Optional Photo URL</label>
                    <input
                      type="url"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full p-2 border border-stone-300 rounded-xl bg-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl cursor-pointer"
                    >
                      {editingReviewId ? 'Update Review' : 'Submit Review'}
                    </button>
                    {editingReviewId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingReviewId(null);
                          setReviewText('');
                        }}
                        className="px-3 py-2 border rounded-xl text-stone-600"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-3">
                {destReviews.length === 0 ? (
                  <div className="text-xs text-stone-500 text-center py-4">
                    Be the first to review {destination.name}!
                  </div>
                ) : (
                  destReviews.map(r => {
                    const isOwnReview = r.userId === user.id;

                    return (
                      <div
                        key={r.id}
                        className="p-4 bg-white rounded-2xl border border-stone-200 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-stone-900">{r.userName}</span>
                            {r.verifiedBooking && (
                              <span className="text-[10px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-semibold border border-emerald-200">
                                Verified Booking
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex text-amber-500">
                              {[...Array(r.rating)].map((_, i) => (
                                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                              ))}
                            </div>

                            {isOwnReview && (
                              <div className="flex items-center gap-1 ml-2">
                                <button
                                  onClick={() => handleEditClick(r)}
                                  className="text-stone-400 hover:text-stone-700"
                                  title="Edit review"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteReview(r.id)}
                                  className="text-stone-400 hover:text-red-600"
                                  title="Delete review"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-stone-700 leading-relaxed font-sans">{r.text}</p>
                        {r.photoUrl && (
                          <img
                            src={r.photoUrl}
                            alt="Trip upload"
                            className="w-24 h-24 object-cover rounded-xl mt-2 border border-stone-200"
                          />
                        )}
                        <div className="text-[10px] text-stone-400">{r.tripDate}</div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs text-stone-500">Estimated Budget</span>
            <div className="text-sm font-extrabold text-stone-900">
              ₹{destination.estimatedCost} <span className="text-[10px] text-stone-500 font-normal">/ day</span>
            </div>
          </div>

          <button
            onClick={() => {
              onClose();
              onBookNow(destination.id);
            }}
            disabled={isRedAlert}
            className={`px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md transition-all ${
              isRedAlert
                ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none'
                : 'bg-amber-700 hover:bg-amber-800 text-white hover:scale-105'
            }`}
          >
            <span>{isRedAlert ? 'Booking Restricted' : 'Book Trip to ' + destination.name}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
