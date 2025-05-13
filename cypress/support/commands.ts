/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('getByTestId', (selector) => {
	return cy.get(`[data-testid="${selector}"]`);
});

Cypress.Commands.add('interceptIngredients', () => {
	cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
		fixture: 'ingredients',
	});
});

Cypress.Commands.add('interceptUserAuth', () => {
	cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
		fixture: 'user',
	});
});

Cypress.Commands.add('interceptOrder', () => {
	cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
		fixture: 'order',
	}).as('getOrderInfo');
});
