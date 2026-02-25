/// <reference types="cypress" />

const cadastro = require("../fixtures/criacao_de_cadastro.json");
const { runForTamanhosDeTela } = require("../support/utils");

runForTamanhosDeTela((tamanhoTela) => {

  describe("CEN01 - Validar Cadastro", () => {

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
  
  it(`CT01 - Deve realizar cadastro com sucesso (dados dinâmicos) - ${tamanhoTela}`, () => {
    cy.cadastroComSucesso();
    
  });

    cadastro.forEach((dadosCadastro, idx) => {
      it(`CT02 - Deve realizar cadastro com dados estáticos [Usuário ${idx}] - ${tamanhoTela}`, () => {
        cy.cadastroComSucessoNativo(dadosCadastro);
      });
    });

    it(`CT03 - Deve validar campos obrigatórios - ${tamanhoTela}`, () => {
      cy.cadastroIncompleto();
    });
  });
});

