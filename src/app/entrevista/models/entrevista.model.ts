export interface EntrevistaRequest {
  appointment_id: string;
  question: string;
}

export interface EntrevistaResponse {
  textAnswer: string;
  finish: boolean;
}
