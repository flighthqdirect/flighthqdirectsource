import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Plane, Star, ArrowRight, ShieldCheck, Zap, Globe, TrendingUp, CheckCircle, Search } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const LandingPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { notify } = useNotification();
  const navigate = useNavigate();
  
  const handleBookNow = (from: string, to: string) => {
    notify(`Checking latest prices for ${from} to ${to}...`, "info");
  };

  const handleSearchAll = () => {
    notify("Searching all available flights for you...", "info");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Mock landing page data based on slug
  const landingData = {
    "cheap-flights-malaysia": {
      title: "MALAYSIA TRAVEL GUIDE",
      sub: "Discover the best routes, airline insights, and travel tips for your next trip to Malaysia.",
      heroImg: "https://picsum.photos/seed/malaysia/1920/1080",
      deals: [
        { from: "KL", to: "Singapore", price: "RM 150" },
        { from: "KL", to: "Bangkok", price: "RM 250" },
        { from: "Penang", to: "Singapore", price: "RM 180" },
      ]
    },
    "last-minute-flights-asia": {
      title: "ASIA TRAVEL INSIGHTS",
      sub: "Comprehensive guides and expert tools for navigating the best travel options across Asia.",
      heroImg: "https://picsum.photos/seed/asia/1920/1080",
      deals: [
        { from: "KL", to: "Tokyo", price: "RM 1,200" },
        { from: "Singapore", to: "Bali", price: "RM 350" },
        { from: "Bangkok", to: "Seoul", price: "RM 850" },
      ]
    }
  }[slug || "cheap-flights-malaysia"] || {
    title: "MALAYSIA TRAVEL GUIDE",
    sub: "Discover the best routes, airline insights, and travel tips for your next trip to Malaysia.",
    heroImg: "https://picsum.photos/seed/malaysia/1920/1080",
    deals: [
      { from: "KL", to: "Singapore", price: "RM 150" },
      { from: "KL", to: "Bangkok", price: "RM 250" },
      { from: "Penang", to: "Singapore", price: "RM 180" },
    ]
  };

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={landingData.heroImg}
            alt="Travel Hero"
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 to-slate-50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9] uppercase">
            {landingData.title}
          </h1>
          <p className="text-xl md:text-2xl font-medium text-blue-100 mb-8 max-w-2xl mx-auto">
            {landingData.sub}
          </p>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, label: "Secure Booking", sub: "100% Safe Payments" },
              { icon: Zap, label: "Fast Results", sub: "Search in Seconds" },
              { icon: Globe, label: "Global Coverage", sub: "100+ Airlines" },
              { icon: TrendingUp, label: "Price Alerts", sub: "Never Miss a Deal" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="bg-blue-50 p-4 rounded-2xl mb-4 group-hover:bg-blue-100 transition-colors">
                  <item.icon className="w-8 h-8 text-blue-900" />
                </div>
                <h3 className="font-bold text-lg">{item.label}</h3>
                <p className="text-slate-500 text-sm">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Comparison Table */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-[50px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100">
            <div className="bg-blue-950 p-10 text-white text-center">
              <h2 className="text-3xl font-black tracking-tight mb-2 uppercase">Today's Lowest Prices</h2>
              <p className="text-blue-200">Real-time prices from 100+ airlines</p>
            </div>
            <div className="p-10">
              <div className="space-y-6">
                {landingData.deals.map((deal, i) => (
                  <div key={i} className="flex flex-col md:flex-row items-center justify-between p-8 bg-slate-50 rounded-[40px] border border-slate-100 group hover:border-orange-500 transition-all">
                    <div className="flex items-center gap-8 mb-6 md:mb-0">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">From</span>
                        <span className="text-2xl font-black text-blue-950">{deal.from}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Plane className="w-5 h-5 text-orange-500 rotate-90" />
                        <div className="h-px w-12 bg-slate-200 my-2" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">To</span>
                        <span className="text-2xl font-black text-blue-950">{deal.to}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Estimated Price</span>
                        <span className="text-3xl font-black text-orange-500">{deal.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <p className="text-slate-500 text-sm mb-6 flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Prices based on recent historical data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight text-blue-950 mb-4 uppercase">Trusted by 1M+ Travelers</h2>
            <div className="flex justify-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-6 h-6 text-orange-500 fill-orange-500" />
              ))}
            </div>
            <p className="text-slate-500">Rated 4.9/5 based on 10,000+ reviews</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "John D.", text: "Found a flight to Tokyo for half the price I saw elsewhere. Incredible service!", city: "Kuala Lumpur" },
              { name: "Sarah L.", text: "The baggage rules guide was a lifesaver. Saved me from extra fees at the airport.", city: "Singapore" },
              { name: "Michael T.", text: "Fast, clean interface. My go-to site for all my business travel now.", city: "Bangkok" },
            ].map((review, i) => (
              <div key={i} className="bg-white p-10 rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-100">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-orange-500 fill-orange-500" />
                  ))}
                </div>
                <p className="text-slate-600 mb-8 font-medium leading-relaxed italic">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center font-black text-blue-900">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950">{review.name}</h4>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{review.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
