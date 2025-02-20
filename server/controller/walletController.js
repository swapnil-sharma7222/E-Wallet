import User from './../model/user.js'
import Transaction from './../model/transactions.js';


// Get Balance
export const getUserBalance= async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ balance: user.balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Deposit
export const depositAmount = async (req, res) => {
  try {
    const { amount } = req.body;
    const depositAmount = parseFloat(amount);

    // Validate the amount
    if (isNaN(depositAmount) || depositAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const user = await User.findById(req.userId);
    const userBalance = parseFloat(user.balance);
    
    // Update user's balance
    user.balance = userBalance + depositAmount;
    await user.save();

    // Create transaction record
    const transaction = new Transaction({
      senderId: req.userId,
      receiverId: req.userId,
      amount: depositAmount,
      type: 'deposit',
      status: 'completed',
      description: 'Deposit to wallet'
    });
    await transaction.save();

    res.json({ message: 'Deposit successful', balance: user.balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Withdraw
export const withdrawAmount = async (req, res) => {
  try {
    const { amount } = req.body;
    const withdrawAmount = parseFloat(amount);

    // Validate the amount
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    const user = await User.findById(req.userId);
    const userBalance = parseFloat(user.balance);

    // Check if user has sufficient balance
    if (userBalance < withdrawAmount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Update user's balance
    user.balance = userBalance - withdrawAmount;
    await user.save();

    // Create transaction record
    const transaction = new Transaction({
      senderId: req.userId,
      receiverId: req.userId,
      amount: withdrawAmount,
      type: 'withdrawal',
      status: 'completed',
      description: 'Withdrawal from wallet'
    });
    await transaction.save();

    res.json({ message: 'Withdrawal successful', balance: user.balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Transfer Amount
export const transferAmount = async (req, res) => {
  try {
    const { recipientEmail, amount, description } = req.body;

    const sender = await User.findById(req.userId);
    const receiver = await User.findOne({email: recipientEmail});
    console.log(sender, receiver);
    

    // Check if receiver exists
    if (!receiver) {
      return res.status(400).json({ error: 'Receiver does not exist!' });
    }

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // Check sender's balance
    const senderBalance = parseFloat(sender.balance);
    const receiverBalance = parseFloat(receiver.balance);
    if (senderBalance < transferAmount) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    // Update balances
    sender.balance = senderBalance - transferAmount;
    receiver.balance = receiverBalance + transferAmount;
    await sender.save();
    await receiver.save();

    // Create transaction record
    const transaction = new Transaction({
      senderId: req.userId,
      receiverId: receiver._id,
      amount: transferAmount,
      type: 'transfer',
      status: 'completed',
      description: description,
    });
    await transaction.save();

    res.json({ message: 'Transfer successful', balance: sender.balance });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
