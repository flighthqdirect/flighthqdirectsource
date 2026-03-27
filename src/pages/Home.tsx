import React from "react";
import { Link } from "react-router-dom";
import { Plane, Star, ArrowRight, ShieldCheck, Zap, Globe, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import SearchForm from "../components/SearchForm";
import { airlines, airports, routes, blogPosts } from "../data/mockData";

const Home: React.FC = () => {
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/travel-hero/1920/1080"
            alt="Travel Hero"
            className="w-full h-full object-cover brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 to-slate-50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]"
          >
            FIND CHEAP FLIGHTS <br />
            <span className="text-orange-500">INSTANTLY</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl font-medium text-blue-100 mb-8 max-w-2xl mx-auto"
          >
            Compare 100+ Airlines in Seconds. Book smarter, save more with FLIGHQDIRECT.
          </motion.p>
        </div>
      </section>

      {/* Search Form */}
      <div className="max-w-7xl mx-auto px-4">
        <SearchForm />
      </div>

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

      {/* Popular Routes */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-blue-950 mb-2 uppercase">Popular Routes</h2>
              <p className="text-slate-500">The most searched destinations this week</p>
            </div>
            <Link to="/routes" className="text-orange-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View All Routes <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route) => (
              <div key={route.id} className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-1 transition-all">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">From</span>
                    <span className="text-xl font-bold text-blue-950">{route.from.split(' (')[0]}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Plane className="w-6 h-6 text-orange-500 rotate-90" />
                    <div className="h-px w-12 bg-slate-200 my-2" />
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">To</span>
                    <span className="text-xl font-bold text-blue-950">{route.to.split(' (')[0]}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                  <div>
                    <span className="text-xs text-slate-400 block">Starting from</span>
                    <span className="text-2xl font-black text-orange-500">{route.priceRange.split(' - ')[0]}</span>
                  </div>
                  <button className="bg-blue-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-800 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Airlines */}
      <section className="py-20 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight mb-4 uppercase">Fly with the Best</h2>
            <p className="text-blue-200 max-w-2xl mx-auto">We partner with the world's leading airlines to bring you the best prices and most reliable service.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {airlines.map((airline) => (
              <Link key={airline.id} to={`/airlines/${airline.id}`} className="bg-white/5 p-8 rounded-3xl flex flex-col items-center group hover:bg-white/10 transition-all">
                <img src={airline.logo} alt={airline.name} className="w-16 h-16 rounded-2xl mb-4 grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
                <span className="font-bold text-sm text-blue-200 group-hover:text-white">{airline.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-blue-950 mb-2 uppercase">Travel Guides</h2>
              <p className="text-slate-500">Tips, tricks, and guides for your next adventure</p>
            </div>
            <Link to="/blog" className="text-orange-500 font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Read More <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group">
                <div className="bg-white rounded-[40px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row">
                  <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="md:w-1/2 p-8 flex flex-col justify-center">
                    <span className="text-orange-500 font-black text-xs uppercase tracking-widest mb-4">{post.date}</span>
                    <h3 className="text-2xl font-black text-blue-950 mb-4 leading-tight group-hover:text-orange-500 transition-colors">{post.title}</h3>
                    <p className="text-slate-500 mb-6 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-2 text-blue-900 font-bold">
                      Read Article <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-orange-500 rounded-[50px] p-12 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl" />
          
          <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">NEVER MISS A DEAL AGAIN</h2>
          <p className="text-xl text-orange-50 mb-10 max-w-xl mx-auto">Join 50,000+ travelers and get the cheapest flight alerts directly in your inbox.</p>
          
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white text-slate-900 px-8 py-4 rounded-2xl font-medium outline-none"
            />
            <button className="bg-blue-950 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-900 transition-all shadow-xl">
              SUBSCRIBE
            </button>
          </form>
          <p className="mt-6 text-sm text-orange-100">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
