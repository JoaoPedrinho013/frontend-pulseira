import {
  AlertIcon,
  CheckCircleIcon,
  HistoryIcon,
  LocationPinIcon,
} from '../../../components/icons';
import { StatCard } from '../../../components/stat-card/StatCard';
import { tempoRelativo } from '../../../utils/tempo';
import type { RegistroTelemetria } from '../../../types/telemetria';
import styles from './StatusAtualSection.module.css';

interface StatusAtualSectionProps {
  registro: RegistroTelemetria;
}

export function StatusAtualSection({ registro }: StatusAtualSectionProps) {
  const isQueda = registro.status === 'possivel_queda';

  return (
    <section className={styles.section} aria-label="Status atual">
      <h2 className={styles.title}>Status agora</h2>

      <div className={styles.cards}>
        <StatCard
          icon={isQueda ? AlertIcon : CheckCircleIcon}
          tone={isQueda ? 'alert' : 'success'}
          value={isQueda ? 'Possível queda' : 'Tudo bem'}
          label="Status atual"
        />
        <StatCard
          icon={LocationPinIcon}
          value={`${registro.bairro}, ${registro.cidade}`}
          label="Última localização"
        />
        <StatCard
          icon={HistoryIcon}
          value={tempoRelativo(registro.registradoEm)}
          label="Última atualização"
        />
      </div>

      <p className={styles.coords}>
        Lat {registro.latitude.toFixed(5)}, Long{' '}
        {registro.longitude.toFixed(5)}
      </p>
    </section>
  );
}
