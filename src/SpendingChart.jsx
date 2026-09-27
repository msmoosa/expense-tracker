import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function SpendingChart({ transactions }) {
  const totalsByCategory = transactions
    .filter(t => t.type === "expense")
    .reduce((totals, t) => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
      return totals;
    }, {});

  const data = Object.entries(totalsByCategory)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="empty-chart">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: 0 }}>
            <CartesianGrid vertical={false} stroke="#eee" />
            <XAxis dataKey="category" tick={{ fontSize: 13, fill: "#333" }} />
            <YAxis tickFormatter={value => `$${value}`} tick={{ fontSize: 12, fill: "#888" }} />
            <Tooltip
              formatter={value => [`$${value}`, "Spent"]}
              cursor={{ fill: "#f5f5f5" }}
            />
            <Bar dataKey="amount" fill="#d9534f" maxBarSize={48} radius={[4, 4, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
