import React from "react";
import { useParams, Link } from "react-router-dom";
import { airlines } from "../data/mockData";
import { Plane, Info, Phone, CheckCircle, Luggage, UserCheck, Mail, ArrowLeft, Search } from "lucide-react";
import SearchForm from "../components/SearchForm";

const AirlineDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const airline = airlines.find((a) => a.id === id);

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
                <img
                  src={airline.logo}
                  alt={airline.name}
                  className="w-32 h-32 rounded-[40px] object-cover shadow-xl"
                  referrerPolicy="no-referrer"
                />
                <div className="text-center md:text-left">
                  <h1 className="text-5xl font-black tracking-tighter text-blue-950 mb-2 uppercase">
                    {airline.name}
                  </h1>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <span className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full font-black text-sm uppercase tracking-widest">
                      Code: {airline.code}
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

                <h2 className="text-3xl font-black text-blue-950 mb-6 uppercase">Booking Guide</h2>
                <p className="mb-6">
                  Booking a flight with {airline.name} is straightforward. You can book directly through their website, mobile app, or via our comparison engine to find the best deals across multiple dates.
                </p>
                <ul className="space-y-4 mb-12">
                  {[
                    "Compare prices across different dates for the best value.",
                    "Check for ongoing promotions and seasonal discounts.",
                    "Ensure your passport is valid for at least 6 months.",
                    "Select your preferred seat during the booking process.",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sticky Search Bar for this Airline */}
            <div className="bg-blue-950 rounded-[50px] p-12 text-white shadow-2xl shadow-blue-950/20">
              <h2 className="text-3xl font-black mb-8 uppercase text-center">Search {airline.name} Flights</h2>
              <SearchForm />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-xl font-black text-blue-950 mb-6 uppercase">Contact Details</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <Phone className="w-5 h-5 text-blue-900" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Phone</span>
                    <span className="font-bold text-blue-950">{airline.contactDetails}</span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <Mail className="w-5 h-5 text-blue-900" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Email Support</span>
                    <span className="font-bold text-blue-950">support@{airline.id}.com</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black mt-8 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20">
                VISIT OFFICIAL SITE
              </button>
            </div>

            <div className="bg-orange-500 rounded-[40px] p-8 text-white shadow-2xl shadow-orange-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <h3 className="text-xl font-black mb-4 uppercase">Exclusive {airline.code} Deals</h3>
              <p className="text-orange-50 mb-6 text-sm leading-relaxed">
                Get up to 30% off on {airline.name} flights when you book through FLIGHQDIRECT this month.
              </p>
              <button className="w-full bg-blue-950 text-white py-4 rounded-2xl font-black hover:bg-blue-900 transition-all">
                CLAIM DISCOUNT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirlineDetail;
