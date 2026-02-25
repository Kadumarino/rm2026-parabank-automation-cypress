/// <reference types="cypress" />

const { runForTamanhosDeTela } = require("../support/utils");

runForTamanhosDeTela((tamanhoTela) => {
  describe("CEN07 - Validar Exclusão de Contas ", () => {
    beforeEach(() => {
      cy.visit("/index.htm");
    });


      it(`CT13 - Deve realizar a exclusão de conta com sucesso - ${tamanhoTela}`, () => {
        cy.excluirConta();
      });
    });
  });

