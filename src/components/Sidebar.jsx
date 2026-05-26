import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, PilcrowRight, LogOut } from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { text: 'Expenses', icon: PilcrowRight, path: '/expenses' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0 flex flex-col justify-between p-6">
      <div className="space-y-8">
        {/* Brand Logo Header */}
        <div className="flex items-center gap-3 px-2">
          <div className="bg-[#1d343d] p-2 rounded-xl text-white">
            <PilcrowRight size={24} />
          </div>
          <div>
            <h1 className="font-bold text-xl text-slate-800 tracking-tight">SpenTrack</h1>
            <p className="text-xs text-slate-400">Personal Finance</p>
          </div>
        </div>

        {/* Navigation Paths */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.text}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#2A5C72]/10 text-[#2A5C72]'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Icon size={18} />
                {item.text}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Action Trigger */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}