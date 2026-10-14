import { 
  Destination, 
  TourPackage, 
  SpinReward, 
  WeatherInfo, 
  BeachFacility, 
  Sponsor, 
  Review, 
  BusAgent 
} from '../types';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: "ooty",
    name: "Ooty (Udhagamandalam)",
    district: "Nilgiris",
    category: "nature_wildlife",
    shortDescription: "The Queen of Hill Stations featuring misty tea gardens, botanical wonders, and the Nilgiri Mountain Railway.",
    longDescription: "Nestled in the picturesque Nilgiri Hills at 2,240 meters, Ooty is famous for emerald tea estates, colonial architecture, Doddabetta Peak, Avalanche Lake, and the UNESCO heritage toy train.",
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
    ],
    popularAttractions: ["Botanical Garden", "Doddabetta Peak", "Ooty Lake Boating", "Tea Factory", "Pykara Waterfalls"],
    estimatedCost: 3500,
    rating: 4.8,
    reviewCount: 342,
    isHidden: false,
    isTrending: true,
    bestTimeToVisit: "October to June",
    tags: ["Hills", "Tea Gardens", "Family", "Couple", "Nature"],
    coordinates: { lat: 11.4102, lng: 76.6950 },
    weatherDangerStatus: "green",
    bookingRestricted: false
  },
  {
    id: "kodaikanal",
    name: "Kodaikanal",
    district: "Dindigul",
    category: "nature_wildlife",
    shortDescription: "The Princess of Hill Stations with rolling pine forests, Pillar Rocks, and a star-shaped lake.",
    longDescription: "Perched along the granite cliffs of the Palani Hills, Kodaikanal offers cool alpine air, mesmerizing viewpoints such as Coaker's Walk, cascading Silver Cascade falls, and lush Kurinji flower valleys.",
    image: "https://images.unsplash.com/photo-1609137144822-263e80629ec5?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609137144822-263e80629ec5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80"
    ],
    popularAttractions: ["Kodai Lake", "Pillar Rocks", "Coaker's Walk", "Pine Forest", "Guna Caves"],
    estimatedCost: 3200,
    rating: 4.7,
    reviewCount: 289,
    isHidden: false,
    isTrending: true,
    bestTimeToVisit: "September to May",
    tags: ["Hills", "Pine Forests", "Friends", "Couple", "Boating"],
    coordinates: { lat: 10.2381, lng: 77.4892 },
    weatherDangerStatus: "green",
    bookingRestricted: false
  },
  {
    id: "madurai",
    name: "Madurai Meenakshi City",
    district: "Madurai",
    category: "temple_spiritual",
    shortDescription: "The 2500-year-old Athens of the East, famed for the magnificent Meenakshi Amman Temple and vibrant food culture.",
    longDescription: "Madurai is the cultural capital of Tamil Nadu, built around the majestic Meenakshi Sundareswarar Temple with towering gopurams. Famous for Thirumalai Nayakkar Mahal, jasmine markets, Jigarthanda, and legendary street food.",
    image: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606298855672-3efb63017be8?auto=format&fit=crop&w=800&q=80"
    ],
    popularAttractions: ["Meenakshi Amman Temple", "Thirumalai Nayakkar Palace", "Gandhi Memorial Museum", "Koodal Azhagar Temple", "Famous Madurai Food Walk"],
    estimatedCost: 2200,
    rating: 4.9,
    reviewCount: 512,
    isHidden: false,
    isTrending: true,
    bestTimeToVisit: "October to March",
    tags: ["Temples", "Culture", "Food Street", "Spiritual", "Heritage"],
    templeInfo: {
      deity: "Goddess Meenakshi & Lord Sundareswarar",
      darshanTimings: "5:00 AM - 12:30 PM & 4:00 PM - 10:00 PM",
      poojaTypes: ["Thiruvanandal", "Kala Sandhi", "Sayaratchai", "Ardhajamam"],
      dressCode: "Traditional Indian attire. Dhoti/pyjama for men, saree/churidar for women.",
      specialFestivals: ["Chithirai Thiruvizha", "Navarathri Festival"]
    },
    coordinates: { lat: 9.9195, lng: 78.1193 },
    weatherDangerStatus: "green",
    bookingRestricted: false
  },
  {
    id: "mahabalipuram",
    name: "Mahabalipuram (Mamallapuram)",
    district: "Chengalpattu",
    category: "historical_heritage",
    shortDescription: "UNESCO World Heritage rock-cut sculptures, Shore Temple, and Arjuna's Penance by the Bay of Bengal.",
    longDescription: "The 7th-century port city of the Pallava dynasty showcases monolithic shrines (Pancha Rathas), open-air rock bas-reliefs, Krishna's Butterball, and scenic coastal changing facilities.",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80"
    ],
    popularAttractions: ["Shore Temple", "Pancha Rathas", "Arjuna's Penance", "Krishna's Butterball", "Mamallapuram Beach"],
    estimatedCost: 2400,
    rating: 4.8,
    reviewCount: 420,
    isHidden: false,
    isTrending: true,
    bestTimeToVisit: "November to February",
    tags: ["Heritage", "UNESCO", "Beach", "Archaeology", "Architecture"],
    heritageInfo: {
      dynasty: "Pallava Dynasty (Narasimhavarman I & II)",
      century: "7th - 8th Century CE",
      archaeologicalImportance: "Pinnacle of early Dravidian stone architecture and monolithic rock-cut shrines.",
      photographyRules: "Allowed throughout the monument complex; tripod permits require ASI clearance."
    },
    coordinates: { lat: 12.6269, lng: 80.1927 },
    weatherDangerStatus: "green",
    bookingRestricted: false
  },
  {
    id: "thanjavur",
    name: "Thanjavur Brihadisvara",
    district: "Thanjavur",
    category: "historical_heritage",
    shortDescription: "The Great Living Chola Temple with a thousand-year-old monolithic granite vimana and Maratha Royal Palace.",
    longDescription: "Built in 1010 CE by Emperor Raja Raja Chola I, Brihadisvara Temple (Peruvudaiyar Kovil) is a grand engineering masterpiece. Famous for Thanjavur paintings, bronze casting, and Saraswathi Mahal Library.",
    image: "https://images.unsplash.com/photo-1609137144822-263e80629ec5?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1609137144822-263e80629ec5?auto=format&fit=crop&w=800&q=80"],
    popularAttractions: ["Big Temple (Brihadisvara)", "Thanjavur Royal Palace", "Saraswathi Mahal Library", "Schwartz Church", "Bronze Art Gallery"],
    estimatedCost: 2000,
    rating: 4.9,
    reviewCount: 380,
    isHidden: false,
    isTrending: false,
    bestTimeToVisit: "October to March",
    tags: ["Chola Heritage", "UNESCO", "Research", "Spiritual", "Architecture"],
    heritageInfo: {
      dynasty: "Imperial Chola Dynasty (Raja Raja Chola I)",
      century: "11th Century CE (Completed 1010 CE)",
      archaeologicalImportance: "First all-granite temple in the world with an 80-tonne single granite cupola.",
      photographyRules: "Permitted in outer prakaram; sanctum sanctorum photography strictly prohibited."
    },
    coordinates: { lat: 10.7828, lng: 79.1318 },
    weatherDangerStatus: "green",
    bookingRestricted: false
  },
  {
    id: "rameswaram",
    name: "Rameswaram & Dhanushkodi",
    district: "Ramanathapuram",
    category: "temple_spiritual",
    shortDescription: "Sacred island pilgrimage, legendary Ramanathaswamy Temple corridors, and the ghost town of Dhanushkodi.",
    longDescription: "Connected to the mainland by the iconic Pamban Bridge, Rameswaram features 22 holy theerthams, the longest temple corridor in the world, and Arichal Munai where the Indian Ocean meets the Bay of Bengal.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"],
    popularAttractions: ["Ramanathaswamy Temple", "22 Holy Wells", "Pamban Bridge", "Dhanushkodi Ruins & Beach", "Dr. APJ Abdul Kalam Memorial"],
    estimatedCost: 2800,
    rating: 4.8,
    reviewCount: 460,
    isHidden: false,
    isTrending: true,
    bestTimeToVisit: "October to April",
    tags: ["Spiritual", "Island", "Pamban", "Beaches", "Devotional"],
    templeInfo: {
      deity: "Lord Ramanathaswamy (Shiva Jyotirlinga)",
      darshanTimings: "5:00 AM - 1:00 PM & 3:00 PM - 9:00 PM",
      poojaTypes: ["Spatika Linga Darshan", "Kalasanthi", "Sayaratchai"],
      dressCode: "Dhoti/shirt for men, sarees or traditional salwars for women.",
      specialFestivals: ["Maha Shivaratri", "Thirukalyanam"]
    },
    coordinates: { lat: 9.2876, lng: 79.3129 },
    weatherDangerStatus: "green",
    bookingRestricted: false
  },
  {
    id: "kanyakumari",
    name: "Kanyakumari",
    district: "Kanyakumari",
    category: "nature_wildlife",
    shortDescription: "The southernmost tip of mainland India where three oceans meet with spectacular sunrise and sunset vistas.",
    longDescription: "Witness the confluence of the Arabian Sea, Indian Ocean, and Bay of Bengal. Visit the Vivekananda Rock Memorial, 133-ft Thiruvalluvar Statue, Bhagavathi Amman Temple, and Padmanabhapuram Palace nearby.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"],
    popularAttractions: ["Vivekananda Rock Memorial", "Thiruvalluvar Statue", "Sunset Point", "Triveni Sangamam", "Gandhi Memorial Mandapam"],
    estimatedCost: 2600,
    rating: 4.7,
    reviewCount: 395,
    isHidden: false,
    isTrending: true,
    bestTimeToVisit: "October to March",
    tags: ["Coast", "Oceans Confluence", "Sunrise", "Family", "Heritage"],
    coordinates: { lat: 8.0883, lng: 77.5385 },
    weatherDangerStatus: "green",
    bookingRestricted: false
  },
  {
    id: "meghamalai",
    name: "Meghamalai (Highwavys)",
    district: "Theni",
    category: "nature_wildlife",
    shortDescription: "Lesser-known misty 'Cloud Mountain' with undulating cardamom estates and serene cloud-kissed dams.",
    longDescription: "A pristine hidden gem tucked inside the Western Ghats at 1,500m elevation. Known for wildlife, cardamom plantations, Megamalai Wildlife Sanctuary, and peaceful viewpoints away from commercial crowds.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"],
    popularAttractions: ["Highwavys Dam", "Cloud Mountain Viewpoint", "Manalar Dam", "Venniyar Tea Estate", "Suruli Waterfalls nearby"],
    estimatedCost: 3100,
    rating: 4.8,
    reviewCount: 145,
    isHidden: true,
    isTrending: false,
    bestTimeToVisit: "September to May",
    tags: ["Hidden Spot", "Misty Hills", "Tea & Cardamom", "Peaceful", "Wildlife"],
    coordinates: { lat: 9.6833, lng: 77.3667 },
    weatherDangerStatus: "green",
    bookingRestricted: false
  },
  {
    id: "kolli_hills",
    name: "Kolli Hills (Kolli Malai)",
    district: "Namakkal",
    category: "nature_wildlife",
    shortDescription: "Mountain of Death famous for 70 hairpin bends, ancient Arappaleeswarar Temple, and Agaya Gangai waterfall.",
    longDescription: "An adventurous mountain retreat unspoiled by mass tourism. Renowned for its challenging 70 hairpin bends, 1,000-step trek down to Agaya Gangai waterfall, organic herbal honey, and pineapple plantations.",
    image: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80"],
    popularAttractions: ["70 Hairpin Bends Road", "Agaya Gangai Waterfalls", "Arappaleeswarar Temple", "Siddhar Caves", "Botanical Garden"],
    estimatedCost: 2300,
    rating: 4.7,
    reviewCount: 178,
    isHidden: true,
    isTrending: true,
    bestTimeToVisit: "August to February",
    tags: ["Hidden Spot", "Hairpin Bends", "Bikers", "Adventure", "Waterfalls"],
    coordinates: { lat: 11.2483, lng: 78.3385 },
    weatherDangerStatus: "green",
    bookingRestricted: false
  },
  {
    id: "pichavaram",
    name: "Pichavaram Mangrove Forest",
    district: "Cuddalore",
    category: "nature_wildlife",
    shortDescription: "World's second largest mangrove forest with intricate canal waterways and 177 species of resident and migratory birds.",
    longDescription: "Explore labyrinthine water channels under canopy-forming Rhizophora trees by rowboat. Located near Chidambaram, Pichavaram offers an unforgettable eco-tourism voyage into nature's natural coastal barrier.",
    image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"],
    popularAttractions: ["Mangrove Boating", "Bird Watching Watchtower", "Mudflat Exploration", "Chidambaram Temple visit"],
    estimatedCost: 1900,
    rating: 4.6,
    reviewCount: 220,
    isHidden: true,
    isTrending: false,
    bestTimeToVisit: "November to March",
    tags: ["Hidden Spot", "Mangrove", "Boating", "Eco-Tourism", "Birding"],
    coordinates: { lat: 11.4283, lng: 79.7797 },
    weatherDangerStatus: "yellow",
    bookingRestricted: false
  },
  {
    id: "sittanavasal",
    name: "Sittanavasal Caves & Inscriptions",
    district: "Pudukkottai",
    category: "historical_heritage",
    shortDescription: "2nd-century BCE Jain rock-cut cave shelter with exquisite fresco murals, Tamil-Brahmi inscriptions, and megalithic burial urns.",
    longDescription: "A treasure trove for historians and archaeologists. The Arivar Koil contains colorful mineral-pigment frescoes depicting samavasarana lotus tanks, painted centuries before the Renaissance.",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80"],
    popularAttractions: ["Arivar Koil Jain Murals", "Eladipattam (Stone Beds)", "Tamil Brahmi Inscriptions", "Megalithic Stone Urn Burial Site"],
    estimatedCost: 1600,
    rating: 4.8,
    reviewCount: 96,
    isHidden: true,
    isTrending: false,
    bestTimeToVisit: "November to February",
    tags: ["Heritage", "Archaeology", "Research", "Inscriptions", "Fresco Murals"],
    heritageInfo: {
      dynasty: "Early Pandyan & Jain Ascetics",
      century: "2nd Century BCE - 9th Century CE",
      archaeologicalImportance: "Key epigraphical site with Tamil-Brahmi script evolution and rare Jain fresco artwork.",
      photographyRules: "Flash strictly prohibited inside the mural cave to protect natural pigments."
    },
    coordinates: { lat: 10.4578, lng: 78.7301 },
    weatherDangerStatus: "green",
    bookingRestricted: false
  },
  {
    id: "keezhadi",
    name: "Keezhadi Archaeological Museum",
    district: "Sivaganga",
    category: "historical_heritage",
    shortDescription: "Sensational Sangam-era urban civilization along the Vaigai river dated to 6th century BCE.",
    longDescription: "Proving an advanced literate Tamil civilization contemporary to the Gangetic plain, the newly constructed world-class Keezhadi Museum showcases over 18,000 artifacts, ring wells, pottery inscribed with Tamil-Brahmi, and bead crafts.",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"],
    popularAttractions: ["Keezhadi Modern Heritage Museum", "Excavation Trench Displays", "Vaigai Valley Civilization Exhibits", "Ancient Ring Wells Gallery"],
    estimatedCost: 1500,
    rating: 4.9,
    reviewCount: 260,
    isHidden: false,
    isTrending: true,
    bestTimeToVisit: "October to March",
    tags: ["Heritage", "Keezhadi", "Sangam Era", "Archaeology", "Research"],
    heritageInfo: {
      dynasty: "Sangam Era Tamil Civilization",
      century: "6th Century BCE (2,600 years old)",
      archaeologicalImportance: "Revolutionized South Indian history by proving secular urban settlement with high literacy.",
      photographyRules: "Still photography allowed without flash in designated galleries."
    },
    coordinates: { lat: 9.8631, lng: 78.1884 },
    weatherDangerStatus: "green",
    bookingRestricted: false
  },
  {
    id: "valparai",
    name: "Valparai & Sholayar",
    district: "Coimbatore",
    category: "nature_wildlife",
    shortDescription: "Pollution-free hill station with 40 hairpin bends, Anamalai Tiger Reserve, and Sholayar Dam.",
    longDescription: "Located 3,500 feet above sea level in the Anaimalai Hills, Valparai is a haven for nature lovers and birdwatchers. Encounter endangered Lion-tailed Macaques, Nilgiri Tahr, and lush tea gardens.",
    image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80"],
    popularAttractions: ["Sholayar Dam", "Aliyar Dam Viewpoint", "Nallamudi Poonjolai", "Chinnakallar Falls", "Lion-tailed Macaque Spotting"],
    estimatedCost: 2900,
    rating: 4.8,
    reviewCount: 210,
    isHidden: true,
    isTrending: false,
    bestTimeToVisit: "September to May",
    tags: ["Wildlife", "Western Ghats", "Tea Hills", "Hairpin Bends", "Dams"],
    coordinates: { lat: 10.3267, lng: 76.9554 },
    weatherDangerStatus: "red", // Example Red Alert to showcase danger zone safety!
    bookingRestricted: true
  },
  {
    id: "chettinad",
    name: "Chettinad Heritage & Karaikudi",
    district: "Sivaganga",
    category: "food_culture",
    shortDescription: "Grand 19th-century merchant mansions, Athangudi handmade tiles, and world-renowned aromatic Chettinad culinary feasts.",
    longDescription: "Step into an era of palatial opulence with teak wood from Burma, Belgian crystals, Italian marble, and massive courtyards. Experience authentic Chettinad cuisine, antique bazaars, and heritage stays.",
    image: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80"],
    popularAttractions: ["Kanadukathan Palace", "Athangudi Tile Factories", "Chettinad Food Trail", "Chettinad Antiques Market", "Thirumayam Fort nearby"],
    estimatedCost: 3400,
    rating: 4.9,
    reviewCount: 310,
    isHidden: false,
    isTrending: true,
    bestTimeToVisit: "October to March",
    tags: ["Culinary", "Palaces", "Heritage Stays", "Food Culture", "Architecture"],
    coordinates: { lat: 10.0711, lng: 78.7842 },
    weatherDangerStatus: "green",
    bookingRestricted: false
  },
  {
    id: "courtallam",
    name: "Courtallam (Spa of South India)",
    district: "Tenkasi",
    category: "nature_wildlife",
    shortDescription: "Therapeutic herbal waterfalls originating from Agasthiyar hills with 9 distinct bathing cascades.",
    longDescription: "Courtallam's water is believed to possess medicinal properties as it flows through dense Western Ghats herbal forests. Features Main Falls, Five Falls (Aintharuvi), Old Falls, and Shenbaga Devi Falls.",
    image: "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80"],
    popularAttractions: ["Main Falls", "Five Falls (Aintharuvi)", "Old Courtallam Falls", "Shenbagadevi Amman Temple", "Kasi Viswanathar Temple Tenkasi"],
    estimatedCost: 1800,
    rating: 4.7,
    reviewCount: 280,
    isHidden: false,
    isTrending: false,
    bestTimeToVisit: "June to September (Southwest Monsoon)",
    tags: ["Waterfalls", "Herbal Bath", "Monsoon", "Nature", "Family"],
    coordinates: { lat: 8.9287, lng: 77.2694 },
    weatherDangerStatus: "green",
    bookingRestricted: false
  },
  {
    id: "yercaud",
    name: "Yercaud (Jewel of the South)",
    district: "Salem",
    category: "nature_wildlife",
    shortDescription: "Quiet hill station nestled in Shevaroy Hills with coffee estates, Lady's Seat, and gentle boating lake.",
    longDescription: "A peaceful alternative to crowded hill stations, Yercaud is famed for Shevaroy Temple (highest point), Killiyur Falls, botanical rose gardens, spice plantations, and orange groves.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    gallery: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"],
    popularAttractions: ["Yercaud Lake", "Lady's Seat Viewpoint", "Killiyur Falls", "Shevaroy Temple", "Pagoda Point"],
    estimatedCost: 2200,
    rating: 4.6,
    reviewCount: 195,
    isHidden: false,
    isTrending: false,
    bestTimeToVisit: "October to June",
    tags: ["Coffee", "Hills", "Weekend Getaway", "Boating", "Budget"],
    coordinates: { lat: 11.7753, lng: 78.2093 },
    weatherDangerStatus: "green",
    bookingRestricted: false
  }
];

