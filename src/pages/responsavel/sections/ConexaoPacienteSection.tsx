import { useState, type FormEvent } from 'react';
import { Avatar } from '../../../components/avatar/Avatar';
import { FormField } from '../../../components/form-field/FormField';
import { Button } from '../../../components/ui/Button';
import { IdCardIcon } from '../../../components/icons';
import { classNames } from '../../../utils/classNames';
import { calcularIdade } from '../../../utils/idade';
import { pacienteMock } from '../../../data/pacienteMock';
import type { Paciente } from '../../../types/paciente';
import connectionStyles from '../../../components/connection-card/ConnectionCard.module.css';
import styles from './ConexaoPacienteSection.module.css';

interface ConexaoPacienteSectionProps {
  paciente: Paciente | null;
  onConectar: () => void;
  onDesconectar: () => void;
}

type Etapa = 'buscar' | 'confirmar';

export function ConexaoPacienteSection({
  paciente,
  onConectar,
  onDesconectar,
}: ConexaoPacienteSectionProps) {
  const [etapa, setEtapa] = useState<Etapa>('buscar');
  const [codigo, setCodigo] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [encontrado, setEncontrado] = useState<Paciente | null>(null);

  function handleBuscar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digitado = codigo.trim().toUpperCase();

    // Mock: só existe o paciente de exemplo, com código fixo em pacienteMock.
    // Quando o back-end expuser a busca por código, trocar por fetch real.
    if (digitado !== pacienteMock.codigoVinculo) {
      setErro('Código não encontrado. Confira e tente de novo.');
      return;
    }

    setErro(null);
    setEncontrado(pacienteMock);
    setEtapa('confirmar');
  }

  function handleConfirmar() {
    onConectar();
    setEtapa('buscar');
    setCodigo('');
    setEncontrado(null);
  }

  function handleCancelar() {
    setEtapa('buscar');
    setEncontrado(null);
  }

  return (
    <section className={styles.section} aria-label="Conexão com o paciente">
      <div className={connectionStyles.card}>
        <div className={connectionStyles.header}>
          <span className={connectionStyles.iconWrapper}>
            <IdCardIcon />
          </span>
          <div className={connectionStyles.headerText}>
            <h3 className={connectionStyles.title}>Paciente</h3>
            <p className={connectionStyles.description}>
              Digite o código do paciente para conectar.
            </p>
          </div>
          <span
            className={classNames(
              connectionStyles.status,
              paciente
                ? connectionStyles.statusConnected
                : connectionStyles.statusDisconnected,
            )}
          >
            {paciente ? 'Conectado' : 'Não conectado'}
          </span>
        </div>

        {paciente ? (
          <div className={connectionStyles.connectedBody}>
            <p className={styles.summary}>
              Acompanhando <strong>{paciente.nome}</strong>
            </p>
            <Button variant="secondary" onClick={onDesconectar}>
              Desconectar
            </Button>
          </div>
        ) : etapa === 'buscar' ? (
          <form className={connectionStyles.form} onSubmit={handleBuscar}>
            <FormField
              id="codigo-paciente"
              label="Código do paciente"
              icon={IdCardIcon}
              type="text"
              placeholder="Ex.: ZELO-4T7P"
              required
              value={codigo}
              onChange={(event) => {
                setErro(null);
                setCodigo(event.target.value);
              }}
            />
            {erro && <p className={styles.erro}>{erro}</p>}
            <Button type="submit">Buscar</Button>
          </form>
        ) : (
          encontrado && (
            <div className={styles.confirmacao}>
              <p className={styles.confirmacaoAviso}>É esta a pessoa certa?</p>

              <div className={styles.preview}>
                <Avatar name={encontrado.nome} size={48} />
                <div>
                  <p className={styles.previewNome}>{encontrado.nome}</p>
                  <p className={styles.previewMeta}>
                    {calcularIdade(encontrado.dataNascimento)} anos ·{' '}
                    {encontrado.telefone}
                  </p>
                  <p className={styles.previewMeta}>
                    {encontrado.endereco.bairro}, {encontrado.endereco.cidade}{' '}
                    - {encontrado.endereco.estado}
                  </p>
                </div>
              </div>

              <div className={styles.confirmacaoActions}>
                <Button onClick={handleConfirmar}>Confirmar</Button>
                <Button variant="secondary" onClick={handleCancelar}>
                  Cancelar
                </Button>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
