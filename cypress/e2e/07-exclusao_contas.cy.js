/// <reference types="cypress" />

const { runForTamanhosDeTela } = require("../support/utils");

runForTamanhosDeTela((tamanhoTela) => {
  describe("CEN07 - Validar Exclusão de Contas ", () => {
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

      it(`CT13 - Deve realizar a exclusão de conta com sucesso - ${tamanhoTela}`, () => {
        cy.excluirConta();
      });
    });
  });

