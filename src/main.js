// import { db } from "./database.js";
import { AulaService } from "./service/aulaService.js";
import { ProfessorService } from "./service/professorService.js";
import { SalaService } from "./service/salaService.js";


const professorService = new ProfessorService();
const salaService = new SalaService();
const aulaService = new AulaService();

export async function createDatabase() {
  try {
    console.log("Criando Professores");
    await professorService.createProfessor("Rogerio");
    await professorService.createProfessor("Carlos");
    await professorService.createProfessor("Beatriz");
    await professorService.createProfessor("Pedro");
  
    console.log("Criando Aulas"); 
    let professor = (await professorService.readProfessoresPorNome("Rogerio"))[0];
    await aulaService.createAula(professor.id, "Fisica 1");
    professor = (await professorService.readProfessoresPorNome("Carlos"))[0];
    await aulaService.createAula(professor.id, "Fisica 2");
    professor = (await professorService.readProfessoresPorNome("Rogerio"))[0];
    await aulaService.createAula(professor.id, "Fisica 3");
    professor = (await professorService.readProfessoresPorNome("Beatriz"))[0];
    await aulaService.createAula(professor.id, "Biologia 1");
    professor = (await professorService.readProfessoresPorNome("Pedro"))[0];
    await aulaService.createAula(professor.id, "Biologia 2");
  
    console.log("Criando Salas");
    await salaService.createSala("Saude");
    await salaService.createSala("Exatas");
  
    console.log("Associando Salas com Aulas");
    let sala = (await salaService.readSalasPorNome("Saude"))[0];
    let aula = (await aulaService.readAulasPorNome("Fisica 1"))[0];
    await salaService.associarAula(sala.id, aula.id);
    aula = (await aulaService.readAulasPorNome("Fisica 2"))[0];
    await salaService.associarAula(sala.id, aula.id);
    aula = (await aulaService.readAulasPorNome("Biologia 1"))[0];
    await salaService.associarAula(sala.id, aula.id);
    aula = (await aulaService.readAulasPorNome("Biologia 2"))[0];
    await salaService.associarAula(sala.id, aula.id);
  
    sala = (await salaService.readSalasPorNome("Exatas"))[0];
    aula = (await aulaService.readAulasPorNome("Fisica 1"))[0];
    await salaService.associarAula(sala.id, aula.id);
    aula = (await aulaService.readAulasPorNome("Fisica 2"))[0];
    await salaService.associarAula(sala.id, aula.id);
    aula = (await aulaService.readAulasPorNome("Fisica 3"))[0];
    await salaService.associarAula(sala.id, aula.id);
    aula = (await aulaService.readAulasPorNome("Biologia 1"))[0];
    await salaService.associarAula(sala.id, aula.id);

    console.log("Banco de Dados populado.");
  } catch (error) { 
    console.error("Erro ao popular banco de dados: ", error);
  }
}


// console.log("Listagem De Professores: ");
// let listaDeProfessores = await professorService.listarProfessores();
// console.log(listaDeProfessores);

// console.log("Listagem de Aulas: ");
// let listaDeAulas = await aulaService.listarAulas();
// console.log(listaDeAulas);

// console.log("Listagem de Salas: ");
// let listaDeSalas = await salaService.listarSalas();
// console.log(listaDeSalas);

// console.log("Listagem de Aulas da sala de Saude");
// let sala = (await salaService.readSalasPorNome("Saude"))[0];
// let aulasDeSala = await aulaService.listarAulasDeSala(sala);
// console.log(aulasDeSala);

// console.log("Detalhado de Aulas da sala de Saude");
// aulasDeSala = await aulaService.listarAulasDeSalaDetalhado(sala);
// console.log(aulasDeSala);

// console.log("Listagem de Salas da aula de Fisica 1");
// let aula = (await aulaService.readAulasPorNome("Fisica 1"))[0];
// let salasDeAula = await salaService.listarSalasDeAula(aula);
// console.log(salasDeAula);

// console.log("Detalhado de Salas da aula de Fisica 1");
// salasDeAula = await salaService.listarSalasDeAulaDetalhado(aula);
// console.log(salasDeAula);

// console.log("Listagem de Aulas de Rogerio");
// let professor = (await professorService.readProfessoresPorNome("Rogerio"))[0];
// let aulas = await aulaService.listarAulasPorProfessor(professor);
// console.log(aulas);

// console.log("Listagem de Salas de Pedro");
// professor = (await professorService.readProfessoresPorNome("Pedro"))[0];
// let salas = await salaService.listarSalasPorProfessor(professor);
// console.log(salas);

// console.log("Detalhado de Salas de Pedro");
// salas = await salaService.listarSalasPorProfessorDetalhado(professor);
// console.log(salas);


// db.close();