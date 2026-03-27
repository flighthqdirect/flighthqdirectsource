export interface Airline {
  id: string;
  name: string;
  code: string;
  logo: string;
  description: string;
  baggageRules: string;
  checkInInfo: string;
  contactDetails: string;
}

export interface Airport {
  id: string;
  name: string;
  code: string;
  city: string;
  country: string;
  facilities: string[];
  transport: string;
  tips: string;
}

export interface Route {
  id: string;
  from: string;
  to: string;
  cheapestTime: string;
  airlines: string[];
  priceRange: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
}

export const airlines: Airline[] = [
  {
    id: "malaysia-airlines",
    name: "Malaysia Airlines",
    code: "MH",
    logo: "https://picsum.photos/seed/mh/100/100",
    description: "The national carrier of Malaysia, offering premium services across the globe.",
    baggageRules: "Economy: 20kg-35kg, Business: 40kg, First: 50kg.",
    checkInInfo: "Online check-in available 48 hours before departure.",
    contactDetails: "1-300-88-3000 (Malaysia), +603-7843 3000 (Outside Malaysia).",
  },
  {
    id: "airasia",
    name: "AirAsia",
    code: "AK",
    logo: "https://picsum.photos/seed/airasia/100/100",
    description: "The world's best low-cost airline, making flying affordable for everyone.",
    baggageRules: "7kg cabin baggage. Checked baggage available for purchase.",
    checkInInfo: "Self check-in via web or app is mandatory for most flights.",
    contactDetails: "AVA (AirAsia Virtual Assistant) on website.",
  },
  {
    id: "singapore-airlines",
    name: "Singapore Airlines",
    code: "SQ",
    logo: "https://picsum.photos/seed/sq/100/100",
    description: "Consistently ranked as one of the world's best airlines, known for exceptional service.",
    baggageRules: "Economy: 30kg, Premium Economy: 35kg, Business: 40kg, First/Suites: 50kg.",
    checkInInfo: "Online check-in starts 48 hours before flight.",
    contactDetails: "+65 6223 8888.",
  },
];

export const airports: Airport[] = [
  {
    id: "klia",
    name: "Kuala Lumpur International Airport",
    code: "KUL",
    city: "Kuala Lumpur",
    country: "Malaysia",
    facilities: ["Duty-free shopping", "Lounges", "Free Wi-Fi", "Capsule hotels"],
    transport: "KLIA Ekspres, Taxis, Buses, E-hailing (Grab).",
    tips: "Arrive 3 hours early for international flights. Use KLIA Ekspres for the fastest city connection.",
  },
  {
    id: "changi",
    name: "Singapore Changi Airport",
    code: "SIN",
    city: "Singapore",
    country: "Singapore",
    facilities: ["Jewel Changi", "Butterfly Garden", "Movie Theatres", "Swimming Pool"],
    transport: "MRT, Taxis, Buses.",
    tips: "Explore Jewel Changi before your flight. It's a destination on its own.",
  },
];

export const routes: Route[] = [
  {
    id: "kul-sin",
    from: "Kuala Lumpur (KUL)",
    to: "Singapore (SIN)",
    cheapestTime: "September - October",
    airlines: ["AirAsia", "Malaysia Airlines", "Singapore Airlines", "Jetstar"],
    priceRange: "RM 150 - RM 600",
  },
  {
    id: "pen-bkk",
    from: "Penang (PEN)",
    to: "Bangkok (BKK)",
    cheapestTime: "May - June",
    airlines: ["AirAsia", "Thai Airways", "Firefly"],
    priceRange: "RM 250 - RM 800",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Cheapest Time to Fly in Asia",
    slug: "cheapest-time-to-fly-asia",
    excerpt: "Discover the best months to book your flights across Southeast Asia for maximum savings.",
    content: "Full guide on seasonal pricing...",
    date: "2024-03-20",
    image: "https://picsum.photos/seed/travel1/800/400",
  },
  {
    id: "2",
    title: "How to Get Cheap Flights: 5 Pro Tips",
    slug: "how-to-get-cheap-flights",
    excerpt: "Master the art of flight booking with these expert strategies used by frequent travelers.",
    content: "1. Use incognito mode...",
    date: "2024-03-22",
    image: "https://picsum.photos/seed/travel2/800/400",
  },
];