export const INITIAL_PACKAGES: TourPackage[] = [
  {
    id: "pkg-ooty-3d2n",
    destinationId: "ooty",
    destinationName: "Ooty",
    title: "Misty Nilgiris & Tea Country Discovery",
    days: 3,
    nights: 2,
    pricePerPerson: 5499,
    inclusions: ["3-Star Hill Resort stay", "Daily breakfast & dinner", "Toy Train booking", "Sightseeing cab", "Tea tasting pass"],
    itinerarySummary: ["Day 1: Arrival & Ooty Lake boating", "Day 2: Doddabetta, Pykara & Tea Factory", "Day 3: Avalanche Lake & Coonoor Toy Train"],
    availableSlots: 14,
    badge: "Bestseller"
  },
  {
    id: "pkg-madurai-temple-2d1n",
    destinationId: "madurai",
    destinationName: "Madurai",
    title: "Madurai Meenakshi & Heritage Trail",
    days: 2,
    nights: 1,
    pricePerPerson: 3299,
    inclusions: ["Heritage hotel near temple", "Special Darshan pass", "Authentic Madurai food walk", "AC vehicle transport", "Licensed guide"],
    itinerarySummary: ["Day 1: Meenakshi Amman Temple & Night Chariot", "Day 2: Thirumalai Nayakkar Palace & Keezhadi Museum"],
    availableSlots: 20,
    badge: "Spiritual Choice"
  },
  {
    id: "pkg-mahabalipuram-beach-2d1n",
    destinationId: "mahabalipuram",
    destinationName: "Mahabalipuram",
    title: "Pallava Heritage & Coastal Beach Escape",
    days: 2,
    nights: 1,
    pricePerPerson: 3999,
    inclusions: ["Beachfront resort stay", "Breakfast included", "ASI UNESCO monument entry pass", "Beach changing room pass", "Evening coastal dinner"],
    itinerarySummary: ["Day 1: Shore Temple & Pancha Rathas sunset", "Day 2: Krishna's Butterball & Surf Beach relaxation"],
    availableSlots: 10,
    badge: "Weekend Getaway"
  },
  {
    id: "pkg-rameswaram-sacred-3d2n",
    destinationId: "rameswaram",
    destinationName: "Rameswaram",
    title: "Sacred Island & Dhanushkodi Frontier",
    days: 3,
    nights: 2,
    pricePerPerson: 4899,
    inclusions: ["AC hotel stay", "22 Theertham assistance", "Dhanushkodi 4x4 beach excursion", "Pamban Bridge viewpoint", "All transfers"],
    itinerarySummary: ["Day 1: Ramanathaswamy Temple & Agni Theertham", "Day 2: Dhanushkodi ghost town & Arichal Munai", "Day 3: APJ Abdul Kalam Memorial & return"],
    availableSlots: 18,
    badge: "Pilgrimage Favorite"
  },
  {
    id: "pkg-chettinad-culinary-2d1n",
    destinationId: "chettinad",
    destinationName: "Chettinad",
    title: "Royal Mansions & Traditional Chettinad Feast",
    days: 2,
    nights: 1,
    pricePerPerson: 4299,
    inclusions: ["Chettinad heritage mansion stay", "Grand banana leaf feast", "Athangudi tile making workshop", "Antique street guided walk"],
    itinerarySummary: ["Day 1: Kanadukathan Palace & Tile workshop", "Day 2: Cooking demo & Antique bazaar"],
    availableSlots: 8,
    badge: "Culinary Special"
  }
];

