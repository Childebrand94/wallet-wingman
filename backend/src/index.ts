import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import { router as userRoutes } from './routes/userRoutes.js';
import { errorHandler } from './middleWare/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT

const corsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

