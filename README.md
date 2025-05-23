# Coffeeconilon-system

## 🚩 **Checklist de Implementação (Roadmap por Módulo)**

---

### **1. Configuração Básica (Backend)**

* [ ] Preencher e revisar `backend/requirements.txt`
* [ ] Ajustar `backend/Dockerfile` (ambiente Python + dependências)
* [ ] Criar `.env` (variáveis: DB, SECRET, etc)
* [ ] Implementar `backend/app/core/config.py`
* [ ] Implementar `backend/app/core/database.py`
* [ ] Implementar `backend/app/main.py` com FastAPI rodando `/ping`

---

### **2. Módulo Usuários & Autenticação**

* [ ] Modelar `User` em `models/user.py`
* [ ] Criar schema em `schemas/user.py` e `schemas/token.py`
* [ ] CRUD básico de usuário em `crud/crud_user.py`
* [ ] Rotas de autenticação/registro em `api/v1/endpoints/auth.py`
* [ ] JWT/OAuth2 em `core/security.py`
* [ ] Testar autenticação e CRUD via Swagger UI

---

### **3. Propriedades e Talhões (Fazenda, Lote, Safra)**

* [ ] Modelar `Farm`, `Lot`, `Crop` (`models/farm.py`, `lot.py`, `crop.py`)
* [ ] Schemas e CRUD correspondentes
* [ ] Rotas de cadastro/consulta/edição (endpoints)
* [ ] Relacionar usuário responsável (foreign keys)
* [ ] Testar criação de fazenda/lote

---

### **4. Módulo Financeiro**

* [ ] Modelar `Financial` (`models/financial.py`)
* [ ] Criar schemas de lançamentos financeiros
* [ ] CRUD financeiro + regras de categorização (fixo/variável)
* [ ] Endpoints de lançamento/listagem/edição
* [ ] Integração financeira com safra/lote (vínculo ao registro)
* [ ] Primeiros relatórios simples: resumo de entradas/saídas

---

### **5. Controle de Estoque**

* [ ] Modelar `Stock` (`models/stock.py`)
* [ ] Schemas de movimentação (entrada/saída/perda)
* [ ] CRUD de estoque
* [ ] Endpoints de lançamento e consulta
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
