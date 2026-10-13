import type { RegistroTelemetria } from '../types/telemetria';

const BASE_LATITUDE = -24.0059;
const BASE_LONGITUDE = -46.4023;
const INTERVALO_MINUTOS = 5;
const TOTAL_REGISTROS = 24;
/** Índice (0 = agora) em que o mock encaixa uma queda, pra dar pra ver o alerta no log. */
const INDICE_QUEDA = 5;

const BAIRROS = [
  { bairro: 'Boqueirão', cidade: 'Praia Grande - SP' },
  { bairro: 'Guilhermina', cidade: 'Praia Grande - SP' },
  { bairro: 'Canto do Forte', cidade: 'Praia Grande - SP' },
];

function jitter(base: number, amplitude: number): number {
  return base + (Math.random() * 2 - 1) * amplitude;
}

/**
 * Simula o log de telemetria que o back-end salva a cada 5 minutos, em
 * médias (ver `Telemetria` em ../backend-pulseira). Retorna do mais recente
 * (índice 0) ao mais antigo.
 */
export function gerarTelemetriaMock(
  agora: Date = new Date(),
): RegistroTelemetria[] {
  const registros: RegistroTelemetria[] = [];

  for (let indice = 0; indice < TOTAL_REGISTROS; indice += 1) {
    const registradoEm = new Date(
      agora.getTime() - indice * INTERVALO_MINUTOS * 60 * 1000,
    );
    const local = BAIRROS[indice % BAIRROS.length];

    registros.push({
      id: `tel-${TOTAL_REGISTROS - indice}`,
      registradoEm: registradoEm.toISOString(),
      latitude: jitter(BASE_LATITUDE, 0.004),
      longitude: jitter(BASE_LONGITUDE, 0.004),
      bairro: local.bairro,
      cidade: local.cidade,
      status: indice === INDICE_QUEDA ? 'possivel_queda' : 'normal',
    });
  }

  return registros;
}
