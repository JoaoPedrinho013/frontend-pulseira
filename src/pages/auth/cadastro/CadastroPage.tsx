import { AuthLayout } from '../../../components/auth-layout/AuthLayout';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { CadastroFormSection } from './sections/CadastroFormSection';

const PAGE_TITLE = 'Criar conta — Zelo';
const PAGE_DESCRIPTION =
  'Crie sua conta Zelo e tenha acesso a todos os recursos de monitoramento e segurança.';

export function CadastroPage() {
  usePageMeta({ title: PAGE_TITLE, description: PAGE_DESCRIPTION });

  return (
    <AuthLayout
      panelTitle="Juntos por mais segurança"
      panelDescription="Cadastre-se para começar a usar a pulseira de cuidados e ter acesso a todos os recursos do sistema."
      formTitleId="cadastro-title"
      formTitle="Cadastro"
      formDescription="Preencha os dados abaixo para criar sua conta."
    >
      <CadastroFormSection />
    </AuthLayout>
  );
}
