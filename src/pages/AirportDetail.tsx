import React from "react";
import { useParams, Link } from "react-router-dom";
import { airports } from "../data/mockData";
import { MapPin, Globe, Info, Plane, Train, Bus, Car, CheckCircle, ArrowLeft, Star, Clock, Shield } from "lucide-react";

const AirportDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const airport = airports.find((a) => a.id === id);

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

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/airports" className="flex items-center gap-2 text-slate-500 font-bold mb-12 hover:text-blue-950 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Airports
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-[50px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100">
              <div className="h-96 relative">
                <img
                  src={`https://picsum.photos/seed/${airport.id}/1200/600`}
                  alt={airport.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent flex items-end p-12">
                  <div className="text-white">
                    <div className="flex items-center gap-2 text-orange-400 font-black text-xs uppercase tracking-widest mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>{airport.city}, {airport.country}</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter mb-4 uppercase leading-tight">
                      {airport.name}
                    </h1>
                    <div className="flex gap-4">
                      <span className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest">
                        Code: {airport.code}
                      </span>
                      <span className="bg-orange-500 px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest shadow-xl">
                        Top Rated
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-12 prose prose-lg max-w-none text-slate-600 leading-relaxed">
                <h2 className="text-3xl font-black text-blue-950 mb-8 uppercase">Facilities & Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {airport.facilities.map((facility, i) => (
                    <div key={i} className="flex items-center gap-4 bg-slate-50 p-6 rounded-3xl border border-slate-100">
                      <div className="bg-blue-900 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/20">
                        <Star className="text-white w-5 h-5" />
                      </div>
                      <span className="font-bold text-blue-950">{facility}</span>
                    </div>
                  ))}
                </div>

                <h2 className="text-3xl font-black text-blue-950 mb-8 uppercase">Transport & Access</h2>
                <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 mb-12">
                  <div className="flex flex-wrap gap-8 mb-8">
                    <div className="flex items-center gap-3">
                      <Train className="w-6 h-6 text-orange-500" />
                      <span className="font-bold text-blue-950">Train</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bus className="w-6 h-6 text-orange-500" />
                      <span className="font-bold text-blue-950">Bus</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Car className="w-6 h-6 text-orange-500" />
                      <span className="font-bold text-blue-950">Taxi / Grab</span>
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed">{airport.transport}</p>
                </div>

                <h2 className="text-3xl font-black text-blue-950 mb-8 uppercase">Traveler Tips</h2>
                <div className="bg-blue-50 p-10 rounded-[40px] border border-blue-100 mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-blue-900 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                      <Shield className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-blue-950 uppercase">Pro Tips for {airport.code}</h3>
                  </div>
                  <p className="text-blue-900 font-medium leading-relaxed italic">
                    "{airport.tips}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-xl font-black text-blue-950 mb-6 uppercase">Airport Stats</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-900" />
                    <span className="text-sm font-bold text-slate-500 uppercase">Avg. Security Time</span>
                  </div>
                  <span className="font-black text-blue-950">15-20 Mins</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-bold text-slate-500 uppercase">User Rating</span>
                  </div>
                  <span className="font-black text-blue-950">4.8/5.0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Plane className="w-5 h-5 text-blue-900" />
                    <span className="text-sm font-bold text-slate-500 uppercase">Daily Flights</span>
                  </div>
                  <span className="font-black text-blue-950">800+</span>
                </div>
              </div>
              <button className="w-full bg-blue-950 text-white py-4 rounded-2xl font-black mt-8 hover:bg-blue-900 transition-all shadow-xl shadow-blue-950/20">
                CHECK LIVE FLIGHTS
              </button>
            </div>

            <div className="bg-blue-900 rounded-[40px] p-8 text-white shadow-2xl shadow-blue-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <h3 className="text-xl font-black mb-4 uppercase">Need a Transfer?</h3>
              <p className="text-blue-100 mb-6 text-sm leading-relaxed">
                Book your airport transfer in advance and save up to 20%. Reliable drivers, fixed prices.
              </p>
              <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20">
                BOOK TRANSFER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportDetail;
