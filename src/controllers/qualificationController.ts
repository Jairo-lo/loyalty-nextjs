import { Request, Response } from 'express';
import {
  getAllQualifications as fetchAllQualifications,
  createQualifications as addNewQualifications,
  updateQualifications as modifyQualifications,
  deleteQualification as removeQualification
} from '../services/qualificationService';

export const getQualifications = async (req: Request, res: Response) => {
  try {
    if (req.params.id) {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "URL inválida" });
      }
      const qualification = await fetchAllQualifications(id);
      if (!qualification) {
        return res.status(404).json({ message: `No se encontró una calificación con el ID ${id}` });
      }
      return res.json(qualification);
    }
    
    const qualifications = await fetchAllQualifications();
    res.json(qualifications);
  } catch (error) {
    console.error("Error fetching qualifications:", error);
    res.status(500).json({ message: 'Error fetching qualifications' });
  }
};

export const createQualifications = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newQualifications = await addNewQualifications(data);
    return res.status(201).json({
      status: 201,
      message: 'Calificación creada correctamente',
      response: newQualifications,
    });
  } catch (error) {
    console.error("Error creating qualifications:", error);
    res.status(500).json({ message: 'Error creating qualifications' });
  }
};

export const updateQualifications = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        message: 'El ID proporcionado no es válido',
      });
    }

    const updatedQualification = await modifyQualifications(id, req.body);

    if (!updatedQualification) {
      return res.status(404).json({
        status: 404,
        message: 'No se puede actualizar, dicho ID no existe',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Datos Actualizados Correctamente',
      response: updatedQualification,
    });
  } catch (error) {
    console.error("Error updating qualification:", error);
    res.status(500).json({ message: 'Error updating qualification' });
  }
};

export const deleteQualification = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({
        status: 400,
        message: 'El ID proporcionado no es válido',
      });
    }

    const deletedQualification = await removeQualification(id);
    if (!deletedQualification) {
      return res.status(404).json({
        status: 404,
        message: 'No se puede eliminar, dicho ID no existe',
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Eliminación exitosa',
      response: { id }, 
    });
  } catch (error) {
    console.error("Error deleting qualification:", error);
    res.status(500).json({ message: 'Error deleting qualification' });
  }
};
