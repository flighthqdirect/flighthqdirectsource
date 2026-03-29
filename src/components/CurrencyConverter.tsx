import React, { useState, useEffect } from "react";
import { RefreshCw, ArrowRightLeft, TrendingUp, DollarSign } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const COMMON_CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "THB", name: "Thai Baht", symbol: "฿" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
];

const CurrencyConverter: React.FC = () => {
  const { notify } = useNotification();
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("MYR");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
      const data = await response.json();
      if (data.result === "success") {
        setRates(data.rates);
        setLastUpdated(new Date(data.time_last_update_utc).toLocaleString());
      } else {
        throw new Error("Failed to fetch rates");
      }
    } catch (error) {
      console.error("Currency fetch error:", error);
      notify("Failed to fetch live exchange rates. Using cached data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, [fromCurrency]);

  const convertedAmount = rates[toCurrency] ? (amount * rates[toCurrency]).toFixed(2) : "0.00";

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-xl shadow-lg shadow-orange-500/20">
            <ArrowRightLeft className="text-white w-5 h-5" />
          </div>
          <h3 className="text-xl font-black text-blue-950 uppercase tracking-tight">Live Converter</h3>
        </div>
        {lastUpdated && (
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Updated: {lastUpdated}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
        <div className="md:col-span-3 space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amount</label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <DollarSign className="w-4 h-4" />
            </div>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full pl-10 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl font-bold text-blue-950 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white focus:border-orange-500 transition-all"
            />
          </div>
        </div>

        <div className="md:col-span-1 flex justify-center pb-4">
          <button
            onClick={handleSwap}
            className="p-3 bg-slate-100 rounded-full hover:bg-orange-500 hover:text-white transition-all group"
          >
            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        <div className="md:col-span-3 space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Converted</label>
          <div className="w-full px-6 py-4 bg-blue-50 rounded-2xl font-black text-blue-950 text-xl border border-blue-100">
            {convertedAmount} <span className="text-sm text-blue-400 ml-1">{toCurrency}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-4 py-4 bg-slate-50 border-transparent rounded-2xl font-bold text-blue-950 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white focus:border-orange-500 transition-all cursor-pointer"
          >
            {COMMON_CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-4 py-4 bg-slate-50 border-transparent rounded-2xl font-bold text-blue-950 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white focus:border-orange-500 transition-all cursor-pointer"
          >
            {COMMON_CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} - {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-[30px] border border-slate-100 flex items-center gap-4">
        <div className="bg-white p-3 rounded-xl shadow-sm">
          <TrendingUp className="w-5 h-5 text-green-500" />
        </div>
        <div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Exchange Rate</span>
          <span className="font-bold text-blue-950">
            1 {fromCurrency} = {rates[toCurrency]?.toFixed(4)} {toCurrency}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
