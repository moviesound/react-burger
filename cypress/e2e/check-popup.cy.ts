/// <reference types="cypress" />

describe('checking modal windows work:', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8080');
	});

	it('should open modal and close it by clicking on layout', () => {
		//click on ingredient
		cy.get('[data-ingredient-type="main"]').eq(1).click();
		//check modal appeared
		cy.get('[data-testid="modal"]').should('have.length', 1);
		cy.get('[data-testid="modal"]').should('be.visible');
		//click on layout
		cy.get('[data-testid="modal-overlay"]').click(0, 0);
		//check popup disappeared
		cy.get('[data-testid="modal"]').should('have.length', 0);
	});

	it('should open modal and close it by pressing "Esc" key', () => {
		//click on ingredient
		cy.get('[data-ingredient-type="main"]').eq(1).click();
		//check modal appeared
		cy.get('[data-testid="modal"]').should('have.length', 1);
		cy.get('[data-testid="modal"]').should('be.visible');
		//click on button close
		cy.get('body').type('{esc}')
		//check popup disappeared
		cy.get('[data-testid="modal"]').should('have.length', 0);
	});

	it('should open modal and close it by clicking on close button', () => {
		//click on ingredient
		cy.get('[data-ingredient-type="main"]').eq(1).click();
		//check modal appeared
		cy.get('[data-testid="modal"]').should('have.length', 1);
		cy.get('[data-testid="modal"]').should('be.visible');
		//click on button close
		cy.get('[data-testid="close-modal-btn"]').click();
		//check popup disappeared
		cy.get('[data-testid="modal"]').should('have.length', 0);
	});
});
