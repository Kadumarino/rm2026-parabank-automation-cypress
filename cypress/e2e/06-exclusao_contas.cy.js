/// <reference types="cypress" />


import { runForTamanhosDeTela } from "../support/utils";

beforeEach(() => {
  cy.visit("/index.htm"); // Caminho relativo, baseUrl já está configurado
});

runForTamanhosDeTela("Validar Exclusão de Contas", (tamanho) => {
  it(`CT11 - Deve excluir conta com sucesso - ${tamanho}`, () => {
    cy.excluirConta();
  });

});