export const INITIAL_SPIN_REWARDS: SpinReward[] = [
  { id: "luck-1", label: "Better Luck Next Time", subtext: "Keep exploring Tamil Nadu!", probability: 50.0, isWinning: false, color: "#64748b" },
  { id: "luck-2", label: "Try Again Tomorrow", subtext: "Free spin resets at midnight IST", probability: 25.0, isWinning: false, color: "#94a3b8" },
  { id: "luck-3", label: "No Reward Today", subtext: "Every journey has its day", probability: 15.0, isWinning: false, color: "#cbd5e1" },
  { id: "coupon-20", label: "₹20 Tourism Coupon", subtext: "Valid on all bookings above ₹500", probability: 5.0, isWinning: true, couponCode: "TNSPIN20", discountValue: 20, color: "#3b82f6" },
  { id: "coupon-50", label: "₹50 Tourism Coupon", subtext: "Valid on all bookings above ₹1000", probability: 3.0, isWinning: true, couponCode: "TNSPIN50", discountValue: 50, color: "#06b6d4" },
  { id: "coupon-100", label: "₹100 Tourism Coupon", subtext: "Valid on all bookings above ₹1500", probability: 1.5, isWinning: true, couponCode: "TNSPIN100", discountValue: 100, color: "#10b981" },
  { id: "special-gift", label: "Special Tourism Gift", subtext: "Deluxe Handcrafted TN Souvenir Kit", probability: 0.5, isWinning: true, couponCode: "TNGIFTVIP", discountValue: 250, color: "#f59e0b" }
];

