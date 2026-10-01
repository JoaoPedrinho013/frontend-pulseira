# Zelo — front-end

Site do **Zelo** (pt-BR): pulseira inteligente (ESP32 + GPS NEO-6M + MPU6050) que acompanha a localização de uma pessoa e detecta possíveis quedas, avisando um responsável. Projeto acadêmico (prova de conceito) da FATEC Praia Grande (DSM).

Stack: React 19 + Vite + TypeScript estrito + react-router-dom. CSS Modules + tokens. Sem UI kit, sem testes.
O back-end fica em outro repositório (`../backend-pulseira`: Java/Spring Boot + MongoDB). **Hoje o front não chama nenhuma API**: é só site institucional. Não altere o back-end a partir daqui.

## Comandos
- `npm run dev` (porta 5173) · `npm run build` (= `tsc -b && vite build`) · `npm run lint` (oxlint) · `npm run preview`
- **Deploy (GitHub Pages):** `.github/workflows/deploy.yml` (push em `main`, só para o dono do repo) roda `npm ci` + `npm run build`, copia `dist/index.html` → `dist/404.html` (fallback SPA) e publica. `vite.config.ts` usa `base: '/frontend-pulseira/'` **só no build** (`'/'` no dev). Não alterar workflow/`base` sem combinar. `vite preview` usa `base '/'`, então **não serve para testar o Pages**.

## Rotas (`src/router/routes.tsx`)
Dentro de `MainLayout` (header + footer): `/` Landing (só hero) · `/sobre` Sobre o projeto (âncoras `#como-funciona`, `#beneficios`) · `/sensores` · `/contato` · `/privacidade` · `/faq` (`?pagina=N`). Não existe rota 404.
Fora do `MainLayout` (standalone, sem header/footer do site): `/login`, `/cadastro` (`AuthLayout`) e `/admin` (`AdminLayout`). Próximas telas do tipo (ex.: dashboard do paciente/responsável) devem seguir o mesmo padrão standalone — ver comentário em `routes.tsx`.
`ScrollToTop` (em `App.tsx`) rola ao topo a cada troca de rota e para `#hash` quando houver. O "Entrar" do Header/CTAs já leva a `/login`.
**`/admin` não tem guarda de rota**: é acessível direto pela URL, sem checar sessão/perfil (não há sessão real — ver Armadilhas). No login, digitar `admin` no campo "E-mail ou CPF" (qualquer senha) redireciona para `/admin`; qualquer outro valor vai para `/`.

## Estrutura de `src/`
- `pages/<nome>/` uma página + `sections/` (só o que é específico dela). Páginas: about, contact, faq, landing, privacy, sensors. `pages/auth/login` e `pages/auth/cadastro` seguem o mesmo padrão (página fina + `sections/LoginFormSection`/`CadastroFormSection` com o formulário em si). `pages/admin` idem: `AdminPage` fina + `sections/AdminStatsSection` (cards/gráficos) e `sections/AdminUsersSection` (tabela de usuários).
- `components/<kebab-case>/` componentes reutilizáveis (`X.tsx` + `X.module.css`). `layout/` (MainLayout, PageContainer), `auth-layout/` (`AuthLayout` — casca de login/cadastro), `admin-layout/` (`AdminLayout` — casca do `/admin`: topo com marca + "Sair", conteúdo em `PageContainer`), `header/`, `footer/`, `form-field/` (`FormField`, `PasswordField`), `avatar/` (`Avatar`, aceita `size` opcional p/ usos compactos como a tabela do admin), `stat-card/` (`StatCard`), `distribution-bar/` (`DistributionBar` — mini gráfico de barra empilhada, CSS puro), `ui/` (Button, IconButton, LinkButton), `icons/` (todos os SVGs em `index.tsx`).
- `data/` conteúdo e listas tipadas, **fora do JSX** (nomes em pt-BR para conteúdo de domínio: `beneficios.ts`, `passos.ts`, `faq.ts`...; `siteConfig.ts`, `footerData.ts`, `authPanelFeatures.ts`, `usuariosMock.ts` — usuários fictícios do `/admin`).
- `hooks/` `useTheme`, `usePageMeta`, `usePaginacao<T>`, `useActiveSection`. `utils/` `classNames`, `paginacao`, `scroll`, `mascaras` (`formatarCpf`, `formatarDataBr` — máscaras dos campos de cadastro). `types/` tipos compartilhados (`politica.ts`, `theme.ts`, `usuario.ts`). `context/` tema.
- `styles/` `tokens.css` (única fonte de cor/espaço/tipografia), `fonts.css`, `reset.css`, `global.css`.
- `assets/fonts` (SF Pro Display, woff2) e `assets/images` (`hardware/`, `team/`, fotos da pulseira — **não usadas** no login/cadastro/admin, ver Armadilhas).

