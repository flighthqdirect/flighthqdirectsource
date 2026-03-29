import React, { useMemo, useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { routes, airlines, airports } from "../data/mockData";
import { Plane, ArrowRight, MapPin, Calendar, Clock, Filter, SortAsc, Search, ArrowLeft, Info, AlertCircle, TrendingUp, TrendingDown, Minus, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getMarketInsights, MarketInsight } from "../services/flightService";
import { useNotification } from "../context/NotificationContext";

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const RouteSkeleton = () => (
  <div className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 animate-pulse">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
      <div className="flex-1 w-full">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 w-12 h-12 rounded-2xl" />
            <div className="space-y-2">
              <div className="h-5 bg-slate-100 rounded w-48" />
              <div className="h-3 bg-slate-50 rounded w-32" />
            </div>
          </div>
          <div className="bg-slate-50 w-20 h-6 rounded-full" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="h-10 bg-slate-100 rounded w-24" />
            <div className="h-3 bg-slate-50 rounded w-20" />
          </div>
          <div className="flex flex-col items-center px-8 space-y-2">
            <div className="h-3 bg-slate-50 rounded w-16" />
            <div className="w-32 h-px bg-slate-100" />
            <div className="h-3 bg-slate-50 rounded w-24" />
          </div>
          <div className="flex-1 text-right space-y-2">
            <div className="h-10 bg-slate-100 rounded w-24 ml-auto" />
            <div className="h-3 bg-slate-50 rounded w-20 ml-auto" />
          </div>
        </div>
      </div>
      <div className="hidden lg:block w-px h-24 bg-slate-100" />
      <div className="w-full lg:w-80 space-y-6">
        <div className="space-y-2">
          <div className="h-3 bg-slate-50 rounded w-32 mx-auto lg:mx-0" />
          <div className="flex justify-center lg:justify-start gap-2">
            {[1, 2].map(i => <div key={i} className="w-10 h-10 bg-slate-100 rounded-xl" />)}
          </div>
        </div>
        <div className="space-y-2 text-center lg:text-right">
          <div className="h-3 bg-slate-50 rounded w-24 ml-auto mr-auto lg:mr-0" />
          <div className="h-10 bg-slate-100 rounded w-32 ml-auto mr-auto lg:mr-0" />
          <div className="h-12 bg-slate-100 rounded-2xl w-full" />
        </div>
      </div>
    </div>
  </div>
);

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notify } = useNotification();
  const queryParams = new URLSearchParams(location.search);
  const fromQuery = queryParams.get("from") || "";
  const toQuery = queryParams.get("to") || "";
  const [isLoading, setIsLoading] = useState(true);
  const [marketInsight, setMarketInsight] = useState<MarketInsight | null>(null);
  const [isInsightLoading, setIsInsightLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [fromQuery, toQuery]);

  const fetchInsights = async () => {
    setIsInsightLoading(true);
    try {
      const insight = await getMarketInsights(fromQuery, toQuery);
      if (insight) {
        setMarketInsight(insight);
      } else {
        notify("Real-time insights are currently unavailable for this route.", "info");
      }
    } catch (error: any) {
      console.error("Failed to fetch insights:", error);
      notify("Failed to fetch real-time insights. Please try again later.", "error");
    } finally {
      setIsInsightLoading(false);
    }
  };

  useEffect(() => {
    if (fromQuery || toQuery) {
      fetchInsights();
    }
  }, [fromQuery, toQuery, notify]);

  const filteredResults = useMemo(() => {
    if (!fromQuery && !toQuery) return [];
    
    return routes.filter(route => {
      const matchesFrom = !fromQuery || 
        route.from.toLowerCase().includes(fromQuery.toLowerCase()) ||
        airports.find(a => a.id === route.from.toLowerCase())?.name.toLowerCase().includes(fromQuery.toLowerCase());
      
      const matchesTo = !toQuery || 
        route.to.toLowerCase().includes(toQuery.toLowerCase()) ||
        airports.find(a => a.id === route.to.toLowerCase())?.name.toLowerCase().includes(toQuery.toLowerCase());
        
      return matchesFrom && matchesTo;
    });
  }, [fromQuery, toQuery]);

  return (
    <div className="pt-32 pb-20 bg-slate-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header / Search Summary */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-500 font-bold mb-8 hover:text-blue-950 transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Search
          </Link>
          
          <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div className="flex items-center gap-8 w-full md:w-auto">
              <div className="text-center md:text-left">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Origin</div>
                <div className="text-3xl font-black text-blue-950 uppercase tracking-tighter">{fromQuery || "Anywhere"}</div>
              </div>
              
              <div className="flex flex-col items-center px-4">
                <Plane className="w-6 h-6 text-orange-500 rotate-90 mb-2" />
                <div className="w-16 h-px bg-slate-200 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full" />
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Destination</div>
                <div className="text-3xl font-black text-blue-950 uppercase tracking-tighter">{toQuery || "Anywhere"}</div>
              </div>
            </div>
            
            <div className="h-px md:h-12 w-full md:w-px bg-slate-100" />
            
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-2xl font-black text-blue-950 leading-none">{filteredResults.length}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Routes Found</div>
              </div>
              <button 
                onClick={() => navigate("/")}
                className="bg-blue-950 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-900 transition-all uppercase tracking-widest text-xs shadow-xl shadow-blue-950/20"
              >
                Modify Search
              </button>
            </div>
          </div>

          {/* Live Market Insights */}
          <AnimatePresence mode="wait">
            {(isInsightLoading || marketInsight) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-blue-950 rounded-[40px] p-8 text-white shadow-2xl shadow-blue-950/20 border border-white/10 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                {isInsightLoading ? (
                  <div className="flex flex-col items-center justify-center py-8 gap-4">
                    <RefreshCw className="w-10 h-10 text-orange-500 animate-spin" />
                    <div className="text-center">
                      <h3 className="text-xl font-black uppercase tracking-tight">Fetching Real-Time Market Insights...</h3>
                      <p className="text-blue-300 text-sm font-bold uppercase tracking-widest mt-1">Analyzing global data for {fromQuery} to {toQuery}</p>
                    </div>
                  </div>
                ) : marketInsight && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="bg-orange-500 p-2 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight">Live Market Intelligence</h3>
                      </div>
                      <p className="text-blue-100 leading-relaxed mb-6">{marketInsight.summary}</p>
                      <div className="flex flex-wrap gap-4">
                        <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/10">
                          <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Avg. Price</div>
                          <div className="text-xl font-black text-orange-500">{marketInsight.averagePrice}</div>
                        </div>
                        <div className="bg-white/10 px-6 py-3 rounded-2xl border border-white/10">
                          <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Best Time to Book</div>
                          <div className="text-xl font-black text-white">{marketInsight.bestTimeToBook}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white/5 rounded-3xl p-8 border border-white/10 text-center flex flex-col items-center justify-center">
                      <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4">Price Trend</div>
                      {marketInsight.trend === "up" ? (
                        <div className="flex flex-col items-center text-red-400">
                          <TrendingUp className="w-16 h-16 mb-2" />
                          <span className="text-2xl font-black uppercase">Rising</span>
                        </div>
                      ) : marketInsight.trend === "down" ? (
                        <div className="flex flex-col items-center text-green-400">
                          <TrendingDown className="w-16 h-16 mb-2" />
                          <span className="text-2xl font-black uppercase">Falling</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center text-blue-400">
                          <Minus className="w-16 h-16 mb-2" />
                          <span className="text-2xl font-black uppercase">Stable</span>
                        </div>
                      )}
                      <p className="text-xs text-blue-300 mt-4 font-bold uppercase tracking-widest leading-relaxed">
                        Data verified via <br /> Global GDS Networks
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6">
            {[1, 2, 3].map(i => <RouteSkeleton key={i} />)}
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredResults.map((route, index) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-[40px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 group hover:border-orange-500/30 transition-all"
              >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  {/* Route Info */}
                  <div className="flex-1 w-full">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-50 p-3 rounded-2xl">
                          <Plane className="w-6 h-6 text-blue-900" />
                        </div>
                        <div>
                          <h3 className="text-xl font-black text-blue-950 uppercase tracking-tight">Direct Flight Route</h3>
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Market Insight Data</p>
                        </div>
                      </div>
                      <div className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest">
                        Best Value
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-3xl font-black text-blue-950 mb-1">{route.from}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Departure Hub</div>
                      </div>
                      
                      <div className="flex flex-col items-center px-8">
                        <div className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-2">Non-Stop</div>
                        <div className="w-32 h-px bg-slate-200 relative">
                          <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 rotate-90" />
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">Approx. 4h 30m</div>
                      </div>
                      
                      <div className="flex-1 text-right">
                        <div className="text-3xl font-black text-blue-950 mb-1">{route.to}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Arrival Hub</div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="hidden lg:block w-px h-24 bg-slate-100" />

                  {/* Airlines & Price */}
                  <div className="w-full lg:w-80 flex flex-col md:flex-row lg:flex-col items-center justify-between gap-6">
                    <div className="w-full">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 text-center lg:text-left">Operating Carriers</div>
                      <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                        {route.airlines.map(airlineName => {
                          const airline = airlines.find(a => a.name === airlineName || a.id === airlineName);
                          return (
                            <div key={airlineName} className="bg-slate-50 p-2 rounded-xl border border-slate-100 group-hover:bg-white transition-colors" title={airline?.name || airlineName}>
                              {airline?.logo ? (
                                <img src={airline.logo} alt={airline.name} referrerPolicy="no-referrer" className="w-6 h-6 object-contain grayscale opacity-60" />
                              ) : (
                                <div className="w-6 h-6 flex items-center justify-center text-[8px] font-bold text-slate-400 text-center leading-none overflow-hidden">{airlineName.substring(0, 3).toUpperCase()}</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="w-full text-center lg:text-right">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Estimated Price</div>
                      <div className="text-3xl font-black text-orange-500 mb-4">{route.priceRange}</div>
                      <Link 
                        to={`/routes/${route.id}`}
                        className="block w-full bg-blue-950 text-white py-4 rounded-2xl font-black hover:bg-blue-900 transition-all uppercase tracking-widest text-[10px] shadow-lg shadow-blue-950/10"
                      >
                        View Route Details
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Footer Info */}
                <div className="mt-8 pt-6 border-t border-slate-50 flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Best time to fly: <span className="text-blue-900">{route.cheapestTime}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Daily Operations</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Info className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Data updated 2h ago</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[60px] border-2 border-dashed border-slate-200 shadow-2xl shadow-slate-200/50">
            <div className="bg-slate-50 w-24 h-24 rounded-[35px] flex items-center justify-center mx-auto mb-8">
              <AlertCircle className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-4xl font-black text-blue-950 mb-4 uppercase tracking-tighter">No Direct Routes Found</h2>
            <p className="text-slate-500 mb-10 max-w-md mx-auto">
              We couldn't find any direct flight routes matching your search criteria in our database. Try searching for major hubs like "KUL" or "SIN".
            </p>
            <Link 
              to="/"
              className="inline-block bg-orange-500 text-white px-10 py-5 rounded-2xl font-black hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/30 uppercase tracking-widest text-sm"
            >
              Return to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
