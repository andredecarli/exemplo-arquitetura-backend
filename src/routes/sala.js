import express from 'express';
import logger from '../middleware/logger.js';
import { SalaService } from '../service/salaService.js';

const router = express.Router()

const salaService = new SalaService();

// Essa rota usa o middleware logger
router.use(logger);

// GET /sala -> retorna lista de salas
router.get('/', async (req, res) => {
  try {
    // GET sala/?nome= busca por nome
    if (req.query.nome) {
      const nome = req.query.nome;
      const salas = await salaService.readSalasPorNome(nome);
      res.json(salas);
    } else {
      const aulas = await salaService.listarSalas();
      res.json(aulas);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// GET /sala/:id -> retorna sala de ID :id
router.get('/:id', async (req, res) => {
  try {
    const sala = await salaService.readSala(req.params.id);
    if (!sala) {
      res.sendStatus(404);
    } else {
      res.json(sala);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

// POST /sala -> cria uma sala
router.post('/', async (req, res) => {
  try {
    const sala = req.body;
    if (!sala.nome) {
      res.sendStatus(400);
    } else {
      await salaService.createSala(sala.nome);
      res.sendStatus(201);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

// PUT /sala/:id -> Edita a sala de ID :id
router.put('/:id', async (req, res) => {
  try {
    const sala = await salaService.readSala(req.params.id);
    if (!sala) {
      res.sendStatus(404);
    } else {
      const salaUpdated = { ...sala, ...req.body };
      await salaService.updateSala(req.params.id, salaUpdated);
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await salaService.deleteSala(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

router.post('/:id/associar', async (req, res) => {
  try {
    const salaId = req.params.id; 
    const aulaIds = req.body;
    if (!aulaIds) {
      res.sendStatus(400);
    } else {
      aulaIds.forEach(async e => await salaService.associarAula(salaId, e.aula_id))
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.delete('/:id/desassociar/:idAula', async (req, res) => {
  try {
    const salaId = req.params.id; 
    const aulaId = req.params.idAula;
    await salaService.desassociarAula(salaId, aulaId);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post('/:id/associar/:idAula', async (req, res) => {
  try {
    const salaId = req.params.id;
    const aulaId = req.params.idAula;
    if (!aulaId) {
      res.sendStatus(400);
    } else {
      await salaService.associarAula(salaId, aulaId);
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/aula/:id', async (req, res) => {
  try {
    const salas = await salaService.listarSalasDeAula(req.params.id);
    res.json(salas);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/aula/:id/detalhado', async (req, res) => {
  try {
    const salasDTO = await salaService.listarSalasDeAulaDetalhado(req.params.id);
    res.json(salasDTO);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

router.get('/professor/:id', async (req, res) => {
  try {
    const salas = await salaService.listarSalasPorProfessor(req.params.id);
    res.json(salas);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get('/professor/:id/detalhado/', async (req, res) => {
  try {
    const salasDTO = await salaService.listarSalasPorProfessorDetalhado(req.params.id);
    res.json(salasDTO);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})




export default router;