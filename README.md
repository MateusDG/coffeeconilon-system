# Coffeeconilon-system

## 🚩 **Checklist de Implementação (Roadmap por Módulo)**

---

### **1. Configuração Básica (Backend)**

* [X] Preencher e revisar `backend/requirements.txt`
* [ ] Ajustar `backend/Dockerfile` (ambiente Python + dependências)
* [X] Criar `.env` (variáveis: DB, SECRET, etc)
* [X] Implementar `backend/app/core/config.py`
* [X] Implementar `backend/app/core/database.py`
* [X] Implementar `backend/app/main.py` com FastAPI rodando `/ping`

---

### **2. Módulo Usuários & Autenticação**

* [X] Modelar `User` em `models/user.py`
* [X] Criar schema em `schemas/user.py` e `schemas/token.py`
* [X] CRUD básico de usuário em `crud/crud_user.py`
* [ ] Rotas de autenticação/registro em `api/v1/endpoints/auth.py`
* [ ] JWT/OAuth2 em `core/security.py`
* [ ] Testar autenticação e CRUD via Swagger UI

---

### **3. Propriedades e Talhões (Fazenda, Lote, Safra)**

* [X] Modelar `Farm`, `Lot`, `Crop` (`models/farm.py`, `lot.py`, `crop.py`)
* [X] Schemas e CRUD correspondentes
* [X] Rotas de cadastro/consulta/edição (endpoints)
* [X] Relacionar usuário responsável (foreign keys)
* [ ] Testar criação de fazenda/lote

---

### **4. Módulo Financeiro**

* [X] Modelar `Financial` (`models/financial.py`)
* [X] Criar schemas de lançamentos financeiros
* [X] CRUD financeiro + regras de categorização (fixo/variável)
* [X] Endpoints de lançamento/listagem/edição
* [ ] Integração financeira com safra/lote (vínculo ao registro)
* [ ] Primeiros relatórios simples: resumo de entradas/saídas

---

### **5. Controle de Estoque**

* [X] Modelar `Stock` (`models/stock.py`)
* [X] Schemas de movimentação (entrada/saída/perda)
* [X] CRUD de estoque
* [X] Endpoints de lançamento e consulta
* [ ] Relatórios básicos de saldo de estoque

---

### **6. Dashboards e Relatórios**

* [ ] Implementar `services/reporting.py` para agregações (lucro, custo por safra/lote)
* [ ] Endpoints em `reports.py`
* [ ] Responder filtros por período, safra, talhão
* [ ] Exportação simples (CSV/JSON)

---

### **7. Frontend: Infraestrutura & Navegação**

* [ ] Criar projeto React (`frontend/`)
* [ ] Definir rotas/páginas (`src/pages/`)
* [ ] Conectar à API backend (`src/services/api.ts`)
* [ ] Tela de login (autenticação JWT)
* [ ] Páginas em branco para Dashboard, Financeiro, Estoque

---

### **8. Frontend: Telas Principais**

* [ ] Componentes e páginas de cadastro/listagem (usuário, fazenda, lote)
* [ ] Telas de lançamento financeiro e controle de estoque
* [ ] Dashboard: gráficos simples (receita x despesa, estoque atual)
* [ ] Telas de relatórios (tabelas, exportação)

---

### **9. Testes & Finalização**

* [ ] Testes automatizados básicos no backend (Pytest)
* [ ] Teste manual do frontend (formulários, navegação)
* [ ] Ajuste final do Docker Compose (serviços subindo juntos)
* [ ] Documentação no README (como rodar e usar)

---
