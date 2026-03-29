import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { airlines } from "../data/mockData";
import { ArrowRight, Plane, Info, Phone, CheckCircle, Filter, Search, X, SortAsc, LayoutGrid, List, RefreshCw } from "lucide-react";
import Fuse from "fuse.js";
import { useNotification } from "../context/NotificationContext";

type SortOption = "name-asc" | "name-desc" | "country-asc" | "country-desc" | "founding-asc" | "founding-desc";
type ViewMode = "grouped" | "alphabetical";

const LogoImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative bg-white flex items-center justify-center overflow-hidden border border-slate-100/50 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
          <RefreshCw className="w-5 h-5 text-orange-500 animate-spin opacity-50" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-contain p-2 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-all duration-500 group-hover:scale-110`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const Airlines: React.FC = () => {
  const { notify } = useNotification();
  const [selectedCountry, setSelectedCountry] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("name-asc");
  const [viewMode, setViewMode] = useState<ViewMode>("grouped");
  const [activeLetter, setActiveLetter] = useState<string>("All");
  const [showBackToTop, setShowBackToTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredAirlines = useMemo(() => {
    const featuredIds = ["malaysia-airlines", "singapore-airlines", "emirates", "qatar-airways", "cathay-pacific"];
    return airlines.filter(a => featuredIds.includes(a.id));
  }, []);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const fuse = useMemo(() => {
    return new Fuse(airlines, {
      keys: ["name", "code"],
      threshold: 0.3, // Lower threshold means more strict matching
      distance: 100,
      ignoreLocation: true,
    });
  }, []);

  const filteredAirlines = useMemo(() => {
    let result = airlines;

    if (searchQuery.trim()) {
      result = fuse.search(searchQuery).map(r => r.item);
    }

    return result.filter((airline) => {
      const matchesCountry = selectedCountry === "All" || airline.country === selectedCountry;
      const matchesLetter = activeLetter === "All" || airline.name.startsWith(activeLetter);
      return matchesCountry && matchesLetter;
    }).sort((a, b) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      if (sortOption === "country-asc") return a.country.localeCompare(b.country);
      if (sortOption === "country-desc") return b.country.localeCompare(a.country);
      if (sortOption === "founding-asc") return (a.foundingYear || 9999) - (b.foundingYear || 9999);
      if (sortOption === "founding-desc") return (b.foundingYear || 0) - (a.foundingYear || 0);
      return 0;
    });
  }, [selectedCountry, searchQuery, sortOption, activeLetter, fuse]);

  const groupedAirlines = useMemo(() => {
    return filteredAirlines.reduce((acc, airline) => {
      const key = viewMode === "grouped" ? airline.country : airline.name[0].toUpperCase();
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(airline);
      return acc;
    }, {} as Record<string, typeof airlines>);
  }, [filteredAirlines, viewMode]);

  const allCountries = useMemo(() => Array.from(new Set(airlines.map(a => a.country))).sort(), []);
  const groupKeys = useMemo(() => Object.keys(groupedAirlines).sort(), [groupedAirlines]);

  return (
    <div className="pt-32 pb-20 bg-slate-50/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-7xl font-black tracking-tighter text-blue-950 mb-6 uppercase leading-none">
            Airlines <span className="text-orange-500 underline decoration-8 decoration-orange-500/20 underline-offset-8">Directory</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 font-medium">
            Your comprehensive A-Z guide to global aviation. Explore {airlines.length} airlines across {allCountries.length} countries with detailed baggage rules and contact info.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white px-8 py-4 rounded-[30px] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Plane className="w-6 h-6" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-black text-blue-950 leading-none">{airlines.length}</div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Carriers</div>
              </div>
            </div>
            <div className="bg-white px-8 py-4 rounded-[30px] shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                <Filter className="w-6 h-6" />
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
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Verified Info</div>
              </div>
            </div>
          </div>

          {/* Featured Section (Only show when no filters are active) */}
          {selectedCountry === "All" && searchQuery === "" && activeLetter === "All" && (
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-xl font-black text-blue-950 uppercase tracking-widest flex items-center gap-3">
                  <span className="w-8 h-1 bg-orange-500 rounded-full" />
                  Featured Carriers
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {featuredAirlines.map(airline => (
                  <Link 
                    key={airline.id} 
                    to={`/airlines/${airline.id}`}
                    className="bg-white p-6 rounded-[30px] border border-slate-100 shadow-lg shadow-slate-200/30 hover:-translate-y-1 transition-all group"
                  >
                    <LogoImage 
                      src={airline.logo} 
                      alt={airline.name} 
                      className="w-16 h-16 rounded-2xl mb-4 mx-auto shadow-sm"
                    />
                    <div className="text-sm font-black text-blue-950 group-hover:text-orange-500 transition-colors truncate">{airline.name}</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">{airline.code}</div>
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
                  placeholder="Search by name or code..."
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
                    <option value="country-asc">Country (A-Z)</option>
                    <option value="country-desc">Country (Z-A)</option>
                    <option value="founding-asc">Founding Year (Oldest)</option>
                    <option value="founding-desc">Founding Year (Newest)</option>
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
                    {groupedAirlines[key].length} {groupedAirlines[key].length === 1 ? "Airline" : "Airlines"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {groupedAirlines[key].map((airline) => (
                    <Link
                      key={airline.id}
                      to={`/airlines/${airline.id}`}
                      className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-orange-50 transition-colors" />
                      
                      <div className="flex items-center gap-6 mb-8 relative">
                        <LogoImage
                          src={airline.logo}
                          alt={airline.name}
                          className="w-20 h-20 rounded-3xl shadow-lg border-2 border-white"
                        />
                        <div>
                          <h3 className="text-2xl font-black text-blue-950 group-hover:text-orange-500 transition-colors leading-tight">
                            {airline.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-orange-500 font-black tracking-widest text-xs uppercase">
                              {airline.code}
                            </span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-slate-400 font-bold text-xs uppercase">
                              {airline.country}
                            </span>
                            {airline.foundingYear && (
                              <>
                                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span className="text-slate-400 font-bold text-xs uppercase">
                                  Est. {airline.foundingYear}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-slate-500 mb-8 line-clamp-3 leading-relaxed text-sm">
                        {airline.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
                          <CheckCircle className="w-4 h-4 text-green-500 mb-2" />
                          <span className="text-[10px] font-black text-slate-400 uppercase block">Booking</span>
                          <span className="text-xs font-bold text-blue-950">Verified</span>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
                          <Plane className="w-4 h-4 text-blue-500 mb-2" />
                          <span className="text-[10px] font-black text-slate-400 uppercase block">Baggage</span>
                          <span className="text-xs font-bold text-blue-950">Updated</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <span className="text-blue-900 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                          View Guide <ArrowRight className="w-4 h-4" />
                        </span>
                        <div className="w-10 h-10 bg-orange-500 text-white rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/20">
                          <Plane className="w-5 h-5 rotate-45" />
                        </div>
                      </div>
                    </Link>
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
              We couldn't find any airlines matching your current filters. Try adjusting your search or clearing the filters.
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

export default Airlines;
