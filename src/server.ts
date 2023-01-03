import express from 'express';
import cors from 'cors';

import githubRoutes from './routes/github-routes';
import gooleRoutes from './routes/google-routes';

const PORT = 3001;

const app = express();

app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: 'GET,POST',
  }),
);

app.use(express.json());

app.use('/api/github', githubRoutes);
app.use('/api/google', gooleRoutes);

app.listen(PORT, () => console.log('Server on port', PORT));
