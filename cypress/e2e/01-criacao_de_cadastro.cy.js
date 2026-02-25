/// <reference types="cypress" />

const cadastro = require("../fixtures/criacao_de_cadastro.json");
import { runForTamanhosDeTela } from '../support/utils';

beforeEach(() => {
  cy.visit("/index.htm"); // Caminho relativo, baseUrl já está configurado
});


runForTamanhosDeTela("Validar Cadastro", (tamanho) => {
  it(`CT01 - Deve realizar cadastro com sucesso - ${tamanho}`, () => {
    cy.cadastroComSucesso();
  });

  describe("Validar Cadastro com dados estaticos", () => {
    cadastro.forEach((dadosCadastro, idx) => {
      it(`CT02.1 - Deve realizar cadastro com dados estaticos [Caso ${idx}] - ${tamanho}`, () => {
        cy.cadastroComSucessoNativo(dadosCadastro);
      });  
    });
  });

  // Teste para validar campos obrigatórios
  it(`CT02 - Deve validar campos obrigatórios - ${tamanho}`, () => {
    cy.cadastroIncompleto();
  });
});

