import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { routes, airlines } from "../data/mockData";
import { Plane, ArrowLeft, Clock, TrendingDown, ShieldCheck, Search, Calendar, Info } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const RouteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const route = routes.find((r) => r.id === id);
  const { notify } = useNotification();
  const navigate = useNavigate();

  if (!route) {
    return (
      <div className="pt-40 pb-20 text-center min-h-screen">
        <h1 className="text-4xl font-black text-blue-950 mb-4">Route Not Found</h1>
        <Link to="/" className="text-orange-500 font-bold hover:underline">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleSearchFlights = () => {
    notify(`Searching for flights from ${route.from} to ${route.to}...`, "info");
    navigate(`/search?from=${route.from}&to=${route.to}`);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/search" className="inline-flex items-center gap-2 text-slate-500 font-bold mb-12 hover:text-blue-950 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Search Results
        </Link>

        <div className="bg-white rounded-[50px] p-8 md:p-16 shadow-2xl shadow-slate-200/50 border border-slate-100">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-16 gap-12">
            <div className="flex-1 text-center lg:text-left">
              <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">Origin</span>
              <h1 className="text-5xl md:text-6xl font-black text-blue-950 tracking-tighter">{route.from}</h1>
            </div>
            
            <div className="flex flex-col items-center px-8">
              <div className="bg-orange-500 p-4 md:p-6 rounded-3xl shadow-xl shadow-orange-500/20 mb-6">
                <Plane className="w-8 h-8 md:w-12 md:h-12 text-white rotate-90" />
              </div>
              <div className="text-xs font-black text-orange-500 uppercase tracking-[0.2em] mb-2">Direct Flight</div>
              <div className="w-32 md:w-48 h-px bg-slate-200 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-slate-300 rounded-full" />
              </div>
            </div>
            
            <div className="flex-1 text-center lg:text-right">
              <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-4 block">Destination</span>
              <h1 className="text-5xl md:text-6xl font-black text-blue-950 tracking-tighter">{route.to}</h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 p-4 rounded-2xl mb-6 text-blue-900">
                <TrendingDown className="w-8 h-8" />
              </div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Cheapest Time to Fly</div>
              <div className="text-2xl font-black text-blue-950">{route.cheapestTime}</div>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="bg-orange-100 p-4 rounded-2xl mb-6 text-orange-600">
                <Clock className="w-8 h-8" />
              </div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Estimated Price Range</div>
              <div className="text-3xl font-black text-orange-500">{route.priceRange}</div>
            </div>

            <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
              <div className="bg-green-100 p-4 rounded-2xl mb-6 text-green-600">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Flight Frequency</div>
              <div className="text-2xl font-black text-blue-950">Daily</div>
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-black text-blue-950 uppercase tracking-tight mb-8 text-center">Operating Airlines</h3>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {route.airlines.map(airlineName => {
                const airline = airlines.find(a => a.name === airlineName || a.id === airlineName);
                return (
                  <Link 
                    key={airlineName} 
                    to={airline ? `/airlines/${airline.id}` : '#'}
                    className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-[30px] border border-slate-100 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all group w-32 md:w-40"
                  >
                    <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-sm flex items-center justify-center overflow-hidden">
                      {airline?.logo ? (
                        <img src={airline.logo} alt={airline.name} referrerPolicy="no-referrer" className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                      ) : (
                        <div className="text-sm font-black text-slate-400">{airlineName.substring(0, 3).toUpperCase()}</div>
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-600 text-center">{airline?.name || airlineName}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-slate-100 gap-8">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-green-600 font-bold text-sm bg-green-50 px-4 py-2 rounded-full">
                <ShieldCheck className="w-5 h-5" />
                <span>Verified Route Data</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                <Info className="w-4 h-4" />
                <span>Updated 2 hours ago</span>
              </div>
            </div>
            <button 
              onClick={handleSearchFlights}
              className="w-full md:w-auto bg-blue-950 text-white px-12 py-5 rounded-2xl font-black hover:bg-blue-900 transition-all shadow-2xl shadow-blue-950/20 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
            >
              <Search className="w-5 h-5" /> Search Live Flights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteDetail;
