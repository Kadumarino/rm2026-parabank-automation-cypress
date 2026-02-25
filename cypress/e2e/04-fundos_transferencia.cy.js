/// <reference types="cypress" />

import { runForTamanhosDeTela } from "../support/utils";
const { usuarios } = require("../fixtures/login_massivo.json");

beforeEach(() => {
  cy.visit("/index.htm"); // Caminho relativo, baseUrl já está configurado
});

runForTamanhosDeTela("Validar Transferência de Fundos e Consulta de Transações", (tamanho) => {
  usuarios.slice(0, 1).forEach((usuario, idx) => {
    it(`CT07 - Deve realizar transferência do [Caso:${idx}] de fundos com sucesso - ${tamanho}`, () => {
      cy.loginComSucesso(usuario);
      cy.realizarTransferencia();
    });

    it(`CT10 - Deve consultar transações do [Caso:${idx}] de fundos com sucesso - ${tamanho}`, () => {
      cy.loginComSucesso(usuario);
      cy.procurarTransacaoEnviada();
    });
  });
});
