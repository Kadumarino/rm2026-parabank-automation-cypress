import 'cypress-mochawesome-reporter/register';

import './commands_cadastro'
import './commands_login'
import './commands_logout';
import './commands_abertura_contas';
import './commands_transferencias';
import './commands_atualizacao_cadastro';
import './commands_exclusao_conta.js';
import './utils';

// Captura screenshot de sucessos (falhas já são automáticas)
let screenshotTaken = false;

afterEach(function() {
  // Evita duplicação - só tira 1 screenshot por teste
  if (this.currentTest.state === 'passed' && !screenshotTaken) {
    screenshotTaken = true;
    cy.screenshot({ capture: 'viewport', overwrite: true });
  }
});

beforeEach(() => {
  screenshotTaken = false;
});
