import { Aula } from "../entity/aula.js";
import { db } from "../database.js";

export class AulaRepository {

  async create(professor_id, aula) {
    try {
      await db.run("INSERT INTO aula (professor_id, nome) VALUES (?, ?)", professor_id, aula.nome);
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async read(id) {
    try {
      const result = await db.get("SELECT * FROM aula WHERE id = ?", id);
      return new Aula(result.nome, result.professor_id, result.id);
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async readByName(nome) {
    try {
      const result = await db.all("SELECT * FROM aula WHERE nome = ?", nome);
      return result;
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async readByProfessorId(professor_id) {
    try {
      const result = await db.all("SELECT * FROM aula WHERE professor_id = ?", professor_id);
      return result;
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async update(id, professor_id, aula) {
    try {
      await db.run("UPDATE aula SET professor_id = ?, nome = ? WHERE id = ?", [professor_id, aula.nome, id]);
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async delete(id) {
    try {
      await db.run("DELETE FROM aula WHERE id = ?", id);
    } catch(error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async list() {
    try {
      const result = await db.all("SELECT * FROM aula");
      return result;
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }
}