import { useEffect, useState } from 'react';
import axios from 'axios';
import BalanceCard from '../components/balanceCard.jsx';
import QuickActions from '../components/quickActions.jsx';
import RecentTransactions from '../components/recentTransactions.jsx';

export default function Dashboard() {
  const backend_url= "https://e-wallet-backend-rcid.onrender.com";
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const balanceRes = await axios.get(`${backend_url}/api/wallet/balance`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        const transactionsRes = await axios.get(`${backend_url}/api/transactions`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });

        setBalance(balanceRes.data.balance);
        setTransactions(transactionsRes.data.transactions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <BalanceCard balance={balance} />
            <QuickActions />
          </div>
          <div className="lg:col-span-2">
            <RecentTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}