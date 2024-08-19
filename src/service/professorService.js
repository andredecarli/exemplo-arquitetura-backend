import { Professor } from "../entity/professor.js";
import { ProfessorRepository } from "../repository/professorRepository.js";

export class ProfessorService {
  constructor() {
    this.professorRepository = new ProfessorRepository();
    // this.aulaRepository = new AulaRepository();
  }

  async createProfessor(nome) {
    if (nome === "") { 
      console.log("ERRO! Nome precisa ser informado.");
    } else {
      try {
        const professor = new Professor(nome, null);
        await this.professorRepository.create(professor);
      } catch (error) {
        console.log("ERRO: ", error);
      }
    }
  }

  async readProfessor(id) {
    try {
      const professor = await this.professorRepository.read(id)
      return professor;
    } catch(error){
      console.log("ERRO: ", error);
    }
  }

  async deleteProfessor(id) {
    try {
      await this.professorRepository.delete(id);
    } catch(error) {
      console.log("ERRO: ", error);
    }
  }

  async updateProfessor(id, professor) {
    try {
      await this.professorRepository.update(id, professor)
    } catch (error) {
      throw new Error(error);
    }
  }

  async listarProfessores() {
    try {
      const professorList = await this.professorRepository.list();
      return professorList;      
    } catch (error) {
      console.log("ERRO: ", error);
    }
  }
}