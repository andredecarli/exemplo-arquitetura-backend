import { db } from "./database.js";
import { Professor } from "./entity/professor.js";
import { ProfessorService } from "./service/professorService.js";


const professorService = new ProfessorService();

let listaDeProfessores = await professorService.listarProfessores();
console.log(listaDeProfessores);

professorService.createProfessor("Lucas");
listaDeProfessores = await professorService.listarProfessores();
console.log(listaDeProfessores);

const professorUpdate = new Professor('Mateus');
professorService.updateProfessor(3, professorUpdate);
listaDeProfessores = await professorService.listarProfessores();
console.log(listaDeProfessores);



db.close();