export const INITIAL_WEATHER_ALERTS: WeatherInfo[] = [
  {
    district: "Coimbatore / Valparai",
    temperature: 17,
    condition: "Torrential Rains & Ghat Landslide Hazard",
    rainfall: "140 mm / 24 hrs",
    windSpeed: "45 km/h",
    severity: "red",
    alertHeadline: "DANGER ZONE – RED ALERT: Landslide & Flash Flood Warning in Valparai Ghats",
    bookingRestricted: true,
    alternativeSafePlaces: ["Yercaud (Salem)", "Madurai", "Thanjavur"],
    lastUpdated: "Today at 08:00 AM IST"
  },
  {
    district: "Cuddalore",
    temperature: 29,
    condition: "High Sea Waves & Moderate Coastal Surge",
    rainfall: "25 mm",
    windSpeed: "30 km/h",
    severity: "yellow",
    alertHeadline: "Weather Caution: Fishermen advised not to venture deep into sea",
    bookingRestricted: false,
    lastUpdated: "Today at 07:30 AM IST"
  },
  {
    district: "Nilgiris (Ooty)",
    temperature: 14,
    condition: "Chilly & Light Mist",
    rainfall: "5 mm",
    windSpeed: "12 km/h",
    severity: "green",
    alertHeadline: "Pleasant hill conditions. Normal sightseeing open.",
    bookingRestricted: false,
    lastUpdated: "Today at 08:30 AM IST"
  },
  {
    district: "Madurai",
    temperature: 31,
    condition: "Clear Sky & Sunny",
    rainfall: "0 mm",
    windSpeed: "10 km/h",
    severity: "green",
    alertHeadline: "Optimal conditions for temple visits.",
    bookingRestricted: false,
    lastUpdated: "Today at 08:30 AM IST"
  },
  {
    district: "Ramanathapuram (Rameswaram)",
    temperature: 28,
    condition: "Breezy Coastal Sunshine",
    rainfall: "0 mm",
    windSpeed: "22 km/h",
    severity: "green",
    alertHeadline: "Calm waters around Dhanushkodi.",
    bookingRestricted: false,
    lastUpdated: "Today at 08:30 AM IST"
  }
];

