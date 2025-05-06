# Todo List App com Astro e Shadcn UI

Uma aplicação moderna de lista de tarefas construída com Astro, React e Shadcn UI, oferecendo funcionalidades CRUD completas e armazenamento local.

## ✨ Características

- ✅ CRUD completo (Criar, Ler, Atualizar, Deletar tarefas)
- 🔍 Filtro de tarefas por status (Todas/Concluídas/Pendentes)
- 🌓 Modo escuro/claro
- 💾 Persistência de dados com localStorage
- 📱 Design responsivo
- 🧩 Componentes reutilizáveis com Shadcn UI

## 🚀 Início Rápido

Siga estas etapas para configurar o projeto em sua máquina local:

### Pré-requisitos

- Node.js (versão 16.x ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/oliver-zyn/astro-todolist.git
cd astro-todolist
```

2. **Instale as dependências**

```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

4. **Abra a aplicação no navegador**

Acesse `http://localhost:4321` para ver a aplicação em execução.

## 📦 Dependências Principais

- **Astro** - Framework web com arquitetura de ilhas
- **React** - Biblioteca para construção de interfaces
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn UI** - Componentes de UI baseados em Radix UI
- **Lucide React** - Ícones

## 🛠️ Detalhes de Implementação

### Estrutura do Projeto

```
src/
├── components/           # Componentes React reutilizáveis
│   ├── TodoApp.tsx       # Componente principal da aplicação
│   ├── ThemeToggle.tsx   # Componente para alternar tema
│   └── ui/               # Componentes da Shadcn UI
├── layouts/
│   └── Layout.astro      # Layout principal da aplicação
└── pages/
    └── index.astro       # Página inicial

public/
└── styles/
    └── global.css        # Estilos globais e variáveis de tema
```

### Funcionalidades CRUD

- **Create**: Adicionar novas tarefas com a entrada de texto e botão "Adicionar"
- **Read**: Visualizar tarefas com filtragem por status
- **Update**: Editar tarefas existentes através do botão de edição
- **Delete**: Remover tarefas com confirmação de exclusão

## 🔧 Personalização

### Modificar Temas

Você pode personalizar as cores do tema editando as variáveis CSS em `public/styles/global.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... outras variáveis ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... outras variáveis ... */
}
```

## 🏗️ Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos de saída serão gerados na pasta `dist/`, prontos para serem implantados em qualquer hospedagem estática.

---
