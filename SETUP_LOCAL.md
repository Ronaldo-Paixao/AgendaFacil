# AgendaFácil - Guia de Configuração Local

## Pré-requisitos

- Node.js 22.13.0 ou superior
- pnpm 10.15.1 ou superior
- MySQL/TiDB (para banco de dados)

## Instalação

### 1. Clonar o repositório
```bash
git clone <seu-repositorio>
cd agenda-facil
```

### 2. Instalar dependências
```bash
pnpm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Database
DATABASE_URL="mysql://usuario:senha@localhost:3306/agenda_facil"

# OAuth (Manus)
VITE_APP_ID="seu-app-id"
OAUTH_SERVER_URL="https://api.manus.ai"
VITE_OAUTH_PORTAL_URL="https://manus.im"

# JWT
JWT_SECRET="sua-chave-secreta-aqui"

# App Config
VITE_APP_TITLE="AgendaFácil"
VITE_APP_LOGO="https://seu-logo.png"

# Analytics (opcional)
VITE_ANALYTICS_ENDPOINT="https://manus-analytics.com"
VITE_ANALYTICS_WEBSITE_ID="seu-id"

# APIs (opcional)
BUILT_IN_FORGE_API_URL="https://forge.manus.ai"
BUILT_IN_FORGE_API_KEY="sua-chave"
VITE_FRONTEND_FORGE_API_URL="https://forge.manus.ai"
VITE_FRONTEND_FORGE_API_KEY="sua-chave"
```

### 4. Criar banco de dados

```bash
# Gerar migrações
pnpm drizzle-kit generate

# Executar migrações
pnpm drizzle-kit migrate
```

## Desenvolvimento

### Iniciar servidor de desenvolvimento

```bash
pnpm dev
```

O servidor estará disponível em: `http://localhost:3000`

### Estrutura do projeto

```
agenda-facil/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas (Home, Dashboard, etc)
│   │   ├── components/    # Componentes reutilizáveis
│   │   ├── lib/           # Utilitários (tRPC client)
│   │   ├── App.tsx        # Roteamento
│   │   └── main.tsx       # Entrada
│   └── index.html
├── server/                # Backend Express + tRPC
│   ├── routers/           # Routers tRPC
│   ├── db.ts              # Database helpers
│   └── _core/             # Core (auth, context, etc)
├── drizzle/               # Schema e migrações
├── shared/                # Constantes compartilhadas
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Scripts disponíveis

```bash
# Desenvolvimento
pnpm dev              # Iniciar servidor de desenvolvimento

# Build
pnpm build            # Build para produção
pnpm start            # Rodar build em produção

# Testes
pnpm test             # Rodar testes com vitest

# Banco de dados
pnpm drizzle-kit generate   # Gerar migrações
pnpm drizzle-kit migrate    # Executar migrações

# Linting
pnpm format           # Formatar código com prettier
pnpm check            # Verificar tipos TypeScript
```

## Funcionalidades Principais

### Para Profissionais
- ✅ Criar perfil com URL personalizada (/book/:slug)
- ✅ Gerenciar serviços (nome, preço, duração)
- ✅ Configurar disponibilidade (dias e horários)
- ✅ Dashboard com visão geral de agendamentos
- ✅ Confirmar, cancelar e remarcar agendamentos

### Para Clientes
- ✅ Acessar página pública de agendamento
- ✅ Selecionar serviço, data e horário
- ✅ Preencher dados de contato
- ✅ Confirmar agendamento

## Routers tRPC Disponíveis

### Autenticação
- `auth.me` - Obter usuário atual
- `auth.logout` - Fazer logout

### Profissionais
- `professionals.getProfile` - Obter perfil
- `professionals.createProfile` - Criar perfil
- `professionals.updateProfile` - Atualizar perfil

### Serviços
- `services.list` - Listar serviços
- `services.create` - Criar serviço
- `services.update` - Atualizar serviço
- `services.delete` - Deletar serviço

### Disponibilidade
- `availability.list` - Listar disponibilidade
- `availability.upsert` - Criar/atualizar disponibilidade

### Agendamentos
- `bookings.list` - Listar agendamentos
- `bookings.confirm` - Confirmar agendamento
- `bookings.cancel` - Cancelar agendamento
- `bookings.reschedule` - Remarcar agendamento

### Público (sem autenticação)
- `public.getProfessional` - Obter profissional por slug
- `public.getServices` - Obter serviços do profissional
- `public.getAvailability` - Obter disponibilidade
- `public.createBooking` - Criar agendamento

## Troubleshooting

### Erro: "Cannot find module 'vite-plugin-manus-runtime'"
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Erro: "Database connection failed"
- Verifique se MySQL está rodando
- Verifique a URL de conexão em `.env.local`
- Certifique-se que o banco de dados existe

### Erro: "Cannot read file 'tsconfig.json'"
```bash
pnpm check
```

## Próximos Passos

- [ ] Implementar lembretes automáticos (24h e 1h antes)
- [ ] Adicionar integração com WhatsApp/Email
- [ ] Criar testes unitários completos
- [ ] Adicionar dashboard financeiro
- [ ] Implementar histórico de clientes

## Suporte

Para dúvidas ou problemas, consulte a documentação do projeto ou abra uma issue no repositório.
