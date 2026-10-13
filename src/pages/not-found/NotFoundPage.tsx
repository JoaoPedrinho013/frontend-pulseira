import { useLocation } from 'react-router-dom';
import { PageContainer } from '../../components/layout/PageContainer';
import { PageHero } from '../../components/page-hero/PageHero';
import { LinkButton } from '../../components/ui/LinkButton';
import { usePageMeta } from '../../hooks/usePageMeta';
import styles from './NotFoundPage.module.css';

const PAGE_TITLE = 'Página não encontrada — Zelo';
const PAGE_DESCRIPTION = 'O endereço acessado não existe no site do Zelo.';

export function NotFoundPage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });
  const location = useLocation();

  return (
    <PageContainer>
      <PageHero
        titleId="not-found-title"
        eyebrow="Erro 404"
        title="Essa página não existe"
        description={`Não encontramos "${location.pathname}". O endereço pode ter sido digitado errado ou a página pode ter sido movida.`}
      />

      <div className={styles.actions}>
        <LinkButton to="/">Voltar para o início</LinkButton>
      </div>
    </PageContainer>
  );
}
