// components/QuickActions.jsx
import { Link } from 'react-router-dom';

export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/transfer"
          className="p-4 text-center rounded-lg bg-blue-100 hover:bg-blue-200 transition-colors"
        >
          <span className="text-blue-600 font-medium">Transfer Money</span>
        </Link>
        <Link to="/deposit" className="p-4 text-center rounded-lg bg-green-100 hover:bg-green-200 transition-colors">
          <span className="text-green-600 font-medium">Deposit</span>
        </Link>
        <Link to="/withdraw" className="p-4 text-center rounded-lg bg-red-100 hover:bg-red-200 transition-colors">
          <span className="text-red-600 font-medium">Withdraw</span>
        </Link>
      </div>
    </div>
  );
}
