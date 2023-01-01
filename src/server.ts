import express from 'express';
import cors from 'cors';

import githubRoutes from './routes/github-routes';

const PORT = 3001;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/github', githubRoutes);

app.listen(PORT, () => console.log('Server on port', PORT));
