export default function BalanceCard({ balance }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-gray-500 text-sm font-medium">Available Balance</h2>
      <div className="mt-2 flex items-baseline">
        <span className="text-3xl font-bold text-gray-900">${balance.toFixed(2)}</span>
      </div>
    </div>
  );
}