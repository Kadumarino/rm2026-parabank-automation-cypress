import { faker } from "@faker-js/faker";

Cypress.Commands.add("cadastroComSucesso", () => {

  const firstName = faker.person.firstName();
  const username = firstName.toLowerCase() + faker.string.numeric(8);
  const password = "Password123";

  cy.get("#loginPanel > :nth-child(3) > a").click();
  cy.get(".title").should("contain", "Signing up is easy!");
  cy.get('[name="customer.firstName"]').type(firstName);
  cy.get('[name="customer.lastName"]').type(faker.person.lastName());
  cy.get('[name="customer.address.street"]').type(
    faker.location.streetAddress(),
  );
  cy.get('[name="customer.address.city"]').type(faker.location.city());
  cy.get('[name="customer.address.state"]').type(faker.location.state());
  cy.get('[name="customer.address.zipCode"]').type(faker.location.zipCode());
  cy.get('[name="customer.phoneNumber"]').type(
    faker.phone.number("1999999999"),
  );
  cy.get('[name="customer.ssn"]').type(faker.string.numeric(9));
  cy.get('[name="customer.username"]').type(username);
  cy.get('[name="customer.password"]').type(password);
  cy.get('[name="repeatedPassword"]').type(password);
  cy.get('[colspan="2"] > .button').click();

  // Verifica se username já existe e reexecuta com novo username
  cy.get("body").then(($body) => {
    if ($body.text().includes("This username already exists")) {
      cy.retentarCadastroComNovoUsername();
    } else {
      // Armazena username e password para uso posterior
      cy.wrap({ username, password }).as("dadosUsuario");

      // Salva na fixture
      cy.readFile("cypress/fixtures/login_massivo.json").then((data) => {
        data.usuarios.push({ username, password });
        cy.writeFile("cypress/fixtures/login_massivo.json", data);
      });
    }
  });
});

Cypress.Commands.add("cadastroComSucessoNativo", (dadosCadastro) => {
  cy.get("#loginPanel > :nth-child(3) > a").click();
  cy.get(".title").should("contain", "Signing up is easy!");
  cy.get('[name="customer.firstName"]').type(dadosCadastro.firstName);
  cy.get('[name="customer.lastName"]').type(dadosCadastro.lastName);
  cy.get('[name="customer.address.street"]').type(dadosCadastro.address.street);
  cy.get('[name="customer.address.city"]').type(dadosCadastro.address.city);
  cy.get('[name="customer.address.state"]').type(dadosCadastro.address.state);
  cy.get('[name="customer.address.zipCode"]').type(
    dadosCadastro.address.zipCode,
  );
  cy.get('[name="customer.phoneNumber"]').type(dadosCadastro.phoneNumber);
  cy.get('[name="customer.ssn"]').type(dadosCadastro.ssn);
  cy.get('[name="customer.username"]').type(dadosCadastro.username);
  cy.get('[name="customer.password"]').type(dadosCadastro.password);
  cy.get('[name="repeatedPassword"]').type(dadosCadastro.password);
  cy.get('[colspan="2"] > .button').click();
  cy.get("body").then(($body) => {
    if ($body.text().includes("This username already exists")) {
      cy.log("Cliente já existe!");
      cy.contains("This username already exists").should("be.visible");
    } else {
      cy.contains(`Welcome ${dadosCadastro.username}`, {
        timeout: 10000,
      }).should("be.visible");
    }
  });
});

Cypress.Commands.add("retentarCadastroComNovoUsername", () => {
  const firstName = faker.person.firstName();
  const novoUsername = firstName.toLowerCase() + faker.string.numeric(10);
  const password = "Password123";

  cy.log("Username já existe. Gerando novo username...");
  cy.get('[name="customer.firstName"]').clear().type(firstName);
  cy.get('[name="customer.lastName"]').clear().type(faker.person.lastName());
  cy.get('[name="customer.address.street"]')
    .clear()
    .type(faker.location.streetAddress());
  cy.get('[name="customer.address.city"]').clear().type(faker.location.city());
  cy.get('[name="customer.address.state"]')
    .clear()
    .type(faker.location.state());
  cy.get('[name="customer.address.zipCode"]')
    .clear()
    .type(faker.location.zipCode());
  cy.get('[name="customer.phoneNumber"]')
    .clear()
    .type(faker.phone.number("1999999999"));
  cy.get('[name="customer.ssn"]').clear().type(faker.string.numeric(9));
  cy.get('[name="customer.username"]').clear().type(novoUsername);
  cy.get('[name="customer.password"]').clear().type(password);
  cy.get('[name="repeatedPassword"]').clear().type(password);
  cy.get('[colspan="2"] > .button').click();
  cy.contains(`Welcome ${novoUsername}`, { timeout: 10000 }).should(
    "be.visible",
  );

  // Armazena username e password para uso posterior
  cy.wrap({ username: novoUsername, password }).as("dadosUsuario");
});

Cypress.Commands.add("cadastroIncompleto", () => {
  const username = faker.person.firstName();
  const password = faker.internet.password();
  cy.get("#loginPanel > :nth-child(3) > a").click();
  cy.get(".title").should("contain", "Signing up is easy!");
  cy.get('[name="customer.firstName"]').type(username);
  cy.get('[name="customer.address.street"]').type(
    faker.location.streetAddress(),
  );
  cy.get('[name="customer.address.state"]').type(faker.location.state());
  cy.get('[name="customer.address.zipCode"]').type(faker.location.zipCode());
  cy.get('[name="customer.phoneNumber"]').type(
    faker.phone.number("1999999999"),
  );
  cy.get('[name="customer.username"]').type(username);
  cy.get('[name="repeatedPassword"]').type(password);
  cy.get('[colspan="2"] > .button').click();
  cy.contains("Last name is required.").should("be.visible");
  cy.contains("City is required.").should("be.visible");
  cy.contains("Social Security Number is required.").should("be.visible");
});
