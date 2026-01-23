import { Router } from 'express';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { createSermao, deleteSermao, getSermao, getSermaoById, updateSermao, getSermoesByUserId } from '../controllers/sermaoController';
import upload from '../middlewares/uploadMiddleware';
const router = Router();

// Criar um sermao
router.post('/sermao', authenticateJWT, upload.single("mediaFile"), createSermao);

// Obter todos
router.get('/sermao', authenticateJWT, getSermao);

// Obter os sermões de um usuário 
router.get('/sermao/user/:userId', authenticateJWT, getSermoesByUserId);

// Sermao específico
router.get('/sermao/:id', authenticateJWT, getSermaoById);

// Atualizar sermao
router.put('/sermao/:id', authenticateJWT, upload.single("mediaFile"), updateSermao);

// Excluir sermao
router.delete('/sermao/:id', authenticateJWT, deleteSermao);

export default router;
