/// <reference types="cypress" />

const { usuarios } = require("../fixtures/login_massivo.json");

const { runForTamanhosDeTela } = require("../support/utils");

runForTamanhosDeTela((tamanhoTela) => {

  describe("CEN03 - Validar Abertura de Conta", () => {

    beforeEach(() => {
      cy.visit("/index.htm");
    });

      afterEach(() => {
    cy.get('body').then(($body) => {
      if ($body.find('a:contains("Log Out")').length > 0) {
        cy.logout();
      }
    });
  });

  usuarios.slice(0, 2).forEach((usuario, idx) => {
    it(`CT08 - Deve realizar a abertura de conta [Usuário ${idx}] - ${tamanhoTela}`, () => {
      cy.loginComSucesso(usuario);
      cy.abrirContaComSucesso();
    });
  });
  });
});