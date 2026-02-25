/// <reference types="cypress" />

const { usuarios } = require("../fixtures/login_massivo.json");
const { runForTamanhosDeTela } = require("../support/utils");

runForTamanhosDeTela((tamanhoTela) => {
  describe("CEN05 - Validar Consulta de Transações ", () => {
    beforeEach(() => {
      cy.visit("/index.htm");
    });

    usuarios.slice(0, 1).forEach((usuario, idx) => {
      it(`CT10 - Deve consultar transações do [Usuário ${idx}] de fundos com sucesso - ${tamanhoTela}`, () => {
        cy.loginComSucesso(usuario);
        cy.procurarTransacaoEnviada();
      });
    });
  });
});