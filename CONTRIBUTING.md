# 🤝 Guia de Contribuição

Obrigado por considerar contribuir com o Projeto ONG Esperança! Este é um projeto acadêmico, mas sugestões e melhorias são sempre bem-vindas.

## 📋 Código de Conduta

Este projeto adere a um código de conduta. Ao participar, espera-se que você mantenha:
- Respeito e cortesia com todos os colaboradores
- Comunicação clara e profissional
- Foco no aprendizado e melhoria contínua
- Valorização da diversidade e inclusão

## 🚀 Como Contribuir

### 1. Fork o Projeto

```bash
# Fork via interface do GitHub
# Depois clone o seu fork
git clone https://github.com/seu-usuario/projeto-ong-esperanca.git
cd projeto-ong-esperanca
```

### 2. Configure o Ambiente

```bash
# Adicione o repositório original como upstream
git remote add upstream https://github.com/joaoolemoss/projeto-ong-esperanca.git

# Instale as dependências
npm install
```

### 3. Crie uma Branch

Use o padrão GitFlow:

```bash
# Para novas funcionalidades
git checkout -b feature/nome-da-funcionalidade

# Para correções de bugs
git checkout -b fix/descricao-do-bug

# Para documentação
git checkout -b docs/descricao-da-doc

# Para refatoração
git checkout -b refactor/descricao

# Para melhorias de acessibilidade
git checkout -b a11y/descricao
```

### 4. Faça as Mudanças

- Siga os padrões de código do projeto
- Mantenha a acessibilidade (WCAG 2.1 AA)
- Teste em múltiplos navegadores e dispositivos
- Atualize a documentação se necessário

### 5. Commits Semânticos

Use o formato de commits semânticos:

```bash
# Formato
tipo(escopo): mensagem curta

# Tipos permitidos
feat:     # Nova funcionalidade
fix:      # Correção de bug
docs:     # Documentação
style:    # Formatação (não afeta código)
refactor: # Refatoração
perf:     # Performance
test:     # Testes
chore:    # Tarefas de build/config

# Exemplos
git commit -m "feat(acessibilidade): adiciona modo de alto contraste"
git commit -m "fix(menu): corrige navegação mobile"
git commit -m "docs(readme): atualiza instruções de build"
git commit -m "style(css): formata código com Prettier"
```

### 6. Push e Pull Request

```bash
# Push para o seu fork
git push origin feature/nome-da-funcionalidade

# Abra um Pull Request via GitHub
# Use o template fornecido
```

## ✅ Checklist de Qualidade

Antes de submeter um PR, certifique-se de que:

### Code Quality
- [ ] Código segue os padrões do projeto
- [ ] Não há erros no console
- [ ] Código está comentado em áreas complexas
- [ ] Variáveis e funções têm nomes descritivos

### Acessibilidade
- [ ] Navegação por teclado funciona perfeitamente
- [ ] Contraste de cores atende WCAG 2.1 AA (4.5:1 mínimo)
- [ ] Testado com leitor de tela (NVDA/VoiceOver)
- [ ] Atributos ARIA apropriados adicionados
- [ ] Estrutura semântica HTML mantida

### Responsividade
- [ ] Testado em mobile (< 576px)
- [ ] Testado em tablet (768px - 991px)
- [ ] Testado em desktop (> 992px)
- [ ] Imagens são responsivas
- [ ] Touch targets têm 44x44px mínimo

### Navegadores
- [ ] Chrome/Edge (últimas 2 versões)
- [ ] Firefox (últimas 2 versões)
- [ ] Safari (últimas 2 versões)

### Performance
- [ ] Arquivos otimizados (se aplicável)
- [ ] Imagens comprimidas
- [ ] Sem código duplicado
- [ ] Lighthouse Score mantido acima de 90

### Validação
- [ ] HTML válido (https://validator.w3.org/)
- [ ] CSS válido (https://jigsaw.w3.org/css-validator/)
- [ ] JavaScript sem erros de sintaxe

### Documentação
- [ ] README atualizado (se necessário)
- [ ] CHANGELOG atualizado
- [ ] Comentários adicionados no código
- [ ] JSDoc para funções JavaScript (se aplicável)

## 📁 Estrutura de Arquivos

Mantenha a organização:

```
css/        # Estilos CSS modulares
js/         # JavaScript modular
imagens/    # Assets visuais
build/      # Scripts de build
.github/    # Templates e workflows
```

## 🎨 Padrões de Código

### HTML
- Use tags semânticas
- Mantenha hierarquia de títulos
- Adicione atributos ARIA apropriados
- Inclua alt text descritivo em imagens

```html
<!-- ✅ Bom -->
<nav aria-label="Navegação principal">
  <ul>
    <li><a href="#home">Início</a></li>
  </ul>
</nav>

<!-- ❌ Evite -->
<div class="nav">
  <a href="#home">Início</a>
</div>
```

### CSS
- Use variáveis CSS do design system
- Siga a metodologia BEM para classes
- Mantenha mobile-first
- Evite !important

```css
/* ✅ Bom */
.card {
  background-color: var(--gray-100);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}

/* ❌ Evite */
.card {
  background-color: #eee !important;
  padding: 16px;
}
```

### JavaScript
- Use ES6+ (const, let, arrow functions)
- Comente código complexo
- Evite variáveis globais
- Use event delegation quando apropriado

```javascript
// ✅ Bom
const handleClick = (event) => {
  const target = event.target;
  if (target.matches('.button')) {
    // Lógica do click
  }
};

// ❌ Evite
function handleClick() {
  var button = document.querySelector('.button');
  // Lógica
}
```

## 🐛 Reportando Bugs

Use o template de Bug Report:

1. Acesse [Issues](https://github.com/joaoolemoss/projeto-ong-esperanca/issues)
2. Clique em "New Issue"
3. Selecione "Bug Report"
4. Preencha todas as seções do template

## ✨ Sugerindo Funcionalidades

Use o template de Feature Request:

1. Acesse [Issues](https://github.com/joaoolemoss/projeto-ong-esperanca/issues)
2. Clique em "New Issue"
3. Selecione "Feature Request"
4. Preencha todas as seções do template

## 📝 Melhorando Documentação

Documentação é sempre bem-vinda:

- Corrija erros de digitação
- Melhore explicações
- Adicione exemplos
- Traduza conteúdo (se aplicável)

## ❓ Dúvidas

Se tiver dúvidas:

1. Verifique o [README.md](README.md)
2. Leia o [CHANGELOG.md](CHANGELOG.md)
3. Procure em [Issues existentes](https://github.com/joaoolemoss/projeto-ong-esperanca/issues)
4. Abra uma nova Issue com sua dúvida

## 🎓 Projeto Acadêmico

Lembre-se que este é um projeto acadêmico:

- O foco é no aprendizado
- Perguntas são encorajadas
- Erros fazem parte do processo
- Colaboração é valorizada

## 📜 Licença

Ao contribuir, você concorda que suas contribuições serão licenciadas sob a mesma licença do projeto (MIT).

---

## 🙏 Agradecimentos

Obrigado por contribuir com o Projeto ONG Esperança! Sua ajuda é muito valiosa para o aprendizado de todos.

---

**Happy Coding! 💻✨**
