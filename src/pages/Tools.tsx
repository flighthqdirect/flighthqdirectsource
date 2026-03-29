import React, { useState } from "react";
import { Luggage, Calculator, ShieldCheck, Info, ArrowRight, CheckCircle, AlertCircle, RefreshCw, Plane, MapPin, Clock as ClockIcon, Search } from "lucide-react";
import { useNotification } from "../context/NotificationContext";
import CurrencyConverter from "../components/CurrencyConverter";
import { getLiveFlightStatus, LiveFlightInfo } from "../services/flightService";
import { motion, AnimatePresence } from "motion/react";

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const Tools: React.FC = () => {
  const { notify } = useNotification();
  const [baggageWeight, setBaggageWeight] = useState<number>(20);
  const [airlineType, setAirlineType] = useState<string>("full-service");
  const [estimatedFee, setEstimatedFee] = useState<number | null>(null);

  // Compensation Checker State
  const [flightNumber, setFlightNumber] = useState("");
  const [delayHours, setDelayHours] = useState<number>(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [compensationEligible, setCompensationEligible] = useState<boolean | null>(null);

  // Live Flight Tracker State
  const [trackFlightNumber, setTrackFlightNumber] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [flightInfo, setFlightInfo] = useState<LiveFlightInfo | null>(null);

  const calculateBaggageFee = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Calculating baggage fee...", { baggageWeight, airlineType });
    
    // Simple mock calculation
    let basePrice = airlineType === "low-cost" ? 50 : 0;
    let allowance = airlineType === "low-cost" ? 7 : 23;
    let excessWeight = Math.max(0, baggageWeight - allowance);
    let excessFee = excessWeight * 15;
    
    const total = basePrice + excessFee;
    console.log("Calculation result:", total);
    
    setEstimatedFee(total);
    notify(`Baggage fee calculated: $${total}`, "success");
  };

  const checkCompensation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flightNumber) {
      notify("Please enter your flight number to check eligibility.", "error");
      return;
    }

    setIsAnalyzing(true);
    setCompensationEligible(null);

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      const isEligible = delayHours >= 3;
      setCompensationEligible(isEligible);
      
      if (isEligible) {
        notify("Analysis complete: You are likely eligible for compensation!", "success");
      } else {
        notify("Analysis complete: Delay duration is below the standard compensation threshold.", "info");
      }
    }, 1500);
  };

  const handleTrackFlight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackFlightNumber) {
      notify("Please enter a flight number to track.", "error");
      return;
    }

    setIsTracking(true);
    setFlightInfo(null);
    try {
      const info = await getLiveFlightStatus(trackFlightNumber);
      if (info) {
        setFlightInfo(info);
        notify(`Live status for ${trackFlightNumber} retrieved.`, "success");
      } else {
        notify("Could not find live data for this flight. Please check the number.", "info");
      }
    } catch (error: any) {
      console.error("Error fetching flight status:", error);
      notify("Error fetching flight status.", "error");
    } finally {
      setIsTracking(false);
    }
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-20 text-center">
          <h1 className="text-6xl font-black tracking-tighter text-blue-950 mb-6 uppercase">
            Travel <span className="text-orange-500">Tools</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Exclusive high-value tools designed to help you plan your trip with precision and save money on every booking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Live Flight Tracker */}
          <div className="bg-white rounded-[60px] p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 lg:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20">
                  <Plane className="text-white w-7 h-7" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-blue-950 uppercase tracking-tight">Live Flight Tracker</h2>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Real-time status, gates, and delays</p>
                </div>
              </div>
              
              <form onSubmit={handleTrackFlight} className="flex flex-col md:flex-row gap-4 flex-1 max-w-xl">
                <input
                  type="text"
                  placeholder="Enter Flight Number (e.g. MH123)"
                  value={trackFlightNumber}
                  onChange={(e) => setTrackFlightNumber(e.target.value.toUpperCase())}
                  className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-blue-950 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold"
                />
                <button
                  type="submit"
                  disabled={isTracking}
                  className="bg-blue-950 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-900 disabled:opacity-50 transition-all shadow-xl shadow-blue-950/20 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  {isTracking ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                  {isTracking ? "Tracking..." : "Track Flight"}
                </button>
              </form>
            </div>

            <AnimatePresence mode="wait">
              {flightInfo && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-slate-50 rounded-[40px] p-8 md:p-12 border border-slate-100"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-6 mb-10">
                        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Airline</div>
                          <div className="text-2xl font-black text-blue-950">{flightInfo.airline}</div>
                        </div>
                        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Flight</div>
                          <div className="text-2xl font-black text-blue-950">{flightInfo.flightNumber}</div>
                        </div>
                        <div className={`px-6 py-3 rounded-full font-black text-xs uppercase tracking-widest ml-auto ${
                          flightInfo.status.toLowerCase().includes('delayed') ? 'bg-red-100 text-red-600' : 
                          flightInfo.status.toLowerCase().includes('landed') ? 'bg-blue-100 text-blue-600' : 
                          'bg-green-100 text-green-600'
                        }`}>
                          {flightInfo.status}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-8 relative">
                        <div className="flex-1">
                          <div className="text-5xl font-black text-blue-950 mb-2">{flightInfo.departureTime}</div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Scheduled Departure</div>
                        </div>
                        
                        <div className="flex flex-col items-center px-8">
                          <Plane className="w-8 h-8 text-orange-500 rotate-90 mb-4" />
                          <div className="w-32 h-px bg-slate-200 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-orange-500 rounded-full" />
                          </div>
                        </div>

                        <div className="flex-1 text-right">
                          <div className="text-5xl font-black text-blue-950 mb-2">{flightInfo.arrivalTime}</div>
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Scheduled Arrival</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-50 p-2 rounded-xl">
                            <MapPin className="w-4 h-4 text-blue-900" />
                          </div>
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Terminal / Gate</span>
                        </div>
                        <span className="text-lg font-black text-blue-950">{flightInfo.terminal || 'N/A'} / {flightInfo.gate || 'N/A'}</span>
                      </div>
                      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-50 p-2 rounded-xl">
                            <ClockIcon className="w-4 h-4 text-orange-500" />
                          </div>
                          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Delay Status</span>
                        </div>
                        <span className={`text-lg font-black ${flightInfo.delay && flightInfo.delay !== 'None' ? 'text-red-500' : 'text-green-500'}`}>
                          {flightInfo.delay || 'On Time'}
                        </span>
                      </div>
                      <div className="bg-blue-950 p-6 rounded-3xl shadow-xl text-white">
                        <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Live Update</div>
                        <p className="text-xs leading-relaxed opacity-80">Data synchronized with global aviation networks. Last verified just now.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Baggage Fee Calculator */}
          <div className="bg-white rounded-[60px] p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-blue-950 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-950/20">
                <Luggage className="text-white w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-blue-950 uppercase tracking-tight">Baggage Fee Calculator</h2>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Estimate your extra costs</p>
              </div>
            </div>

            <form onSubmit={calculateBaggageFee} className="space-y-8">
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Airline Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setAirlineType("full-service")}
                    className={`py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${airlineType === "full-service" ? "bg-blue-950 text-white shadow-xl" : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`}
                  >
                    Full Service
                  </button>
                  <button
                    type="button"
                    onClick={() => setAirlineType("low-cost")}
                    className={`py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${airlineType === "low-cost" ? "bg-orange-500 text-white shadow-xl" : "bg-slate-50 text-slate-400 hover:bg-slate-100"}`}
                  >
                    Low Cost
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Total Weight (kg)</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={baggageWeight}
                  onChange={(e) => setBaggageWeight(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between mt-4">
                  <span className="text-2xl font-black text-blue-950">{baggageWeight} kg</span>
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Max 50kg</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-950 text-white py-5 rounded-2xl font-black hover:bg-blue-900 transition-all shadow-2xl shadow-blue-950/30 uppercase tracking-widest text-xs"
              >
                Calculate Estimated Fee
              </button>
            </form>

            {estimatedFee !== null && (
              <div className="mt-10 p-8 bg-green-50 rounded-[40px] border border-green-100 text-center">
                <div className="text-xs font-black text-green-600 uppercase tracking-widest mb-2">Estimated Fee</div>
                <div className="text-5xl font-black text-blue-950 tracking-tighter">${estimatedFee}</div>
                <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                  *Based on industry averages for {airlineType} carriers. Actual fees may vary by airline and route.
                </p>
              </div>
            )}
          </div>

          {/* Flight Delay Compensation */}
          <div className="bg-blue-950 rounded-[60px] p-12 text-white shadow-2xl shadow-blue-950/20 flex flex-col">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20">
                <ShieldCheck className="text-white w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tight">Compensation Checker</h2>
                <p className="text-blue-300 font-bold text-xs uppercase tracking-widest mt-1">Know your rights as a traveler</p>
              </div>
            </div>

            <form onSubmit={checkCompensation} className="space-y-6">
              <div>
                <label className="block text-xs font-black text-blue-300 uppercase tracking-widest mb-3">Flight Number</label>
                <input
                  type="text"
                  placeholder="e.g. BA123"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                  className="w-full bg-blue-900/50 border border-blue-800 rounded-2xl py-4 px-6 text-white placeholder:text-blue-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-blue-300 uppercase tracking-widest mb-3">Delay Duration (Hours)</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="12"
                    step="0.5"
                    value={delayHours}
                    onChange={(e) => setDelayHours(parseFloat(e.target.value))}
                    className="flex-1 h-2 bg-blue-900 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <span className="text-xl font-black min-w-[60px] text-right">{delayHours}h</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="w-full bg-orange-500 text-white py-5 rounded-2xl font-black hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-2xl shadow-orange-500/30 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    Check My Eligibility <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {compensationEligible !== null && !isAnalyzing && (
              <div className={`mt-8 p-6 rounded-3xl border ${compensationEligible ? "bg-green-500/10 border-green-500/20" : "bg-blue-900/50 border-blue-800"}`}>
                <div className="flex items-start gap-4">
                  {compensationEligible ? (
                    <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-blue-400 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-black uppercase tracking-tight text-lg">
                      {compensationEligible ? "Likely Eligible!" : "Not Eligible"}
                    </h4>
                    <p className="text-sm text-blue-200 mt-1 leading-relaxed">
                      {compensationEligible 
                        ? `Based on a ${delayHours}h delay for ${flightNumber}, you could be entitled to up to $600 in compensation under EU261 regulations.`
                        : `A ${delayHours}h delay typically doesn't meet the minimum 3-hour threshold for standard compensation, but you may still be entitled to care and assistance.`}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t border-blue-900/50">
              <p className="text-blue-300 text-xs leading-relaxed italic opacity-70">
                *This tool provides an estimate based on EU Regulation 261/2004. Actual eligibility depends on the specific circumstances of the delay (e.g. extraordinary circumstances).
              </p>
            </div>
          </div>

          {/* Currency Converter */}
          <div className="bg-white rounded-[60px] p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 lg:col-span-2">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/20">
                <RefreshCw className="text-white w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-blue-950 uppercase tracking-tight">Global Currency Converter</h2>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Live exchange rates for 100+ currencies</p>
              </div>
            </div>
            
            <CurrencyConverter />
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-20 bg-white rounded-[60px] p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center">
              <Info className="w-6 h-6 text-blue-950" />
            </div>
            <h3 className="text-2xl font-black text-blue-950 uppercase">Why use our tools?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-lg font-black text-blue-950 mb-4 uppercase tracking-tight">Accuracy</h4>
              <p className="text-slate-500 leading-relaxed">
                Our tools are updated daily with the latest airline policies and legal regulations to ensure maximum accuracy.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-black text-blue-950 mb-4 uppercase tracking-tight">Privacy</h4>
              <p className="text-slate-500 leading-relaxed">
                We don't store your personal data. All calculations are performed locally on your device for your security.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-black text-blue-950 mb-4 uppercase tracking-tight">Free Forever</h4>
              <p className="text-slate-500 leading-relaxed">
                Our mission is to empower travelers. All our high-value tools are completely free to use, always.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
