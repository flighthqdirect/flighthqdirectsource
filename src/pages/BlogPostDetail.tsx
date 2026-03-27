import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../data/mockData";
import { Calendar, User, Tag, ArrowLeft, Share2, MessageCircle, Star, ShieldCheck, TrendingDown, CheckCircle, ArrowRight } from "lucide-react";

const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-4xl font-black text-blue-950 mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-orange-500 font-bold hover:underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <Link to="/blog" className="flex items-center gap-2 text-slate-500 font-bold mb-12 hover:text-blue-950 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Blog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-[60px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100">
              <div className="h-[500px] relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent flex items-end p-12">
                  <div className="text-white">
                    <div className="flex items-center gap-6 text-orange-400 font-black text-xs uppercase tracking-widest mb-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Admin</span>
                      </div>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter mb-8 uppercase leading-tight">
                      {post.title}
                    </h1>
                    <div className="flex gap-4">
                      <span className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest">
                        Travel Tips
                      </span>
                      <span className="bg-orange-500 px-6 py-2 rounded-full font-black text-sm uppercase tracking-widest shadow-xl">
                        Must Read
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-12 prose prose-lg max-w-none text-slate-600 leading-relaxed">
                <p className="text-xl font-bold text-blue-950 mb-8 italic">
                  {post.excerpt}
                </p>
                
                <h2 className="text-3xl font-black text-blue-950 mb-6 uppercase">Introduction</h2>
                <p className="mb-8">
                  Traveling doesn't have to break the bank. With the right strategies and tools, you can find incredible deals on flights and accommodation. In this guide, we'll walk you through the exact steps we use to save thousands on travel every year.
                </p>

                <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 mb-12">
                  <h3 className="text-xl font-black text-blue-950 mb-6 uppercase">Key Takeaways</h3>
                  <ul className="space-y-4">
                    {[
                      "Book at least 3 weeks in advance for domestic flights.",
                      "Use incognito mode to avoid price hikes based on search history.",
                      "Be flexible with your travel dates and airports.",
                      "Sign up for price alerts on FLIGHQDIRECT.",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <h2 className="text-3xl font-black text-blue-950 mb-6 uppercase">The Best Time to Book</h2>
                <p className="mb-8">
                  Data shows that the cheapest time to book flights is typically on a Tuesday or Wednesday. Airlines often release their sales early in the week, and by mid-week, other airlines have matched those prices.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-blue-900 p-8 rounded-[40px] text-white shadow-xl shadow-blue-900/20">
                    <TrendingDown className="w-10 h-10 text-orange-500 mb-6" />
                    <h4 className="text-xl font-black mb-4 uppercase">Price Drop Alerts</h4>
                    <p className="text-sm text-blue-100 leading-relaxed">
                      Our AI-powered price prediction tool analyzes millions of flights to tell you exactly when to buy.
                    </p>
                  </div>
                  <div className="bg-orange-500 p-8 rounded-[40px] text-white shadow-xl shadow-orange-500/20">
                    <ShieldCheck className="w-10 h-10 text-blue-950 mb-6" />
                    <h4 className="text-xl font-black mb-4 uppercase">Secure Booking</h4>
                    <p className="text-sm text-orange-50 leading-relaxed">
                      We only partner with verified airlines and booking platforms to ensure your safety.
                    </p>
                  </div>
                </div>

                <p className="mb-12">
                  Conclusion: Finding cheap flights is a skill that anyone can master. By following these tips and using FLIGHQDIRECT, you're already ahead of 90% of travelers.
                </p>

                <div className="flex items-center justify-between pt-12 border-t border-slate-100">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Share:</span>
                    <div className="flex gap-3">
                      <button className="bg-blue-50 p-3 rounded-xl hover:bg-blue-100 transition-colors">
                        <Share2 className="w-5 h-5 text-blue-900" />
                      </button>
                      <button className="bg-blue-50 p-3 rounded-xl hover:bg-blue-100 transition-colors">
                        <MessageCircle className="w-5 h-5 text-blue-900" />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5 text-slate-300" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Cheap Flights, Travel Hacks</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100">
              <h3 className="text-xl font-black text-blue-950 mb-6 uppercase">Search Flights</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Ready to apply these tips? Search for your next flight now and see the savings.
              </p>
              <Link to="/" className="w-full bg-orange-500 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20">
                SEARCH NOW <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="bg-blue-950 rounded-[40px] p-8 text-white shadow-2xl shadow-blue-950/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <h3 className="text-xl font-black mb-4 uppercase">Popular Guides</h3>
              <div className="space-y-6 mt-8">
                {blogPosts.filter(p => p.id !== post.id).map(p => (
                  <Link key={p.id} to={`/blog/${p.slug}`} className="flex gap-4 group/item">
                    <img src={p.image} className="w-16 h-16 rounded-xl object-cover shrink-0" referrerPolicy="no-referrer" />
                    <div>
                      <h4 className="text-sm font-bold leading-tight group-hover/item:text-orange-500 transition-colors line-clamp-2">{p.title}</h4>
                      <span className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">{p.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100 text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="text-orange-500 w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-blue-950 mb-4 uppercase tracking-tight">Join Our Community</h3>
              <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                Get exclusive travel deals and tips delivered to your inbox every week.
              </p>
              <input
                type="email"
                placeholder="Your email"
                className="w-full bg-slate-50 border border-slate-100 px-6 py-4 rounded-2xl mb-4 outline-none focus:border-orange-500 transition-colors"
              />
              <button className="w-full bg-blue-900 text-white py-4 rounded-2xl font-black hover:bg-blue-800 transition-all">
                SUBSCRIBE
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetail;
