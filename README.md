# Recomendador de Produtos

Uma aplicação React moderna para recomendação personalizada de produtos, baseada em preferências e funcionalidades selecionadas pelo usuário.

## 🚀 Funcionalidades

### ✨ Principais Recursos

- **Sistema de Recomendação Inteligente**: Algoritmo que filtra produtos baseado em preferências e funcionalidades
- **Interface Responsiva**: Design moderno com Tailwind CSS e layout adaptável
- **Validação de Formulário**: Verificação em tempo real com mensagens de erro claras e suporte a leitores de tela através do atributo aria-live
- **Gerenciamento de Estado**: Context API para gerenciamento centralizado de recomendações com abordagem inteligente para evitar renderizações desnecessárias através da criação de duas Context APIs.
- **Testes Automatizados**: Cobertura completa de testes unitários e de integração

### 🎯 Funcionalidades Específicas

- **Seleção de Preferências**: Checkboxes para escolher preferências
- **Seleção de Funcionalidades**: Checkboxes para escolher funcionalidades desejadas
- **Tipos de Recomendação**:
  - Produto Único (SingleProduct)
  - Múltiplos Produtos (MultipleProducts)
- **Lista de Recomendações**: Exibição dinâmica dos produtos recomendados
- **Integração com API**: Comunicação com backend JSON Server

## 🛠️ Tecnologias Utilizadas

### Frontend

- **React 18.2.0** - Biblioteca principal para interface
- **Tailwind CSS 3.4.1** - Framework CSS utilitário
- **Axios 1.11.0** - Cliente HTTP para requisições
- **React Testing Library** - Framework de testes
- **Jest** - Runner de testes

### Backend

- **JSON Server** - API REST simulada
- **Node.js** - Runtime JavaScript

### Ferramentas de Desenvolvimento

- **ESLint** - Linter para qualidade de código
- **PostCSS** - Processador CSS
- **Autoprefixer** - Prefixos CSS automáticos

## 📁 Estrutura do Projeto Frontend

```
frontend/
├── src/
│   ├── __tests__/
│   ├── components/
│   │   ├── Form/
│   │   │   ├── Fields/
│   │   │   │   ├── Features.js
│   │   │   │   ├── Preferences.js
│   │   │   │   └── RecommendationType.js
│   │   │   ├── SubmitButton/
│   │   │   └── Form.js
│   │   ├── RecommendationList/
│   │   └── shared/
│   ├── contexts/
│   │   └── Recommendation.js
│   ├── hooks/
│   │   ├── useForm.js
│   │   ├── useProducts.js
│   │   ├── useRecommendations.js
│   │   └── useSetRecommendations.js
│   ├── mocks/
│   ├── services/
│   │   ├── product.service.js
│   │   └── recommendation.service.js
└── public/
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js (versão 22.13.1 ou superior)
- Yarn

### Instalação e Execução

1. **Clone o repositório**

```bash
git clone <https://github.com/JeanLuca999/monorepo.git>
cd monorepo
```

2. **Instale as dependências**

```bash
cd monorepo
yarn # instala lerna para configurar o monorepo

sh install.sh # instala dependências dos projetos frontend e backend
```

3. **Execute o projeto**

```bash
cd monorepo
yarn start
```

4. **Acesse a aplicação**

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 🧪 Testes

### Executar Testes

```bash
cd monorepo
yarn test:frontend
```

### Cobertura de Testes

- **Componentes**: Checkbox, Features, Form, Preferences, RecommendationList, RecommendationType
- **Hooks**: useForm, useProducts
- **Contextos**: Recommendation
- **Serviços**: recommendation.service

## 🎨 Interface do Usuário

### Características do Design

- **Layout Responsivo**: Adaptável para desktop e mobile
- **Design Moderno**: Interface limpa com Tailwind CSS
- **Acessibilidade**: Suporte a ARIA labels e navegação por teclado
- **Feedback Visual**: Mensagens de erro

### Fluxo de Uso

1. Usuário seleciona preferências e/ou funcionalidades
2. Escolhe o tipo de recomendação (único ou múltiplos produtos)
3. Submete o formulário
4. Recebe recomendações personalizadas baseadas nas seleções

## 🔄 Arquitetura

### Padrões Utilizados

- **Context APIs**: Gerenciamento de estado global
- **Custom Hooks**: Lógica reutilizável
- **Service Layer**: Separação de responsabilidades
- **Component Composition**: Componentes modulares

### Fluxo de Dados

1. **useProducts**: Carrega dados da API
2. **Form**: Captura input do usuário
3. **recommendation.service**: Processa lógica de recomendação
4. **Context**: Atualiza estado global
5. **RecommendationList**: Exibe resultados

## Autor

Desenvolvido por Jean

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
