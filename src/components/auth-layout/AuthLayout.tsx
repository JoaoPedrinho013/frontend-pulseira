import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { ThemeToggle } from '../theme-toggle/ThemeToggle';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  panelTitle: string;
  panelDescription: string;
  panelImage: string;
  formTitleId: string;
  formTitle: string;
  formDescription: string;
  children: ReactNode;
}

export function AuthLayout({
  panelTitle,
  panelDescription,
  panelImage,
  formTitleId,
  formTitle,
  formDescription,
  children,
}: AuthLayoutProps) {
  return (
    <div className={styles.layout}>
      <aside className={styles.panel} aria-hidden="true">
        <div className={styles.panelContent}>
          <h2 className={styles.panelTitle}>{panelTitle}</h2>
          <p className={styles.panelDescription}>{panelDescription}</p>
          <div className={styles.panelImageWrapper}>
            <img className={styles.panelImage} src={panelImage} alt="" />
          </div>
        </div>
      </aside>

      <div className={styles.form}>
        <div className={styles.formHeader}>
          <Link className={styles.brand} to="/">
            <img
              className={styles.logo}
              src={siteConfig.logoSrc}
              alt=""
              width={32}
              height={32}
            />
            <span className={styles.brandName}>{siteConfig.name}</span>
          </Link>
          <ThemeToggle />
        </div>

        <div className={styles.formBody}>
          <h1 id={formTitleId} className={styles.formTitle}>
            {formTitle}
          </h1>
          <p className={styles.formDescription}>{formDescription}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