## Componentes prontos (reutilize antes de criar)
`ContentSection` + `SectionText` (seção com título/borda/ritmo) · `PageHero` (h1 centralizado) · `SectionHeader` · `CallToAction` / `CallToActionSection` · `FeatureCard` · `StepList` · `FlowDiagram` · `SensorCard` · `ImageGallery` · `Notice` · `Accordion` (WAI-ARIA, teclado) · `Pagination` (genérico) · `TableOfContents` · `SummaryCard` · `PolicySection`/`PolicyBlocks` · `TeamMemberCard` + `Avatar` · `BackToTopButton` · `Button`/`LinkButton`/`IconButton` · `AuthLayout` (casca de login/cadastro) · `AdminLayout` (casca do painel admin) · `FormField`/`PasswordField` (inputs com ícone) · `StatCard` (card de número + ícone) · `DistributionBar` (barra empilhada com legenda, dado `segments: {label, value, variant}[]`).
Tipos úteis: `IconComponent` (`components/icons`), `ButtonVariant`, `Usuario`/`TipoUsuario`/`StatusUsuario` (`types/usuario`). Para juntar classes use `classNames()`.

## Convenções
- TypeScript estrito, **sem `any`**, sem `@ts-ignore`; props tipadas; componentes pequenos; componentes PascalCase, hooks `useX`.
- Conteúdo em `data/`, nunca hardcoded em JSX longo. Listas com `key` estável (id/texto único).
- **Cores só por tokens** (`var(--color-*)`). Nenhum hex fora de `styles/tokens.css`. Estados (hover/active) derivam da paleta.
- Tema claro/escuro: atributo `data-theme` no `<html>`, chave `zelo:theme` no localStorage; `index.html` aplica o tema antes do React (evita flash). Tokens do escuro sobrescrevem os mesmos nomes em `[data-theme='dark']`.
- Fonte **San Francisco (SF Pro Display)** local, `font-display: swap`. Não trocar.
- Acessibilidade: HTML semântico, headings em ordem, `alt` descritivo, foco visível, alvos ≥ 44px, `prefers-reduced-motion` respeitado, contraste WCAG AA.
- Imagens abaixo da dobra com `loading="lazy"` e `width/height`; a do topo não.

## Paleta oficial (não inventar cores)
Azul petróleo `#1B4B5A` (primária) · Verde-água `#5FA8A0` (sucesso/cuidado) · **Coral `#FF6B4A` exclusivo de alerta de queda** (`--color-alert*`; nunca decorativo, nem em botão/link/ícone comum) · Areia clara `#F7F5F2` (fundo) · Grafite `#2E2E2E` (texto) · Cinza-médio `#6B6B66` (texto secundário, só ≥14px).

