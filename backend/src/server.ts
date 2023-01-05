import express from 'express';
import cors from 'cors';

import githubRoutes from './routes/github-routes';
import googleRoutes from './routes/google-routes';

const PORT = 3001;

const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: 'GET,POST',
  }),
);

app.use(express.json());

app.use('/api/github', githubRoutes);
app.use('/api/google', googleRoutes);

app.listen(PORT, () => console.log('Server on port', PORT));
