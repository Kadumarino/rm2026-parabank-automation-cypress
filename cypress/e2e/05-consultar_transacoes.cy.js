/// <reference types="cypress" />

const { usuarios } = require("../fixtures/login_massivo.json");
const { runForTamanhosDeTela } = require("../support/utils");

runForTamanhosDeTela((tamanhoTela) => {
  describe("CEN05 - Validar Consulta de Transações ", () => {
    beforeEach(() => {
      cy.visit("/index.htm");
    });

    afterEach(() => {
      cy.get("body").then(($body) => {
        if ($body.find('a:contains("Log Out")').length > 0) {
          cy.logout();
        }
      });
    });

    usuarios.slice(0, 1).forEach((usuario, idx) => {
      it(`CT10 - Deve consultar transações do [Usuário ${idx}] de fundos com sucesso - ${tamanhoTela}`, () => {
        cy.loginComSucesso(usuario);
        cy.procurarTransacaoEnviada();
      });
    });
  });
});