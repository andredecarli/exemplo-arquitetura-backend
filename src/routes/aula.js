import express from 'express';
import logger from '../middleware/logger.js';
import { AulaService } from '../service/aulaService.js';

const router = express.Router()

const aulaService = new AulaService();

// Essa rota usa o middleware logger
router.use(logger);

// GET /aula -> retorna lista de aulas
router.get('/', async (req, res) => {
  try {
    // GET aula/?nome= busca por nome
    if (req.query.nome) {
      const nome = req.query.nome;
      const aulas = await aulaService.readAulasPorNome(nome);
      res.json(aulas);
    } else {
      const aulas = await aulaService.listarAulas();
      res.json(aulas);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// GET /aula/:id -> retorna aula de ID :id
router.get('/:id', async (req, res) => {
  try {
    const aula = await aulaService.readAula(req.params.id);
    if (!aula) {
      res.sendStatus(404);
    } else {
      res.json(aula);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

// POST /aula -> cria uma aula
router.post('/', async (req, res) => {
  try {
    const aula = req.body;
    if (!aula.nome || !aula.professor_id) {
      res.sendStatus(400);
    } else {
      await aulaService.createAula(aula.professor_id, aula.nome);
      res.sendStatus(201);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

// PUT /aula/:id -> Edita a aula de ID :id
router.put('/:id', async (req, res) => {
  try {
    const aula = await aulaService.readAula(req.params.id);
    if (!aula) {
      res.sendStatus(404);
    } else {
      const aulaUpdated = { ...aula, ...req.body };
      await aulaService.updateAula(req.params.id, aulaUpdated);
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await aulaService.deleteAula(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

router.get('/professor/:id', async (req, res) => {
  try {
    const aulas = await aulaService.listarAulasPorProfessor(req.params.id);
    res.json(aulas);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/sala/:id', async (req, res) => {
  try {
    const aulas = await aulaService.listarAulasDeSala(req.params.id);
    res.json(aulas);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/sala/:id/detalhado', async (req, res) => {
  try {
    const aulasDTO = await aulaService.listarAulasDeSalaDetalhado(req.params.id);
    res.json(aulasDTO);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

export default router;