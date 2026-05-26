export default function PieChart({ data = [] }) {
  const total = data.reduce((sum, item) => sum + Number(item.value || 0), 0);
  
  const colors = ['#2A5C72', '#4392B4', '#D97706', '#7C3AED', '#EF4444'];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center h-[340px]">
      <h3 className=" font-bold text-slate-500 self-start mb-4">Spending by Category</h3>
      
      {total === 0 ? (
        <p className="text-sm text-slate-400 py-20">No expense records logged yet.</p>
      ) : (
        <div className="flex items-center gap-8 w-full justify-around">
          {/* Simulated Doughnut Chart UI Frame */}
          <div className="relative w-40 h-40 rounded-full flex items-center justify-center bg-slate-100 shadow-inner"
               style={{
                 background: `conic-gradient(
                   ${data.map((item, index) => {
                     const previousPercentages = data.slice(0, index).reduce((sum, i) => sum + (i.value / total) * 363, 0);
                     const currentPercentage = (item.value / total) * 363;
                     return `${colors[index % colors.length]} ${previousPercentages}deg ${previousPercentages + currentPercentage}deg`;
                   }).join(', ')}
                 )`
               }}
          >
            <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-sm">
              <span className=" text-slate-400 font-medium">Total Spent</span>
              <span className="text-lg font-bold text-slate-800">${total.toLocaleString()}</span>
            </div>
          </div>

          {/* Dynamic Descriptive Legend */}
          <div className="space-y-2 max-w-[180px]">
            {data.map((item, index) => (
              <div key={item.category} className="flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                  <span className="text-slate-600 font-medium truncate max-w-[100px]">{item.category}</span>
                </div>
                <span className="font-bold text-slate-800">{((item.value / total) * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}