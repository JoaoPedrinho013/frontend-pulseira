import { useState, type FormEvent, type ReactNode } from 'react';
import { classNames } from '../../utils/classNames';
import { FormField } from '../form-field/FormField';
import { Button } from '../ui/Button';
import type { IconComponent } from '../icons';
import styles from './ConnectionCard.module.css';

interface ConnectionCardProps {
  icon: IconComponent;
  title: string;
  description: string;
  connected: boolean;
  /** Shown instead of the form once `connected` is true. */
  connectedSummary?: ReactNode;
  inputId: string;
  inputLabel: string;
  inputPlaceholder: string;
  connectLabel: string;
  disconnectLabel: string;
  onConnect: (code: string) => void;
  onDisconnect: () => void;
}

export function ConnectionCard({
  icon: Icon,
  title,
  description,
  connected,
  connectedSummary,
  inputId,
  inputLabel,
  inputPlaceholder,
  connectLabel,
  disconnectLabel,
  onConnect,
  onDisconnect,
}: ConnectionCardProps) {
  const [code, setCode] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    onConnect(trimmed);
    setCode('');
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.iconWrapper}>
          <Icon />
        </span>
        <div className={styles.headerText}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <span
          className={classNames(
            styles.status,
            connected ? styles.statusConnected : styles.statusDisconnected,
          )}
        >
          {connected ? 'Conectado' : 'Não conectado'}
        </span>
      </div>

      {connected ? (
        <div className={styles.connectedBody}>
          {connectedSummary}
          <Button variant="secondary" onClick={onDisconnect}>
            {disconnectLabel}
          </Button>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <FormField
            id={inputId}
            label={inputLabel}
            icon={Icon}
            type="text"
            placeholder={inputPlaceholder}
            required
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
          <Button type="submit">{connectLabel}</Button>
        </form>
      )}
    </div>
  );
}
