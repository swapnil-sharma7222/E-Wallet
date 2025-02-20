import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

export default function Withdraw() {
  const backend_url= "https://e-wallet-backend-rcid.onrender.com";
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${backend_url}/api/wallet/withdraw`, formData, {
        headers: {
          Authorization: localStorage.getItem('token'), 
        },
      });
      toast.success('Transfer successful!');
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Transfer failed. Please try again.';
      toast.error(errorMessage)
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Withdraw Money</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              {/* <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span> */}
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="0.01"
                step="0.01"
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Add a note for the recipient"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all flex items-center justify-center"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Withdraw Now'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}