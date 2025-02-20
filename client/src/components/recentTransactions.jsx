import { Link } from 'react-router-dom';

export default function RecentTransactions({ transactions }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Recent Transactions</h3>
        {/* <Link to="/transactions" className="text-sm text-blue-600 hover:text-blue-800">
          View all →
        </Link> */}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b">
              <th className="pb-3">Type</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">From/To</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction._id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3">
                  <span className="capitalize">{transaction.type}</span>
                </td>
                <td className="py-3">
                  <span className={`font-medium ${
                    transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${transaction.amount.toFixed(2)}
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-600">
                  {transaction.type === 'transfer' ? (
                    <>
                      <div>From: {transaction.senderId}</div>
                      <div>To: {transaction.receiverId}</div>
                    </>
                  ) : 'N/A'}
                </td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    transaction.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : transaction.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {transaction.status}
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-500">
                  {new Date(transaction.timestamp).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {transactions.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No transactions found
          </div>
        )}
      </div>
    </div>
  );
}
