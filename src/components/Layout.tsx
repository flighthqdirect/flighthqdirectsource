import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Plane, Menu, X, RefreshCw, MapPin, Calculator, FileText, Info, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNotification } from "../context/NotificationContext";
import CurrencyModal from "./CurrencyModal";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { notify } = useNotification();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-orange-500 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-orange-500/20">
                <Plane className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className={`text-2xl font-black tracking-tighter transition-colors ${isScrolled ? "text-blue-950" : "text-white"}`}>
                  FlightHQ
                </span>
                <span className="text-[10px] font-black tracking-[0.4em] text-orange-500 uppercase leading-none">
                  Direct
                </span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {["Airlines", "Airports", "Tools", "Blog", "About"].map((item) => (
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  className={`font-medium hover:text-orange-500 transition-colors ${
                    isScrolled ? "text-slate-600" : "text-white"
                  }`}
                >
                  {item}
                </Link>
              ))}
              <button
                onClick={() => setIsCurrencyModalOpen(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
                  isScrolled ? "bg-slate-50 text-blue-950 hover:bg-slate-100" : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md"
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>Currency</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className={`md:hidden p-2 transition-colors relative z-50 ${isScrolled || isMenuOpen ? "text-blue-950" : "text-white"}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="fixed inset-0 bg-blue-950/40 backdrop-blur-sm z-[60] md:hidden"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-[70] md:hidden shadow-2xl flex flex-col"
              >
                <div className="p-6 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-500/20">
                      <Plane className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-black tracking-tighter text-blue-950 uppercase">Menu</span>
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 bg-white rounded-xl text-slate-400 hover:text-blue-950 transition-all border border-slate-100 shadow-sm"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-8 space-y-2">
                  {[
                    { name: "Airlines", icon: Plane, path: "/airlines" },
                    { name: "Airports", icon: MapPin, path: "/airports" },
                    { name: "Tools", icon: Calculator, path: "/tools" },
                    { name: "Blog", icon: FileText, path: "/blog" },
                    { name: "About", icon: Info, path: "/about" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ 
                        type: "spring",
                        damping: 25,
                        stiffness: 200,
                        delay: isMenuOpen ? index * 0.08 + 0.1 : 0
                      }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
                          location.pathname === item.path
                            ? "bg-blue-50 text-blue-950 shadow-sm"
                            : "text-slate-600 hover:bg-slate-50 hover:text-blue-950"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2.5 rounded-xl transition-colors ${
                            location.pathname === item.path ? "bg-white shadow-sm" : "bg-slate-100"
                          }`}>
                            <item.icon className={`w-5 h-5 ${
                              location.pathname === item.path ? "text-orange-500" : "text-slate-400"
                            }`} />
                          </div>
                          <span className="font-bold tracking-tight text-lg">{item.name}</span>
                        </div>
                        <ChevronRight className={`w-5 h-5 transition-transform ${
                          location.pathname === item.path ? "text-orange-500 translate-x-1" : "text-slate-300"
                        }`} />
                      </Link>
                    </motion.div>
                  ))}
                  
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ delay: 0.6 }}
                    className="pt-10"
                  >
                    <div className="bg-slate-50 rounded-[32px] p-6 border border-slate-100">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">Travel Utilities</h4>
                      <button
                        onClick={() => {
                          setIsCurrencyModalOpen(true);
                          setIsMenuOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-3 bg-blue-950 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-950/20 hover:bg-blue-900 transition-all active:scale-95"
                      >
                        <RefreshCw className="w-5 h-5 text-orange-500" />
                        <span>Currency Converter</span>
                      </button>
                    </div>
                  </motion.div>
                </div>

                <div className="p-8 border-t border-slate-100 bg-slate-50/30">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
                    © 2026 FlightHQ Direct
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      <CurrencyModal 
        isOpen={isCurrencyModalOpen} 
        onClose={() => setIsCurrencyModalOpen(false)} 
      />

      <Footer onOpenCurrencyModal={() => setIsCurrencyModalOpen(true)} />
    </div>
  );
};

export default Layout;