export const INITIAL_BEACH_FACILITIES: BeachFacility[] = [
  {
    id: "beach-marina-01",
    beachName: "Marina Beach (Chennai)",
    district: "Chennai",
    facilityName: "Tiruvalluvar Seashore Changing & Refreshment Pavilion",
    photo: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80",
    amenities: [
      "Separate Men & Women Changing Rooms",
      "Family & Child Friendly Cubicles",
      "Freshwater Showers",
      "Secure Lockers & Luggage Cloakroom",
      "Baby Nursing & Diaper Station",
      "Chilled RO Drinking Water"
    ],
    freeServiceNotice: "No Booking Fee – Customer Payable: ₹0",
    optionalServices: [
      { name: "Electronic Valuables Locker (2 Hours)", price: 30 },
      { name: "Organic Coconut Water & Refreshment Pack", price: 50 }
    ],
    openHours: "05:30 AM – 09:30 PM",
    distanceFromShore: "60 meters from high tide line",
    verified: true,
    phone: "+91 94440 12345"
  },
  {
    id: "beach-besant-02",
    beachName: "Besant Nagar Elliot's Beach",
    district: "Chennai",
    facilityName: "Schmidt Memorial Coastal Amenities Hub",
    photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    amenities: [
      "Private Shower Stalls",
      "Women Changing Lounge",
      "Footwash Station for Sand Removal",
      "Sanitized Restrooms",
      "Luggage Holding Lockers"
    ],
    freeServiceNotice: "No Booking Fee – Customer Payable: ₹0",
    openHours: "06:00 AM – 09:00 PM",
    distanceFromShore: "40 meters from promenade",
    verified: true,
    phone: "+91 94440 23456"
  },
  {
    id: "beach-mamallapuram-03",
    beachName: "Mahabalipuram Shore Beach",
    district: "Chengalpattu",
    facilityName: "Pallava Heritage Beach Care Center",
    photo: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80",
    amenities: [
      "Changing Rooms near Shore Temple",
      "Surfer Shower Stalls",
      "Towel & Cloakroom Rental",
      "Purified Drinking Water",
      "First Aid & Lifeguard Desk"
    ],
    freeServiceNotice: "No Booking Fee – Customer Payable: ₹0",
    openHours: "06:00 AM – 07:30 PM",
    distanceFromShore: "80 meters from Shore Temple",
    verified: true,
    phone: "+91 94440 34567"
  },
  {
    id: "beach-kanyakumari-04",
    beachName: "Kanyakumari Triveni Sangam Beach",
    district: "Kanyakumari",
    facilityName: "Triveni Sangamam Pilgrim Changing Pavilions",
    photo: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    amenities: [
      "Holy Sea Bath Changing Cubicles",
      "High Capacity Showers",
      "Separate Elders & Family Access",
      "Safe Locker Vault",
      "Restrooms & Dressing Mirrors"
    ],
    freeServiceNotice: "No Booking Fee – Customer Payable: ₹0",
    openHours: "04:30 AM – 08:30 PM",
    distanceFromShore: "50 meters from Memorial Ghat",
    verified: true,
    phone: "+91 94440 45678"
  }
];

