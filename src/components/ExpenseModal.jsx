import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function ExpenseModal({ isOpen, onClose, onSave, expenseData = null, categories = [] }) {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (expenseData) {
      setAmount(expenseData.amount);
      setDate(expenseData.date ? expenseData.date.substring(0, 10) : '');
      setCategoryId(expenseData.category_id);
      setDescription(expenseData.description || '');
    } else {
      setAmount('');
      setDate(new Date().toISOString().substring(0, 10));
      setCategoryId(categories[0]?.id || '');
      setDescription('');
    }
  }, [expenseData, isOpen, categories]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...(expenseData && { id: expenseData.id }),
      amount: parseFloat(amount),
      date,
      category_id: parseInt(categoryId),
      description
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Block Frame */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h3 className="font-bold text-lg text-slate-800">
            {expenseData ? 'Edit Expense' : 'Add Expense'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        {/* Context Submission Form Element */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Amount</label>
            <input
              type="number" step="0.01" required value={amount} onChange={(e) => setAmount(e.target.value)}
              placeholder="Ksh 0.00"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2A5C72] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Date</label>
            <input
              type="date" required value={date} onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2A5C72] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Category</label>
            <select
              value={categoryId} required onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#2A5C72] text-sm"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">Description</label>
            <textarea
              value={description} onChange={(e) => setDescription(e.target.value)}
              placeholder="What was this for?" rows="3"
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:border-[#2A5C72] text-sm resize-none"
            />
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#2A5C72] hover:bg-[#1E4353] text-white font-semibold rounded-xl text-sm transition-colors shadow-sm"
            >
              Save Expense
            </button>
            <button
              type="button" onClick={onClose}
              className="w-full py-3 border border-slate-200 hover:bg-slate-50 text-slate-500 font-semibold rounded-xl text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}