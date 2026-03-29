import React from "react";
import { ShieldCheck, Lock, Eye, FileText } from "lucide-react";

const Privacy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[60px] p-12 md:p-20 shadow-2xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-blue-950" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-blue-950 uppercase tracking-tight">Privacy Policy</h1>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Last Updated: March 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              At FlightHQ Direct, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information when you use our aviation insights platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 p-8 rounded-3xl">
                <Lock className="w-6 h-6 text-orange-500 mb-4" />
                <h3 className="font-black text-blue-950 uppercase mb-2">Data Security</h3>
                <p className="text-sm text-slate-500">We use industry-standard encryption to protect your data during transmission and storage.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl">
                <Eye className="w-6 h-6 text-orange-500 mb-4" />
                <h3 className="font-black text-blue-950 uppercase mb-2">Transparency</h3>
                <p className="text-sm text-slate-500">We are clear about what data we collect and why we need it for our travel tools.</p>
              </div>
            </div>

            <h2 className="text-2xl font-black text-blue-950 uppercase mt-12 mb-6">1. Information We Collect</h2>
            <p className="text-slate-600 mb-6">
              We collect information that you provide directly to us, such as when you subscribe to our newsletter, use our baggage fee calculator, or contact our support team. This may include:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
              <li>Email address for newsletter subscriptions</li>
              <li>Flight details for compensation checking</li>
              <li>Usage data and device information via cookies</li>
            </ul>

            <h2 className="text-2xl font-black text-blue-950 uppercase mt-12 mb-6">2. How We Use Your Information</h2>
            <p className="text-slate-600 mb-6">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
              <li>Provide and improve our aviation insights tools</li>
              <li>Send you travel insights and price analysis</li>
              <li>Respond to your comments and questions</li>
              <li>Monitor and analyze trends and usage</li>
            </ul>

            <h2 className="text-2xl font-black text-blue-950 uppercase mt-12 mb-6">3. Cookies and Web Beacons</h2>
            <p className="text-slate-600 mb-6">
              Like any other website, FlightHQ Direct uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
            </p>

            <h2 className="text-2xl font-black text-blue-950 uppercase mt-12 mb-6">4. Google DoubleClick DART Cookie</h2>
            <p className="text-slate-600 mb-6">
              Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-orange-500 hover:underline">https://policies.google.com/technologies/ads</a>
            </p>

            <h2 className="text-2xl font-black text-blue-950 uppercase mt-12 mb-6">5. Advertising Partners Privacy Policies</h2>
            <p className="text-slate-600 mb-6">
              Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on FlightHQ Direct, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
            </p>
            <p className="text-slate-600 mb-8">
              Note that FlightHQ Direct has no access to or control over these cookies that are used by third-party advertisers.
            </p>

            <div className="bg-blue-950 p-10 rounded-[40px] text-white mt-12">
              <div className="flex items-center gap-4 mb-6">
                <FileText className="w-8 h-8 text-orange-500" />
                <h3 className="text-xl font-black uppercase tracking-tight">Your Rights</h3>
              </div>
              <p className="text-blue-100 leading-relaxed mb-6">
                Depending on your location, you may have rights under GDPR, CCPA, or other privacy laws, including the right to access, correct, or delete your personal data.
              </p>
              <p className="text-sm text-blue-300">
                To exercise these rights, please contact us at privacy@flighthqdirect.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