export const INITIAL_SPONSORS: Sponsor[] = [
  {
    id: "sp-aavin",
    brandName: "Aavin",
    companyName: "Tamil Nadu Co-operative Milk Producers' Federation Ltd",
    category: "Dairy & Travel Snacks",
    logo: "🥛 AAVIN",
    description: "Official dairy pride of Tamil Nadu delivering farm-fresh sweets, flavored milk, and snacks across tourist circuits.",
    status: "active",
    productsInKit: ["Aavin Badam Milk Powder Travel Sachet", "Aavin Peda Treat"],
    activeCampaigns: "Taste of Tamil Nadu on Wheels",
    kitsDistributed: 1840
  },
  {
    id: "sp-tn-khadi",
    brandName: "Tamil Nadu Khadi",
    companyName: "Tamil Nadu Khadi & Village Industries Board",
    category: "Organic & Handloom",
    logo: "🌿 TN KHADI",
    description: "Natural herbal personal care items, neem soaps, and organic travel wipes crafted by rural artisans.",
    status: "active",
    productsInKit: ["Herbal Mosquito Repellent Roll-on", "Handloom Cotton Travel Face Towel"],
    activeCampaigns: "Eco-Friendly Tourism Movement",
    kitsDistributed: 2150
  },
  {
    id: "sp-wildcraft",
    brandName: "Wildcraft India",
    companyName: "Wildcraft Adventure Gear Ltd",
    category: "Outdoor Essentials",
    logo: "🎒 WILDCRAFT",
    description: "Premium adventure and rain-protection travel accessories for hill station treks and Western Ghats journeys.",
    status: "active",
    productsInKit: ["Compact Waterproof Travel Pouch", "Reusable Collapsible Water Flask"],
    activeCampaigns: "Trek Tamil Nadu Safely",
    kitsDistributed: 1420
  }
];

