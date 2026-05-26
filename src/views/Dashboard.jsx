import { useState, useEffect } from 'react';
import { Plus, ArrowUpRight, Wallet, Target } from 'lucide-react';
import { request, API_ROUTES } from '../utils/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import PieChart from '../components/PieChart';
import ExpenseModal from '../components/ExpenseModal';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalSpent: 0,
    remainingBudget: 0,
    pieChartData: [],
    recentExpenses: [],
  });
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [editValue, setEditValue] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

  const fetchDashboardData = async () => {
    try {
      const data = await request(API_ROUTES.dashboard.summary);
      const catList = await request('/categories');
      setSummary(data);
      setCategories(catList);
    } catch (err) {
      console.error('Error fetching dashboard data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleAddExpense = async (newExpense) => {
    try {
      await request(API_ROUTES.expenses.base, {
        method: 'POST',
        body: JSON.stringify(newExpense),
      });
      setIsModalOpen(false);
      fetchDashboardData();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateBudget = async () => {
    try {
      await request('/budgets/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monthly_limit: parseFloat(editValue) }),
      });
      setIsEditingBudget(false);
      fetchDashboardData();
    } catch (err) {
      alert('Update failed: ' + err.message);
    }
  };
    
    const filteredExpenses = (summary?.recentExpenses || []).filter((exp) =>
        exp.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.category_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const navigate = useNavigate()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center font-bold text-slate-400">
        Loading Dashboard Analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen pl-64 pt-20 bg-slate-50">
      <Sidebar />
        <Header
            pageTitle="Dashboard"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
        />

      <main className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Header Controls */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Overview</h1>
            <p className="text-sm text-slate-400">Your financial health for the current month</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#2A5C72] hover:bg-[#1E4353] text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-colors"
          >
            <Plus size={16} /> Add New Expense
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Spending Card */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex justify-between items-start">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Current Month Spending</span>
              <h3 className="text-3xl font-bold text-slate-800">Ksh {summary.totalSpent.toLocaleString()}</h3>
              <p className="text-xs text-green-500 font-medium flex items-center gap-1">
                <ArrowUpRight size={12} /> there's always room for improvement
              </p>
            </div>
            <div className="bg-[#4392B4]/10 p-3 rounded-xl text-[#4392B4]"><Wallet size={20} /></div>
          </div>

          {/* Budget Card */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex justify-between items-start">
            <div className="space-y-2 w-full">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Remaining Budget</span>
                {!isEditingBudget ? (
                  <button onClick={() => { setIsEditingBudget(true); setEditValue(summary.remainingBudget); }} className="text-xs text-[#2A5C72] font-bold hover:underline">Edit</button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={handleUpdateBudget} className="text-xs text-green-600 font-bold hover:underline">Save</button>
                    <button onClick={() => setIsEditingBudget(false)} className="text-xs text-red-400 font-bold hover:underline">Cancel</button>
                  </div>
                )}
              </div>

              {!isEditingBudget ? (
                <h3 className="text-3xl font-bold text-slate-800">Ksh {summary.remainingBudget.toLocaleString()}</h3>
              ) : (
                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="text-2xl font-bold text-slate-800 w-full border-b-2 border-[#2A5C72] outline-none"
                />
              )}
              <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#2A5C72] h-full rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
            <div className="bg-[#2A5C72]/10 p-3 rounded-xl text-[#2A5C72] ml-4"><Target size={20} /></div>
          </div>
        </div>

        {/* Charts & Table Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <PieChart data={summary.pieChartData} />
          </div>

          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-slate-500">Recent Transactions</h3>
              <button onClick={() => navigate('/expenses')} className="text-xs font-bold text-[#2A5C72] hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold uppercase text-slate-400 tracking-wider">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Category</th>
                    <th className="pb-3 font-medium">Description</th>
                    <th className="pb-3 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-600">
                    {filteredExpenses.map((exp) => (
                        <tr key={exp.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3.5">{new Date(exp.date).toLocaleDateString()}</td>
                        <td className="py-3.5">
                            <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">
                            {exp.category_name}
                            </span>
                        </td>
                        <td className="py-3.5 text-slate-500 font-normal">{exp.description || '—'}</td>
                        <td className="py-3.5 text-right font-bold text-red-500">
                            Ksh {Number(exp.amount).toFixed(2)}
                        </td>
                        </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddExpense}
        categories={categories}
      />
    </div>
  );
}