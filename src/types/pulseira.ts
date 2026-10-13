export type StatusConexaoPulseira = 'conectada' | 'desconectada';

/**
 * Estado de pareamento da pulseira física com o paciente, visto do app.
 * Espelha parcialmente `Pulseira`/`StatusPulseira` do back-end
 * (../backend-pulseira) — aqui só interessam os dois estados de conexão.
 */
export interface Pulseira {
  dispositivoId: string;
  status: StatusConexaoPulseira;
  vinculadaEm: string | null;
}
