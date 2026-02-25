/// <reference types="cypress" />

const { usuarios } = require("../fixtures/login_massivo.json");

const { runForTamanhosDeTela } = require("../support/utils");

runForTamanhosDeTela((tamanhoTela) => {

  describe("CEN03 - Validar Abertura de Conta", () => {

    beforeEach(() => {
      cy.visit("/index.htm");
    });


  usuarios.slice(0, 2).forEach((usuario, idx) => {
    it(`CT08 - Deve realizar a abertura de conta [Usuário ${idx}] - ${tamanhoTela}`, () => {
      cy.loginComSucesso(usuario);
      cy.abrirContaComSucesso();
    });
  });
  });
});