import React from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/mockData";
import { ArrowRight, Calendar, User, Tag, Search } from "lucide-react";

const Blog: React.FC = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-black tracking-tighter text-blue-950 mb-4 uppercase">Travel Blog</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Expert travel tips, flight booking hacks, and destination guides to help you travel smarter.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="bg-white rounded-[50px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-orange-500 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-xl">
                  Travel Tips
                </div>
              </div>

              <div className="p-10">
                <div className="flex items-center gap-6 text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Admin</span>
                  </div>
                </div>

                <h2 className="text-2xl font-black text-blue-950 mb-6 group-hover:text-orange-500 transition-colors leading-tight">
                  {post.title}
                </h2>

                <p className="text-slate-500 mb-8 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                  <span className="text-blue-900 font-bold flex items-center gap-2">
                    Read Article <ArrowRight className="w-4 h-4" />
                  </span>
                  <div className="flex gap-2">
                    <Tag className="w-4 h-4 text-slate-300" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cheap Flights</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
