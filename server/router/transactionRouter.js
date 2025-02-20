import { Router } from 'express';
import {auth} from './../middleware/authMiddleware.js';
import { getAllTransactions, getTransactionById } from './../controller/transactionController.js';
const router = Router();

// Get all transactions
router.get('/', auth, getAllTransactions);
// Get a transaction by ID
router.get('/:id', auth, getTransactionById);

export default router;