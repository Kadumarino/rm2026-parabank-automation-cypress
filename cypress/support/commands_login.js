import { faker } from "@faker-js/faker";

Cypress.Commands.add("loginComSucessoComCadastro", () => {
  cy.get("@dadosUsuario").then(({ username, password }) => {
    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.get('input[value="Log In"]').click();
    cy.contains("Account Services").should("be.visible");
  });
  });

  Cypress.Commands.add("loginComSucesso", (usuario) => {
    cy.get('[name="username"]').type(usuario.username);
    cy.get('[name="password"]').type(usuario.password);
    cy.get('[type="submit"]').click();
    if (usuario.username === "invalidUser") {
      cy.contains("Error!").should("be.visible");
      cy.contains("Please enter a username and password.").should("be.visible");
      return;
    }
  });

  Cypress.Commands.add("loginInvalido", () => {
    cy.get('[name="password"]').type(faker.internet.password());
    cy.get('[type="submit"]').click();
    cy.contains("Error!").should("be.visible");
    cy.contains("Please enter a username and password.").should("be.visible");
  });

  Cypress.Commands.add("recuperacaoDeConta", (recuperacao) => {
    cy.get("#loginPanel > :nth-child(2) > a").click();
    cy.contains("Customer Lookup").should("be.visible");
    cy.get('[name="firstName"]').type(recuperacao.firstName);
    cy.get('[name="lastName"]').type(recuperacao.lastName);
    cy.get('[name="address.street"]').type(recuperacao.address.street);
    cy.get('[name="address.city"]').type(recuperacao.address.city);
    cy.get('[name="address.state"]').type(recuperacao.address.state);
    cy.get('[name="address.zipCode"]').type(recuperacao.address.zipCode);
    cy.get('[name="ssn"]').type(recuperacao.ssn);
    cy.get('[colspan="2"] > .button').click();
    cy.contains(
      "Your login information was located successfully. You are now logged in.",
    ).should("be.visible");
  });

