import prisma from '../utils/prismaClient';

export const getAllQualifications = async (id?: number) => {
  if (id) {
    return await prisma.qualification.findUnique({
      where: { id },
      include: {
        qualityCalification: true,
        timeCalification: true,
        packagingCalification: true,
        communicationCalification: true,
      },
    });
  }
  return await prisma.qualification.findMany({
    include: {
      qualityCalification: true,
      timeCalification: true,
      packagingCalification: true,
      communicationCalification: true,
    },
  });
};

export const createQualifications = async (data: any) => {
  const qualification = await prisma.qualification.create({
    data: {
      ...data,
      qualityCalification: {
        create: data.qualityCalification
      },
      timeCalification: {
        create: data.timeCalification
      },
      packagingCalification: {
        create: data.packagingCalification
      },
      communicationCalification: {
        create: data.communicationCalification
      }
    },
    include: {
      qualityCalification: true,
      timeCalification: true,
      packagingCalification: true,
      communicationCalification: true,
    },
  });
  return qualification;
};

export const updateQualifications = async (id: number, data: any) => {
  // Primero, actualiza las calificaciones existentes si los IDs de calificación están presentes en el cuerpo de la solicitud.
  const updatedQualification = await prisma.qualification.update({
    where: { id },
    data: {
      ...data,
      qualityCalification: {
        update: data.qualityCalification ? {
          where: { id: data.qualityCalification.id },
          data: data.qualityCalification
        } : undefined
      },
      timeCalification: {
        update: data.timeCalification ? {
          where: { id: data.timeCalification.id },
          data: data.timeCalification
        } : undefined
      },
      packagingCalification: {
        update: data.packagingCalification ? {
          where: { id: data.packagingCalification.id },
          data: data.packagingCalification
        } : undefined
      },
      communicationCalification: {
        update: data.communicationCalification ? {
          where: { id: data.communicationCalification.id },
          data: data.communicationCalification
        } : undefined
      }
    },
    include: {
      qualityCalification: true,
      timeCalification: true,
      packagingCalification: true,
      communicationCalification: true,
    },
  });
  return updatedQualification;
};

export const deleteQualification = async (id: number) => {
  return await prisma.qualification.delete({
    where: { id },
  });
};
