import { classNames } from '../../utils/classNames';
import styles from './DistributionBar.module.css';

export type DistributionVariant = 'primary' | 'success' | 'muted';

export interface DistributionSegment {
  label: string;
  value: number;
  variant: DistributionVariant;
}

interface DistributionBarProps {
  title: string;
  segments: DistributionSegment[];
}

const fillClassByVariant: Record<DistributionVariant, string> = {
  primary: styles.fillPrimary,
  success: styles.fillSuccess,
  muted: styles.fillMuted,
};

/** Simple stacked horizontal bar chart, built from CSS only (no charting lib). */
export function DistributionBar({ title, segments }: DistributionBarProps) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>

      <div
        className={styles.track}
        role="img"
        aria-label={segments
          .map((segment) => `${segment.label}: ${segment.value}`)
          .join(', ')}
      >
        {segments.map((segment) => (
          <span
            key={segment.label}
            className={classNames(styles.fill, fillClassByVariant[segment.variant])}
            style={{ width: total ? `${(segment.value / total) * 100}%` : 0 }}
          />
        ))}
      </div>

      <ul className={styles.legend}>
        {segments.map((segment) => (
          <li key={segment.label} className={styles.legendItem}>
            <span
              className={classNames(styles.dot, fillClassByVariant[segment.variant])}
            />
            {segment.label} <strong>{segment.value}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}
