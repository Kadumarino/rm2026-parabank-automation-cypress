/// <reference types="cypress" />

const { usuarios } = require("../fixtures/login_massivo.json");
const recuperacaoFixture = require("../fixtures/recuperacao_de_conta.json");

const { runForTamanhosDeTela } = require("../support/utils");

runForTamanhosDeTela((tamanhoTela) => {

  describe("CEN02 - Validar Login", () => {

    beforeEach(() => {
      cy.visit("/index.htm");
    });

    it(`CT04 - Deve realizar cadastro e login com sucesso - ${tamanhoTela}`, () => {
      cy.cadastroComSucesso();
      cy.logout();
      cy.loginComSucessoComCadastro();
    });

    usuarios.slice(0, 2).forEach((usuario, idx) => {
      it(`CT05 - Login Existente [Usuário ${idx}] - ${tamanhoTela}`, () => {
        cy.loginComSucesso(usuario);
      });

      it(`CT06 - Login Inválido [Usuário ${idx}] - ${tamanhoTela}`, () => {
        cy.loginInvalido(usuario);
      });
    });

    recuperacaoFixture.forEach((dadosRecuperacao, idx) => {
      it(`CT07 - Deve recuperar conta [Caso ${idx}] - ${tamanhoTela}`, () => {
        cy.recuperacaoDeConta(dadosRecuperacao);
      });
    });
  });
});
