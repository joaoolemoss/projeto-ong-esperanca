# Projeto ONG Esperança - Plataforma Web

## 📋 Sobre o Projeto

Plataforma web completa desenvolvida para a ONG Esperança, uma organização fictícia do terceiro setor. O projeto foi criado como parte da disciplina de Desenvolvimento Front-End para Web da Universidade Cidade de São Paulo.

### Objetivo
Desenvolver uma plataforma web que permita a ONGs gerenciar suas atividades, divulgar projetos, captar recursos e engajar voluntários, aplicando conceitos de HTML5 semântico.

## 🚀 Estrutura do Projeto

```
projeto-ong/
│
├── index.html          # Página inicial com informações institucionais
├── projetos.html       # Página de projetos sociais, voluntariado e doações
├── cadastro.html       # Formulário completo de cadastro
│
├── imagens/           # Diretório de imagens
│   └── README.md      # Documentação das imagens necessárias
│
└── README.md          # Este arquivo
```

## ✨ Funcionalidades Implementadas

### 1. Estrutura HTML5 Semântica
- ✅ Uso correto de tags semânticas (header, nav, main, section, article, aside, footer)
- ✅ Hierarquia lógica de títulos (h1-h6)
- ✅ Elementos semânticos específicos (figure, figcaption, address, blockquote, etc.)

### 2. Páginas Desenvolvidas

#### **index.html** - Página Inicial
- Apresentação da ONG (missão, visão, valores)
- História e conquistas
- Equipe e estrutura organizacional
- Informações de contato completas
- Transparência e prestação de contas
- Parceiros e apoiadores

#### **projetos.html** - Projetos Sociais
- 7 projetos sociais detalhados:
  - Educar para Transformar
  - Saúde em Primeiro Lugar
  - Alimentação Solidária
  - Capacitação Profissional
  - Arte e Cultura para Todos
  - Esporte e Cidadania
  - Meio Ambiente e Sustentabilidade
- Seção completa sobre voluntariado
- Formas de doação detalhadas
- Resultados e impacto social

#### **cadastro.html** - Formulário de Cadastro
- Formulário complexo com validações HTML5
- Campos obrigatórios com máscaras:
  - Nome Completo (text com pattern)
  - E-mail (email com validação)
  - CPF (text com máscara 000.000.000-00)
  - Telefone (tel com máscara (11) 99999-9999)
  - Data de Nascimento (date com restrições)
  - CEP (text com máscara 00000-000)
  - Endereço completo
  - Estado (select com todos os estados)
- Agrupamento lógico com fieldsets
- Diferentes tipos de input HTML5

## 📝 Especificações Técnicas

### HTML5 Features Utilizadas:
- **Tipos de Input**: text, email, tel, date, number, file, checkbox, radio, select, textarea
- **Validações**: required, pattern, min, max, minlength, maxlength
- **Atributos**: placeholder, autocomplete, accept
- **Elementos Semânticos**: nav, main, section, article, aside, footer, header
- **Elementos de Formulário**: fieldset, legend, label
- **Multimídia**: img com alt text descritivo
- **Acessibilidade**: uso de abbr, aria-labels implícitos

### Boas Práticas Implementadas:
- ✅ Código bem indentado e organizado
- ✅ Comentários descritivos onde necessário  
- ✅ Meta tags para SEO
- ✅ Estrutura semântica correta
- ✅ Links de navegação consistentes
- ✅ Formulários com validação nativa
- ✅ Alt text em todas as imagens

## 🎯 Requisitos Atendidos

### Entrega I - Fundamentos e Estruturação
- [x] Mínimo 3 páginas HTML com estrutura semântica
- [x] Hierarquia de títulos lógica e consistente
- [x] Uso de imagens em todas as páginas
- [x] Página inicial com informações da organização
- [x] Página de projetos com voluntariado e doações
- [x] Página de cadastro com formulário complexo
- [x] Tipos de input HTML5 diversos
- [x] Validação nativa com atributos HTML5
- [x] Agrupamento lógico com fieldsets
- [x] Máscaras de input para CPF, telefone e CEP

## 🔧 Como Executar

1. Clone o repositório:
```bash
git clone https://github.com/joaoolemoss/projeto-ong-esperanca
```

2. Navegue até a pasta do projeto:
```bash
cd projeto-ong
```

3. Abra o arquivo index.html em qualquer navegador moderno

## 📦 Próximas Etapas

Este projeto será expandido nas próximas entregas com:
- **Entrega II**: Estilização e Leiautes
- **Entrega III**: Interatividade e Funcionalidades
- **Entrega IV**: Versionamento, Acessibilidade e Deploy

## 🌐 Compatibilidade

O projeto foi desenvolvido seguindo os padrões web modernos e é compatível com:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 Validação

Todo o código HTML foi estruturado para passar na validação do W3C Validator:
- Estrutura semântica correta
- Atributos válidos
- Hierarquia de elementos respeitada

## 👨‍💻 Autor

**João Lemos**  
Estudante de Ciência da Computação  
Universidade Cidade de São Paulo

## 📚 Disciplina

**Desenvolvimento Front-End para Web**  
Professores: Angela Perez Barcellos e Vagner Da Silva  
Universidade Cidade de São Paulo  
2025

## 📜 Licença

Este projeto é de uso educacional, desenvolvido como trabalho acadêmico para a disciplina de Desenvolvimento Front-End para Web.

---

**Observação**: Este é um projeto fictício criado para fins educacionais. A ONG Esperança não existe e todos os dados apresentados são ilustrativos.
