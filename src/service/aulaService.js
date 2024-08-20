import { Aula } from "../entity/aula.js";
import { AulaRepository } from "../repository/aulaRepository.js";

export class AulaService {
  constructor() {
    this.aulaRepository = new AulaRepository();
  }

  async createAula(professor, nome) {
    if (nome === "") { 
      console.log("ERRO! Nome precisa ser informado.");
    } else {
      try {
        const aula = new Aula(nome, professor.id);
        await this.aulaRepository.create(professor.id, aula);
      } catch (error) {
        console.log("ERRO: ", error);
      }
    }
  }

  async readAula(id) {
    try {
      const aula = await this.aulaRepository.read(id);
      return aula;
    } catch(error){
      console.log("ERRO: ", error);
    }
  }

  async deleteAula(id) {
    try {
      await this.aulaRepository.delete(id);
    } catch(error) {
      console.log("ERRO: ", error);
    }
  }

  async updateAula(id, professor, aula) {
    try {
      await this.aulaRepository.update(id, professor.id, aula)
    } catch (error) {
      throw new Error(error);
    }
  }

  async listarAulas() {
    try {
      const aulaList = await this.aulaRepository.list();
      return aulaList;      
    } catch (error) {
      console.log("ERRO: ", error);
    }
  }
}