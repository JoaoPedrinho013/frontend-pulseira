import type { IconComponent } from '../icons';
import styles from './StatCard.module.css';

interface StatCardProps {
  icon: IconComponent;
  value: number | string;
  label: string;
}

export function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <div className={styles.content}>
        <strong className={styles.value}>{value}</strong>
        <span className={styles.label}>{label}</span>
      </div>
    </div>
  );
}
