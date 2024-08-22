import { Aula } from "../entity/aula.js";
import { AulaRepository } from "../repository/aulaRepository.js";
import { RelSalaAulaRepository } from "../repository/relSalaAulaRepository.js";

export class AulaService {
  constructor() {
    this.aulaRepository = new AulaRepository();
    this.relSalaAulaRepository = new RelSalaAulaRepository();
  }

  async createAula(professor_id, nome) {
    if (nome === "") { 
      console.log("ERRO! Nome precisa ser informado.");
    } else {
      try {
        const aula = new Aula(nome, professor_id);
        await this.aulaRepository.create(professor_id, aula);
      } catch (error) {
        throw new Error("ERRO SERVICE: " + error);
      }
    }
  }

  async readAula(id) {
    try {
      const aula = await this.aulaRepository.read(id);
      return aula;
    } catch(error){
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async readAulasPorNome(nome) {
    try {
      const aulas = await this.aulaRepository.readByName(nome);
      return aulas;
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

  async updateAula(id, aula) {
    try {
      await this.aulaRepository.update(id, aula)
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async listarAulas() {
    try {
      const aulaList = await this.aulaRepository.list();
      return aulaList;     
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async listarAulasPorProfessor(professor_id) {
    try {
      const aulaList = await this.aulaRepository.listByProfessor(professor_id);
      return aulaList;
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async listarAulasDeSala(sala_id) {
    try {
      const aulasDeSala = await this.relSalaAulaRepository.listBySala(sala_id);
      return aulasDeSala;
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async listarAulasDeSalaDetalhado(sala_id) {
    try {
      const aulasDeSala = await this.relSalaAulaRepository.listBySalaDTO(sala_id);
      return aulasDeSala;
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }
}