import { Professor } from "../entity/professor.js";
import { ProfessorRepository } from "../repository/professorRepository.js";

export class ProfessorService {
  constructor() {
    this.professorRepository = new ProfessorRepository();
  }

  async createProfessor(nome) {
    if (nome === "") { 
      console.log("ERRO! Nome precisa ser informado.");
    } else {
      try {
        const professor = new Professor(nome);
        await this.professorRepository.create(professor);
      } catch (error) {
        throw new Error("ERRO SERVICE: " + error);
      }
    }
  }

  async readProfessor(id) {
    try {
      const professor = await this.professorRepository.read(id)
      return new Professor(professor.nome, professor.id);
    } catch(error){
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async readProfessoresPorNome(nome) {
    try {
      const professores = await this.professorRepository.readByName(nome);
      return professores.map(p => new Professor(p.nome, p.id))
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async deleteProfessor(id) {
    try {
      await this.professorRepository.delete(id);
    } catch(error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async updateProfessor(id, professor) {
    try {
      await this.professorRepository.update(id, professor)
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async listarProfessores() {
    try {
      const professorList = await this.professorRepository.list();
      return professorList.map(p => new Professor(p.nome, p.id));      
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }
}