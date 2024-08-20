import { Aula } from "../entity/aula.js";
import { AulaRepository } from "../repository/aulaRepository.js";
import { RelSalaAulaRepository } from "../repository/relSalaAulaRepository.js";

export class AulaService {
  constructor() {
    this.aulaRepository = new AulaRepository();
    this.relSalaAulaRepository = new RelSalaAulaRepository();
  }

  async createAula(professor, nome) {
    if (nome === "") { 
      console.log("ERRO! Nome precisa ser informado.");
    } else {
      try {
        const aula = new Aula(nome, professor.id);
        await this.aulaRepository.create(professor.id, aula);
      } catch (error) {
        throw new Error("ERRO SERVICE: " + error);
      }
    }
  }

  async readAula(id) {
    try {
      const aula = await this.aulaRepository.read(id);
      return new Aula(aula.nome, aula.professor_id, aula.id);
    } catch(error){
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async readAulasPorNome(nome) {
    try {
      const aulas = await this.aulaRepository.readByName(nome);
      return aulas.map(a => new Aula(a.nome, a.professor_id, a.id));
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async deleteAula(id) {
    try {
      await this.aulaRepository.delete(id);
    } catch(error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async updateAula(id, professor, aula) {
    try {
      await this.aulaRepository.update(id, professor.id, aula)
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async listarAulas() {
    try {
      const aulaList = await this.aulaRepository.list();
      return aulaList.map(a => new Aula(a.nome, a.professor_id, a.id));      
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async listarSalasDeAula(aula) {
    try {
      const salasDeAula = await this.relSalaAulaRepository.listByAula(aula.id);
      return salasDeAula;
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }
}