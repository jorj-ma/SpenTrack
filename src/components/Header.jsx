import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ pageTitle, searchTerm, setSearchTerm, user }) {
  const displayName = user?.name || 'User';

  return (
    <header className="h-20 bg-white border-b border-slate-200 fixed top-0 right-0 left-64 z-10 flex items-center justify-between px-8">
      <h2 className="font-bold text-xl text-slate-800">{pageTitle}</h2>

      <div className="flex items-center gap-6">

        {/* Search Component */}
        {setSearchTerm && (
          <div className="relative w-80">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              value={searchTerm || ""}
              placeholder="Search transactions..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#2A5C72] transition-colors"
            />
          </div>
        )}

        {/* Profile data brief */}
        <Link to="/profile" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-800">{displayName}</p>
              <p className="text-xs text-slate-400">{displayName}'s Tracker</p>
            </div>

            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#2A5C72] to-[#4392B4] flex items-center justify-center text-white font-bold text-sm">
              {displayName.charAt(0).toUpperCase()}
            </div>
          </div>
        </Link>

      </div>
    </header>
  );
}