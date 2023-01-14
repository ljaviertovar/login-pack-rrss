import express, { Request, Response, Router } from 'express';
import { getUserData } from '../controllers/google-controller';

const router: Router = express.Router();

router.get('/userData', (req: Request, res: Response) => {
  const accessToken = req.query.accessToken;
  getUserData(accessToken as string).then((resp) => res.json(resp));
});

export default router;
