import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { airlines } from "../data/mockData";
import { Plane, Info, Phone, CheckCircle, Luggage, UserCheck, Mail, ArrowLeft, Search, MapPin, Clock, Globe, ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import { useNotification } from "../context/NotificationContext";
import { motion, AnimatePresence } from "motion/react";

const LogoImage: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative bg-white flex items-center justify-center overflow-hidden border border-slate-100/50 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
          <RefreshCw className="w-8 h-8 text-orange-500 animate-spin opacity-50" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-contain p-4 ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const AirlineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const airline = airlines.find((a) => a.id === id);
  const { notify } = useNotification();
  const [isContactExpanded, setIsContactExpanded] = useState(false);

  if (!airline) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-4xl font-black text-blue-950 mb-4">Airline Not Found</h1>
        <Link to="/airlines" className="text-orange-500 font-bold hover:underline">
          Back to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/airlines" className="flex items-center gap-2 text-slate-500 font-bold mb-12 hover:text-blue-950 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Airlines
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-[50px] p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
              <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                <LogoImage
                  src={airline.logo}
                  alt={airline.name}
                  className="w-32 h-32 rounded-3xl object-cover shadow-xl"
                />
                <div className="text-center md:text-left">
                  <h1 className="text-5xl font-black tracking-tighter text-blue-950 mb-2 uppercase">
                    {airline.name}
                  </h1>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full font-black text-sm uppercase tracking-widest">
                      Code: {airline.code}
                    </span>
                    <span className="bg-green-100 text-green-600 px-4 py-1.5 rounded-full font-black text-sm uppercase tracking-widest">
                      {airline.country}
                    </span>
                    <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full font-black text-sm uppercase tracking-widest">
                      Verified Guide
                    </span>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
                <h2 className="text-3xl font-black text-blue-950 mb-6 uppercase">About {airline.name}</h2>
                <p className="mb-8">{airline.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100">
                    <div className="bg-orange-500 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
                      <Luggage className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-blue-950 mb-4 uppercase">Baggage Rules</h3>
                    <p className="text-sm leading-relaxed">{airline.baggageRules}</p>
                  </div>

                  <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100">
                    <div className="bg-blue-900 w-12 h-12 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20">
                      <UserCheck className="text-white w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black text-blue-950 mb-4 uppercase">Check-in Info</h3>
                    <p className="text-sm leading-relaxed">{airline.checkInInfo}</p>
                  </div>
                </div>

                <h2 className="text-3xl font-black text-blue-950 mb-6 uppercase">Traveler Guide</h2>
                <p className="mb-6">
                  Traveling with {airline.name} offers a unique experience. To ensure a smooth journey, we recommend reviewing their latest policies and preparing your travel documents in advance.
                </p>
                <ul className="space-y-4 mb-12">
                  {[
                    "Review baggage allowances to avoid extra fees.",
                    "Check for the latest travel advisories and entry requirements.",
                    "Ensure your travel documents are valid for your entire trip.",
                    "Explore the inflight services and amenities offered.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

            {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-xl font-black text-blue-950 mb-6 uppercase tracking-tight">Quick Facts</h3>
              <div className="space-y-6 mb-8">
                {airline.headquarters && (
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <MapPin className="w-5 h-5 text-blue-900" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-400 uppercase block mb-1 tracking-widest">Headquarters</span>
                      <span className="font-bold text-blue-950">{airline.headquarters}</span>
                    </div>
                  </div>
                )}
                {airline.fleetSize && (
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <Plane className="w-5 h-5 text-blue-900" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-400 uppercase block mb-1 tracking-widest">Fleet Size</span>
                      <span className="font-bold text-blue-950">{airline.fleetSize} Aircraft</span>
                    </div>
                  </div>
                )}
                {airline.foundingYear && (
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 p-3 rounded-xl">
                      <Clock className="w-5 h-5 text-blue-900" />
                    </div>
                    <div>
                      <span className="text-xs font-black text-slate-400 uppercase block mb-1 tracking-widest">Founded</span>
                      <span className="font-bold text-blue-950">{airline.foundingYear}</span>
                    </div>
                  </div>
                )}
              </div>

              <h3 className="text-xl font-black text-blue-950 mb-6 uppercase tracking-tight">Contact Details</h3>
              <div className="space-y-4">
                {/* Contact Items Accordion/List */}
                <div className="bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden">
                  {(() => {
                    const items = airline.contactDetails.split(/[;,]/).map(i => i.trim()).filter(Boolean);
                    const hasMultiple = items.length > 1;
                    
                    if (items.length === 0) return null;

                    return (
                      <>
                        <button 
                          onClick={() => hasMultiple && setIsContactExpanded(!isContactExpanded)}
                          disabled={!hasMultiple}
                          className={`w-full flex items-center justify-between p-4 text-left transition-colors ${hasMultiple ? 'hover:bg-slate-100 cursor-pointer' : 'cursor-default'}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="bg-white p-2 rounded-lg shadow-sm">
                              {items[0].includes('@') ? (
                                <Mail className="w-4 h-4 text-blue-900" />
                              ) : (
                                <Phone className="w-4 h-4 text-blue-900" />
                              )}
                            </div>
                            <div>
                              <span className="text-[10px] font-black text-slate-400 uppercase block tracking-widest leading-none mb-1">
                                {items[0].includes('@') ? 'Email' : 'Phone'}
                              </span>
                              <span className="font-bold text-blue-950 text-sm">{items[0]}</span>
                            </div>
                          </div>
                          {hasMultiple && (
                            <div className="text-blue-900">
                              {isContactExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </div>
                          )}
                        </button>

                        <AnimatePresence>
                          {isContactExpanded && hasMultiple && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <div className="px-4 pb-4 space-y-4 border-t border-slate-100 pt-4">
                                {items.slice(1).map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-3">
                                    <div className="bg-white p-2 rounded-lg shadow-sm">
                                      {item.includes('@') ? (
                                        <Mail className="w-4 h-4 text-blue-900" />
                                      ) : (
                                        <Phone className="w-4 h-4 text-blue-900" />
                                      )}
                                    </div>
                                    <div>
                                      <span className="text-[10px] font-black text-slate-400 uppercase block tracking-widest leading-none mb-1">
                                        {item.includes('@') ? 'Email' : 'Phone'}
                                      </span>
                                      <span className="font-bold text-blue-950 text-sm">{item}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    );
                  })()}
                </div>

                {airline.website && (
                  <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="bg-white p-3 rounded-xl shadow-sm">
                      <Globe className="w-5 h-5 text-blue-900" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase block mb-1 tracking-widest">Official Website</span>
                      <a 
                        href={airline.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-bold text-blue-600 hover:underline break-all text-sm"
                      >
                        {airline.website.replace('https://', '').replace('www.', '')}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <a 
                href={airline.website || `https://www.google.com/search?q=${encodeURIComponent(airline.name + ' official website')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black mt-8 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 uppercase tracking-widest text-xs flex items-center justify-center"
              >
                VISIT OFFICIAL SITE
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirlineDetail;
