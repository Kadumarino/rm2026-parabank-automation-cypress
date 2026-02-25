import { faker } from "@faker-js/faker";

import { getDataAtual } from "./utils";

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

Cypress.Commands.add("procurarTransacaoEnviada", () => {
  cy.get('a[href="findtrans.htm"]').contains("Find Transactions").click();
  cy.get("#transactionDate").type(getDataAtual());
  cy.get("#findByDate").click();
  cy.contains("Transaction Results").should("be.visible");
  cy.contains("Funds Transfer Sent").click();
  cy.contains("Transaction Details").should("be.visible");
  cy.get("tbody > :nth-child(1) > :nth-child(2)")
    .invoke("text")
    .then((transactionId) => {
      cy.log(`ID da transação: ${transactionId.trim()}`);
      cy.contains(`Transaction ID: ${transactionId.trim()}`).should(
        "be.visible",
      );
      cy.contains(`Date: ${getDataAtual()}`).should("be.visible");
      cy.get(":nth-child(4) > :nth-child(2)")
        .invoke("text")
        .then((typePay) => {
          cy.log(`Tipo de pagamento: ${typePay.trim()}`);
          cy.get(":nth-child(5) > :nth-child(2)")
            .invoke("text")
            .then((ammount) => {
              cy.contains(`Amount: ${ammount.trim()}`).should("be.visible");
              cy.log(`Valor da transação: ${ammount.trim()}`);
            });
        });
    });
});
