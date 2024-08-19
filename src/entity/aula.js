export class Aula {
  constructor(nome, professor_id, id = null) {
    this.nome = nome;
    this.professor_id = professor_id;
    this.id = id;
  }
}