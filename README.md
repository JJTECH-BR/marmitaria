# 🍱 Marmitaria Digital

Sistema de Cardápio Digital desenvolvido para pequenas marmitarias e restaurantes, permitindo que clientes realizem pedidos diretamente pelo WhatsApp de forma simples e organizada.

## 📌 Objetivo

Facilitar o processo de pedidos sem necessidade de aplicativos complexos ou plataformas pagas.

O cliente acessa um link, monta seu pedido e o sistema gera automaticamente uma mensagem para o WhatsApp da empresa.

---

# 🚀 Funcionalidades

## Área do Cliente

- Visualização do cardápio
- Pratos do dia
- Pratos fixos
- Acompanhamentos
- Adição de observações
- Carrinho de compras
- Cálculo automático do valor total
- Envio do pedido diretamente para o WhatsApp

---

## Painel Administrativo

Acesso protegido por PIN de 4 dígitos.

Permite:

- Cadastro de produtos
- Edição de produtos
- Exclusão de produtos
- Cadastro de categorias
- Configuração da empresa
- Alteração do WhatsApp
- Alteração da logo
- Alteração do banner
- Gerenciamento dos pedidos

Todas as informações ficam armazenadas no LocalStorage.

---

# 🛠 Tecnologias

- React
- JavaScript
- Vite
- Styled Components
- React Router DOM
- Context API
- LocalStorage
- React Icons

---

# 📂 Estrutura do Projeto

```
src/

assets/
components/
contexts/
hooks/
layouts/
pages/
routes/
services/
styles/
utils/
```

---

# 🔐 Autenticação

O painel administrativo utiliza um PIN de 4 dígitos.

```
1234
```

Na versão MVP o acesso é controlado através do LocalStorage.

---

# 💾 Persistência

Todo o sistema utiliza LocalStorage.

São armazenados:

- Empresa
- Produtos
- Categorias
- Configurações
- Pedidos
- Sessão do administrador

---

# 📱 Fluxo do Cliente

Cliente acessa o cardápio

↓

Escolhe os produtos

↓

Seleciona acompanhamentos

↓

Adiciona observações

↓

Finaliza o pedido

↓

WhatsApp abre automaticamente com o pedido preenchido

---

# 🎯 Objetivo Futuro

O projeto foi desenvolvido seguindo uma arquitetura preparada para evoluir para um sistema SaaS.

Próximas funcionalidades:

- Backend em Node.js
- PostgreSQL
- Login com autenticação JWT
- Multiempresa
- Painel de pedidos em tempo real
- Pagamento online
- Impressão automática
- Relatórios
- Dashboard financeiro
- Controle de estoque

---

# ▶️ Como executar

Clone o projeto

```bash
git clone https://github.com/SEU-USUARIO/marmitaria.git
```

Entre na pasta

```bash
cd marmitaria
```

Instale as dependências

```bash
npm install
```

Execute

```bash
npm run dev
```

---

# 📄 Licença

Este projeto foi desenvolvido para fins de estudo e uso comercial.

---

Desenvolvido por **Johny Santos**