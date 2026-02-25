/// <reference types="cypress" />

const { usuarios } = require("../fixtures/login_massivo.json");


import { runForTamanhosDeTela } from '../support/utils';

beforeEach(() => {
  cy.visit("/index.htm"); // Caminho relativo, baseUrl já está configurado
});

runForTamanhosDeTela("Validar Abertura de Conta", (tamanho) => {
  usuarios.slice(0, 2).forEach((usuario, idx) => {
    it(`CT06 - abertura de conta [Usuário ${idx}] - ${tamanho}`, () => {
      cy.loginComSucesso(usuario);
      cy.abrirContaComSucesso();
    });
  });
});