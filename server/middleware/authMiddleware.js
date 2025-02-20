import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.header('Authorization');
  
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Invalid token', error });
  }
};