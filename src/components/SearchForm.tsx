import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users, ArrowRightLeft, Plane, Globe } from "lucide-react";
import { motion } from "motion/react";
import { useNotification } from "../context/NotificationContext";

const SearchForm: React.FC = () => {
  const { notify } = useNotification();
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState<"round-trip" | "one-way">("round-trip");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!from.trim() || !to.trim()) {
      notify("Please enter both origin and destination cities.", "error");
      return;
    }

    const blockedKeywords = ["test", "error", "crash", "undefined", "null"];
    if (blockedKeywords.some(kw => from.toLowerCase().includes(kw) || to.toLowerCase().includes(kw))) {
      notify("Invalid search query. Please enter real city names or airport codes.", "error");
      return;
    }

    // In a real app, this would redirect to a search results page or call an affiliate API
    console.log("Searching for flights:", { from, to, departureDate, returnDate, passengers, tripType });
    notify(`Searching for flights from ${from} to ${to}... We'll show you the best results shortly!`, "success");
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto -mt-24 relative z-10 border border-slate-100">
      <div className="flex gap-4 mb-6 border-b border-slate-100 pb-4">
        <button
          onClick={() => setTripType("round-trip")}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            tripType === "round-trip" ? "bg-blue-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"
          }`}
        >
          Round Trip
        </button>
        <button
          onClick={() => setTripType("one-way")}
          className={`px-4 py-2 rounded-lg font-bold transition-all ${
            tripType === "one-way" ? "bg-blue-900 text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"
          }`}
        >
          One Way
        </button>
      </div>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">From</label>
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-blue-500 transition-colors">
            <MapPin className="w-5 h-5 text-blue-900 mr-3" />
            <input
              type="text"
              placeholder="Origin City"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="bg-transparent w-full outline-none font-medium placeholder:text-slate-400"
              required
            />
          </div>
          <button
            type="button"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white border border-slate-200 p-1.5 rounded-full z-10 hover:bg-slate-50 transition-colors hidden md:block"
            onClick={() => {
              const temp = from;
              setFrom(to);
              setTo(temp);
            }}
          >
            <ArrowRightLeft className="w-4 h-4 text-orange-500" />
          </button>
        </div>

        <div className="relative">
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">To</label>
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-blue-500 transition-colors">
            <MapPin className="w-5 h-5 text-blue-900 mr-3" />
            <input
              type="text"
              placeholder="Destination City"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="bg-transparent w-full outline-none font-medium placeholder:text-slate-400"
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">Departure</label>
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-blue-500 transition-colors">
            <Calendar className="w-5 h-5 text-blue-900 mr-3" />
            <input
              type="date"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              className="bg-transparent w-full outline-none font-medium text-slate-700"
              required
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-xs font-bold text-slate-400 uppercase mb-1 ml-1">
            {tripType === "round-trip" ? "Return" : "Passengers"}
          </label>
          {tripType === "round-trip" ? (
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-blue-500 transition-colors">
              <Calendar className="w-5 h-5 text-blue-900 mr-3" />
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="bg-transparent w-full outline-none font-medium text-slate-700"
                required={tripType === "round-trip"}
              />
            </div>
          ) : (
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl p-3 focus-within:border-blue-500 transition-colors">
              <Users className="w-5 h-5 text-blue-900 mr-3" />
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="bg-transparent w-full outline-none font-medium text-slate-700"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} Passenger{n > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="md:col-span-2 lg:col-span-4 mt-4">
          <button
            type="submit"
            disabled={!from || !to || !departureDate}
            className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black text-xl tracking-tight hover:bg-orange-600 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-500 disabled:active:scale-100 transition-all shadow-xl shadow-orange-500/30 flex items-center justify-center gap-3 group"
          >
            <Search className="w-6 h-6 group-hover:scale-110 transition-transform" />
            SEARCH CHEAPEST FLIGHTS NOW
          </button>
        </div>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Only 3 seats left at this price</span>
        </div>
        <div className="flex items-center gap-2">
          <Plane className="w-4 h-4 text-blue-900" />
          <span>Compare 100+ Airlines</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-900" />
          <span>Multi-language Support</span>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
