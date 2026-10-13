import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { PageContainer } from '../layout/PageContainer';
import { LinkButton } from '../ui/LinkButton';
import { ThemeToggle } from '../theme-toggle/ThemeToggle';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  /** Short label next to the brand, e.g. "Admin", "Paciente", "Responsável". */
  badgeLabel: string;
  children: ReactNode;
}

/** Standalone shell (no site header/footer) shared by /admin, /paciente and /responsavel. */
export function DashboardLayout({ badgeLabel, children }: DashboardLayoutProps) {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <PageContainer>
          <div className={styles.headerInner}>
            <Link className={styles.brand} to="/">
              <img
                className={styles.logo}
                src={siteConfig.logoSrc}
                alt=""
                width={32}
                height={32}
              />
              <span className={styles.brandName}>{siteConfig.name}</span>
              <span className={styles.badge}>{badgeLabel}</span>
            </Link>

            <div className={styles.actions}>
              <ThemeToggle />
              <LinkButton variant="secondary" to="/login">
                Sair
              </LinkButton>
            </div>
          </div>
        </PageContainer>
      </header>

      <main className={styles.main}>
        <PageContainer>{children}</PageContainer>
      </main>
    </div>
  );
}
