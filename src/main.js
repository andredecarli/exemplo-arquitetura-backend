import { db } from "./database.js";
import { AulaService } from "./service/aulaService.js";
import { ProfessorService } from "./service/professorService.js";
import { SalaService } from "./service/salaService.js";


const professorService = new ProfessorService();
const salaService = new SalaService();
const aulaService = new AulaService();

async function createDatabase() {
  try {
    // Criação dos professores
    await professorService.createProfessor("Rogerio");
    await professorService.createProfessor("Carlos");
    await professorService.createProfessor("Beatriz");
    await professorService.createProfessor("Pedro");
  
    // Criação das aulas
    let professor = (await professorService.readProfessoresPorNome("Rogerio"))[0];
    await aulaService.createAula(professor, "Fisica 1");
    professor = (await professorService.readProfessoresPorNome("Carlos"))[0];
    await aulaService.createAula(professor, "Fisica 2");
    professor = (await professorService.readProfessoresPorNome("Rogerio"))[0];
    await aulaService.createAula(professor, "Fisica 3");
    professor = (await professorService.readProfessoresPorNome("Beatriz"))[0];
    await aulaService.createAula(professor, "Biologia 1");
    professor = (await professorService.readProfessoresPorNome("Pedro"))[0];
    await aulaService.createAula(professor, "Biologia 2");
  
    // // Criação das aulas
    await salaService.createSala("Saude");
    await salaService.createSala("Exatas");
  
    // // Associação de Salas com Aulas
    let sala = (await salaService.readSalasPorNome("Saude"))[0];
    let aula = (await aulaService.readAulasPorNome("Fisica 1"))[0];
    await salaService.associarAula(sala, aula);
    aula = (await aulaService.readAulasPorNome("Fisica 2"))[0];
    await salaService.associarAula(sala, aula);
    aula = (await aulaService.readAulasPorNome("Biologia 1"))[0];
    await salaService.associarAula(sala, aula);
    aula = (await aulaService.readAulasPorNome("Biologia 2"))[0];
    await salaService.associarAula(sala, aula);
  
    sala = (await salaService.readSalasPorNome("Exatas"))[0];
    aula = (await aulaService.readAulasPorNome("Fisica 1"))[0];
    await salaService.associarAula(sala, aula);
    aula = (await aulaService.readAulasPorNome("Fisica 2"))[0];
    await salaService.associarAula(sala, aula);
    aula = (await aulaService.readAulasPorNome("Fisica 3"))[0];
    await salaService.associarAula(sala, aula);
    aula = (await aulaService.readAulasPorNome("Biologia 1"))[0];
    await salaService.associarAula(sala, aula);
  } catch (error) { 
    console.error("Erro ao popular banco de dados: ", error);
  }
}

await createDatabase();

console.log("Listagem De Professores: ");
let listaDeProfessores = await professorService.listarProfessores();
console.log(listaDeProfessores);

console.log("Listagem de Aulas: ");
let listaDeAulas = await aulaService.listarAulas();
console.log(listaDeAulas);

console.log("Listagem de Salas: ");
let listaDeSalas = await salaService.listarSalas();
console.log(listaDeSalas);

console.log("Listagem de Aulas da sala de Saude");
let sala = (await salaService.readSalasPorNome("Saude"))[0];
let aulasDeSala = await salaService.listarAulasDeSala(sala);
console.log(aulasDeSala);

console.log("Listagem de Salas da aula de Fisica 1");
let aula = (await aulaService.readAulasPorNome("Fisica 1"))[0];
let salasDeAula = await aulaService.listarSalasDeAula(aula);
console.log(salasDeAula);
// let listaDeProfessores = await professorService.listarProfessores();
// // console.log(listaDeProfessores);

// professorService.createProfessor("Lucas");
// listaDeProfessores = await professorService.listarProfessores();
// // console.log(listaDeProfessores);

// const professorUpdate = await professorService.readProfessor(3);
// professorUpdate.nome = 'Mateus';
// await professorService.updateProfessor(professorUpdate.id, professorUpdate);
// listaDeProfessores = await professorService.listarProfessores();
// // console.log(listaDeProfessores);

// const sala = await salaService.readSala(1);

// console.log("sala 1: ", sala);

// const listaAulasSala = await salaService.listarAulasDeSala(sala);
// console.log(listaAulasSala);

// const aula = await aulaService.readAula(1);

// console.log("aula 1: ", aula);

// const listaSalasAula = await aulaService.listarSalasDeAula(aula);
// console.log(listaSalasAula);

db.close();