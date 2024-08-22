import express from 'express';
import logger from '../middleware/logger.js';
import { ProfessorService } from '../service/professorService.js';

const router = express.Router()

const professorService = new ProfessorService();

// Essa rota usa o middleware logger
router.use(logger);

// GET /professor -> retorna lista de professores
router.get('/', async (req, res) => {
  try {
    // GET professor/?nome= busca por nome
    if (req.query.nome) {
      const nome = req.query.nome;
      const professores = await professorService.readProfessoresPorNome(nome);
      res.json(professores);
    } else {
      const professores = await professorService.listarProfessores();
      res.json(professores);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// GET /professor/:id -> retorna professor de ID :id
router.get('/:id', async (req, res) => {
  try {
    const professor = await professorService.readProfessor(req.params.id);
    if (!professor) {
      res.sendStatus(404);
    } else {
      res.json(professor);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

// POST /professor -> cria um professor
router.post('/', async (req, res) => {
  try {
    const professor = req.body;
    if (!professor.nome) {
      res.sendStatus(400);
    } else {
      await professorService.createProfessor(professor.nome);
      res.sendStatus(201);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

// PUT /professor/:id -> Edita o professor de ID :id
router.put('/:id', async (req, res) => {
  try {
    const professor = await professorService.readProfessor(req.params.id);
    if (!professor) {
      res.sendStatus(404);
    } else {
      const professorUpdated = { ...professor, ...req.body };
      await professorService.updateProfessor(req.params.id, professorUpdated);
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await professorService.deleteProfessor(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})


export default router;