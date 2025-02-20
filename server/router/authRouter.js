import { Router } from 'express';
import { register, login, logout } from './../controller/authController.js';
import User from '../model/user.js';
const router = Router();

// Verify JWT token
router.get('/verify', async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Return user details (optional)
    res.json({
      userId: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
});

// Register route
router.post('/register', register);
// Login route
router.post('/login', login);
// Logout route
router.post('/logout', logout);

export default router;