## Armadilhas
- **Deploy sob subcaminho:** o Pages serve em `/frontend-pulseira/`. Por isso `BrowserRouter` usa `basename={import.meta.env.BASE_URL}` (`main.tsx`) e o logo usa `import.meta.env.BASE_URL` (`siteConfig.logoSrc`). Caminhos absolutos como `'/favicon.svg'` em JS quebram no Pages (sem isso o site abria em branco: `No routes matched`). Em dev `BASE_URL` é `/`. Em novos assets/links de JS, sempre use `BASE_URL`.
- `position: sticky` do Header exige que `html/body/#root` **não** tenham `height: 100%`/`overflow` (já removido do reset; não reintroduzir).
- Breakpoint do menu mobile está duplicado: `matchMedia('(min-width: 768px)')` em `Header.tsx` e `@media (max-width: 767px)` em `Header.module.css`. Mude os dois juntos.
- `zelo:theme` existe em dois lugares: script inline do `index.html` e `ThemeContext.tsx`.
- `footerData.ts` é a fonte única dos desenvolvedores (footer + `/contato`); Backend aparece primeiro (`backendCreators`/`otherCreators`).
- `politicaPrivacidade.ts`: texto entre `[COLCHETES]` vira placeholder destacado. Descreve o modelo de dados do back-end **atual** (só modelagem, sem controllers); revisar se o back-end mudar.
- `FaqListSection` só considera aberto o item da página atual; `usePaginacao` mantém a página em `?pagina=`.
- `ghost` (Button) e `--font-weight-regular` existem mas ainda não têm uso (mantidos de propósito).
- `AuthLayout`: o painel de marca (lado esquerdo em ≥900px) usa `background: var(--color-primary)` + `color: var(--color-primary-contrast)`, igual ao `CallToAction` — no tema escuro `--color-primary` fica claro de propósito (contraste), não é bug. Painel não tem mais foto da pulseira (removida a pedido; não reintroduzir imagem ali). Destaques do painel vêm de `data/authPanelFeatures.ts`.
- `AdminPage`: a lista de usuários é `useState(usuariosMock)` local — "excluir"/"desativar" só mudam o state em memória (confirmado via `window.confirm` antes de excluir). Dar F5 restaura os 10 usuários do mock. Não tem paginação/busca/filtro (lista pequena, não precisou ainda).
- Badges de status (`AdminUsersSection`) e o ícone do `SummaryCard` usam `color-success` como texto **sobre** `color-success-soft`, não o inverso — é o padrão já usado no projeto para "soft badge", não confundir com o par `--color-success`/`--color-success-contrast` (esse é p/ texto sobre `--color-success` sólido).

## Pendências reais (não remover)
- `data/faq.ts`: respostas em lorem ipsum (`// TODO: substituir pelas respostas reais`).
- `data/politicaPrivacidade.ts`: placeholders (controlador, e-mail, prazos de retenção, DPO etc.) + revisão jurídica.
- `LoginFormSection`/`CadastroFormSection`: formulários só fazem `navigate()` no submit (`/` e `/login`, respectivamente) — sem validação real, sem chamada de API, sem estado de erro/loading. "Lembrar de mim" e "Esqueceu sua senha?" são inertes (sem handler). Isso é esperado enquanto o front não integra com o back-end.
- `AdminPage`/`usuariosMock.ts`: tela 100% mockada — sem API, sem sessão/guarda de rota, sem paginação/busca. Quando o back-end expuser endpoints de usuários, trocar o mock por fetch real e adicionar proteção de rota (hoje qualquer um acessa `/admin` direto pela URL).

## Regras para sessões futuras
- **Não apagar imagens nem fontes**, mesmo sem uso. Não alterar o back-end, `vite.config.ts`, versões de dependências nem workflows.
- Mudança "sem alteração visual" (refatoração) deve ser verificada rota por rota, nos dois temas e em ~375px e ~1280px.
- Rodar `npm run build` e `npm run lint` antes de encerrar.
- `.claude/` está no `.gitignore` (só guarda `launch.json` do preview local). Documentação do projeto vive **neste arquivo**.
