import { useState } from 'react';
import { classNames } from '../../utils/classNames';
import { UsersIcon } from '../icons';
import { Button } from '../ui/Button';
import type { Responsavel } from '../../types/responsavel';
import connectionStyles from '../connection-card/ConnectionCard.module.css';
import styles from './PatientCodeCard.module.css';

interface PatientCodeCardProps {
  codigoVinculo: string;
  responsavel: Responsavel | null;
  onDesvincular: () => void;
}

/**
 * Card do lado do paciente: mostra o código pra compartilhar com o
 * responsável (em vez de um formulário) — quem inicia o vínculo, digitando
 * o código e confirmando, é o responsável (ver `ConexaoPacienteSection`).
 */
export function PatientCodeCard({
  codigoVinculo,
  responsavel,
  onDesvincular,
}: PatientCodeCardProps) {
  const [copiado, setCopiado] = useState(false);

  async function handleCopiar() {
    try {
      await navigator.clipboard.writeText(codigoVinculo);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Clipboard indisponível (ex.: contexto não seguro) — o código já
      // está visível na tela pra copiar manualmente.
    }
  }

  return (
    <div className={connectionStyles.card}>
      <div className={connectionStyles.header}>
        <span className={connectionStyles.iconWrapper}>
          <UsersIcon />
        </span>
        <div className={connectionStyles.headerText}>
          <h3 className={connectionStyles.title}>Responsável</h3>
          <p className={connectionStyles.description}>
            Compartilhe este código com seu responsável.
          </p>
        </div>
        <span
          className={classNames(
            connectionStyles.status,
            responsavel
              ? connectionStyles.statusConnected
              : connectionStyles.statusDisconnected,
          )}
        >
          {responsavel ? 'Conectado' : 'Não conectado'}
        </span>
      </div>

      {responsavel ? (
        <div className={connectionStyles.connectedBody}>
          <p className={styles.summary}>
            <strong>{responsavel.nome}</strong>
            <br />
            {responsavel.email}
          </p>
          <Button variant="secondary" onClick={onDesvincular}>
            Desvincular
          </Button>
        </div>
      ) : (
        <div className={styles.shareBox}>
          <span className={styles.codeLabel}>Seu código</span>
          <div className={styles.codeRow}>
            <code className={styles.code}>{codigoVinculo}</code>
            <Button variant="secondary" onClick={handleCopiar}>
              {copiado ? 'Copiado!' : 'Copiar código'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
