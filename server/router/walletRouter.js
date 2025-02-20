import { Router } from 'express';
const router = Router();
import {auth} from './../middleware/authMiddleware.js';
import { getUserBalance, depositAmount, withdrawAmount, transferAmount } from './../controller/walletController.js';
import User from '../model/user.js';

// Get Balance
router.get('/balance', auth, getUserBalance);

// Deposit
router.post('/deposit', auth, depositAmount);

// Withdraw
router.post('/withdraw', auth, withdrawAmount);

// Transfer
router.post('/transfer', auth, transferAmount);

export default router;