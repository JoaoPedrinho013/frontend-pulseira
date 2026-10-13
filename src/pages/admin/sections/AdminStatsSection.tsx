import {
  CheckCircleIcon,
  HeartPulseIcon,
  UserIcon,
  UsersIcon,
} from '../../../components/icons';
import { StatCard } from '../../../components/stat-card/StatCard';
import { DistributionBar } from '../../../components/distribution-bar/DistributionBar';
import type { Usuario } from '../../../types/usuario';
import styles from './AdminStatsSection.module.css';

interface AdminStatsSectionProps {
  usuarios: Usuario[];
}

export function AdminStatsSection({ usuarios }: AdminStatsSectionProps) {
  const total = usuarios.length;
  const totalPacientes = usuarios.filter((u) => u.tipo === 'paciente').length;
  const totalResponsaveis = usuarios.filter(
    (u) => u.tipo === 'responsavel',
  ).length;
  const totalAtivos = usuarios.filter((u) => u.status === 'ativo').length;
  const totalInativos = total - totalAtivos;

  return (
    <section className={styles.section} aria-label="Resumo de usuários">
      <div className={styles.cards}>
        <StatCard icon={UsersIcon} value={total} label="Usuários" />
        <StatCard icon={HeartPulseIcon} value={totalPacientes} label="Pacientes" />
        <StatCard
          icon={UserIcon}
          value={totalResponsaveis}
          label="Responsáveis"
        />
        <StatCard
          icon={CheckCircleIcon}
          value={totalAtivos}
          label="Ativos"
        />
      </div>

      <div className={styles.charts}>
        <DistributionBar
          title="Por tipo"
          segments={[
            { label: 'Pacientes', value: totalPacientes, variant: 'primary' },
            {
              label: 'Responsáveis',
              value: totalResponsaveis,
              variant: 'success',
            },
          ]}
        />
        <DistributionBar
          title="Por status"
          segments={[
            { label: 'Ativos', value: totalAtivos, variant: 'success' },
            { label: 'Inativos', value: totalInativos, variant: 'muted' },
          ]}
        />
      </div>
    </section>
  );
}
