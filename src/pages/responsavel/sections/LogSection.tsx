import { MonitoringLog } from '../../../components/monitoring-log/MonitoringLog';
import type { RegistroTelemetria } from '../../../types/telemetria';
import styles from './LogSection.module.css';

interface LogSectionProps {
  registros: RegistroTelemetria[];
}

export function LogSection({ registros }: LogSectionProps) {
  return (
    <section className={styles.section} aria-label="Log de monitoramento">
      <div className={styles.heading}>
        <h2 className={styles.title}>Histórico</h2>
        <p className={styles.subtitle}>Atualiza a cada 5 minutos.</p>
      </div>

      <div className={styles.card}>
        <MonitoringLog registros={registros} />
      </div>
    </section>
  );
}
