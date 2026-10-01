import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../../data/siteConfig';
import { authPanelFeatures } from '../../data/authPanelFeatures';
import { ShieldIcon } from '../icons';
import { ThemeToggle } from '../theme-toggle/ThemeToggle';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  panelTitle: string;
  panelDescription: string;
  formTitleId: string;
  formTitle: string;
  formDescription: string;
  children: ReactNode;
}

export function AuthLayout({
  panelTitle,
  panelDescription,
  formTitleId,
  formTitle,
  formDescription,
  children,
}: AuthLayoutProps) {
  return (
    <div className={styles.layout}>
      <aside className={styles.panel} aria-hidden="true">
        <div className={styles.panelGlowOne} />
        <div className={styles.panelGlowTwo} />
        <div className={styles.panelContent}>
          <div className={styles.panelBadge}>
            <ShieldIcon />
          </div>
          <h2 className={styles.panelTitle}>{panelTitle}</h2>
          <p className={styles.panelDescription}>{panelDescription}</p>
          <ul className={styles.panelFeatures}>
            {authPanelFeatures.map(({ icon: Icon, label }) => (
              <li key={label} className={styles.panelFeature}>
                <span className={styles.panelFeatureIcon}>
                  <Icon />
                </span>
                {label}
              </li>
            ))}
          </ul>
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
          <div className={styles.formCard}>
            <h1 id={formTitleId} className={styles.formTitle}>
              {formTitle}
            </h1>
            <p className={styles.formDescription}>{formDescription}</p>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
