import React from "react";
import { X, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import CurrencyConverter from "./CurrencyConverter";

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CurrencyModal: React.FC<CurrencyModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-blue-950/40 backdrop-blur-sm z-[60]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-[40px] shadow-2xl z-[70] overflow-hidden border border-slate-100"
          >
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500 w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <RefreshCw className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-blue-950 uppercase tracking-tight">Currency Converter</h2>
                    <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Live Market Rates</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 bg-slate-50 text-slate-400 hover:text-blue-950 hover:bg-slate-100 rounded-2xl transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <CurrencyConverter />

              <div className="mt-10 pt-8 border-t border-slate-50 text-center">
                <p className="text-xs text-slate-400 font-medium">
                  Exchange rates are provided for informational purposes only. 
                  Always check with your financial institution for actual rates.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CurrencyModal;
