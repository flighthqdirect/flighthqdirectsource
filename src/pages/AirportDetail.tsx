import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { airports, routes, airlines } from "../data/mockData";
import { 
  MapPin, 
  Globe, 
  Info, 
  Plane, 
  Train, 
  Bus, 
  Car, 
  CheckCircle, 
  ArrowLeft, 
  Star, 
  Clock, 
  Shield,
  ChevronRight,
  ExternalLink,
  Navigation,
  Phone
} from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const AirportDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const airport = airports.find((a) => a.id === id);
  const { notify } = useNotification();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!airport) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-4xl font-black text-blue-950 mb-4">Airport Not Found</h1>
        <Link to="/airports" className="text-orange-500 font-bold hover:underline">
          Back to Directory
        </Link>
      </div>
    );
  }

  const handleCheckStatus = () => {
    notify(`Fetching live flight status for ${airport.code}...`, "info");
  };

  // Find airlines operating in the same country
  const localAirlines = airlines.filter(a => a.country === airport.country).slice(0, 4);

  // Find nearby airports (same country or just other airports)
  const nearbyAirports = airports
    .filter((a) => a.id !== airport.id && a.country === airport.country)
    .slice(0, 3);

  if (nearbyAirports.length < 3) {
    const others = airports
      .filter((a) => a.id !== airport.id && !nearbyAirports.find(n => n.id === a.id))
      .slice(0, 3 - nearbyAirports.length);
    nearbyAirports.push(...others);
  }

  return (
    <div className="pt-32 pb-20 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 font-black text-xs uppercase tracking-widest hover:text-blue-950 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Previous
          </button>
          <div className="flex gap-2">
            <Link to="/" className="text-slate-400 hover:text-blue-950 text-xs font-bold uppercase tracking-widest transition-colors">Home</Link>
            <span className="text-slate-300">/</span>
            <Link to="/airports" className="text-slate-400 hover:text-blue-950 text-xs font-bold uppercase tracking-widest transition-colors">Airports</Link>
            <span className="text-slate-300">/</span>
            <span className="text-blue-950 text-xs font-bold uppercase tracking-widest">{airport.code}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-[50px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100">
              <div className="h-[500px] relative">
                <img
                  src={`https://picsum.photos/seed/${airport.id}/1200/800`}
                  alt={airport.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/20 to-transparent flex items-end p-12">
                  <div className="text-white w-full">
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="flex items-center gap-2 text-orange-400 font-black text-xs uppercase tracking-widest">
                        <MapPin className="w-4 h-4" />
                        <span>{airport.city}, {airport.country}</span>
                      </div>
                      <div className="h-1 w-1 rounded-full bg-white/30" />
                      <div className="flex items-center gap-2 text-blue-300 font-black text-xs uppercase tracking-widest">
                        <Globe className="w-4 h-4" />
                        <span>International Hub</span>
                      </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 uppercase leading-none">
                      {airport.name}
                    </h1>
                    <div className="flex flex-wrap gap-4">
                      <span className="bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest">
                        IATA: {airport.code}
                      </span>
                      {airport.icaoCode && (
                        <span className="bg-white/10 backdrop-blur-xl border border-white/20 px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest">
                          ICAO: {airport.icaoCode}
                        </span>
                      )}
                      <span className="bg-orange-500 px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-orange-500/40">
                        Verified Guide
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-12 space-y-16">
                {/* Facilities */}
                <section>
                  <div className="flex items-center gap-4 mb-10">
                    <div className="bg-blue-950 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-950/20">
                      <Plane className="text-white w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-blue-950 uppercase tracking-tight">Facilities & Services</h2>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">What to expect at the terminal</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {airport.facilities.map((facility, i) => (
                      <div key={i} className="flex items-center gap-5 bg-slate-50 p-6 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                        <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-slate-100 group-hover:bg-blue-950 transition-colors">
                          <CheckCircle className="text-blue-950 w-6 h-6 group-hover:text-white transition-colors" />
                        </div>
                        <span className="font-black text-blue-950 uppercase text-sm tracking-tight">{facility}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Transport */}
                <section>
                  <div className="flex items-center gap-4 mb-10">
                    <div className="bg-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20">
                      <Navigation className="text-white w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-blue-950 uppercase tracking-tight">Transport & Access</h2>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Getting to and from the city</p>
                    </div>
                  </div>
                  <div className="bg-slate-900 p-12 rounded-[40px] text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5">
                      <Bus className="w-40 h-40" />
                    </div>
                    <div className="relative z-10">
                      <div className="flex flex-wrap gap-10 mb-10">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <Train className="w-6 h-6 text-orange-400" />
                          </div>
                          <span className="font-black uppercase tracking-widest text-sm">Train</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <Bus className="w-6 h-6 text-orange-400" />
                          </div>
                          <span className="font-black uppercase tracking-widest text-sm">Bus</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                            <Car className="w-6 h-6 text-orange-400" />
                          </div>
                          <span className="font-black uppercase tracking-widest text-sm">Taxi</span>
                        </div>
                      </div>
                      <p className="text-blue-100 text-lg font-medium leading-relaxed italic border-l-4 border-orange-500 pl-8">
                        "{airport.transport}"
                      </p>
                    </div>
                  </div>
                </section>

                {/* Nearby Airports */}
                <section>
                  <div className="flex items-center gap-4 mb-10">
                    <div className="bg-blue-950 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-950/20">
                      <MapPin className="text-white w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-black text-blue-950 uppercase tracking-tight">Nearby Airports</h2>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Explore other regional hubs</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {nearbyAirports.map((nearby) => (
                      <Link
                        key={nearby.id}
                        to={`/airports/${nearby.id}`}
                        className="group bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                      >
                        <div className="relative h-32 rounded-2xl overflow-hidden mb-4">
                          <img
                            src={`https://picsum.photos/seed/${nearby.id}/400/300`}
                            alt={nearby.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 right-3 bg-blue-950 text-white text-[10px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">
                            {nearby.code}
                          </div>
                        </div>
                        <h3 className="font-black text-blue-950 uppercase text-sm mb-1 group-hover:text-orange-500 transition-colors line-clamp-1">
                          {nearby.name}
                        </h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {nearby.city}, {nearby.country}
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Stats Card */}
            <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-xl font-black text-blue-950 mb-8 uppercase tracking-tight">Airport Insights</h3>
              <div className="space-y-8 mb-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-blue-900" />
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Security Wait</span>
                  </div>
                  <span className="font-black text-blue-950">15-20 Mins</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                      <Star className="w-5 h-5 text-orange-500" />
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">User Rating</span>
                  </div>
                  <span className="font-black text-blue-950">4.8/5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                      <Plane className="w-5 h-5 text-blue-900" />
                    </div>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Daily Flights</span>
                  </div>
                  <span className="font-black text-blue-950">800+</span>
                </div>
              </div>

              <h3 className="text-xl font-black text-blue-950 mb-6 uppercase tracking-tight">Contact Information</h3>
              <div className="space-y-6">
                {airport.address && (
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <MapPin className="w-5 h-5 text-blue-900" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-400 uppercase block mb-1 tracking-widest">Address</span>
                      <span className="font-bold text-blue-950 text-xs leading-relaxed">{airport.address}</span>
                    </div>
                  </div>
                )}
                {airport.phone && (
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <Phone className="w-5 h-5 text-blue-900" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-400 uppercase block mb-1 tracking-widest">Phone</span>
                      <span className="font-bold text-blue-950 text-xs">{airport.phone}</span>
                    </div>
                  </div>
                )}
                {airport.website && (
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <Globe className="w-5 h-5 text-blue-900" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-400 uppercase block mb-1 tracking-widest">Website</span>
                      <a href={airport.website} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 text-xs hover:underline break-all">
                        {airport.website.replace('https://', '')}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={handleCheckStatus}
                className="w-full bg-blue-950 text-white py-5 rounded-2xl font-black mt-10 hover:bg-blue-900 transition-all shadow-2xl shadow-blue-950/30 uppercase tracking-widest text-xs"
              >
                Check Live Status
              </button>
            </div>

            {/* Traveler Tips */}
            <div className="bg-orange-500 rounded-[40px] p-10 text-white shadow-2xl shadow-orange-500/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Shield className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-6 uppercase tracking-tight">Expert Tips</h3>
                <p className="text-orange-50 font-bold leading-relaxed italic text-lg">
                  "{airport.tips}"
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">Verified by FlightHQ Experts</span>
                </div>
              </div>
            </div>

            {/* Local Airlines */}
            {localAirlines.length > 0 && (
              <div className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100">
                <h3 className="text-xl font-black text-blue-950 mb-8 uppercase tracking-tight">Airlines in {airport.country}</h3>
                <div className="space-y-4">
                  {localAirlines.map((airline) => (
                    <Link 
                      key={airline.id}
                      to={`/airlines/${airline.id}`}
                      className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center font-black text-blue-950 group-hover:bg-blue-950 group-hover:text-white transition-colors">
                          {airline.code}
                        </div>
                        <div>
                          <div className="font-black text-blue-950 text-sm">{airline.name}</div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{airline.country}</div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-950 transition-colors" />
                    </Link>
                  ))}
                </div>
                <Link to="/airlines" className="mt-8 block text-center py-4 text-blue-600 font-black text-xs uppercase tracking-widest hover:underline">
                  View All Carriers
                </Link>
              </div>
            )}

            {/* Transfer Info */}
            <div className="bg-blue-900 rounded-[40px] p-10 text-white shadow-2xl shadow-blue-900/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Car className="w-32 h-32" />
              </div>
              <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Airport Transfers</h3>
              <p className="text-blue-100 text-sm font-medium leading-relaxed">
                Most travelers recommend booking airport transfers in advance to save up to 20% and ensure reliable service with fixed prices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportDetail;
