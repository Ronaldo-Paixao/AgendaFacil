# AgendaFácil - SaaS de Agendamento para Profissionais Autônomos

Uma plataforma minimalista e orgânica para profissionais autônomos gerenciarem seus agendamentos de forma simples e eficiente.

## Funcionalidades

- ✅ Cadastro e perfil do profissional com link público personalizado
- ✅ Configuração de serviços (nome, descrição, preço, duração)
- ✅ Calendário de disponibilidade gerenciável
- ✅ Página pública de agendamento para clientes
- ✅ Dashboard do profissional com visão geral de agendamentos
- ✅ Histórico de clientes e atendimentos
- ✅ Dashboard financeiro com relatórios de receita
- ✅ Lembretes automáticos (24h e 1h antes)
- ✅ Gestão de agendamentos (confirmar, cancelar, remarcar)

## Tech Stack

- **Frontend**: React 19 + TypeScript + Tailwind CSS 4
- **Backend**: Express 4 + tRPC 11
- **Database**: MySQL + Drizzle ORM
- **Auth**: Manus OAuth
- **Styling**: Tailwind CSS com design minimalista

## Design Visual

- Paleta: Terracota, Ocre, Verde-Sálvia, Creme
- Tipografia: Bold sem serifa com curvatura fluida
- Componentes: Formas orgânicas, translúcidas, espaço negativo generoso

## Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Iniciar servidor de desenvolvimento
pnpm dev

# Rodar testes
pnpm test

# Build para produção
pnpm build
```

## Estrutura do Projeto

```
agenda-facil/
├── client/
│   ├── src/
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── contexts/       # React contexts
│   │   ├── lib/            # Utilitários e configurações
│   │   └── App.tsx         # Componente raiz
│   └── public/             # Arquivos estáticos
├── server/
│   ├── routers/            # Routers tRPC
│   ├── _core/              # Configuração central
│   ├── db.ts               # Query helpers
│   └── routers.ts          # Definição de routers
├── drizzle/                # Schema e migrações
├── shared/                 # Código compartilhado
└── storage/                # Helpers de armazenamento S3
```

## Licença

MIT
