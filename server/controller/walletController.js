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
export const depositAmount= async (req, res) => {
  try {
    const { amount } = req.body;
    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount)) {
      throw new Error('Invalid amount');
    }
    const user = await User.findById(req.userId);
    const userBalance= parseFloat(user.balance)
    
    user.balance = userBalance+ depositAmount;
    await user.save();

    const transaction = new Transaction({
      senderId: req.userId,
      receiverId: req.userId,
      amount,
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
export const withdrawAmount= async (req, res) => {
  try {
    const { amount } = req.body;
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount)) {
      throw new Error('Invalid amount');
    }
    const user = await User.findById(req.userId);
    const userBalance= parseFloat(user.balance)
    if (userBalance < withdrawAmount) throw new Error('Insufficient balance');
    user.balance = userBalance- withdrawAmount;
    await user.save();

    const transaction = new Transaction({
      senderId: req.userId,
      receiverId: req.userId,
      amount,
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

export const transferAmount = async (req, res) => {
  try {
    const { receiverEmail, recipientID, amount, description } = req.body;

    const sender = await User.findById(req.userId);
    const receiver = await User.findById(recipientID);
    // console.log('Sender:', sender);
    // console.log('Receiver:', receiver);

    // Check if receiver exists
    if (!receiver) {
      throw new Error(`Receiver with email ${normalizedEmail} does not exist!`);
    }
    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount)) {
      throw new Error('Invalid amount');
    }
    // Check sender's balance
    const senderBalance = parseFloat(sender.balance);
    const receiverBalance = parseFloat(receiver.balance);
    if (senderBalance < transferAmount) {
      throw new Error('Insufficient balance');
    }

    // Update balances
    sender.balance = senderBalance - transferAmount;
    receiver.balance = receiverBalance + transferAmount;
    await sender.save();
    await receiver.save();


    // Create transaction record
    const transaction = new Transaction({
      senderId: req.userId,
      receiverId: recipientID, // Use receiver's ID
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