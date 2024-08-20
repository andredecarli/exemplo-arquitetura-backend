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
      return new Sala(sala.nome, sala.id);
    } catch(error){
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async readSalasPorNome(nome) {
    try {
      const salas = await this.salaRepository.readByName(nome);
      return salas.map(s => new Sala(s.nome, s.id));
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
      return salaList.map(s => new Sala(s.nome, s.id));      
    } catch (error) {
      throw new Error ("ERRO SERVICE: " + error);
    }
  }

  async associarAula(sala, aula) {
    try {
      await this.relSalaAulaRepository.associate(sala.id, aula.id);
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }

  async listarAulasDeSala(sala) {
    try {
      const aulasDeSala = await this.relSalaAulaRepository.listBySala(sala.id);
      return aulasDeSala;
    } catch (error) {
      throw new Error("ERRO SERVICE: " + error);
    }
  }
}