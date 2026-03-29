import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plane, Star, ArrowRight, ShieldCheck, Zap, Globe, TrendingUp, Luggage, Calculator, MapPin, Clock, Award, CheckCircle, Search, Calendar, Users } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { airlines, airports, routes, blogPosts } from "../data/mockData";
import { useNotification } from "../context/NotificationContext";

const Home: React.FC = () => {
  const { notify } = useNotification();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 200]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchFrom && !searchTo) {
      notify("Please enter at least one search criteria.", "info");
      return;
    }
    navigate(`/search?from=${encodeURIComponent(searchFrom)}&to=${encodeURIComponent(searchTo)}`);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      notify("Please enter a valid email address.", "info");
      return;
    }
    notify("Thank you for subscribing! Check your inbox for deals.", "success");
    setEmail("");
  };

  // Get some trending airports
  const trendingAirports = airports.slice(0, 4);
  // Get some featured routes
  const featuredRoutes = routes.slice(0, 3);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            style={{ y }}
            src="https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&q=80&w=1920"
            alt="Travel Hero"
            className="w-full h-[120%] object-cover brightness-[0.4] absolute top-0 left-0"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-950/40 to-slate-50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block bg-orange-500/20 backdrop-blur-md border border-orange-500/30 px-6 py-2 rounded-full mb-8"
          >
            <span className="text-orange-500 font-black text-xs uppercase tracking-[0.3em]">Global Aviation Insights</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.85]"
          >
            NAVIGATE THE <br />
            <span className="text-orange-500">GLOBAL SKIES</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-medium text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Your definitive resource for airline directories, airport guides, and smart travel insights tools.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <form 
              onSubmit={handleSearch}
              className="bg-white p-4 rounded-[40px] shadow-2xl flex flex-col lg:flex-row items-center gap-4"
            >
              <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="From where? (e.g. KUL)"
                    value={searchFrom}
                    onChange={(e) => setSearchFrom(e.target.value)}
                    className="w-full bg-slate-50 text-blue-950 px-14 py-5 rounded-[30px] font-bold outline-none placeholder:text-slate-400 border border-slate-200 focus:border-orange-500 focus:bg-white transition-all shadow-inner"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="To where? (e.g. SIN)"
                    value={searchTo}
                    onChange={(e) => setSearchTo(e.target.value)}
                    className="w-full bg-slate-50 text-blue-950 px-14 py-5 rounded-[30px] font-bold outline-none placeholder:text-slate-400 border border-slate-200 focus:border-orange-500 focus:bg-white transition-all shadow-inner"
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <input 
                    type="date" 
                    className="w-full bg-slate-50 text-blue-950 px-14 py-5 rounded-[30px] font-bold outline-none placeholder:text-slate-400 border border-slate-200 focus:border-orange-500 focus:bg-white transition-all shadow-inner"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-orange-500 transition-colors">
                    <Users className="w-5 h-5" />
                  </div>
                  <select 
                    className="w-full bg-slate-50 text-blue-950 px-14 py-5 rounded-[30px] font-bold outline-none placeholder:text-slate-400 border border-slate-200 focus:border-orange-500 focus:bg-white transition-all shadow-inner appearance-none"
                    defaultValue="1"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                      <option key={num} value={num}>{num} Passenger{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <button 
                type="submit"
                className="w-full lg:w-auto bg-orange-500 text-white px-12 py-5 rounded-[30px] font-black hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 uppercase tracking-widest text-xs flex items-center justify-center gap-3"
              >
                <Search className="w-4 h-4" /> Get Real-Time Insights
              </button>
            </form>
            
            <div className="mt-8 flex flex-wrap justify-center gap-8">
              <Link to="/tools" className="text-white/60 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 transition-colors">
                <Plane className="w-4 h-4 text-orange-500" /> Live Flight Tracker
              </Link>
              <Link to="/airlines" className="text-white/60 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 transition-colors">
                <Globe className="w-4 h-4 text-orange-500" /> Explore Airlines
              </Link>
              <Link to="/airports" className="text-white/60 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 transition-colors">
                <MapPin className="w-4 h-4 text-orange-500" /> Airport Guides
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Elements */}
      <section className="py-20 bg-white relative -mt-20 z-20 max-w-6xl mx-auto rounded-[40px] shadow-2xl shadow-blue-900/10 border border-slate-100">
        <div className="px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: ShieldCheck, label: "Verified Data", sub: "Direct from Carriers" },
              { icon: Zap, label: "Live Updates", sub: "Real-time Insights" },
              { icon: Globe, label: "Global Reach", sub: "100+ Major Hubs" },
              { icon: TrendingUp, label: "Price Trends", sub: "Smart Fare Analysis" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-slate-100">
                  <item.icon className="w-8 h-8 text-blue-950" />
                </div>
                <h3 className="font-black text-blue-950 uppercase tracking-tight mb-1">{item.label}</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-black text-blue-950 mb-6 uppercase tracking-tighter leading-none">
                TRENDING <span className="text-orange-500">DESTINATIONS</span>
              </h2>
              <p className="text-xl text-slate-500 leading-relaxed">
                Explore the world's most visited hubs. Get detailed guides on facilities, transport, and expert travel tips for each airport.
              </p>
            </div>
            <Link to="/airports" className="bg-blue-950 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-900 transition-all uppercase tracking-widest text-xs flex items-center gap-3">
              View All Airports <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingAirports.map((airport) => (
              <Link key={airport.id} to={`/airports/${airport.id}`} className="group">
                <div className="bg-white rounded-[40px] overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100 h-full flex flex-col">
                  <div className="h-64 overflow-hidden relative">
                    <img
                      src={`https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=800&seed=${airport.code}`}
                      alt={airport.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl font-black text-blue-950 text-sm shadow-lg">
                      {airport.code}
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-orange-500 font-black text-xs uppercase tracking-widest mb-4">
                      <MapPin className="w-3 h-3" /> {airport.city}, {airport.country}
                    </div>
                    <h3 className="text-2xl font-black text-blue-950 mb-4 leading-tight group-hover:text-orange-500 transition-colors">{airport.name}</h3>
                    <p className="text-slate-500 text-sm line-clamp-2 mb-6">{airport.tips}</p>
                    <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-blue-950 font-black text-xs uppercase tracking-widest">Guide Available</span>
                      <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-orange-500 transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Flight Insights Section */}
      <section className="py-24 bg-blue-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-orange-500/5 skew-x-12 translate-x-1/4" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-block bg-orange-500 px-4 py-1 rounded-lg mb-6">
                <span className="text-white font-black text-xs uppercase tracking-widest">Market Insights</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-8 uppercase tracking-tighter leading-[0.9]">
                FLIGHT MARKET <br />
                <span className="text-orange-500">INSIGHTS</span>
              </h2>
              <p className="text-xl text-blue-200 mb-12 leading-relaxed max-w-xl">
                We analyze thousands of routes to bring you the most accurate price ranges and the best times to fly. Stay ahead with our data-driven insights.
              </p>
              
              <div className="space-y-6 mb-12">
                {featuredRoutes.map((route) => (
                  <div key={route.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-black text-white">{route.from}</div>
                        <div className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Origin</div>
                      </div>
                      <div className="flex flex-col items-center">
                        <Plane className="w-5 h-5 text-orange-500 rotate-90 mb-1" />
                        <div className="w-12 h-[1px] bg-white/20" />
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-black text-white">{route.to}</div>
                        <div className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Destination</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-orange-500 font-black text-lg">{route.priceRange}</div>
                      <div className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Avg. Price</div>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/tools" className="inline-flex items-center gap-3 text-orange-500 font-black uppercase tracking-[0.2em] text-sm hover:gap-5 transition-all">
                Explore All Insights <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6 pt-12">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[40px]">
                    <Clock className="w-10 h-10 text-orange-500 mb-6" />
                    <h3 className="text-xl font-black uppercase mb-2">Best Time</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">Historical data analysis to find the cheapest windows for your journey.</p>
                  </div>
                  <div className="bg-orange-500 p-8 rounded-[40px] shadow-2xl shadow-orange-500/20">
                    <Award className="w-10 h-10 text-white mb-6" />
                    <h3 className="text-xl font-black uppercase mb-2">Top Rated</h3>
                    <p className="text-orange-50 text-sm leading-relaxed">Only the highest-rated carriers and routes based on user feedback.</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-[40px] text-blue-950 shadow-2xl">
                    <Calculator className="w-10 h-10 text-blue-900 mb-6" />
                    <h3 className="text-xl font-black uppercase mb-2">Smart Tools</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">Baggage calculators and compensation checkers built for you.</p>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[40px]">
                    <Globe className="w-10 h-10 text-orange-500 mb-6" />
                    <h3 className="text-xl font-black uppercase mb-2">Global Data</h3>
                    <p className="text-blue-200 text-sm leading-relaxed">Comprehensive coverage across all continents and major alliances.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Airlines */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black tracking-tight mb-4 uppercase text-blue-950">Global Airline Partners</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-16">We maintain direct insights on 100+ global carriers to ensure you have the most accurate policy information.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {airlines.slice(0, 16).map((airline) => (
              <Link key={airline.id} to={`/airlines/${airline.id}`} className="bg-white p-6 rounded-3xl flex flex-col items-center group hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-100">
                <img src={airline.logo} alt={airline.name} className="w-12 h-12 rounded-xl mb-4 grayscale group-hover:grayscale-0 transition-all object-contain" referrerPolicy="no-referrer" />
                <span className="font-black text-[10px] text-slate-400 uppercase tracking-widest group-hover:text-blue-950 transition-colors">{airline.code}</span>
              </Link>
            ))}
          </div>
          
          <div className="mt-16">
            <Link to="/airlines" className="inline-flex items-center gap-3 bg-white border border-slate-200 text-blue-950 px-10 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all uppercase tracking-widest text-xs">
              Browse Full Directory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-5xl font-black tracking-tighter text-blue-950 mb-4 uppercase leading-none">TRAVEL <span className="text-orange-500">INSIGHTS</span></h2>
              <p className="text-xl text-slate-500">Expert guides and industry insights for the modern traveler.</p>
            </div>
            <Link to="/blog" className="text-orange-500 font-black flex items-center gap-3 hover:gap-5 transition-all uppercase tracking-widest text-xs">
              Read All Articles <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {blogPosts.slice(0, 3).map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 h-full flex flex-col">
                  <div className="h-64 overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-10 flex-1 flex flex-col">
                    <span className="text-orange-500 font-black text-[10px] uppercase tracking-[0.3em] mb-6">{post.date}</span>
                    <h3 className="text-2xl font-black text-blue-950 mb-6 leading-tight group-hover:text-orange-500 transition-colors">{post.title}</h3>
                    <p className="text-slate-500 mb-8 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                    <div className="mt-auto flex items-center gap-3 text-blue-900 font-black uppercase tracking-widest text-xs">
                      Full Article <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto bg-orange-500 rounded-[60px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-orange-500/30">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-[0.9]">STAY AHEAD OF <br /> THE CURVE</h2>
            <p className="text-xl md:text-2xl text-orange-50 mb-12 max-w-2xl mx-auto leading-relaxed">Join 50,000+ travelers receiving weekly aviation insights and exclusive travel deals.</p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white text-slate-900 px-8 py-5 rounded-2xl font-bold outline-none placeholder:text-slate-300"
              />
              <button type="submit" className="bg-blue-950 text-white px-12 py-5 rounded-2xl font-black hover:bg-blue-900 transition-all shadow-2xl uppercase tracking-widest text-xs">
                Subscribe
              </button>
            </form>
            <div className="mt-10 flex items-center justify-center gap-6 text-orange-100">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">No Spam</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">Expert Content</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
