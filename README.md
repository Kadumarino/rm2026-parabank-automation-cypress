# ParaBank – Automação de Testes E2E com Cypress

Projeto de automação de testes end-to-end para a aplicação [ParaBank](https://parabank.parasoft.com/parabank), cobrindo os fluxos principais de uma plataforma bancária.

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) v18 ou superior
- [Git](https://git-scm.com/)
- Navegador instalado: Chrome, Firefox ou Edge

---

## Instalação

```bash
# 1. Clone o repositório
git clone <url-do-repositório>
cd rm2026-parabank-automation-cypress

# 2. Instale as dependências
npm install
npm init -y
npm install cypress
npm install --save-dev cypress-mochawesome-reporter
npm install faker

```



---

## Executando os Testes

```bash
# Interface gráfica (modo interativo)
npx cypress open

# Linha de comando por navegador
npm run test:chrome
npm run test:firefox
npm run test:edge
```

---

## Relatório HTML

Após executar via `npx cypress run`, o relatório é gerado automaticamente em:

```
cypress/reports/html/index.html
```

Para abrir no navegador:

```bash
npm run report
```

> O relatório inclui screenshots **embutidos inline** — não é necessário manter a pasta `cypress/screenshots/`.

---

## Estrutura dos Testes

| Arquivo | Cenário |
|---|---|
| `01-criacao_de_cadastro.cy.js` | Cadastro de novo usuário |
| `02-login.cy.js` | Login e recuperação de conta |
| `03-abertura_de_conta.cy.js` | Abertura de conta SAVINGS |
| `04-fundos_transferencia.cy.js` | Transferência entre contas |
| `05-consultar_transacoes.cy.js` | Consulta de transações |
| `06-atualizacao_de_cadastro.cy.js` | Atualização de dados pessoais |
| `07-exclusao_contas.cy.js` | Exclusão de conta |

---

## Observações

- Os testes utilizam dados gerados dinamicamente via **faker** e dados estáticos em `cypress/fixtures/`.
- A aplicação ParaBank é um ambiente público compartilhado — instabilidades ocasionais são esperadas e tratadas nos comandos.
- Novos usuários criados durante os testes são salvos automaticamente em `cypress/fixtures/login_massivo.json`.
