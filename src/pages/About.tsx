import React, { useState } from "react";
import { ShieldCheck, Globe, Users, Award, Mail, Phone, MapPin, ArrowRight, CheckCircle, ChevronDown, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-8 flex items-center justify-between text-left group transition-all"
      >
        <h3 className={`text-xl font-black uppercase tracking-tight transition-colors ${isOpen ? 'text-orange-500' : 'text-blue-950 group-hover:text-orange-500'}`}>
          {question}
        </h3>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${isOpen ? 'bg-orange-500 text-white rotate-180' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-blue-950'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-slate-500 leading-relaxed text-lg max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const About: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const team = [
    { name: "Captain Sarah Miller", role: "Chief Aviation Analyst", image: "https://picsum.photos/seed/sarah/400/400" },
    { name: "David Chen", role: "Head of Data Insights", image: "https://picsum.photos/seed/david/400/400" },
    { name: "Elena Rodriguez", role: "Director of Global Partnerships", image: "https://picsum.photos/seed/elena/400/400" },
  ];

  return (
    <div className="pt-32 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-32 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10" />
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-blue-950 mb-8 uppercase leading-none">
            WE ARE <br />
            <span className="text-orange-500">FlightHQ Direct</span>
          </h1>
          <p className="text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
            A global collective of aviation experts, data scientists, and travel enthusiasts dedicated to bringing absolute transparency to the skies.
          </p>
        </div>

        {/* Mission & Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
          {[
            { icon: ShieldCheck, title: "Absolute Trust", text: "We provide verified information directly from carriers. No hidden fees, no misleading data.", color: "blue" },
            { icon: Globe, title: "Global Insights", text: "Our database covers over 100 airlines and 500+ airports worldwide, ensuring you have the best options.", color: "orange" },
            { icon: Users, title: "Expert Driven", text: "Join thousands of travelers who rely on our expert guides and tools to plan their perfect trips.", color: "green" },
          ].map((item, i) => (
            <div key={i} className="bg-white p-12 rounded-[60px] shadow-2xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-2 transition-all duration-500">
              <div className={`bg-${item.color}-50 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-10 h-10 text-${item.color}-600`} />
              </div>
              <h3 className="text-3xl font-black text-blue-950 mb-6 uppercase tracking-tighter">{item.title}</h3>
              <p className="text-slate-500 leading-relaxed text-lg">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* Expertise Section */}
        <div className="bg-blue-950 rounded-[80px] p-12 lg:p-24 text-white shadow-2xl shadow-blue-950/20 mb-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
            <div>
              <div className="inline-block bg-orange-500 px-4 py-1 rounded-lg mb-8">
                <span className="text-white font-black text-xs uppercase tracking-widest">Our Edge</span>
              </div>
              <h2 className="text-5xl lg:text-7xl font-black mb-10 uppercase tracking-tighter leading-[0.9]">
                INSIGHTS <br />
                <span className="text-orange-500">BEYOND DATA</span>
              </h2>
              <p className="text-blue-100 text-xl mb-12 leading-relaxed font-medium">
                At FlightHQ Direct, we don't just aggregate data; we analyze it. Our proprietary algorithms track pricing trends, baggage policy changes, and airport facility updates in real-time. This allows us to provide "high-value" insights that you won't find on generic booking sites.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-orange-500" />
                  <span className="font-black uppercase tracking-widest text-xs">Voted Best Resource 2024</span>
                </div>
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-orange-500" />
                  <span className="font-black uppercase tracking-widest text-xs">100% Verified Info</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: "Monthly Users", value: "1M+" },
                { label: "Airlines Tracked", value: "100+" },
                { label: "Airports Covered", value: "500+" },
                { label: "Data Updates", value: "24/7" },
              ].map((stat, i) => (
                <div key={i} className="bg-white/5 backdrop-blur-md p-10 rounded-[50px] border border-white/10 text-center group hover:bg-white/10 transition-all">
                  <div className="text-5xl font-black mb-4 group-hover:text-orange-500 transition-colors">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black text-blue-950 mb-6 uppercase tracking-tighter">MEET THE <span className="text-orange-500">EXPERTS</span></h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">Our leadership team brings decades of experience from major global carriers and aviation technology firms.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, i) => (
              <div key={i} className="group">
                <div className="bg-white rounded-[60px] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 text-center h-full">
                  <div className="w-48 h-48 rounded-[40px] overflow-hidden mx-auto mb-8 border-4 border-slate-50 group-hover:border-orange-500 transition-all duration-500">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  </div>
                  <h3 className="text-2xl font-black text-blue-950 mb-2 uppercase tracking-tight">{member.name}</h3>
                  <p className="text-orange-500 font-black text-xs uppercase tracking-widest mb-6">{member.role}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">Expert in global aviation networks and strategic insights.</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="bg-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-orange-500/20">
                  <HelpCircle className="text-white w-8 h-8" />
                </div>
                <h2 className="text-6xl font-black text-blue-950 mb-8 uppercase tracking-tighter leading-[0.9]">
                  COMMON <br />
                  <span className="text-orange-500">QUESTIONS</span>
                </h2>
                <p className="text-xl text-slate-500 leading-relaxed font-medium mb-12">
                  Everything you need to know about FlightHQ Direct and how we help you navigate the skies with confidence.
                </p>
                <div className="p-8 bg-blue-950 rounded-[40px] text-white relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <h4 className="text-lg font-black mb-4 uppercase tracking-tight">Still have questions?</h4>
                  <p className="text-blue-200 text-sm mb-8 leading-relaxed">Our support team is available 24/7 to help you with any specific inquiries.</p>
                  <Link to="/contact" className="inline-flex items-center gap-2 text-orange-500 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all">
                    Get in touch <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 bg-white rounded-[60px] p-12 shadow-2xl shadow-slate-200/50 border border-slate-100">
              {[
                {
                  question: "What is FlightHQ Direct?",
                  answer: "FlightHQ Direct is a specialized aviation intelligence platform. Unlike traditional booking engines, we focus on providing deep, verified insights into airline policies, baggage rules, and real-time route data directly from the source."
                },
                {
                  question: "How do you verify airline information?",
                  answer: "We maintain direct data partnerships with major global carriers and use proprietary automated systems to monitor official airline communications, ensuring our database reflects the most current policies and fees."
                },
                {
                  question: "Is the flight search data real-time?",
                  answer: "Yes, our route and schedule data is updated continuously through global aviation feeds. While we don't sell tickets directly, we provide the most accurate path to the official carrier's booking page."
                },
                {
                  question: "Do you charge any booking fees?",
                  answer: "Never. FlightHQ Direct is a free resource for travelers. We believe in absolute transparency, which is why we always direct you to book directly with the airline to avoid third-party markups."
                },
                {
                  question: "How can I partner with FlightHQ Direct?",
                  answer: "We are always looking to expand our network of airline and airport partners. If you represent a carrier or aviation service, please reach out through our dedicated partnership portal on the contact page."
                },
                {
                  question: "What if I find incorrect information?",
                  answer: "While we strive for 100% accuracy, the aviation world moves fast. If you spot a discrepancy, please use the 'Report Issue' feature on any airline page or contact our data team directly."
                }
              ].map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFaqIndex === index}
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white rounded-[80px] p-12 lg:p-24 shadow-2xl shadow-slate-200/50 border border-slate-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10" />
          <h2 className="text-5xl font-black text-blue-950 mb-8 uppercase tracking-tighter">READY TO <span className="text-orange-500">CONNECT?</span></h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Whether you're an airline partner, a developer, or a traveler with a question, our team is ready to assist you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact" className="w-full sm:w-auto bg-blue-950 text-white px-12 py-5 rounded-2xl font-black hover:bg-blue-900 transition-all shadow-2xl uppercase tracking-widest text-xs flex items-center justify-center gap-3">
              Contact Our Team <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="mailto:support@flighthqdirect.com" className="w-full sm:w-auto bg-slate-100 text-blue-950 px-12 py-5 rounded-2xl font-black hover:bg-slate-200 transition-all uppercase tracking-widest text-xs">
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
