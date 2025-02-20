import { Router } from 'express';
import { register, login, logout } from './../controller/authController.js';
const router = Router();

// Register route
router.post('/register', register);
// Login route
router.post('/login', login);
// Logout route
router.post('/logout', logout);

export default router;