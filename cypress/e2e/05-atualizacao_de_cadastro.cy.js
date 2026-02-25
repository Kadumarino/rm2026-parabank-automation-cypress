/// <reference types="cypress" />

import { runForTamanhosDeTela } from "../support/utils";
const { usuarios } = require("../fixtures/login_massivo.json");

beforeEach(() => {
  cy.visit("/index.htm"); // Caminho relativo, baseUrl já está configurado
});


runForTamanhosDeTela("Validar Atualização de Cadastro", (tamanho) => {
  usuarios.slice(0, 1).forEach((usuario, idx) => {
    it(`CT08 - Atualização de Cadastro - ${tamanho} - Usuário ${idx + 1}`, () => {
      cy.loginComSucesso(usuario);
      cy.atualizarCadastro();
    });

    it(`CT09 - Atualização de Cadastro com erro - ${tamanho} - Usuário ${idx + 1}`, () => {
      cy.loginComSucesso(usuario);
      cy.erroAtualizacaoCadastro();
    });
  });
});
