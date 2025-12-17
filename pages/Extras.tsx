import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Smartphone, Play, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { digitalMetrics, trainingCourses } from '../services/mockData.ts';

export const DigitalPlatforms: React.FC = () => {
    // Transform for chart
    const data = digitalMetrics.map(d => ({
        name: d.platform,
        followers: d.followers,
        growth: d.growth
    }));

    const getIcon = (p: string) => {
        switch(p) {
            case 'Facebook': return <Facebook className="text-blue-500" />;
            case 'Twitter': return <Twitter className="text-sky-400" />;
            case 'Instagram': return <Instagram className="text-pink-500" />;
            case 'YouTube': return <Youtube className="text-red-600" />;
            default: return <Smartphone className="text-slate-400" />;
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white mb-6">Digital Media Performance</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {digitalMetrics.map(m => (
                    <div key={m.platform} className="glass-panel p-4 rounded-xl flex flex-col items-center text-center hover:bg-slate-800/60 transition-colors">
                        <div className="mb-3 p-3 bg-slate-900 rounded-full border border-white/5">
                            {getIcon(m.platform)}
                        </div>
                        <h3 className="text-white font-bold text-lg">{(m.followers / 1000000).toFixed(1)}M</h3>
                        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">{m.platform}</p>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${m.growth > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            +{m.growth}%
                        </span>
                    </div>
                ))}
            </div>

            <div className="glass-panel p-6 rounded-2xl">
                 <h3 className="text-lg font-bold text-white mb-4">Cross-Platform Growth</h3>
                 <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} opacity={0.3} />
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val/1000000}M`} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Bar dataKey="followers" fill="#f97316" radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                 </div>
            </div>
        </div>
    );
};

export const TrainingPortal: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                   <h1 className="text-2xl font-bold text-white">Staff Training Portal</h1>
                   <p className="text-slate-400">Continuous learning and certification</p>
                </div>
                <div className="bg-slate-800 px-4 py-2 rounded-lg border border-white/5 flex items-center gap-2">
                    <div className="text-right">
                        <p className="text-xs text-slate-400">My Learning Score</p>
                        <p className="text-lg font-bold text-orange-400">850 XP</p>
                    </div>
                    <Award className="text-orange-500" size={24} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingCourses.map(course => (
                    <div key={course.id} className="glass-panel rounded-xl overflow-hidden group hover:border-orange-500/30 transition-colors border border-transparent">
                        <div className="h-40 relative">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="bg-orange-500 p-3 rounded-full text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                                    <Play size={24} fill="white" />
                                </button>
                            </div>
                            <span className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white font-medium">
                                {course.category}
                            </span>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-white mb-1 line-clamp-1">{course.title}</h3>
                            <p className="text-xs text-slate-400 mb-3">By {course.instructor} • {course.duration}</p>
                            
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-medium">
                                    <span className={course.progress === 100 ? "text-green-400" : "text-orange-400"}>
                                        {course.progress === 100 ? "Completed" : `${course.progress}% Complete`}
                                    </span>
                                </div>
                                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-orange-500'}`} 
                                        style={{ width: `${course.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};