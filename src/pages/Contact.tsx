import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { useNotification } from "../context/NotificationContext";

const Contact: React.FC = () => {
  const { notify } = useNotification();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      notify("Please fill in all required fields.", "error");
      return;
    }
    notify("Thank you for your message! Our team will get back to you shortly.", "success");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black tracking-tighter text-blue-950 mb-6 uppercase">
            Get in <span className="text-orange-500">Touch</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Have questions about airline policies or our travel tools? Our aviation experts are here to help you navigate the skies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-blue-950" />
                </div>
                <div>
                  <h3 className="font-black text-blue-950 uppercase tracking-tight">Email Us</h3>
                  <p className="text-slate-500 text-sm">support@flighthqdirect.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-blue-950" />
                </div>
                <div>
                  <h3 className="font-black text-blue-950 uppercase tracking-tight">Call Us</h3>
                  <p className="text-slate-500 text-sm">+60 3-8777 8888</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-950" />
                </div>
                <div>
                  <h3 className="font-black text-blue-950 uppercase tracking-tight">Visit Us</h3>
                  <p className="text-slate-500 text-sm">Aviation Hub, Level 15, KL Sentral<br />50470 Kuala Lumpur, Malaysia</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-950 p-10 rounded-[40px] text-white shadow-2xl shadow-blue-950/20">
              <MessageSquare className="w-10 h-10 text-orange-500 mb-6" />
              <h3 className="text-2xl font-black uppercase mb-4 tracking-tight text-white">Live Insights</h3>
              <p className="text-blue-200 leading-relaxed mb-6">
                Our support team consists of former airline professionals who understand the complexities of modern travel.
              </p>
              <div className="flex items-center gap-2 text-orange-500 font-bold uppercase tracking-widest text-xs">
                Available 24/7 for premium members
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-12 rounded-[60px] shadow-2xl shadow-slate-200/50 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Full Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-blue-950 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-blue-950 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-blue-950 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Message</label>
                <textarea
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 px-6 text-blue-950 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-bold resize-none"
                  placeholder="Your detailed message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-950 text-white py-5 rounded-2xl font-black hover:bg-blue-900 transition-all shadow-2xl shadow-blue-950/30 uppercase tracking-widest text-xs flex items-center justify-center gap-3"
              >
                Send Message <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
