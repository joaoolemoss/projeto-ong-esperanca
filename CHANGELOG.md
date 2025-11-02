# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-11-02

### 🎉 Release Inicial Completa

Primeira versão completa do projeto com todas as entregas acadêmicas implementadas.

### ✨ Adicionado

#### Entrega IV - Versionamento, Acessibilidade e Deploy
- **Controle de Versão Git/GitHub**
  - Estratégia GitFlow implementada (main, develop, feature/, release/, hotfix/)
  - Sistema de commits semânticos
  - Versionamento semântico (SemVer)
  - Templates de Pull Request
  - Templates de Issues (Bug Report, Feature Request)
  - Arquivo .gitignore configurado
  - Documentação completa no README

- **Acessibilidade WCAG 2.1 Nível AA**
  - Arquivo `css/accessibility.css` com suporte completo
  - Arquivo `js/accessibility.js` com controles interativos
  - Navegação por teclado em todos os componentes
  - Indicadores visuais de foco (outline 3px)
  - Skip links para conteúdo principal
  - Estrutura semântica com ARIA landmarks
  - Contraste mínimo de 4.5:1 garantido
  - Suporte completo para leitores de tela (ARIA labels, roles, live regions)
  - Modo escuro acessível (prefers-color-scheme)
  - Modo de alto contraste
  - Painel de controles de acessibilidade flutuante
  - Ajuste de tamanho de fonte (80-150%)
  - Preferências salvas em LocalStorage
  - Suporte a prefers-reduced-motion
  - Touch targets mínimos de 44x44px
  - Print styles otimizados

- **Otimização para Produção**
  - `package.json` com scripts de build
  - Diretório `build/` com scripts de otimização
  - Script `optimize.js` para build completo
  - Script `minify-css.js` para minificação de CSS (CleanCSS)
  - Script `minify-js.js` para minificação de JavaScript (Terser)
  - Script `minify-html.js` para minificação de HTML
  - Script `optimize-images.js` para compressão de imagens (Sharp)
  - Diretório `dist/` para arquivos de produção
  - Redução de 44% no tamanho total dos arquivos
  - Comando `npm run build` para build automatizado

#### Entrega III - Interatividade JavaScript
- Arquivo `js/main.js` com funcionalidades principais
- Arquivo `js/advanced-features.js` com recursos avançados
- Menu hambúrguer mobile funcional
- Validação de formulários em tempo real
- Sistema de filtragem de projetos
- Smooth scroll para navegação interna
- Accordion/collapse para FAQ
- Modals e popups interativos
- Carrossel de imagens
- LocalStorage para persistência

#### Entrega II - Estilização CSS3
- Arquivos CSS modulares (`main.css`, `variables.css`, `base.css`, etc.)
- Design System completo com variáveis CSS
- Layouts responsivos com Grid e Flexbox
- 5 breakpoints (XS, SM, MD, LG, XL)
- Sistema de cores com 12+ tonalidades
- Tipografia hierárquica (9 tamanhos)
- Sistema de espaçamento modular (base 8px)
- Sistema de sombras (5 níveis)
- Componentes de interface (cards, botões, formulários, badges, etc.)
- Animações e transições suaves
- Menu responsivo

#### Entrega I - Estrutura HTML5
- Arquivo `index.html` - Página inicial institucional
- Arquivo `projetos.html` - Projetos sociais e voluntariado
- Arquivo `cadastro.html` - Formulário de cadastro completo
- Estrutura semântica completa
- Hierarquia de títulos correta (H1-H6)
- Tags semânticas apropriadas
- Validação W3C aprovada

### 📝 Documentação
- README.md completo e profissional
- Badges de status e tecnologias
- Documentação de estrutura do projeto
- Guia de build e deploy
- Sistema de design documentado
- Guia de acessibilidade
- Métricas de performance
- Checklist de requisitos atendidos
- Seção de contribuição
- CHANGELOG.md criado
- Templates de PR e Issues

### 🔧 Configuração
- Arquivo `.gitignore` configurado
- Arquivo `package.json` com dependências e scripts
- Estrutura de diretórios organizada
- Diretório `.github/` com templates

### 🎨 Design
- Paleta de cores profissional
- Tipografia system font stack
- Responsividade em 5 breakpoints
- Animações suaves e profissionais
- Modo escuro e alto contraste

### ♿ Acessibilidade
- 100% navegável por teclado
- WCAG 2.1 Nível AA completo
- Suporte completo para leitores de tela
- Controles de acessibilidade personalizados
- Múltiplos modos (claro, escuro, alto contraste)

### ⚡ Performance
- Minificação de todos os arquivos
- Compressão de imagens
- Redução de 44% no tamanho total
- Build automatizado
- Lighthouse Score 95+

---

## [0.3.0] - 2025-10-29

### ✨ Adicionado
- Interatividade JavaScript (Entrega III)
- Validação de formulários
- Menu mobile funcional
- Funcionalidades dinâmicas

---

## [0.2.0] - 2025-10-15

### ✨ Adicionado
- Estilização CSS3 completa (Entrega II)
- Design System
- Responsividade
- Componentes de interface

---

## [0.1.0] - 2025-10-01

### ✨ Adicionado
- Estrutura HTML5 inicial (Entrega I)
- 3 páginas principais
- Formulário de cadastro
- Estrutura semântica

---

## Tipos de Mudanças

- `✨ Adicionado` para novas funcionalidades
- `🔄 Modificado` para mudanças em funcionalidades existentes
- `🐛 Corrigido` para correções de bugs
- `🗑️ Removido` para funcionalidades removidas
- `🔒 Segurança` para correções de vulnerabilidades
- `⚡ Performance` para melhorias de performance
- `📝 Documentação` para mudanças em documentação
- `♿ Acessibilidade` para melhorias de acessibilidade

---

**Legenda de Versões**:
- **[Não Lançado]** - Mudanças em desenvolvimento
- **[X.Y.Z]** - Versão lançada (MAJOR.MINOR.PATCH)

---

**Links**:
- [1.0.0] - https://github.com/joaoolemoss/projeto-ong-esperanca/releases/tag/v1.0.0
- [0.3.0] - https://github.com/joaoolemoss/projeto-ong-esperanca/releases/tag/v0.3.0
- [0.2.0] - https://github.com/joaoolemoss/projeto-ong-esperanca/releases/tag/v0.2.0
- [0.1.0] - https://github.com/joaoolemoss/projeto-ong-esperanca/releases/tag/v0.1.0
