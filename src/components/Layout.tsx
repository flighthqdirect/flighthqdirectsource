import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Plane, Menu, X, Search, Globe, Phone, Mail, Facebook, Twitter, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

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
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-orange-500 p-2 rounded-lg group-hover:bg-orange-600 transition-colors">
                <Plane className="text-white w-6 h-6" />
              </div>
              <span className={`text-2xl font-bold tracking-tighter ${isScrolled ? "text-blue-900" : "text-blue-900 md:text-white"}`}>
                FLIGHQ<span className="text-orange-500">DIRECT</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {["Flights", "Airlines", "Airports", "Deals", "Blog"].map((item) => (
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
              <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/20">
                Book Now
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-blue-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {["Flights", "Airlines", "Airports", "Deals", "Blog"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className="block text-lg font-medium text-slate-700 hover:text-orange-500"
                  >
                    {item}
                  </Link>
                ))}
                <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold">
                  Search Flights
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-blue-950 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <Link to="/" className="flex items-center gap-2 mb-6">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Plane className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tighter">
                  FLIGHQ<span className="text-orange-500">DIRECT</span>
                </span>
              </Link>
              <p className="text-blue-200 mb-6 leading-relaxed">
                Compare 100+ airlines in seconds. We help you find the cheapest flights and best travel deals across Asia and beyond.
              </p>
              <div className="flex gap-4">
                <Facebook className="w-5 h-5 text-blue-300 hover:text-white cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 text-blue-300 hover:text-white cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 text-blue-300 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-blue-200">
                <li><Link to="/flights" className="hover:text-white transition-colors">Search Flights</Link></li>
                <li><Link to="/airlines" className="hover:text-white transition-colors">Airlines Directory</Link></li>
                <li><Link to="/airports" className="hover:text-white transition-colors">Airport Guides</Link></li>
                <li><Link to="/deals" className="hover:text-white transition-colors">Exclusive Deals</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Support</h4>
              <ul className="space-y-4 text-blue-200">
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Contact Info</h4>
              <ul className="space-y-4 text-blue-200">
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-orange-500" />
                  <span>+60 3-1234 5678</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <span>support@flighqdirect.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-orange-500" />
                  <span>Kuala Lumpur, Malaysia</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-blue-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-blue-400 text-sm">
            <p>© 2026 FLIGHQDIRECT.COM. All rights reserved.</p>
            <div className="flex gap-6">
              <span>Affiliate Disclosure</span>
              <span>Sitemap</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
