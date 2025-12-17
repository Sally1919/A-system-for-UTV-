import React, { useState } from 'react';
import { Search, Filter, Plus, Film, Clock, Eye, MoreVertical, PlayCircle, Star } from 'lucide-react';
import { mockContent } from '../services/mockData.ts';
import { ContentStatus } from '../types.ts';

export const ContentManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredContent = mockContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || item.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Content Library</h1>
          <p className="text-slate-400">Manage program assets and licensing</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white rounded-xl font-semibold shadow-lg shadow-orange-500/20 transition-all transform hover:scale-105 w-full md:w-auto">
            <Plus size={18} />
            Upload Content
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="glass-panel p-4 rounded-2xl mb-6 flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by title..." 
            className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-2.5 pl-11 pr-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Scrollable Filters */}
        <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
          <div className="flex items-center gap-2">
            {['All', 'News', 'Entertainment', 'Drama', 'Sports', 'Religious', 'Documentary'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                  filter === cat 
                    ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/25' 
                    : 'bg-slate-800/50 text-slate-400 border-white/5 hover:text-white hover:bg-slate-700/50 hover:border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
             <button className="p-2 text-slate-400 hover:text-white bg-slate-800/50 border border-white/5 rounded-lg hover:bg-slate-700 transition-colors">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-6 animate-fade-in">
        {filteredContent.map((item) => (
          <div key={item.id} className="glass-panel rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col h-full border hover:border-orange-500/30">
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 backdrop-blur-[2px]">
                <button className="p-3 bg-orange-600 rounded-full text-white transform scale-50 group-hover:scale-100 transition-all duration-300 shadow-xl hover:bg-orange-500">
                  <PlayCircle size={36} fill="white" className="text-orange-600" />
                </button>
              </div>
              
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                 <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white shadow-sm backdrop-blur-md
                  ${item.status === ContentStatus.AIRED ? 'bg-green-600/90' : 
                    item.status === ContentStatus.SCHEDULED ? 'bg-blue-600/90' : 'bg-slate-600/90'}`}>
                  {item.status}
                </span>
              </div>

              <span className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-xs text-white flex items-center gap-1.5 font-medium border border-white/10">
                <Clock size={12} className="text-orange-400" /> {item.duration}m
              </span>
            </div>
            
            {/* Details */}
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                 <div className="flex-1 mr-2">
                    <p className="text-[10px] text-orange-400 font-bold uppercase tracking-wider mb-1">{item.category}</p>
                    <h3 className="font-bold text-slate-100 line-clamp-2 text-lg leading-tight group-hover:text-orange-400 transition-colors">{item.title}</h3>
                 </div>
                 <button className="text-slate-500 hover:text-white transition-colors">
                  <MoreVertical size={18} />
                </button>
              </div>
              
              <div className="mt-auto pt-4 flex justify-between items-center border-t border-white/5">
                 <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[10px] text-slate-300 font-bold border border-white/10">
                      {item.producer.charAt(item.producer.length-1)}
                    </div>
                    <span className="text-xs text-slate-400 font-medium truncate max-w-[80px]">{item.producer}</span>
                 </div>
                 
                 <div className="flex items-center gap-3">
                   <div className="flex items-center gap-1 text-slate-400 text-xs bg-slate-800/50 px-2 py-1 rounded-full">
                      <Star size={10} className="text-yellow-500" fill="#eab308" />
                      <span>{item.rating}</span>
                   </div>
                   <div className="flex items-center gap-1 text-slate-400 text-xs">
                      <Eye size={12} />
                      <span>{(item.views / 1000).toFixed(0)}k</span>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};