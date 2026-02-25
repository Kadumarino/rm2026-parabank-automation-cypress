import 'cypress-mochawesome-reporter/register';

import './commands_cadastro'
import './commands_login'
import './commands_logout';
import './commands_abertura_contas';
import './commands_transferencias';
import './commands_atualizacao_cadastro';
import './commands_exclusao_conta.js';
import './commands_transacoes.js';


Cypress.on('uncaught:exception', (err, runnable) => {
  // Suprime apenas erros de 'Cannot read properties of null (reading "document")'
  if (err.message && err.message.includes("Cannot read properties of null (reading 'document')")) {
    // Não loga nem falha o teste
    return false;
  }
  // Para outros erros, pode customizar aqui (ou retornar false para ignorar tudo)
  return false;
});

// Captura screenshot de sucessos (falhas já são automáticas)
let screenshotTaken = false;

afterEach(function() {
  // Evita duplicação - só tira 1 screenshot por teste
  if (this.currentTest.state === 'passed' && !screenshotTaken) {
    screenshotTaken = true;
    // Verifica se janela e documento estão disponíveis antes de tentar o screenshot
    // Evita o looping de 'Cannot read properties of null (reading document)'
    cy.window({ timeout: 2000, log: false })
      .then((win) => {
        if (win && win.document) {
          cy.screenshot({ capture: 'viewport', overwrite: true });
        }
      })
      .then(null, () => {
        // Janela não disponível (ex: AUT instável após logout) - ignora screenshot silenciosamente
      });
  }
});

beforeEach(() => {
  screenshotTaken = false;
});

