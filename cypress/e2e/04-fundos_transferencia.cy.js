/// <reference types="cypress" />

const { usuarios } = require("../fixtures/login_massivo.json");
const { runForTamanhosDeTela } = require("../support/utils");

runForTamanhosDeTela((tamanhoTela) => {
  describe("CEN04 - Validar Transferência de Fundos ", () => {
    beforeEach(() => {
      cy.visit("/index.htm");
    });

    usuarios.slice(0, 1).forEach((usuario, idx) => {
      it(`CT09 - Deve realizar transferência do [Usuário ${idx}] de fundos com sucesso - ${tamanhoTela}`, () => {
        cy.loginComSucesso(usuario);
        cy.realizarTransferencia();
      });
    });
  });
});
