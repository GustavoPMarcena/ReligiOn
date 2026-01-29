# 📅 Projeto de Eventos – Mobile + Backend

Este projeto consiste em uma aplicação **mobile desenvolvida em React Native (Expo)** integrada a um **backend em Node.js com Express**, permitindo a criação, listagem e gerenciamento de sermões, inspiracionais e eventos de igrejas.

---

## Tecnologias Utilizadas

### Frontend (Mobile)
- React Native
- Expo
- TypeScript
- React Navigation
- Axios
- Zod (validação de formulários)
- Expo Image Picker
- DateTimePicker

### Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL (ou outro banco compatível)
- Multer (upload de arquivos)
- JWT (autenticação)

---

## Como rodar o Backend (Express)

### Acesse a pasta do backend
```bash
cd backend
```

### Instale as dependências
```bash
npm install
```
ou
```bash
yarn
```

---

### Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do backend com as variáveis necessárias:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="sua_chave_secreta"
PORT=3333
```

---

### Rode as migrations (Prisma)
```bash
npx prisma migrate dev
```

---

###  Inicie o servidor
```bash
npm run dev
```
ou
```bash
npm start
```

O backend ficará disponível em :
```
http://SEU_IP:3333
```

---

##  Como rodar o Mobile (React Native)

###  Acesse a pasta do mobile
```bash
cd mobile
```

### Instale as dependências
```bash
npm install
```
ou
```bash
yarn
```

---

###  IMPORTANTE — Configurar o IP da API

Antes de rodar o app, **é obrigatório configurar o IP do backend** no arquivo de API.

 Exemplo de arquivo:
```
src/services/api.ts
```

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://SEU_IP:3333",
});
```

**Não use `localhost` ou `127.0.0.1` no celular**, pois o app não conseguirá acessar o backend.
Use o **IP da sua máquina na rede** (ex: `192.168.0.10`).

---

### 3️ Inicie o app
```bash
npx expo start
```

Depois:
- Escaneie o QR Code com o Expo Go **ou**
- Rode em um emulador Android/iOS

---

