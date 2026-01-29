import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createSermao = async (req: any, res: any) => {
  try {
    const { title, content, date } = req.body;
    const mediaFile = req.file; // Arquivo enviado via form-data
    console.log(req.headers["content-type"]);
    console.log(req.file);
    // Verifica se o userType é "LEADER"
    if (req.user.userType !== "LEADER") {
      return res.status(403).json({ message: "Only LEADER users can create sermões." });
    }

    // Verifica se um arquivo foi enviado
    if (!mediaFile) {
      return res.status(400).json({ message: "Media file is required." });
    }

    // Cria o sermão
    const sermao = await prisma.sermao.create({
      data: {
        title,
        content,
        date: new Date(date),
        mediaFile: mediaFile.path,
        userId: req.user.id,
      },
    });

    return res.status(201).json(sermao);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Obter todos os sermões
export const getSermao = async (req: any, res: any) => {
  try {
    const sermoes = await prisma.sermao.findMany({
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    return res.status(200).json(sermoes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getSermoesByUserId = async (req: any, res: any) => {
  const userId = req.user.id;
  try {
    const userSermoes = await prisma.sermao.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return res.status(200).json(userSermoes);
  } catch (error) {
    console.error("Erro ao buscar os sermões do usuário", error);
    return res.status(500).json({ message: "Erro interno" });
  }
}

//Buscar sermão por ID
export const getSermaoById = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const sermao = await prisma.sermao.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!sermao) {
      return res.status(404).json({ message: 'Sermao not found' });
    }

    return res.status(200).json(sermao);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

// Atualizar sermão
export const updateSermao = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { title, content, date } = req.body;
    const mediaFile = req.file;

    // Verifica se o usuário que está tentando atualizar é o criador ou um LEADER
    const sermao = await prisma.sermao.findUnique({
      where: { id },
    });

    if (!sermao) {
      return res.status(404).json({ message: 'Sermao not found' });
    }

    // Se o usuário não for o criador ou não for LEADER, não pode atualizar
    if (req.user.userType !== 'LEADER' && sermao.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only update your own content or be a LEADER to update this' });
    }

    const dataToUpdate: any = {
      title,
      content,
      date: new Date(date),
    };

  
    if (mediaFile) {
      dataToUpdate.mediaFile = mediaFile.path;
    }

    const updatedSermao = await prisma.sermao.update({
      where: { id },
      data: dataToUpdate,
    });

    return res.status(200).json(updatedSermao);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

//Apagar sermão
export const deleteSermao = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const sermao = await prisma.sermao.findUnique({
      where: { id },
    });

    if (!sermao) {
      return res.status(404).json({ message: 'Sermao not found' });
    }

    // Se o usuário não for o criador ou não for LEADER, não pode excluir
    if (req.user.userType !== 'LEADER' && sermao.userId !== req.user.id) {
      return res.status(403).json({ message: 'You can only delete your own content or be a LEADER to delete this' });
    }

    // Exclui o sermao
    await prisma.sermao.delete({
      where: { id },
    });

    return res.status(200).json({ message: 'Sermao deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
