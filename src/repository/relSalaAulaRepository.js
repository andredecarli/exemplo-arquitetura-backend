import { db } from "../database.js";
import { SalaAulaDTO } from "../dto/salaAulaDTO.js";
import { RelSalaAula } from "../entity/relSalaAula.js";
import { Sala } from "../entity/sala.js";
import { Aula } from "../entity/aula.js";

export class RelSalaAulaRepository {

  async create(sala, aula) {
    try {
      await db.run("INSERT INTO rel_sala_aula (sala_id, aula_id) VALUES (?, ?)", [sala.id, aula.id]);
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async read(sala_id, aula_id) {
    try {
      const result = await db.get("SELECT * FROM rel_sala_aula WHERE sala_id = ? AND aula_id = ?", [sala_id, aula_id]);
      return new RelSalaAula(result.sala_id, result.aula_id);
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async update(sala_id, aula_id, relSalaAula) {
    try {
      await db.run("UPDATE rel_sala_aula SET sala_id = ?, aula_id = ? WHERE sala_id = ? and aula_id = ?", [sala_id, aula_id, relSalaAula.sala_id, relSalaAula.aula_id])
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async delete(sala_id, aula_id) {
    try {
      await db.run("DELETE FROM rel_sala_aula WHERE sala_id = ? and aula_id = ?", [sala_id, aula_id]);
    } catch(error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async list() {
    try {
      const result = await db.all("SELECT rsa.sala_id, rsa.aula_id, s.nome AS nome_sala, a.nome AS nome_aula, a.professor_id, p.nome AS nome_professor  FROM rel_sala_aula rsa JOIN sala s ON s.id = rsa.sala_id JOIN aula a ON a.id = rsa.aula_id JOIN professor p ON p.id = a.professor_id");
      return result;
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async listBySala(sala_id) {
    try {
      const result = await db.all("SELECT rsa.aula_id, a.nome AS nome_aula, a.professor_id FROM rel_sala_aula rsa JOIN aula a ON a.id = rsa.aula_id WHERE rsa.sala_id = ?", sala_id);
      return result.map(r => new Aula(r.nome_aula, r.professor_id, r.aula_id));
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async listBySalaDTO(sala_id) {
    try {
      const result = await db.all("SELECT rsa.sala_id, rsa.aula_id, s.nome AS nome_sala, a.nome AS nome_aula, a.professor_id, p.nome AS nome_professor FROM rel_sala_aula rsa JOIN sala s ON s.id = rsa.sala_id JOIN aula a ON a.id = rsa.aula_id JOIN professor p ON p.id = a.professor_id WHERE rsa.sala_id = ?", sala_id);
      return result.map(r => new SalaAulaDTO(r.sala_id, r.aula_id, r.nome_sala, r.nome_aula, r.professor_id, r.nome_professor));
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async listByAula(aula_id) {
    try {
      const result = await db.all("SELECT rsa.sala_id, s.nome AS nome_sala FROM rel_sala_aula rsa JOIN sala s ON s.id = rsa.sala_id WHERE rsa.aula_id = ?", aula_id);
      return result.map(r => new Sala(r.nome_sala, r.sala_id));
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async listByAulaDTO(aula_id) {
    try {
      const result = await db.all("SELECT rsa.sala_id, rsa.aula_id, s.nome AS nome_sala, a.nome AS nome_aula, a.professor_id, p.nome AS nome_professor FROM rel_sala_aula rsa JOIN sala s ON s.id = rsa.sala_id JOIN aula a ON a.id = rsa.aula_id JOIN professor p ON p.id = a.professor_id WHERE rsa.aula_id = ?", aula_id);
      return result.map(r => new SalaAulaDTO(r.sala_id, r.aula_id, r.nome_sala, r.nome_aula, r.professor_id, r.nome_professor));
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async listSalaByProfessor(professor_id) {
    try {
      const result = await db.all("SELECT s.id, s.nome FROM rel_sala_aula rsa JOIN sala s ON s.id = rsa.sala_id JOIN aula a ON a.id = rsa.aula_id WHERE a.professor_id = ?", professor_id);
      return result.map(r => new Sala(r.nome, r.id));
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async listSalaByProfessorDTO(professor_id) {
    try {
      const result = await db.all("SELECT rsa.sala_id, rsa.aula_id, s.nome AS nome_sala, a.nome AS nome_aula, a.professor_id, p.nome AS nome_professor FROM rel_sala_aula rsa JOIN sala s ON s.id = rsa.sala_id JOIN aula a ON a.id = rsa.aula_id JOIN professor p ON p.id = a.professor_id WHERE a.professor_id = ?", professor_id);
      return result.map(r => new SalaAulaDTO(r.sala_id, r.aula_id, r.nome_sala, r.nome_aula, r.professor_id, r.nome_professor));
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }

  async associate(sala_id, aula_id) {
    try {
      await db.run("INSERT INTO rel_sala_aula (sala_id, aula_id) VALUES (?, ?)", [sala_id, aula_id]);
    } catch (error) {
      throw new Error("ERROR REPOSITORY: " + error);
    }
  }
}