import { classNames } from '../../utils/classNames';
import type { IconComponent } from '../icons';
import styles from './StatCard.module.css';

export type StatCardTone = 'primary' | 'success' | 'alert';

interface StatCardProps {
  icon: IconComponent;
  value: number | string;
  label: string;
  /** Color of the icon chip. Defaults to 'primary'; use 'alert' only for fall-detection status. */
  tone?: StatCardTone;
}

const toneClass: Record<StatCardTone, string> = {
  primary: styles.iconPrimary,
  success: styles.iconSuccess,
  alert: styles.iconAlert,
};

export function StatCard({ icon: Icon, value, label, tone = 'primary' }: StatCardProps) {
  return (
    <div className={styles.card}>
      <span className={classNames(styles.icon, toneClass[tone])}>
        <Icon />
      </span>
      <div className={styles.content}>
        <strong className={styles.value}>{value}</strong>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
