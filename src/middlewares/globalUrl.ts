import { Request, Response, NextFunction } from 'express';

const validateGlobalUrl = (req: Request, res: Response, next: NextFunction) => {
  const path = req.path;

  // Verifica que la palabra "qualifications" esté bien escrita en la URL
  if (!path.startsWith('/qualifications') && !path.includes('/qualifications')) {
    return res.status(400).json({ message: 'URL inválida: Asegúrese de que la ruta sea correcta' });
  }

  next();
};

export default validateGlobalUrl;
