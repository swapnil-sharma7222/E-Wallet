import express, { json } from 'express';
import pkg from 'body-parser';
const { urlencoded } = pkg;
import authRoutes from './router/authRouter.js';
import transactionRouter from './router/transactionRouter.js';
import walletRouter from './router/walletRouter.js';
import connectdb from './db.js';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }))

dotenv.config();
app.use(cors());
connectdb();

app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRouter);
app.use('/api/transactions', transactionRouter);

const PORT = process.env.PORT;
// if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
// }

// export default app;