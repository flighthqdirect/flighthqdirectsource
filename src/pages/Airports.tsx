import React from "react";
import { Link } from "react-router-dom";
import { airports } from "../data/mockData";
import { ArrowRight, MapPin, Globe, Info, Plane, Train, Bus, Car } from "lucide-react";

const Airports: React.FC = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-black tracking-tighter text-blue-950 mb-4 uppercase">Airport Guides</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Everything you need to know about major airports. Facilities, transport, and tips for a smooth travel experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {airports.map((airport) => (
            <Link
              key={airport.id}
              to={`/airports/${airport.id}`}
              className="bg-white rounded-[50px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={`https://picsum.photos/seed/${airport.id}/800/400`}
                  alt={airport.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-blue-950 text-white px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest shadow-xl">
                  {airport.code}
                </div>
              </div>

              <div className="p-10">
                <div className="flex items-center gap-2 text-orange-500 font-black text-xs uppercase tracking-widest mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{airport.city}, {airport.country}</span>
                </div>
                <h2 className="text-3xl font-black text-blue-950 mb-6 group-hover:text-orange-500 transition-colors leading-tight">
                  {airport.name}
                </h2>

                <div className="flex flex-wrap gap-3 mb-8">
                  {airport.facilities.slice(0, 3).map((facility, i) => (
                    <span key={i} className="bg-slate-50 text-slate-600 px-4 py-1.5 rounded-xl font-bold text-xs uppercase border border-slate-100">
                      {facility}
                    </span>
                  ))}
                  {airport.facilities.length > 3 && (
                    <span className="bg-slate-50 text-slate-400 px-4 py-1.5 rounded-xl font-bold text-xs uppercase border border-slate-100">
                      +{airport.facilities.length - 3} More
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                  <span className="text-blue-900 font-bold flex items-center gap-2">
                    View Guide <ArrowRight className="w-4 h-4" />
                  </span>
                  <div className="flex gap-4 text-slate-400">
                    <Train className="w-5 h-5" />
                    <Bus className="w-5 h-5" />
                    <Car className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Airports;
