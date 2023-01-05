import express, { Request, Response, Router } from 'express';
import * as googleServices from '../services/google-services';

const router: Router = express.Router();

router.get('/userData', (req: Request, res: Response) => {
  const accessToken = req.query.accessToken;
  googleServices
    .getUserData(accessToken as string)
    .then((resp) => res.json(resp));
});

export default router;
