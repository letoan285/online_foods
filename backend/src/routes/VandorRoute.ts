import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.json({message: 'Vandor Route'})
});

export { router as VandorRoute };