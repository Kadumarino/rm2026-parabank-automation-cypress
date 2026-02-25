/// <reference types="cypress" />

const { usuarios } = require("../fixtures/login_massivo.json");
const { runForTamanhosDeTela } = require("../support/utils");

runForTamanhosDeTela((tamanhoTela) => {
  describe("CEN06 - Validar Atualização de Cadastro ", () => {
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
      it(`CT11 - Deve realizar atualização de cadastro com sucesso - ${tamanhoTela} - Usuário ${idx}`, () => {
        cy.loginComSucesso(usuario);
        cy.atualizarCadastro();
      });

      it(`CT12 - Deve realizar o erro ao atualizar cadastro - ${tamanhoTela} - Usuário ${idx}`, () => {
        cy.loginComSucesso(usuario);
        cy.erroAtualizacaoCadastro();
      });
    });
  });
});
