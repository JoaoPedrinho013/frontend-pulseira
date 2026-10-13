import {
  alergiasComuns,
  condicoesComuns,
  medicamentosComuns,
  rotulosSelecionados,
} from '../../data/opcoesMedicas';
import type { InformacoesMedicas } from '../../types/paciente';
import styles from './InformacoesMedicasView.module.css';

interface InformacoesMedicasViewProps {
  informacoesMedicas: InformacoesMedicas;
}

function GrupoLista({ titulo, itens }: { titulo: string; itens: string[] }) {
  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle}>{titulo}</h3>
      {itens.length === 0 ? (
        <p className={styles.empty}>Nenhuma informada.</p>
      ) : (
        <ul className={styles.chips}>
          {itens.map((item) => (
            <li key={item} className={styles.chip}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Exibição somente leitura — usada na dashboard do responsável. */
export function InformacoesMedicasView({
  informacoesMedicas,
}: InformacoesMedicasViewProps) {
  return (
    <div className={styles.view}>
      <div className={styles.group}>
        <h3 className={styles.groupTitle}>Tipo sanguíneo</h3>
        <span className={styles.bloodType}>
          {informacoesMedicas.tipoSanguineo ?? 'Não informado'}
        </span>
      </div>

      <GrupoLista
        titulo="Alergias"
        itens={rotulosSelecionados(alergiasComuns, informacoesMedicas.alergias)}
      />
      <GrupoLista
        titulo="Condições de saúde"
        itens={rotulosSelecionados(condicoesComuns, informacoesMedicas.condicoes)}
      />
      <GrupoLista
        titulo="Remédios que toma sempre"
        itens={rotulosSelecionados(
          medicamentosComuns,
          informacoesMedicas.medicamentosUsoContinuo,
        )}
      />

      {informacoesMedicas.observacoes && (
        <div className={styles.group}>
          <h3 className={styles.groupTitle}>Observações</h3>
          <p className={styles.observacoes}>{informacoesMedicas.observacoes}</p>
        </div>
      )}
    </div>
  );
}
