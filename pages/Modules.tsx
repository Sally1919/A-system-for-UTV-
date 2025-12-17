import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockStaff, revenueData } from '../services/mockData.ts';
import { Users, Video, DollarSign, MapPin, CheckCircle, AlertTriangle, Send, Phone, Mail, Award, Zap } from 'lucide-react';

/* --- Analytics Module --- */
export const AnalyticsHub: React.FC = () => {
  const demographicData = [
    { name: '18-24', value: 20 },
    { name: '25-34', value: 35 },
    { name: '35-44', value: 25 },
    { name: '45+', value: 20 },
  ];
  const COLORS = ['#f97316', '#3b82f6', '#8b5cf6', '#10b981'];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">Audience Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Demographics (Age)</h3>
          <div className="flex-1 min-h-[300px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicData}
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {demographicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}
                   itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-bold text-white">2.4M</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider">Total Viewers</span>
            </div>
          </div>
          <div className="flex justify-center flex-wrap gap-4 text-sm text-slate-400 mt-6">
            {demographicData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-full border border-white/5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                <span className="font-medium text-slate-200">{d.name}</span>
                <span className="text-xs opacity-60">({d.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl flex flex-col">
            <h3 className="text-lg font-bold text-white mb-6">Regional Reach</h3>
            <div className="bg-slate-800/50 border border-white/5 rounded-xl flex-1 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 opacity-30 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Ghana_location_map.svg/1024px-Ghana_location_map.svg.png')] bg-contain bg-no-repeat bg-center grayscale transition-transform duration-1000 group-hover:scale-105"></div>
                <div className="z-10 grid gap-6 text-center w-full max-w-sm">
                    <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-white/10 transform hover:scale-105 transition-transform cursor-pointer">
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-orange-400 font-bold">Greater Accra</span>
                          <MapPin size={16} className="text-orange-500" />
                       </div>
                       <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mb-1">
                          <div className="bg-orange-500 h-full w-[85%]"></div>
                       </div>
                       <p className="text-xs text-right text-slate-400">1.2M Viewers</p>
                    </div>

                    <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-white/10 transform hover:scale-105 transition-transform cursor-pointer">
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-400 font-bold">Ashanti Region</span>
                          <MapPin size={16} className="text-blue-500" />
                       </div>
                       <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden mb-1">
                          <div className="bg-blue-500 h-full w-[65%]"></div>
                       </div>
                       <p className="text-xs text-right text-slate-400">800k Viewers</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

/* --- Staff & Revenue (Combined display) --- */
export const StaffRevenue: React.FC = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                     <div>
                       <h2 className="text-2xl font-bold text-white">Staff Directory</h2>
                       <p className="text-sm text-slate-400">Manage your team and resources</p>
                     </div>
                     <button className="text-orange-400 text-sm font-medium hover:text-white transition-colors bg-orange-500/10 px-4 py-2 rounded-lg hover:bg-orange-500/20">View All Staff</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mockStaff.slice(0, 6).map(staff => (
                        <div key={staff.id} className="glass-panel p-4 rounded-xl flex items-start gap-4 hover:bg-slate-800/60 transition-colors group cursor-pointer border hover:border-orange-500/30">
                            <div className="relative">
                              <img src={staff.avatar} className="w-12 h-12 rounded-full border-2 border-slate-600 group-hover:border-orange-500 transition-colors" alt={staff.name} />
                              <span className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-slate-800 rounded-full ${
                                    staff.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'
                                }`}></span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-white text-sm truncate">{staff.name}</h4>
                                <p className="text-xs text-orange-400 mb-1">{staff.role}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <button className="p-1.5 rounded bg-slate-700/50 hover:bg-slate-600 text-slate-400 hover:text-white transition-colors"><Phone size={12}/></button>
                                  <button className="p-1.5 rounded bg-slate-700/50 hover:bg-slate-600 text-slate-400 hover:text-white transition-colors"><Mail size={12}/></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Revenue Snapshot</h2>
                  <p className="text-sm text-slate-400">Financial performance overview</p>
                </div>
                <div className="glass-panel p-6 rounded-2xl flex flex-col h-[420px]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Monthly Revenue (June)</p>
                            <h3 className="text-4xl font-bold text-white tracking-tight">GH₵ 131,000</h3>
                            <div className="flex items-center gap-1 text-green-400 text-xs font-bold mt-2 bg-green-500/10 px-2 py-1 rounded-md w-fit">
                               <span>+12.5% vs last month</span>
                            </div>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-2xl border border-green-500/20">
                            <DollarSign className="text-green-400" size={32} />
                        </div>
                    </div>
                     <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={revenueData} barGap={4}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `GH₵${val/1000}k`} />
                                <Tooltip 
                                  cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                                  contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.95)', borderColor: 'rgba(255,255,255,0.1)', color: '#f1f5f9', borderRadius: '8px' }}
                                />
                                <Bar dataKey="tvAds" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} barSize={32} />
                                <Bar dataKey="digitalAds" stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* --- News Room & Tech --- */
export const NewsTech: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* News Section */}
            <section>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white">News Room</h2>
                      <p className="text-sm text-slate-400">Editorial management and alerts</p>
                    </div>
                    <button className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl text-sm font-bold animate-pulse shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2">
                        <AlertTriangle size={18} />
                        BREAKING NEWS ALERT
                    </button>
                </div>
                <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    
                    <div className="mb-4 relative z-10">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Quick Story Draft</label>
                        <textarea 
                            className="w-full h-40 bg-slate-900/50 border border-white/10 rounded-xl p-4 text-slate-200 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500/50 transition-all resize-none placeholder-slate-600"
                            placeholder="Type the headline and key points here..."
                        ></textarea>
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
                        <div className="flex gap-2 w-full sm:w-auto">
                             <button className="flex-1 sm:flex-none p-2.5 hover:bg-slate-700/50 border border-transparent hover:border-white/10 rounded-lg text-slate-400 hover:text-white transition-colors" title="Attach Media"><Video size={20} /></button>
                             <button className="flex-1 sm:flex-none p-2.5 hover:bg-slate-700/50 border border-transparent hover:border-white/10 rounded-lg text-slate-400 hover:text-white transition-colors" title="Assign Reporter"><Users size={20} /></button>
                             <button className="flex-1 sm:flex-none p-2.5 hover:bg-slate-700/50 border border-transparent hover:border-white/10 rounded-lg text-slate-400 hover:text-white transition-colors" title="Add Tag"><Award size={20} /></button>
                        </div>
                        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-medium transition-colors shadow-lg shadow-orange-600/20">
                            <Send size={18} /> Send to Prompter
                        </button>
                    </div>
                </div>
            </section>

            {/* Tech Ops */}
            <section>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white">Technical Status</h2>
                  <p className="text-sm text-slate-400">Equipment health and signals</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-green-500 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                          <CheckCircle size={60} className="text-green-500" />
                        </div>
                        <div className="flex justify-between items-start mb-3 relative z-10">
                            <h4 className="font-bold text-white text-lg">Transmitter A</h4>
                            <div className="p-1 bg-green-500/20 rounded-full">
                              <CheckCircle size={16} className="text-green-500" />
                            </div>
                        </div>
                        <div className="space-y-1 relative z-10">
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>Signal</span>
                            <span className="text-green-400 font-bold">98%</span>
                          </div>
                           <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                              <div className="bg-green-500 h-full w-[98%]"></div>
                           </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-3 font-mono">Temp: 42°C | Load: 65%</p>
                    </div>

                    <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-yellow-500 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                          <AlertTriangle size={60} className="text-yellow-500" />
                        </div>
                        <div className="flex justify-between items-start mb-3 relative z-10">
                            <h4 className="font-bold text-white text-lg">Studio Cam 2</h4>
                            <div className="p-1 bg-yellow-500/20 rounded-full">
                              <AlertTriangle size={16} className="text-yellow-500" />
                            </div>
                        </div>
                         <div className="space-y-2 relative z-10">
                          <p className="text-sm text-yellow-200 bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/20">Battery Low (15%)</p>
                          <p className="text-xs text-slate-400 flex items-center gap-1">Firmware Update Pending</p>
                        </div>
                    </div>

                    <div className="glass-panel p-5 rounded-2xl border-l-4 border-l-green-500 relative overflow-hidden group">
                        <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Zap size={60} className="text-green-500" />
                        </div>
                        <div className="flex justify-between items-start mb-3 relative z-10">
                            <h4 className="font-bold text-white text-lg">Generator A</h4>
                            <div className="p-1 bg-green-500/20 rounded-full">
                              <CheckCircle size={16} className="text-green-500" />
                            </div>
                        </div>
                        <div className="space-y-1 relative z-10">
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>Fuel Level</span>
                            <span className="text-green-400 font-bold">85%</span>
                          </div>
                           <div className="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
                              <div className="bg-green-500 h-full w-[85%]"></div>
                           </div>
                        </div>
                         <p className="text-xs text-slate-500 mt-3 font-mono">Status: Standby | Mains: ON</p>
                    </div>
                </div>
            </section>
        </div>
    )
}