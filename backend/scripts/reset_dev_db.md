Resetar banco de dados de desenvolvimento (SQLite)
==============================================

Este projeto usa `backend/dev.db` para desenvolvimento local. Se você precisa recriar o esquema do Financeiro do zero, siga:

1) Pare o backend (uvicorn/docker).

2) Remova o arquivo do banco de dados:

   - Local: `rm backend/dev.db`
   - Docker: remova o volume associado ou entre no container e remova o arquivo conforme o path montado.

3) Suba o backend novamente. O SQLAlchemy criará as tabelas com base nos modelos atuais (`Base.metadata.create_all`).

Observações
----------
- Se você estiver usando Postgres, rode as migrações equivalentes (não incluídas aqui) ou recrie o schema conforme seu ambiente.
- O app exige `SECRET_KEY` no `.env`. Garanta que `backend/.env` contenha a chave e `DB_URL` aponte para SQLite (ou seu DB alvo).

