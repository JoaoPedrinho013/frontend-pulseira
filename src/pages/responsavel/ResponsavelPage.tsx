import { useMemo, useState } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout/DashboardLayout';
import { Notice } from '../../components/notice/Notice';
import { usePageMeta } from '../../hooks/usePageMeta';
import { pacienteMock } from '../../data/pacienteMock';
import { gerarTelemetriaMock } from '../../data/telemetriaMock';
import type { Paciente } from '../../types/paciente';
import { ConexaoPacienteSection } from './sections/ConexaoPacienteSection';
import { MonitoramentoSection } from './sections/MonitoramentoSection';
import { DadosPacienteSection } from './sections/DadosPacienteSection';
import { LogSection } from './sections/LogSection';
import styles from './ResponsavelPage.module.css';

const PAGE_TITLE = 'Painel do responsável — Zelo';
const PAGE_DESCRIPTION =
  'Painel do responsável: conexão com o paciente, mapa em tempo real, dados médicos e log de monitoramento.';

export function ResponsavelPage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });

  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const telemetria = useMemo(() => gerarTelemetriaMock(), []);

  function handleConectar() {
    // Mock: qualquer código aceita e vincula o paciente de exemplo.
    setPaciente(pacienteMock);
  }

  function handleDesconectar() {
    setPaciente(null);
  }

  return (
    <DashboardLayout badgeLabel="Responsável">
      <div className={styles.page}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Painel do responsável</h1>
          <p className={styles.subtitle}>
            Localização, status e saúde de quem você cuida.
          </p>
        </div>

        <Notice>Demonstração: nada aqui é salvo de verdade.</Notice>

        <ConexaoPacienteSection
          paciente={paciente}
          onConectar={handleConectar}
          onDesconectar={handleDesconectar}
        />

        {paciente ? (
          <>
            <MonitoramentoSection paciente={paciente} registro={telemetria[0]} />
            <DadosPacienteSection paciente={paciente} />
            <LogSection registros={telemetria} />
          </>
        ) : (
          <Notice>Conecte-se a um paciente para começar.</Notice>
        )}
      </div>
    </DashboardLayout>
  );
}
