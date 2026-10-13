export type StatusMonitoramento = 'normal' | 'possivel_queda';

/**
 * Uma leitura média salva a cada 5 minutos pelo back-end (../backend-pulseira).
 * Espelha os campos de localização de `Telemetria`, já com o bairro/cidade
 * resolvidos (geocodificação reversa) para exibir no log do responsável.
 */
export interface RegistroTelemetria {
  id: string;
  registradoEm: string;
  latitude: number;
  longitude: number;
  bairro: string;
  cidade: string;
  status: StatusMonitoramento;
}
