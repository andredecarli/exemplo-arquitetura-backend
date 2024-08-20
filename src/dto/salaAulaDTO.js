// Um DTO (Data Transfer Object) é um objeto customizado para transferência de dados
// que se baseia nas nossas entidades

export class SalaAulaDTO {
  constructor (sala_id, aula_id, nome_sala, nome_aula, professor_id, nome_professor) {
    this.sala_id = sala_id;
    this.aula_id = aula_id;
    this.nome_sala = nome_sala;
    this.nome_aula = nome_aula;
    this.professor_id = professor_id;
    this.nome_professor = nome_professor;
  }
}