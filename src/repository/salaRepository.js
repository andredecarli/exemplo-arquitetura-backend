import { Sala } from "../entity/sala.js";
import { db } from "../database.js";

export class SalaRepository {

  async create(sala) {
    try {
      await db.run("INSERT INTO sala (nome) VALUES (?)", sala.nome);
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async read(id) {
    try {
      const result = await db.get("SELECT * FROM sala WHERE id = ?", id);
      if (result) {
        return new Sala(result.nome, result.id)
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async readByName(nome) {
    try {
      const result = await db.all("SELECT * FROM sala WHERE nome = ?", nome);
      return result.map(r => new Sala(r.nome, r.id));
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async update(id, sala) {
    try {
      await db.run("UPDATE sala SET nome = ? WHERE id = ?", [sala.nome, id])
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async delete(id) {
    try {
      await db.run("DELETE FROM sala WHERE id = ?", id);
    } catch(error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async list() {
    try {
      const result = await db.all("SELECT * FROM sala");
      return result.map(r => new Sala(r.nome, r.id));
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }
}