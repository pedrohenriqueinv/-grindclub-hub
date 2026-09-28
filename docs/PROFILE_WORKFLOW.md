# Perfis do Hub

O GrindClub Ops Hub mantém dois perfis independentes no Plano Duo:

- **Pedro Henrique** — Criador & Estrategista
- **Pra Noia** — Editor & Operador

O seletor de perfil fica no rodapé da barra lateral. A troca atualiza a identificação da sessão ativa, a saudação da Vyk AI e a atribuição visual das tarefas sem apagar o histórico da dupla.

Ao incluir um novo membro no futuro, mantenha `id`, `name`, `avatar` e `role` no módulo `src/data/profiles.js`. O nome exibido deve vir do objeto do perfil, evitando rótulos duplicados nos componentes.
