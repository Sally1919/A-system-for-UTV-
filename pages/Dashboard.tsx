import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, TrendingUp, AlertCircle, Video, ArrowUpRight, ArrowDownRight, LucideIcon } from 'lucide-react';
import { viewershipData, revenueData } from '../services/mockData.ts';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: LucideIcon;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color }) => (
  <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
      <Icon size={80} style={{ color: color }} />
    </div>
    
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-slate-800/50 border border-white/5 shadow-inner`}>
          <Icon size={24} style={{ color: color }} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${change >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(change)}%
        </div>
      </div>
      
      <div>
        <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">{value}</h3>
        <p className="text-slate-400 text-sm font-medium">{title}</p>
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Executive Overview</h1>
          <p className="text-slate-400">Real-time station performance metrics</p>
        </div>
        <div className="glass-panel px-5 py-3 rounded-xl flex items-center gap-4 bg-gradient-to-r from-slate-800/50 to-orange-900/10 border-orange-500/20">
          <div className="text-right">
            <p className="text-orange-400 text-xs font-bold uppercase tracking-wider">Currently Live</p>
            <p className="text-white font-semibold">Midday News Bulletin</p>
          </div>
          <div className="relative">
             <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute top-0 right-0"></div>
             <div className="w-3 h-3 bg-red-500 rounded-full relative"></div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="Total Viewership" value="2.4M" change={12.5} icon={Users} color="#3b82f6" />
        <StatCard title="Ad Revenue" value="GH₵ 450k" change={8.2} icon={TrendingUp} color="#10b981" />
        <StatCard title="Content Output" value="142 hrs" change={-2.4} icon={Video} color="#f97316" />
        <StatCard title="Active Issues" value="3" change={0} icon={AlertCircle} color="#ef4444" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-white">Viewership Trends</h3>
              <p className="text-xs text-slate-400">24-hour performance</p>
            </div>
            <select className="bg-slate-800 border border-white/10 rounded-lg text-xs text-slate-300 px-2 py-1 focus:outline-none">
              <option>Today</option>
              <option>Yesterday</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={viewershipData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `${val/1000}k`} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', borderColor: 'rgba(255,255,255,0.1)', color: '#f1f5f9', borderRadius: '8px', backdropFilter: 'blur(4px)' }}
                  itemStyle={{ color: '#f97316' }}
                />
                <Area type="monotone" dataKey="viewers" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorView)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl shadow-xl">
          <h3 className="text-lg font-bold text-white mb-1">Revenue Mix</h3>
          <p className="text-xs text-slate-400 mb-6">Last 6 months comparison</p>
          <div className="h-72 w-full">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData.slice(-5)} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `${val/1000}k`} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', borderColor: 'rgba(255,255,255,0.1)', color: '#f1f5f9', borderRadius: '8px' }}
                />
                <Bar dataKey="tvAds" name="TV Ads" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="digitalAds" name="Digital" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">System Notifications</h3>
          <button className="text-sm text-orange-400 hover:text-orange-300 font-medium">View All History</button>
        </div>
        <div className="space-y-3">
          {[
            { msg: 'Transmission signal strength fluctuated in Kumasi Region', time: '10 mins ago', type: 'error' },
            { msg: 'New ad spot booked for "Prime Time News"', time: '35 mins ago', type: 'success' },
            { msg: 'Scheduled maintenance for Server Rack B', time: '2 hours ago', type: 'info' },
          ].map((alert, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-white/5 hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`flex-shrink-0 w-3 h-3 rounded-full ${
                  alert.type === 'error' ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 
                  alert.type === 'success' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                }`}></div>
                <span className="text-slate-200 text-sm md:text-base font-medium">{alert.msg}</span>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap ml-4">{alert.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};