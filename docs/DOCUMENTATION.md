# Documentação do Projeto: CoffeeConilon-System

## 1. Visão Geral

O **CoffeeConilon-System** é um sistema web projetado para a administração de propriedades agrícolas focadas na produção de café. Ele oferece funcionalidades para gerenciar fazendas, talhões, safras, finanças e estoque, centralizando as operações do agronegócio em uma única plataforma.

O sistema é composto por duas partes principais:
-   **Backend:** Uma API RESTful construída com FastAPI (Python) que lida com toda a lógica de negócios e persistência de dados.
-   **Frontend:** Uma aplicação de página única (SPA) desenvolvida com React (TypeScript) que consome a API do backend e fornece a interface do usuário.

A orquestração dos serviços é feita com Docker, permitindo um ambiente de desenvolvimento e produção consistente e fácil de configurar.

## 2. Arquitetura e Tecnologias

### Tecnologias Utilizadas

| Camada    | Tecnologia         | Propósito                                      |
| :-------- | :----------------- | :--------------------------------------------- |
| **Backend** | Python 3.11+       | Linguagem de programação principal             |
|           | FastAPI            | Framework web para a construção da API         |
|           | SQLAlchemy         | ORM para interação com o banco de dados        |
|           | Psycopg2           | Driver para o banco de dados PostgreSQL        |
|           | Pydantic           | Validação de dados e schemas                   |
| **Frontend**| React 18           | Biblioteca para a construção da interface      |
|           | TypeScript         | Superset do JavaScript com tipagem estática    |
|           | Vite               | Ferramenta de build e servidor de desenvolvimento |
|           | Material-UI (MUI)  | Biblioteca de componentes de UI                |
|           | React Router       | Gerenciamento de rotas no lado do cliente      |
|           | Axios              | Cliente HTTP para chamadas à API               |
| **Geral**   | Docker & Docker Compose | Containerização e orquestração dos serviços |

### Estrutura de Diretórios

O projeto segue uma estrutura de monorepo, com o código do backend e do frontend em diretórios separados:

```
/
├── backend/
│   ├── app/
│   │   ├── api/         # Endpoints da API (rotas)
│   │   ├── core/        # Configurações centrais (env, db)
│   │   ├── crud/        # Funções de acesso ao banco (Create, Read, Update, Delete)
│   │   ├── models/      # Modelos de dados do SQLAlchemy
│   │   ├── schemas/     # Schemas de validação do Pydantic
│   │   └── main.py      # Ponto de entrada da aplicação FastAPI
│   ├── requirements.txt # Dependências Python
│   └── Dockerfile       # Definição do container do backend
│
├── frontend/
│   ├── src/
│   │   ├── assets/      # Arquivos estáticos (imagens, logos)
│   │   ├── components/  # Componentes React reutilizáveis
│   │   ├── contexts/    # Contextos React (ex: Autenticação)
│   │   ├── pages/       # Componentes de página (mapeados para rotas)
│   │   ├── services/    # Lógica de comunicação com a API
│   │   └── App.tsx      # Componente raiz e configuração de rotas
│   ├── package.json     # Dependências e scripts Node.js
│   └── Dockerfile       # Definição do container do frontend
│
└── docker-compose.yml   # Orquestração dos serviços de backend e frontend
```

## 3. Como Executar o Projeto (Ambiente de Desenvolvimento)

A maneira mais simples e recomendada de executar o projeto é utilizando Docker.

**Pré-requisitos:**
-   Docker
-   Docker Compose

**Passos:**

1.  **Clone o repositório** (se ainda não o fez).

2.  **Construa e inicie os containers:**
    No diretório raiz do projeto, execute o comando:
    ```bash
    docker compose up --build
    ```
    Este comando irá:
    -   Construir a imagem do `backend` a partir do seu `Dockerfile`.
    -   Construir a imagem do `frontend`, passando a URL da API como argumento.
    -   Iniciar os dois containers e conectá-los na mesma rede.

3.  **Acesse os serviços:**
    -   **Frontend (Aplicação Web):** [http://localhost:3000](http://localhost:3000)
    -   **Backend (API Docs):** [http://localhost:8000/docs](http://localhost:8000/docs)

## 4. Detalhes do Backend

### Ponto de Entrada
O arquivo `backend/app/main.py` é o ponto de entrada da aplicação FastAPI. Ele é responsável por:
-   Inicializar a aplicação FastAPI.
-   Configurar o CORS (Cross-Origin Resource Sharing) para permitir a comunicação com o frontend.
-   Criar as tabelas no banco de dados com base nos modelos do SQLAlchemy.
-   Incluir os roteadores da API.

### Endpoints da API
As rotas da API estão modularizadas e localizadas em `backend/app/api/v1/endpoints/`. Os principais módulos são:
-   `auth.py`: Autenticação e gerenciamento de tokens.
-   `users.py`: Operações CRUD para usuários.
-   `farms.py`: Gerenciamento de fazendas.
-   `lots.py`: Gerenciamento de lotes/talhões.
-   `crops.py`: Gerenciamento de safras.
-   `financial.py`: Movimentações financeiras.
-   `stocks.py`: Controle de estoque.
-   `reports.py`: Geração de relatórios.
-   `onboarding.py`: Rota para o assistente de configuração inicial.

## 5. Detalhes do Frontend

### Ponto de Entrada e Roteamento
O arquivo `frontend/src/App.tsx` é o componente principal da aplicação React. Suas responsabilidades são:
-   Verificar o estado de autenticação do usuário usando o `AuthContext`.
-   Renderizar as rotas públicas (Login, Registro) se o usuário não estiver autenticado.
-   Renderizar o `Layout` principal e as rotas privadas se o usuário estiver autenticado.

### Estrutura de Páginas
As páginas da aplicação, localizadas em `frontend/src/pages/`, correspondem às principais funcionalidades do sistema:
-   `Dashboard.tsx`: Painel principal com gráficos e KPIs.
-   `Producers.tsx`: Gerenciamento de produtores.
-   `Farms.tsx`: Gerenciamento de fazendas.
-   `Lots.tsx`: Gerenciamento de lotes.
-   `Financial.tsx`: Tabela de transações financeiras.
-   `Inventory.tsx`: Tabela de itens em estoque.
-   `Reports.tsx`: Visualização de relatórios.
-   `SetupWizard.tsx`: Assistente de configuração inicial para novos usuários.
