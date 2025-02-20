import Transaction from './../model/transactions.js'

// Get all transactions for the authenticated user
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ senderId: req.userId }, { receiverId: req.userId }]
    }).sort({ timestamp: -1 }); // Sort by most recent transactions first

    res.json({
      transactions
    });
  } catch (error) {
    res.status(400).json({ 
      error: error.message 
    });
  }
};

// Get a specific transaction by ID
export const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      $or: [{ senderId: req.userId }, { receiverId: req.userId }]
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};