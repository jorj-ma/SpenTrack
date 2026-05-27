import { useState, useEffect } from 'react';
import { request, API_ROUTES } from '../utils/api';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ExpenseModal from '../components/ExpenseModal';
import { Edit2, Trash2, Plus, Download } from 'lucide-react';

export default function Expenses({user, setUser}) {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeExpense, setActiveExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  

  const loadExpensesData = async () => {
    try {
      const list = await request(API_ROUTES.expenses.base);
      const catList = await request("/categories");
      setExpenses(list);
      setCategories(catList);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadExpensesData(); }, []);

  const handleOpenEdit = (expense) => {
    setActiveExpense(expense);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setActiveExpense(null);
    setIsModalOpen(true);
  };

  const handleSaveExpense = async (formData) => {
    try {
      if (formData.id) {
        await request(API_ROUTES.expenses.detail(formData.id), {
          method: 'PUT',
          body: JSON.stringify(formData),
        });
      } else {
        await request(API_ROUTES.expenses.base, {
          method: 'POST',
          body: JSON.stringify(formData),
        });
      }
      setIsModalOpen(false);
      loadExpensesData();
    } catch (err) {
      alert(formData.id ? "Failed modification override update" : "Failed insertion");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this transactional ledger item?")) return;
    try {
      await request(API_ROUTES.expenses.detail(id), { method: 'DELETE' });
      setExpenses(expenses.filter(item => item.id !== id));
    } catch (err) {
      alert("Failed removal command block processing validation logic loop.");
    }
  };

const filteredExpenses = expenses.filter((exp) =>
  exp.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  exp.category?.toLowerCase().includes(searchTerm.toLowerCase())
);
  
  if (loading) return <div className="flex min-h-screen items-center justify-center font-bold text-slate-400">Loading Transaction Matrices...</div>;

  return (
    <div className="min-h-screen pl-64 pt-20 bg-slate-50">
      <Sidebar setUser={setUser} />
      <Header 
        pageTitle="Expenses"
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        user={user}
      />

      <main className="p-8 space-y-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Recent Transactions</h1>
            <p className="text-xs text-slate-400">Review and manage your detailed transaction history</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleOpenCreate}
              className="bg-[#2A5C72] hover:bg-[#1E4353] text-white font-semibold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 transition-colors"
            >
              <Plus size={14} /> Add Expense
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-xs font-bold uppercase text-slate-400 tracking-wider">
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-600">
              {filteredExpenses.length === 0 ? (
                <tr><td colSpan="5" className="text-center py-10 text-slate-400">No transactions recorded yet.</td></tr>
              ) : (
                filteredExpenses.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="p-4">{new Date(item.date).toLocaleDateString()}</td>
                    <td className="p-4"><span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold">{item.category}</span></td>
                    <td className="p-4 text-slate-400 font-normal">{item.description || '—'}</td>
                    <td className="p-4 font-bold text-slate-800">Ksh {Number(item.amount).toFixed(2)}</td>
                    <td className="p-4">
                      <div className="flex justify-center items-center gap-3 text-slate-400">
                        <button onClick={() => handleOpenEdit(item)} className="hover:text-[#2A5C72] transition-colors"><Edit2 size={16} /></button>
                        <button onClick={() => handleDelete(item.id)} className="hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveExpense}
        expenseData={activeExpense}
        categories={categories}
      />
    </div>
  );
}