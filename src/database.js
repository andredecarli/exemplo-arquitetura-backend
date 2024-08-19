import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const db = await open({
  filename: ':memory:',
  driver: sqlite3.Database
})

// db.getDatabaseInstance().serialize(async () => {
  await db.run("CREATE TABLE professor (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome VARCHAR(255))");

  await db.run("CREATE TABLE aula (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, professor_id INTEGER, nome VARCHAR(255), FOREIGN KEY (professor_id) REFERENCES professor(id))");

  await db.run("CREATE TABLE sala (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, nome VARCHAR(255))");

  await db.run("CREATE TABLE rel_sala_aula (sala_id INTEGER, aula_id INTEGER, FOREIGN KEY (sala_id) REFERENCES sala(id), FOREIGN KEY (aula_id) REFERENCES aula(id), PRIMARY KEY (sala_id, aula_id))")

  await db.run("INSERT INTO professor (nome) VALUES ('Andre')");
  await db.run("INSERT INTO professor (nome) VALUES ('Luisa')");

  await db.run("INSERT INTO aula (professor_id, nome) VALUES (1, 'Fisica')");
  await db.run("INSERT INTO aula (professor_id, nome) VALUES (2, 'Quimica')");

  await db.run("INSERT INTO sala (nome) VALUES ('Primeiro Ano B')");

  await db.run("INSERT INTO rel_sala_aula (sala_id, aula_id) VALUES (1, 1)");
  await db.run("INSERT INTO rel_sala_aula (sala_id, aula_id) VALUES (1, 2)");
// })
