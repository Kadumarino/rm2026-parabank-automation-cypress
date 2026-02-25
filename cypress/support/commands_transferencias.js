import { faker } from "@faker-js/faker";


Cypress.Commands.add("realizarTransferencia", () => {
  const valorTransferencia = faker.finance.amount();
  cy.get("#leftPanel > ul > :nth-child(3) > a").click();
  cy.contains("Transfer Funds").should("be.visible");
  cy.get('[name="input"]').type(valorTransferencia);
  cy.get("#fromAccountId").select(0);
  cy.get("#toAccountId").select(0);
  cy.get(":nth-child(4) > .button").click();
  cy.contains("Transfer Complete!").should("be.visible");

  cy.get("#fromAccountId option:selected")
    .invoke("text")
    .then((contaOrigem) => {
      cy.get("#toAccountId option:selected")
        .invoke("text")
        .then((contaDestino) => {
          cy.contains(
            `${valorTransferencia} has been transferred from account #${contaOrigem.trim()} to account #${contaDestino.trim()}`,
          ).should("be.visible");
          cy.wrap(contaDestino.trim()).as("contaDestino");
          cy.log(
            `Conta origem: ${contaOrigem.trim()} | Conta destino: ${contaDestino.trim()}`,
          );
        });
    });
});
