const { defineConfig } = require("cypress");

module.exports = defineConfig({
  watchForFileChanges: false,
  reporter: 'cypress-mochawesome-reporter',
  allowCypressEnv: false,
  
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Parabank Automation Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    customCss: 'cypress/reports/custom.css',
    theme: 'dark',
    sortByStatus: true,
  },

  e2e: {
    baseUrl: "https://parabank.parasoft.com/parabank",

    // Ordem explícita de execução dos specs - garante sequência correta no relatório
    specPattern: [
      "cypress/e2e/07-exclusao_contas.cy.js",
      "cypress/e2e/01-criacao_de_cadastro.cy.js",
      "cypress/e2e/02-login.cy.js",
      "cypress/e2e/03-abertura_de_conta.cy.js",
      "cypress/e2e/04-fundos_transferencia.cy.js",
      "cypress/e2e/05-consultar_transacoes.cy.js",
      "cypress/e2e/06-atualizacao_de_cadastro.cy.js",
      "cypress/e2e/07-exclusao_contas.cy.js",
    ],
    
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    }
  },
});
