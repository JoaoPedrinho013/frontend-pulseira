import type { RouteObject } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { LandingPage } from '../pages/landing/LandingPage';
import { AboutPage } from '../pages/about/AboutPage';
import { SensorsPage } from '../pages/sensors/SensorsPage';
import { ContactPage } from '../pages/contact/ContactPage';
import { PrivacyPage } from '../pages/privacy/PrivacyPage';
import { FaqPage } from '../pages/faq/FaqPage';
import { LoginPage } from '../pages/auth/login/LoginPage';
import { CadastroPage } from '../pages/auth/cadastro/CadastroPage';
import { AdminPage } from '../pages/admin/AdminPage';

/**
 * Marketing/institutional routes share MainLayout (header + footer).
 * Auth routes (login/cadastro) and the admin panel render standalone,
 * without the site header/footer. Future screens like a patient/family
 * dashboard should follow the same pattern, e.g.:
 *
 * { path: 'dashboard', element: <DashboardPage /> }
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'sobre', element: <AboutPage /> },
      { path: 'sensores', element: <SensorsPage /> },
      { path: 'contato', element: <ContactPage /> },
      { path: 'privacidade', element: <PrivacyPage /> },
      { path: 'faq', element: <FaqPage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/cadastro', element: <CadastroPage /> },
  { path: '/admin', element: <AdminPage /> },
];
