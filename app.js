import "reflect-metadata";
import express, { Request, Response } from 'express';
import dotenv from "dotenv";

const app = express();
const PORT = 4000;
dotenv.config();

// Routes
app.use('/users', userRouter);

// Global error handler (must be last!)
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});