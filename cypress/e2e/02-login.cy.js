/// <reference types="cypress" />

const { usuarios } = require("../fixtures/login_massivo.json");
const recuperacaoFixture = require("../fixtures/recuperacao_de_conta.json");


import { runForTamanhosDeTela } from '../support/utils';

beforeEach(() => {
  cy.visit("/index.htm"); // Caminho relativo, baseUrl já está configurado
});


runForTamanhosDeTela("CT03 - Validar Cadastro e Login", (tamanho) => {
    it(`Deve realizar cadastro e login com sucesso - ${tamanho}`, () => {
      cy.cadastroComSucesso();
      cy.logout();
      cy.loginComSucessoComCadastro();
    });

  });
runForTamanhosDeTela("CT03.1/CT04 - Validar Login com Massa Fixa", (tamanho) => {
  usuarios.slice(0, 2).forEach((usuario, idx) => {
    it(`CT03.1 - Login Existente [Usuário ${idx}] - ${tamanho}`, () => {
      cy.loginComSucesso(usuario);
    });

    it(`CT04 - Login Inválido [Usuário ${idx}] - ${tamanho}`, () => {
      cy.loginInvalido(usuario);
    });
  });
});

runForTamanhosDeTela("CT05 - Validar Recuperação de Conta", (tamanho) => {
  recuperacaoFixture.forEach((dadosRecuperacao, idx) => {
    it(`Deve recuperar conta [Caso ${idx}] - ${tamanho}`, () => {
      cy.recuperacaoDeConta(dadosRecuperacao);
    });
  });
});
