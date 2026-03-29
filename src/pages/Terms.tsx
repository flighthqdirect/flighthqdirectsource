import React from "react";
import { FileText, Scale, AlertCircle, CheckCircle } from "lucide-react";

const Terms: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[60px] p-12 md:p-20 shadow-2xl shadow-slate-200/50 border border-slate-100">
          <div className="flex items-center gap-4 mb-10">
            <div className="bg-blue-50 w-14 h-14 rounded-2xl flex items-center justify-center">
              <Scale className="w-8 h-8 text-blue-950" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-blue-950 uppercase tracking-tight">Terms of Service</h1>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Last Updated: March 2026</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Welcome to FlightHQ Direct. By accessing or using our website and aviation insights tools, you agree to be bound by these Terms of Service.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-slate-50 p-8 rounded-3xl">
                <CheckCircle className="w-6 h-6 text-green-500 mb-4" />
                <h3 className="font-black text-blue-950 uppercase mb-2">Acceptance</h3>
                <p className="text-sm text-slate-500">By using our site, you confirm you've read and understood these terms.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl">
                <AlertCircle className="w-6 h-6 text-orange-500 mb-4" />
                <h3 className="font-black text-blue-950 uppercase mb-2">Modifications</h3>
                <p className="text-sm text-slate-500">We reserve the right to update these terms at any time without prior notice.</p>
              </div>
            </div>

            <h2 className="text-2xl font-black text-blue-950 uppercase mt-12 mb-6">1. Use of Our Services</h2>
            <p className="text-slate-600 mb-6">
              FlightHQ Direct provides aviation insights, airline directories, and travel tools for informational purposes. You agree to use our services only for lawful purposes and in accordance with these Terms.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
              <li>You must be at least 18 years old to use our tools.</li>
              <li>You agree not to use our services for any fraudulent or illegal activity.</li>
              <li>You are responsible for maintaining the confidentiality of your account information.</li>
            </ul>

            <h2 className="text-2xl font-black text-blue-950 uppercase mt-12 mb-6">2. Intellectual Property</h2>
            <p className="text-slate-600 mb-8">
              All content on FlightHQ Direct, including text, graphics, logos, and software, is the property of FlightHQ Direct or its content suppliers and is protected by international copyright laws.
            </p>

            <h2 className="text-2xl font-black text-blue-950 uppercase mt-12 mb-6">3. Third-Party Advertisements</h2>
            <p className="text-slate-600 mb-8">
              We may use third-party advertising companies to serve ads when you visit our website. These companies may use information about your visits to this and other websites in order to provide advertisements about goods and services of interest to you. FlightHQ Direct does not endorse the products or services advertised and is not responsible for the content of any third-party advertisements.
            </p>

            <h2 className="text-2xl font-black text-blue-950 uppercase mt-12 mb-6">4. Disclaimer of Warranties</h2>
            <p className="text-slate-600 mb-8">
              Our services are provided on an "as is" and "as available" basis. FlightHQ Direct makes no warranties, expressed or implied, regarding the accuracy, reliability, or completeness of the information provided on our site.
            </p>

            <div className="bg-orange-500 p-10 rounded-[40px] text-white mt-12">
              <div className="flex items-center gap-4 mb-6">
                <FileText className="w-8 h-8 text-white" />
                <h3 className="text-xl font-black uppercase tracking-tight">Limitation of Liability</h3>
              </div>
              <p className="text-orange-50 leading-relaxed mb-6">
                In no event shall FlightHQ Direct be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in any way connected with the use of our services.
              </p>
              <p className="text-sm text-orange-100">
                For questions regarding our terms, please contact legal@flighthqdirect.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
