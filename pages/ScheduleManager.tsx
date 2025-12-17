import React from 'react';
import { Calendar as CalendarIcon, Download, ChevronLeft, ChevronRight, Clock, MoreHorizontal } from 'lucide-react';
import { mockSchedule } from '../services/mockData.ts';

export const ScheduleManager: React.FC = () => {
  // Generate time slots from 6:00 to 20:00 (matching mock data range)
  const timeSlots = Array.from({ length: 15 }, (_, i) => `${6 + i}:00`);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getEvent = (day: string, time: string) => {
    return mockSchedule.find(s => s.day === day && s.time === time);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Broadcast Schedule</h1>
          <p className="text-slate-400">Weekly programming grid</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex bg-slate-800/80 rounded-lg p-1 border border-white/5">
            <button className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"><ChevronLeft size={18} /></button>
            <span className="px-4 py-1.5 text-sm font-medium text-slate-200">Oct 23 - Oct 29</span>
            <button className="p-1.5 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-colors"><ChevronRight size={18} /></button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/5 text-white rounded-lg transition-colors text-sm font-medium ml-auto md:ml-0">
            <Download size={16} /> <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl flex-1 flex flex-col overflow-hidden shadow-xl ring-1 ring-white/5">
        <div className="overflow-x-auto overflow-y-hidden custom-scrollbar bg-slate-800/50">
           {/* Grid Container with min-width to force scroll on mobile */}
           <div className="min-w-[1000px] flex flex-col h-full">
            
            {/* Header Row */}
            <div className="grid grid-cols-8 border-b border-white/5 bg-slate-900/50 sticky top-0 z-10">
              <div className="p-4 border-r border-white/5 flex items-center justify-center text-slate-400 font-medium">
                <Clock size={20} />
              </div>
              {days.map(day => (
                <div key={day} className="p-4 text-center border-r border-white/5 last:border-0 group hover:bg-slate-800/30 transition-colors">
                  <span className="block font-bold text-white text-sm uppercase tracking-wider mb-1">{day}</span>
                  <span className="text-xs text-orange-400 font-medium bg-orange-500/10 px-2 py-0.5 rounded-full inline-block">Oct {23 + days.indexOf(day)}</span>
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {timeSlots.map(time => (
                <div key={time} className="grid grid-cols-8 border-b border-white/5 min-h-[110px] bg-slate-800/10 hover:bg-slate-800/20 transition-colors">
                  <div className="p-3 border-r border-white/5 bg-slate-900/30 text-xs font-mono text-slate-400 text-center flex items-center justify-center">
                    {time}
                  </div>
                  {days.map(day => {
                    const event = getEvent(day, time);
                    return (
                      <div key={`${day}-${time}`} className="border-r border-white/5 p-1 relative group transition-colors">
                        {event ? (
                          <div className={`w-full h-full rounded-lg p-3 text-xs border cursor-pointer transform hover:scale-[1.02] transition-all shadow-lg flex flex-col
                            ${event.type === 'Live' 
                              ? 'bg-gradient-to-br from-red-900/40 to-red-900/10 border-red-500/30 text-red-100 hover:border-red-500/50' 
                              : 'bg-gradient-to-br from-blue-900/40 to-blue-900/10 border-blue-500/30 text-blue-100 hover:border-blue-500/50'
                            }`}>
                            <div className="flex justify-between items-start mb-1">
                              <span className={`px-1.5 py-0.5 rounded-[3px] text-[9px] font-bold uppercase tracking-wider ${event.type === 'Live' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}>
                                {event.type}
                              </span>
                            </div>
                            <div className="font-bold mb-1 line-clamp-3 leading-tight flex-1" title={event.programTitle}>
                              {event.programTitle || 'Untitled Program'}
                            </div>
                            <div className="opacity-75 text-[10px] mt-auto">60 min</div>
                          </div>
                        ) : (
                          <div className="w-full h-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <button className="text-xs bg-slate-700/50 hover:bg-orange-600 hover:text-white px-3 py-1.5 rounded-full text-slate-300 border border-white/10 hover:border-orange-500 transition-all transform hover:scale-105">
                              + Add
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};