import express, { Request, Response, Router } from 'express';
import * as githubServices from '../controllers/github-controller';

const router: Router = express.Router();

router.get('/accessToken', (req: Request, res: Response) => {
  const code = req.query.code;
  githubServices.getAccessToken(code as string).then((resp) => res.json(resp));
});

router.get('/userData', (req: Request, res: Response) => {
  const accessToken = req.query.accessToken;
  githubServices
    .getUserData(accessToken as string)
    .then((resp) => res.json(resp));
});

export default router;
