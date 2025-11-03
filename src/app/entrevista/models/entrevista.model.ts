export interface EntrevistaRequest {
  id_atendimento: string;
  question: string;
}

export interface EntrevistaResponse {
  textAnswer: string;
  finish: boolean;
}
