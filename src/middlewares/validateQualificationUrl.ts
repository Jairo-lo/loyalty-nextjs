import { Request, Response, NextFunction } from 'express';
import prisma from '../utils/prismaClient';

class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const validateQualificationUrl = async (req: Request, res: Response, next: NextFunction) => {
  const qualificationId = parseInt(req.params.id, 10);

  // Si hay un id en la URL, verifica que exista en la base de datos
  if (req.params.id) {
    if (isNaN(qualificationId)) {
      const error = new CustomError('URL INVALIDA', 400);
      return next(error);
    }

    const qualificationExists = await prisma.qualification.findUnique({
      where: { id: qualificationId },
    });

    if (!qualificationExists) {
      const error = new CustomError(`No se encontró una calificación con el ID ${qualificationId}`, 404);
      return next(error);
    }
  }

  next();
};

export default validateQualificationUrl;