export const INITIAL_BUS_AGENTS: BusAgent[] = [
  {
    id: "agent-sri-murugan",
    agencyName: "Sri Murugan Tourist Transports",
    operatorName: "K. R. Ramanathan",
    district: "Madurai / Dindigul",
    fleetTypes: [
      { type: "12-Seater AC Tempo Traveller", seats: 12, ratePerKm: 22, minCharge: 4500 },
      { type: "20-Seater Deluxe Mini Bus", seats: 20, ratePerKm: 28, minCharge: 6500 },
      { type: "35-Seater Air Suspension Bus", seats: 35, ratePerKm: 38, minCharge: 9500 },
      { type: "45-Seater Volvo Multi-Axle Luxury Coach", seats: 45, ratePerKm: 52, minCharge: 14000 }
    ],
    verified: true,
    phone: "+91 98421 77889",
    rating: 4.9,
    specialties: ["Arupadai Veedu Temple Circuit", "College & School Industrial Visits", "Family Weddings"]
  },
  {
    id: "agent-kongu-travels",
    agencyName: "Kongu Heritage Coaches",
    operatorName: "S. Shanmugam",
    district: "Coimbatore / Salem / Nilgiris",
    fleetTypes: [
      { type: "14-Seater Force Urbania", seats: 14, ratePerKm: 26, minCharge: 5200 },
      { type: "25-Seater Executive Coach", seats: 25, ratePerKm: 32, minCharge: 7800 },
      { type: "40-Seater AC Tourist Bus", seats: 40, ratePerKm: 44, minCharge: 11000 }
    ],
    verified: true,
    phone: "+91 98430 44556",
    rating: 4.8,
    specialties: ["Ooty & Kodaikanal Hill Station Trips", "Friends Adventure Tours", "Corporate Retreats"]
  },
  {
    id: "agent-chola-lines",
    agencyName: "Chola Mandal Transports",
    operatorName: "M. Balasubramanian",
    district: "Thanjavur / Trichy / Chennai",
    fleetTypes: [
      { type: "18-Seater Luxury Minibus", seats: 18, ratePerKm: 27, minCharge: 6000 },
      { type: "32-Seater 2x2 Pushback Coach", seats: 32, ratePerKm: 36, minCharge: 8800 },
      { type: "49-Seater High-Deck BharatBenz Coach", seats: 49, ratePerKm: 50, minCharge: 13500 }
    ],
    verified: true,
    phone: "+91 94432 99001",
    rating: 4.9,
    specialties: ["Navagraha Temple Circuit", "Archaeology Research Teams", "Historical Expeditions"]
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-1",
    destinationId: "madurai",
    destinationName: "Madurai Meenakshi City",
    userId: "usr-suresh",
    userName: "Suresh Narayanan",
    rating: 5,
    tripDate: "Last Month",
    text: "Visiting Meenakshi Amman Temple with our family was blissful. The caretaker service booked through TN Stories helped my elderly parents navigate darshan queues with ease! Jigarthanda near clock tower was sublime.",
    photoUrl: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=600&q=80",
    verifiedBooking: true,
    createdAt: "2026-09-12"
  },
  {
    id: "rev-2",
    destinationId: "ooty",
    destinationName: "Ooty",
    userId: "usr-priya",
    userName: "Priya Chandrasekhar",
    rating: 5,
    tripDate: "2 Weeks Ago",
    text: "The toy train journey from Coonoor to Ooty through pine ravines is like living in a painting. The 10% first booking discount was automatically applied, and the Free Travel Kit had handy items for hill travel!",
    verifiedBooking: true,
    createdAt: "2026-09-28"
  },
  {
    id: "rev-3",
    destinationId: "mahabalipuram",
    destinationName: "Mahabalipuram",
    userId: "usr-anand",
    userName: "Dr. Anand Rajan",
    rating: 5,
    tripDate: "Last Week",
    text: "As an archaeology enthusiast, seeing the Pallava bas-reliefs of Arjuna's Penance in morning sunrise was spellbinding. Also utilized the free Beach Changing Room after a dip in the sea—super clean and well-maintained!",
    verifiedBooking: true,
    createdAt: "2026-10-04"
  }
];
