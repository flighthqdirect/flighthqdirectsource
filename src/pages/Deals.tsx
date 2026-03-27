import React from "react";
import { Link } from "react-router-dom";
import { Plane, Star, ArrowRight, ShieldCheck, Zap, Globe, TrendingUp, CheckCircle, Search, Clock, Tag } from "lucide-react";
import SearchForm from "../components/SearchForm";

const Deals: React.FC = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-black tracking-tighter text-blue-950 mb-4 uppercase">Exclusive Flight Deals</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Hand-picked deals for the budget-conscious traveler. Save up to 50% on your next flight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { from: "Kuala Lumpur", to: "Singapore", price: "RM 150", airline: "AirAsia", expires: "2 Days Left" },
            { from: "Penang", to: "Bangkok", price: "RM 250", airline: "Thai Airways", expires: "5 Days Left" },
            { from: "Kuala Lumpur", to: "Tokyo", price: "RM 1,200", airline: "Malaysia Airlines", expires: "1 Day Left" },
            { from: "Singapore", to: "Bali", price: "RM 350", airline: "Jetstar", expires: "3 Days Left" },
            { from: "Bangkok", to: "Seoul", price: "RM 850", airline: "Korean Air", expires: "4 Days Left" },
            { from: "KL", to: "London", price: "RM 2,800", airline: "Qatar Airways", expires: "6 Days Left" },
          ].map((deal, i) => (
            <div
              key={i}
              className="bg-white rounded-[50px] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-8 py-2 rounded-bl-[30px] font-black text-xs uppercase tracking-widest shadow-xl">
                {deal.expires}
              </div>

              <div className="flex justify-between items-center mb-10">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">From</span>
                  <span className="text-2xl font-black text-blue-950">{deal.from}</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="bg-blue-50 p-2 rounded-xl">
                    <Plane className="w-5 h-5 text-blue-900 rotate-90" />
                  </div>
                  <div className="h-px w-12 bg-slate-200 my-3" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">To</span>
                  <span className="text-2xl font-black text-blue-950">{deal.to}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-10">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <Tag className="w-5 h-5 text-orange-500" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Airline</span>
                  <span className="font-bold text-blue-950">{deal.airline}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                <div>
                  <span className="text-xs text-slate-400 block font-bold uppercase tracking-widest mb-1">Price</span>
                  <span className="text-3xl font-black text-orange-500">{deal.price}</span>
                </div>
                <button className="bg-blue-950 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-900 transition-all shadow-xl shadow-blue-950/20">
                  BOOK NOW
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-blue-950 rounded-[60px] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">WANT EVEN LOWER PRICES?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-xl mx-auto">Our members get access to secret deals not available to the public. Join for free today.</p>
          
          <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white text-slate-900 px-8 py-4 rounded-2xl font-medium outline-none"
            />
            <button className="bg-orange-500 text-white px-10 py-4 rounded-2xl font-black hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/30">
              JOIN NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deals;
