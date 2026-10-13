import { AlertIcon, CheckCircleIcon, HistoryIcon } from '../../../components/icons';
import { StatCard } from '../../../components/stat-card/StatCard';
import { LocationMap } from '../../../components/location-map/LocationMap';
import { tempoRelativo } from '../../../utils/tempo';
import type { Paciente } from '../../../types/paciente';
import type { RegistroTelemetria } from '../../../types/telemetria';
import styles from './MonitoramentoSection.module.css';

interface MonitoramentoSectionProps {
  paciente: Paciente;
  registro: RegistroTelemetria;
}

export function MonitoramentoSection({
  paciente,
  registro,
}: MonitoramentoSectionProps) {
  const isQueda = registro.status === 'possivel_queda';

  return (
    <section
      className={styles.section}
      aria-label="Monitoramento em tempo real"
    >
      <h2 className={styles.title}>Localização agora</h2>

      <div className={styles.cards}>
        <StatCard
          icon={isQueda ? AlertIcon : CheckCircleIcon}
          tone={isQueda ? 'alert' : 'success'}
          value={isQueda ? 'Possível queda' : 'Tudo bem'}
          label="Status atual"
        />
        <StatCard
          icon={HistoryIcon}
          value={tempoRelativo(registro.registradoEm)}
          label="Última atualização"
        />
      </div>

      <LocationMap
        latitude={registro.latitude}
        longitude={registro.longitude}
        label={paciente.nome}
      />
    </section>
  );
}
