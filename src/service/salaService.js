import { Sala } from "../entity/sala.js";
import { RelSalaAulaRepository } from "../repository/relSalaAulaRepository.js";
import { SalaRepository } from "../repository/salaRepository.js";

export class SalaService {
  constructor() {
    this.salaRepository = new SalaRepository();
    this.relSalaAulaRepository = new RelSalaAulaRepository();
  }

  async createSala(nome) {
    if (nome === "") { 
      console.log("ERRO! Nome precisa ser informado.");
    } else {
      try {
        const sala = new Sala(nome);
        await this.salaRepository.create(sala);
      } catch (error) {
        throw new Error("ERRO SERVICE: " + error);
      }
    }
  }

  async readSala(id) {
    try {
      const sala = await this.salaRepository.read(id)
      return sala;
    } catch(error){
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async readSalasPorNome(nome) {
    try {
      const salas = await this.salaRepository.readByName(nome);
      return salas;
    } catch (error) {
      throw new Error ("ERRO SERVICE: " + error);
    }
  }

  async deleteSala(id) {
    try {
      await this.salaRepository.delete(id);
    } catch(error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async updateSala(id, sala) {
    try {
      await this.salaRepository.update(id, sala)
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async listarSalas() {
    try {
      const salaList = await this.salaRepository.list();
      return salaList;   
    } catch (error) {
      throw new Error ("ERRO SERVICE: " + error);
    }
  }

  async associarAula(sala_id, aula_id) {
    try {
      await this.relSalaAulaRepository.associate(sala_id, aula_id);
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async listarSalasDeAula(aula_id) {
    try {
      const salasDeAula = await this.relSalaAulaRepository.listByAula(aula_id);
      return salasDeAula;
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async listarSalasDeAulaDetalhado(aula_id) {
    try {
      const salasDeAula = await this.relSalaAulaRepository.listByAulaDTO(aula_id);
      return salasDeAula;
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async listarSalasPorProfessor(professor_id) {
    try {
      const salasDeProfessor = await this.relSalaAulaRepository.listSalaByProfessor(professor_id);
      return salasDeProfessor;
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async listarSalasPorProfessorDetalhado(professor_id) {
    try {
      const salasDeProfessor = await this.relSalaAulaRepository.listSalaByProfessorDTO(professor_id);
      return salasDeProfessor;
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }
}