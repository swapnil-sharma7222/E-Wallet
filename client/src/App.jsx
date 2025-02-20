import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/dashboard.jsx';
import Transactions from './pages/transactions.jsx';
import Transfer from './pages/transfer.jsx';
import Auth from './pages/auth.jsx';
import Navbar from './components/navbar.jsx';
import ProtectedRoute from './components/protectedRoute.jsx';
import Withdraw from './pages/withdraw.jsx';
import Deposit from './pages/deposit.jsx';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        {/* <Route element={<ProtectedRoute />}> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/deposit" element={<Deposit />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}