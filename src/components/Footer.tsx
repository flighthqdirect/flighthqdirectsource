import React from "react";
import { Link } from "react-router-dom";
import { Plane, Facebook, Twitter, Instagram, RefreshCw, Phone, Mail, Globe } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

interface FooterProps {
  onOpenCurrencyModal: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenCurrencyModal }) => {
  const { notify } = useNotification();

  const handleSocialClick = (platform: string) => {
    notify(`Opening ${platform}...`, "info");
  };

  return (
    <footer className="bg-blue-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="bg-orange-500 p-2.5 rounded-2xl group-hover:rotate-12 transition-transform duration-500 shadow-xl shadow-orange-500/20">
                <Plane className="text-white w-6 h-6" />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-2xl font-black tracking-tighter text-white">
                  FlightHQ
                </span>
                <span className="text-[10px] font-black tracking-[0.4em] text-orange-500 uppercase leading-none">
                  Direct
                </span>
              </div>
            </Link>
            <p className="text-blue-200 mb-6 leading-relaxed">
              Your global aviation hub for expert insights, comprehensive airline directories, and smart tools for the modern traveler.
            </p>
            <div className="flex gap-4">
              <Facebook 
                onClick={() => handleSocialClick("Facebook")}
                className="w-5 h-5 text-blue-300 hover:text-white cursor-pointer transition-colors" 
              />
              <Twitter 
                onClick={() => handleSocialClick("Twitter")}
                className="w-5 h-5 text-blue-300 hover:text-white cursor-pointer transition-colors" 
              />
              <Instagram 
                onClick={() => handleSocialClick("Instagram")}
                className="w-5 h-5 text-blue-300 hover:text-white cursor-pointer transition-colors" 
              />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-blue-200">
              <li><Link to="/airlines" className="hover:text-white transition-colors">Airlines Directory</Link></li>
              <li><Link to="/airports" className="hover:text-white transition-colors">Airport Guides</Link></li>
              <li><Link to="/tools" className="hover:text-white transition-colors">Travel Tools</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Travel Blog</Link></li>
              <li>
                <button 
                  onClick={onOpenCurrencyModal}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Currency Converter
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-blue-200">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
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
                <span>+60 3-8777 8888</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500" />
                <span>support@flighthqdirect.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-orange-500" />
                <span>Kuala Lumpur, Malaysia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-blue-400 text-sm">
          <p>© 2026 FlightHQDirect.com. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Affiliate Disclosure</span>
            <span>Sitemap</span>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-blue-500/70 max-w-4xl mx-auto pb-4">
          <p>
            <strong>AI Disclaimer:</strong> Some features of this application, including market insights and live flight status, are powered by artificial intelligence (Google Gemini). While we strive for accuracy, AI-generated content may occasionally contain errors or hallucinations. Please verify critical flight information with official airline sources before making travel decisions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
