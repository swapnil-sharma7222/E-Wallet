import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { compare } from 'bcrypt';
import User from './../model/user.js';

// Register a new user
export const register = async (req, res) => {
  try {
    const {username, email, password} = req.body;
    const newUser= await User.findOne({email})
    if(newUser) throw new Error('User already exists');
    const user = new User({username, email, password});
    await user.save();
    res.status(201).json({ 
      message: 'User registered successfully' 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    
    const user = await User.findOne({email});
    if (!user) throw new Error('User not found');

    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    res.json({message: 'Logged out successfully'});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
};