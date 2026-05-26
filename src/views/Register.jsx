import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request, API_ROUTES } from '../utils/api';
import { Receipt } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await request(API_ROUTES.auth.register, {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
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
          <h1 className="font-extrabold text-2xl text-slate-800 tracking-tight">Create Account</h1>
          <p className="text-sm text-slate-400 font-medium">Start your journey to financial freedom</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-xl p-3 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
            <input
              type="text" required value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Anzigale George"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2A5C72] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="anzigalegeorge@gmail.com"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2A5C72] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2A5C72] text-sm"
            />
          </div>

          <div className="flex items-center gap-2 py-1">
            <input type="checkbox" required id="terms" className="w-4 h-4 text-[#2A5C72] border-slate-300 rounded focus:ring-[#2A5C72]" />
            <label htmlFor="terms" className="text-xs text-slate-400 font-medium select-none">I agree to the Terms of Service and Privacy Policy.</label>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-3 bg-[#2A5C72] hover:bg-[#1E4353] disabled:bg-slate-400 text-white font-bold rounded-xl text-sm transition-colors shadow-sm"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="text-center">
          <button onClick={() => navigate('/login')} className="text-sm text-slate-500 font-medium hover:text-[#2A5C72] transition-colors">
            Already have an account? <span className="font-bold underline">Log in</span>
          </button>
        </div>
      </div>
    </div>
  );
}