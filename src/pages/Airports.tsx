import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { airports } from "../data/mockData";
import { ArrowRight, MapPin, Globe, Info, Plane, Train, Bus, Car, Search, X, Filter, SortAsc, LayoutGrid, List, CheckCircle } from "lucide-react";
import { useNotification } from "../context/NotificationContext";
import { motion } from "motion/react";

type SortOption = "name-asc" | "name-desc" | "country";
type ViewMode = "grouped" | "alphabetical";

const Airports: React.FC = () => {
  const { notify } = useNotification();
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("name-asc");
  const [viewMode, setViewMode] = useState<ViewMode>("grouped");
  const [activeLetter, setActiveLetter] = useState<string>("All");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredAirports = useMemo(() => {
    const featuredIds = ["changi", "dubai-intl", "heathrow", "incheon", "qatar-hamad"];
    return airports.filter(a => featuredIds.includes(a.id));
  }, []);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const filteredAirports = useMemo(() => {
    return airports.filter((airport) => {
      const matchesCountry = selectedCountry === "All" || airport.country === selectedCountry;
      const matchesSearch = airport.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           airport.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           airport.city.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLetter = activeLetter === "All" || airport.name.startsWith(activeLetter);
      return matchesCountry && matchesSearch && matchesLetter;
    }).sort((a, b) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      if (sortOption === "country") return a.country.localeCompare(b.country);
      return 0;
    });
  }, [selectedCountry, searchQuery, sortOption, activeLetter]);

  const groupedAirports = useMemo(() => {
    return filteredAirports.reduce((acc, airport) => {
      const key = viewMode === "grouped" ? airport.country : airport.name[0].toUpperCase();
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(airport);
      return acc;
    }, {} as Record<string, typeof airports>);
  }, [filteredAirports, viewMode]);

  const allCountries = useMemo(() => Array.from(new Set(airports.map(a => a.country))).sort(), []);
  const groupKeys = useMemo(() => Object.keys(groupedAirports).sort(), [groupedAirports]);

  return (
    <div className="pt-32 pb-20 bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-7xl font-black tracking-tighter text-blue-950 mb-6 uppercase leading-none">
            Airport <span className="text-orange-500 underline decoration-8 decoration-orange-500/20 underline-offset-8">Guides</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium">
            Your comprehensive A-Z guide to global hubs. Explore {airports.length} airports across {allCountries.length} countries with detailed facilities and transport info.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white px-8 py-4 rounded-[30px] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Globe className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-black text-blue-950 leading-none">{airports.length}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Hubs</div>
              </div>
            </div>
            <div className="bg-white px-8 py-4 rounded-[30px] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-black text-blue-950 leading-none">{allCountries.length}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Countries</div>
              </div>
            </div>
            <div className="bg-white px-8 py-4 rounded-[30px] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-black text-blue-950 leading-none">100%</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Verified Tips</div>
              </div>
            </div>
          </div>

          {/* Featured Section (Only show when no filters are active) */}
          {selectedCountry === "All" && searchQuery === "" && activeLetter === "All" && (
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl font-black text-blue-950 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-8 h-1 bg-orange-500 rounded-full" />
                  World Class Hubs
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {featuredAirports.map(airport => (
                  <Link 
                    key={airport.id} 
                    to={`/airports/${airport.id}`}
                    className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-lg shadow-slate-200/30 hover:-translate-y-1 transition-all group"
                  >
                    <div className="w-12 h-12 bg-slate-50 rounded-xl mb-4 mx-auto flex items-center justify-center text-blue-950 font-black text-xs">
                      {airport.code}
                    </div>
                    <div className="text-sm font-black text-blue-950 group-hover:text-orange-500 transition-colors truncate">{airport.name}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">{airport.city}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-5xl mx-auto sticky top-24 z-30">
            <div className="flex flex-col lg:flex-row items-stretch gap-6">
              {/* Search Bar */}
              <div className="relative flex-1">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, code, or city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 border-transparent rounded-2xl font-bold text-blue-950 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white focus:border-orange-500 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-orange-500 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Filters & Sort */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative min-w-[180px]">
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="w-full pl-4 pr-10 py-4 bg-slate-50 border-transparent rounded-2xl font-bold text-blue-950 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white focus:border-orange-500 transition-all cursor-pointer"
                  >
                    <option value="All">All Countries</option>
                    {allCountries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                <div className="relative min-w-[180px]">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="w-full pl-4 pr-10 py-4 bg-slate-50 border-transparent rounded-2xl font-bold text-blue-950 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white focus:border-orange-500 transition-all cursor-pointer"
                  >
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="country">Country</option>
                  </select>
                  <SortAsc className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                <div className="flex bg-slate-50 p-1.5 rounded-2xl">
                  <button
                    onClick={() => setViewMode("grouped")}
                    className={`p-2.5 rounded-xl transition-all ${viewMode === "grouped" ? "bg-white shadow-sm text-orange-500" : "text-slate-400 hover:text-blue-950"}`}
                    title="Group by Country"
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("alphabetical")}
                    className={`p-2.5 rounded-xl transition-all ${viewMode === "alphabetical" ? "bg-white shadow-sm text-orange-500" : "text-slate-400 hover:text-blue-950"}`}
                    title="Group by Alphabet"
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Alphabet Jump Bar */}
            <div className="mt-8 flex flex-wrap justify-center gap-1">
              <button
                onClick={() => setActiveLetter("All")}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all ${activeLetter === "All" ? "bg-blue-950 text-white" : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-blue-950"}`}
              >
                ALL
              </button>
              {alphabet.map((letter) => (
                <button
                  key={letter}
                  onClick={() => setActiveLetter(letter)}
                  className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${activeLetter === letter ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20" : "bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-blue-950"}`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {groupKeys.length > 0 ? (
          <div className="space-y-20">
            {groupKeys.map((key) => (
              <div key={key} id={`section-${key}`} className="scroll-mt-64 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-950 text-white rounded-2xl flex items-center justify-center text-2xl font-black shadow-xl shadow-blue-950/20">
                    {key[0]}
                  </div>
                  <h2 className="text-4xl font-black text-blue-950 uppercase tracking-tighter">{key}</h2>
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="bg-white border border-slate-200 text-slate-500 px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-sm">
                    {groupedAirports[key].length} {groupedAirports[key].length === 1 ? "Hub" : "Hubs"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {groupedAirports[key].map((airport, i) => (
                    <motion.div
                      key={airport.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                    >
                      <Link
                        to={`/airports/${airport.id}`}
                        className="bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-2 transition-all duration-300 relative block h-full"
                      >
                        <div className="h-56 overflow-hidden relative">
                          <img
                            src={`https://picsum.photos/seed/${airport.id}/800/400`}
                            alt={airport.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-4 left-4 bg-blue-950 text-white px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">
                            {airport.code}
                          </div>
                        </div>

                        <div className="p-8">
                          <div className="flex items-center gap-2 text-orange-500 font-black text-[10px] uppercase tracking-widest mb-3">
                            <MapPin className="w-3 h-3" />
                            <span>{airport.city}, {airport.country}</span>
                          </div>
                          <h3 className="text-2xl font-black text-blue-950 mb-6 group-hover:text-orange-500 transition-colors leading-tight line-clamp-2">
                            {airport.name}
                          </h3>

                          <div className="flex flex-wrap gap-2 mb-8">
                            {airport.facilities.slice(0, 3).map((facility, i) => (
                              <span key={i} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-lg font-bold text-[10px] uppercase border border-slate-100">
                                {facility}
                              </span>
                            ))}
                            {airport.facilities.length > 3 && (
                              <span className="bg-slate-50 text-slate-400 px-3 py-1 rounded-lg font-bold text-[10px] uppercase border border-slate-100">
                                +{airport.facilities.length - 3}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                            <span className="text-blue-900 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                              View Guide <ArrowRight className="w-4 h-4" />
                            </span>
                            <div className="flex gap-3 text-slate-300">
                              <Train className="w-4 h-4" />
                              <Bus className="w-4 h-4" />
                              <Car className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[60px] border-2 border-dashed border-slate-200 shadow-2xl shadow-slate-200/50">
            <div className="bg-slate-50 w-24 h-24 rounded-[35px] flex items-center justify-center mx-auto mb-8">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-4xl font-black text-blue-950 mb-4 uppercase tracking-tighter">No Results Found</h2>
            <p className="text-slate-500 mb-10 max-w-md mx-auto">
              We couldn't find any airports matching your current filters. Try adjusting your search or clearing the filters.
            </p>
            <button 
              onClick={() => {
                setSelectedCountry("All");
                setSearchQuery("");
                setActiveLetter("All");
                notify("All filters have been reset.", "info");
              }}
              className="bg-orange-500 text-white px-10 py-5 rounded-2xl font-black hover:bg-orange-600 transition-all shadow-2xl shadow-orange-500/30 uppercase tracking-widest text-sm"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-14 h-14 bg-blue-950 text-white rounded-2xl shadow-2xl shadow-blue-950/30 flex items-center justify-center hover:bg-orange-500 transition-all z-50 group"
        >
          <ArrowRight className="w-6 h-6 -rotate-90 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default Airports;
