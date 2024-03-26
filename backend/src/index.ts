import express, { Response, Request } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT

const corsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res: Response) => {
    res.json({ message: 'Hello World!' });
});

app.use((req: Request, res: Response) => {
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

