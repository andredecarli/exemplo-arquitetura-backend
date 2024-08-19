import { Professor } from "../entity/professor.js";
import { db } from "../database.js";

export class ProfessorRepository {

  async create(professor) {
    try {
      await db.run("INSERT INTO professor (nome) VALUES (?)", professor.nome);
    } catch (error) {
      throw new Error(error);
    }
  }

  async read(id) {
    try {
      const result = await db.get("SELECT * FROM professor WHERE id = ?", id);
      return new Professor(result.nome, result.id)
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, professor) {
    try {
      await db.run("UPDATE professor SET nome = ? WHERE id = ?", [professor.nome, id])
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      await db.run("DELETE FROM professor WHERE id = ?", id);
    } catch(error) {
      throw new Error(error);
    }
  }

  async list() {
    try {
      const result = await db.all("SELECT * FROM professor");
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }
}