import {
  AlertIcon,
  BellIcon,
  LocationPinIcon,
  type IconComponent,
} from '../components/icons';

export interface AuthPanelFeature {
  icon: IconComponent;
  label: string;
}

/** Destaques exibidos no painel lateral das páginas de login/cadastro. */
export const authPanelFeatures: AuthPanelFeature[] = [
  { icon: LocationPinIcon, label: 'Localização em tempo real' },
  { icon: AlertIcon, label: 'Detecção automática de quedas' },
  { icon: BellIcon, label: 'Alertas instantâneos para a família' },
];
