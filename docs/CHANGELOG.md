# Changelog

## [Unreleased] - 2025-08-05

### Added
- Nova interface de login e registro com design moderno e responsivo.
- Documentação de alterações no arquivo `docs/CHANGELOG.md`.

### Changed
- Substituída a antiga interface de login e registro.
- Refatorado o código da nova interface de Tailwind CSS para Material-UI (MUI) para se alinhar com a tecnologia existente no projeto.
- Integrada a funcionalidade de login e registro com o backend.
- Corrigido o problema de CORS no backend para permitir solicitações do frontend.
- Ajustado o estilo dos formulários de login e registro para ter bordas mais arredondadas.
- Reorganizada a estrutura de pastas do projeto para seguir as melhores práticas.
- Adicionados e atualizados os arquivos `.gitignore` para ignorar arquivos desnecessários.

### Removed
- Removida a pasta `Figma to Code - SignIn page`, que continha o código da interface de login original.
- Removido o arquivo `test.py`, que era um arquivo de teste temporário.
- Removidos os componentes de login e registro antigos (`LoginPage.tsx`, `RegisterPage.tsx`, `RegisterForm.tsx`).
