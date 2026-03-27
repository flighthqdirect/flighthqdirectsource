import React from "react";
import { Link } from "react-router-dom";
import { airlines } from "../data/mockData";
import { ArrowRight, Plane, Info, Phone, CheckCircle } from "lucide-react";

const Airlines: React.FC = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-black tracking-tighter text-blue-950 mb-4 uppercase">Airlines Directory</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Everything you need to know about your favorite airlines. Booking guides, baggage rules, and contact info.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {airlines.map((airline) => (
            <Link
              key={airline.id}
              to={`/airlines/${airline.id}`}
              className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-center gap-6 mb-8">
                <img
                  src={airline.logo}
                  alt={airline.name}
                  className="w-20 h-20 rounded-3xl object-cover shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h2 className="text-2xl font-black text-blue-950 group-hover:text-orange-500 transition-colors">
                    {airline.name}
                  </h2>
                  <span className="text-orange-500 font-bold tracking-widest text-sm uppercase">
                    Code: {airline.code}
                  </span>
                </div>
              </div>

              <p className="text-slate-500 mb-8 line-clamp-3 leading-relaxed">
                {airline.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Verified Booking Guide</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Up-to-date Baggage Rules</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                <span className="text-blue-900 font-bold flex items-center gap-2">
                  View Details <ArrowRight className="w-4 h-4" />
                </span>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-600 transition-colors">
                  Book Now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Airlines;
