import { classNames } from '../../utils/classNames';
import { AlertIcon, CheckCircleIcon } from '../icons';
import type { RegistroTelemetria } from '../../types/telemetria';
import styles from './MonitoringLog.module.css';

interface MonitoringLogProps {
  registros: RegistroTelemetria[];
}

const horaFormatter = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
});

/** Timeline do log salvo a cada 5 minutos — mais recente primeiro. */
export function MonitoringLog({ registros }: MonitoringLogProps) {
  if (registros.length === 0) {
    return <p className={styles.empty}>Nenhum registro ainda.</p>;
  }

  return (
    <ol className={styles.log}>
      {registros.map((registro) => {
        const isQueda = registro.status === 'possivel_queda';
        const Icon = isQueda ? AlertIcon : CheckCircleIcon;

        return (
          <li
            key={registro.id}
            className={classNames(styles.entry, isQueda && styles.entryAlert)}
          >
            <span
              className={classNames(styles.dot, isQueda && styles.dotAlert)}
            >
              <Icon />
            </span>

            <div className={styles.content}>
              <div className={styles.row}>
                <span className={styles.time}>
                  {horaFormatter.format(new Date(registro.registradoEm))}
                </span>
                <span
                  className={classNames(
                    styles.badge,
                    isQueda ? styles.badgeAlert : styles.badgeNormal,
                  )}
                >
                  {isQueda ? 'Possível queda' : 'Normal'}
                </span>
              </div>
              <p className={styles.place}>
                {registro.bairro}, {registro.cidade}
              </p>
              <p className={styles.coords}>
                Lat {registro.latitude.toFixed(5)}, Long{' '}
                {registro.longitude.toFixed(5)}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
