import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
  senderId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', required: true 
  },
  receiverId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['deposit', 'withdrawal', 'transfer'], 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'], 
    default: 'pending' 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  description: { 
    type: String 
  }
});

export default model('Transaction', transactionSchema);
