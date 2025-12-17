import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Video, Calendar, Users, 
  DollarSign, BarChart2, Radio, Zap, Newspaper, 
  GraduationCap, Bell, Search, Settings, Menu, X, LogOut
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setIsSidebarOpen(false); // Default closed on mobile
      } else {
        setIsSidebarOpen(true); // Default open on desktop
      }
    };
    
    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'content', label: 'Content Library', icon: Video },
    { id: 'schedule', label: 'Broadcasting', icon: Calendar },
    { id: 'staff', label: 'Staff & HR', icon: Users },
    { id: 'revenue', label: 'Revenue Center', icon: DollarSign },
    { id: 'analytics', label: 'Analytics Hub', icon: BarChart2 },
    { id: 'digital', label: 'Digital Platforms', icon: Radio },
    { id: 'technical', label: 'Tech Operations', icon: Zap },
    { id: 'news', label: 'News Room', icon: Newspaper },
    { id: 'training', label: 'Training Portal', icon: GraduationCap },
  ];

  return (
    <div className="flex h-screen overflow-hidden font-sans bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black text-slate-100">
      
      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed md:relative z-40 h-full bg-slate-900/95 md:bg-slate-900/50 backdrop-blur-xl border-r border-white/5
          transition-all duration-300 ease-in-out flex flex-col shadow-2xl
          ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full md:w-20 md:translate-x-0'}
        `}
      >
        <div className="p-4 flex items-center justify-between h-16 border-b border-white/5">
          <div className={`flex items-center gap-3 transition-opacity duration-300 ${!isSidebarOpen && !isMobile ? 'justify-center w-full opacity-0 md:opacity-100' : 'opacity-100'}`}>
             {/* Logo - only show text if open or mobile (where sidebar is always full width when open) */}
             {(isSidebarOpen || !isMobile) && (
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-bold text-white shadow-lg shadow-orange-500/20">
                  U
                </div>
                {(isSidebarOpen || isMobile) && <span className="font-bold text-xl tracking-tight text-white">UTV Ghana</span>}
              </div>
             )}
          </div>
          {isMobile && isSidebarOpen && (
            <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 space-y-1 custom-scrollbar px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (isMobile) setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-orange-500/10 text-orange-400' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                  } 
                  ${!isSidebarOpen && !isMobile ? 'justify-center' : ''}`
                }
                title={!isSidebarOpen && !isMobile ? item.label : ''}
              >
                <Icon size={20} className={`${isActive ? 'text-orange-400' : 'group-hover:text-white'} transition-colors`} />
                {(isSidebarOpen || isMobile) && (
                  <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                )}
                
                {/* Active Indicator for Mini Sidebar */}
                {isActive && !isSidebarOpen && !isMobile && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-orange-500 rounded-r-full" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-2">
           <button className={`flex items-center gap-4 px-3 py-3 w-full rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors ${!isSidebarOpen && !isMobile ? 'justify-center' : ''}`}>
             <Settings size={20} />
             {(isSidebarOpen || isMobile) && <span className="text-sm font-medium">Settings</span>}
           </button>
           <button className={`flex items-center gap-4 px-3 py-3 w-full rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors ${!isSidebarOpen && !isMobile ? 'justify-center' : ''}`}>
             <LogOut size={20} />
             {(isSidebarOpen || isMobile) && <span className="text-sm font-medium">Logout</span>}
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Header */}
        <header className="h-16 glass-header flex items-center justify-between px-4 md:px-6 z-20 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar} 
              className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu size={20} />
            </button>
            
            <div className="relative hidden md:block w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-slate-900/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all"
              />
            </div>
            {/* Mobile Search Icon */}
            <button className="md:hidden p-2 text-slate-400 hover:text-white">
               <Search size={20} />
            </button>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] md:text-xs font-bold tracking-wider text-red-400">ON AIR</span>
            </div>

            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-slate-900"></span>
            </button>

            <div className="flex items-center gap-3 border-l border-white/10 pl-3 md:pl-6">
              <div className="text-right hidden md:block">
                <p className="text-sm font-semibold text-slate-200">Kwame S.</p>
                <p className="text-xs text-slate-500">Head of Ops</p>
              </div>
              <div className="relative group cursor-pointer">
                <img 
                  src="https://picsum.photos/40/40?random=user" 
                  alt="User" 
                  className="w-9 h-9 rounded-full border border-white/10 group-hover:border-orange-500 transition-colors"
                />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-800 rounded-full"></div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto animate-fade-in pb-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};