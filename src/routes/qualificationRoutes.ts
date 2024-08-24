/**
import { Router } from 'express';
import { getQualifications, createQualifications, updateQualifications, deleteQualification } from '../controllers/qualificationController';
import validateQualificationUrl from '../middlewares/validateQualificationUrl';

const router = Router();

router.get('/qualifications/:id?', validateQualificationUrl, getQualifications);
router.post('/qualifications', validateQualificationUrl, createQualifications);
router.put('/qualifications/:id', validateQualificationUrl, updateQualifications);
router.delete('/qualifications/:id', validateQualificationUrl, deleteQualification);

export default router;
*/

import { Router, Request, Response, NextFunction } from 'express';
import { getQualifications, createQualifications, updateQualifications, deleteQualification } from '../controllers/qualificationController';
import validateQualificationUrl from '../middlewares/validateQualificationUrl';

const router = Router();

// Rutas para GET
router.get('/qualifications/:id?', validateQualificationUrl, getQualifications);

// Middleware para manejar métodos no permitidos
router.use('/qualifications', (req: Request, res: Response) => {
    res.status(405).json({ message: 'Method Not Allowed. Only GET requests are allowed.' });
});

export default router;
