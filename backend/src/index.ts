import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import rootRouter from './routes/index';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000,() => {
    console.log(`Server is running`);
  });