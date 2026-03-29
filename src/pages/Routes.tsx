import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../data/mockData";
import { ArrowRight, Plane, TrendingDown, Clock, ShieldCheck, Search } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const Routes: React.FC = () => {
  const { notify } = useNotification();
  const navigate = useNavigate();

  const handleSearchFlights = (from: string, to: string) => {
    notify(`Searching for flights from ${from} to ${to}... This may take a moment.`, "info");
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-black tracking-tighter text-blue-950 mb-4 uppercase">Popular Flight Routes</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Find the cheapest times to fly on the most popular routes. Compare airlines and book your next trip.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {routes.map((route) => (
            <div
              key={route.id}
              className="bg-white rounded-[50px] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">From</span>
                  <span className="text-3xl font-black text-blue-950">{route.from}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-orange-500 p-3 rounded-2xl shadow-lg shadow-orange-500/20">
                    <Plane className="w-6 h-6 text-white rotate-90" />
                  </div>
                  <div className="h-px w-20 bg-slate-200 my-4" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">To</span>
                  <span className="text-3xl font-black text-blue-950">{route.to}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-2 text-blue-900 font-black text-[10px] uppercase tracking-widest mb-2">
                    <TrendingDown className="w-4 h-4" />
                    <span>Cheapest Time</span>
                  </div>
                  <span className="font-bold text-blue-950 text-sm">{route.cheapestTime}</span>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-2 text-blue-900 font-black text-[10px] uppercase tracking-widest mb-2">
                    <Plane className="w-4 h-4" />
                    <span>Top Airlines</span>
                  </div>
                  <span className="font-bold text-blue-950 text-sm">{route.airlines.slice(0, 2).join(", ")}</span>
                </div>
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                  <div className="flex items-center gap-2 text-blue-900 font-black text-[10px] uppercase tracking-widest mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Price Range</span>
                  </div>
                  <span className="font-bold text-orange-500 text-sm">{route.priceRange}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Price Match Guarantee</span>
                </div>
                <button 
                  onClick={() => handleSearchFlights(route.from, route.to)}
                  className="bg-blue-950 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-900 transition-all shadow-xl shadow-blue-950/20 flex items-center gap-2"
                >
                  <Search className="w-5 h-5" /> SEARCH FLIGHTS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Routes;
