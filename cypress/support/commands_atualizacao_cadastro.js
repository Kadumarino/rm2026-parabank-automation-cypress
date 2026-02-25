import { faker } from "@faker-js/faker";

const endereco = faker.location.streetAddress();
const cidade = faker.location.city();
const estado = faker.location.state();
const cep = faker.location.zipCode();
const telefone = faker.phone.number(0, 9);

Cypress.Commands.add('atualizarCadastro', () => {
    cy.contains('Update Contact Info').should('be.visible').click();
    cy.get('[name="customer.address.street"]').clear().type(endereco);
    cy.get('[name="customer.address.city"]').clear().type(cidade);
    cy.get('[name="customer.address.state"]').clear().type(estado);
    cy.get('[name="customer.address.zipCode"]').clear().type(cep);
    cy.get('[name="customer.phoneNumber"]').clear().type(telefone);
    cy.get('[colspan="2"] > .button').click();
    cy.contains('Profile Updated').should('be.visible');
    cy.contains('Your updated address and phone number have been added to the system.').should('be.visible');

});

Cypress.Commands.add('erroAtualizacaoCadastro', () => {
    cy.contains('Update Contact Info').should('be.visible').click();
    cy.get('[name="customer.address.street"]').clear().type(endereco);
    cy.get('[name="customer.address.city"]').clear();
    cy.get('[name="customer.address.state"]').clear();
    cy.get('[name="customer.address.zipCode"]').clear();
    cy.get('[name="customer.phoneNumber"]').clear().type(telefone);
    cy.get('[colspan="2"] > .button').click();
    cy.contains('City is required.').should('be.visible');
    cy.contains('State is required.').should('be.visible');
    cy.contains('Zip Code is required.').should('be.visible');
});