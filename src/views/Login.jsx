import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request, API_ROUTES } from '../utils/api';
import { Receipt } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await request(API_ROUTES.auth.login, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('userName', data.user.name);
      navigate('/');
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-xl rounded-2xl p-8 space-y-6">
        
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="bg-[#2A5C72] p-3 rounded-2xl text-white shadow-md">
            <Receipt size={32} />
          </div>
          <h1 className="font-extrabold text-2xl text-slate-800 tracking-tight">Welcome!</h1>
          <p className="text-sm text-slate-400 font-medium">Personal Finance Tracker</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-3 text-sm font-medium text-center">
            {error}
          </div>
        )}

        {/* Input */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="anzigalegeorge@gmail.com"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2A5C72] text-sm"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
            </div>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2A5C72] text-sm"
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-[#2A5C72] hover:bg-[#1E4353] disabled:bg-slate-400 text-white font-bold rounded-xl text-sm transition-colors shadow-sm pt-2"
          >
            {loading ? 'Authenticating...' : 'Log In →'}
          </button>
        </form>

        <div className="text-center">
          <button onClick={() => navigate('/register')} className="text-sm text-slate-500 font-medium hover:text-[#2A5C72] transition-colors">
            Don't have an account? <span className="font-bold underline">Register</span>
          </button>
        </div>
      </div>
    </div>
  );
}