# Como Subir o GrindClub Ops Hub na Vercel (100% Gratuito)

Você e seu amigo podem colocar esse aplicativo no ar em menos de 2 minutos para acessar de qualquer computador ou celular.

### Atualização do projeto já vinculado

Este repositório já está conectado ao projeto Vercel `grindclub-hub`. Depois de revisar as alterações localmente, use:

```bash
npx vercel --prod
```

O comando publica a branch atual em produção e mantém o mesmo domínio do projeto existente.

---

### Opção 1: Direto pelo Terminal (Mais Rápido — 1 Minuto)

1. Abra o PowerShell ou Terminal dentro da pasta do App:
   ```bash
   cd C:\Users\aline\Downloads\Artin\App
   ```
2. Execute o comando da Vercel:
   ```bash
   npx vercel
   ```
3. O terminal perguntará:
   - *Set up and deploy?* Digite **Y** e aperte Enter.
   - *Which scope do you want to deploy to?* Aperte Enter.
   - *Link to existing project?* Digite **N** e aperte Enter.
   - *What's your project's name?* Digite `grindclub-hub` e aperte Enter.
   - *In which directory is your code located?* Aperte Enter (`./`).
4. Pronto! A Vercel vai gerar o link de produção:
   👉 Exemplo: `https://grindclub-hub.vercel.app`
5. Envie esse link para o seu amigo pelo WhatsApp/Discord!

---

### Opção 2: Pelo GitHub + Vercel (Deploy Automático)

1. Crie um repositório no seu GitHub chamado `grindclub-ops-hub`.
2. Dentro da pasta `C:\Users\aline\Downloads\Artin\App`, envie o código:
   ```bash
   git init
   git add .
   git commit -m "feat: GrindClub Ops Hub initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/grindclub-ops-hub.git
   git push -u origin main
   ```
3. Acesse [vercel.com](https://vercel.com), faça login com seu GitHub e clique em **"Add New" ➔ "Project"**.
4. Selecione o repositório `grindclub-ops-hub` e clique em **"Deploy"**.
5. Em segundos o link estará no ar com atualizações automáticas sempre que você fizer alterações.
