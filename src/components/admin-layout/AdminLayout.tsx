import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { PageContainer } from '../layout/PageContainer';
import { LinkButton } from '../ui/LinkButton';
import { ThemeToggle } from '../theme-toggle/ThemeToggle';
import styles from './AdminLayout.module.css';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
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
              <span className={styles.badge}>Admin</span>
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
