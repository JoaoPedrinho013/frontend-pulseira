import { useState } from 'react';
import { DashboardLayout } from '../../components/dashboard-layout/DashboardLayout';
import { Notice } from '../../components/notice/Notice';
import { usePageMeta } from '../../hooks/usePageMeta';
import { usuariosMock } from '../../data/usuariosMock';
import type { Usuario } from '../../types/usuario';
import { AdminStatsSection } from './sections/AdminStatsSection';
import { AdminUsersSection } from './sections/AdminUsersSection';
import styles from './AdminPage.module.css';

const PAGE_TITLE = 'Administração — Zelo';
const PAGE_DESCRIPTION =
  'Painel administrativo do Zelo: usuários cadastrados, tipos de conta e status.';

export function AdminPage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });
  const [usuarios, setUsuarios] = useState<Usuario[]>(usuariosMock);

  function handleToggleStatus(id: string) {
    setUsuarios((current) =>
      current.map((usuario) =>
        usuario.id === id
          ? {
              ...usuario,
              status: usuario.status === 'ativo' ? 'inativo' : 'ativo',
            }
          : usuario,
      ),
    );
  }

  function handleDelete(id: string) {
    setUsuarios((current) => current.filter((usuario) => usuario.id !== id));
  }

  return (
    <DashboardLayout badgeLabel="Admin">
      <div className={styles.page}>
        <div className={styles.heading}>
          <h1 className={styles.title}>Painel administrativo</h1>
          <p className={styles.subtitle}>Gerencie os usuários do Zelo.</p>
        </div>

        <Notice>Demonstração: nada aqui é salvo de verdade.</Notice>

        <AdminStatsSection usuarios={usuarios} />
        <AdminUsersSection
          usuarios={usuarios}
          onToggleStatus={handleToggleStatus}
          onDelete={handleDelete}
        />
      </div>
    </DashboardLayout>
  );
}
