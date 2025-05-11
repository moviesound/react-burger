/// <reference types="cypress" />

describe('creating order test:', () => {
	beforeEach(() => {
		cy.interceptUserAuth();
		cy.interceptIngredients();
		cy.interceptOrder();

		cy.visit('/');
		//set tokens
		cy.window().then((win) => {
			win.localStorage.setItem('accessToken', 'my-token-value');
			console.log(win.localStorage.getItem('accessToken'));
			win.localStorage.setItem('refreshToken', 'my-2token-value');
		});
	});

	it('should check that ingredients are on the page', () => {
		cy.getByTestId('ingredientsUnique').should(
			'have.length.greaterThan',
			0,
		);
		cy.get('[data-ingredient-type="main"]').should(
			'have.length.greaterThan',
			0,
		);
		cy.get('[data-ingredient-type="sauce"]').should(
			'have.length.greaterThan',
			0,
		);
	});

	it('should check that buns are on the page', () => {
		cy.getByTestId('ingredientsUnique').should(
			'have.length.greaterThan',
			0,
		);
		cy.get('[data-ingredient-type="bun"]').should('have.length.greaterThan', 0);
	});

	it('should check that drop areas are on the page', () => {
		cy.getByTestId('topBunDrop').should('have.length.greaterThan', 0);
		cy.getByTestId('bottomBunDrop').should(
			'have.length.greaterThan',
			0,
		);
		cy.getByTestId('ingerdientDrop').should(
			'have.length.greaterThan',
			0,
		);
	});

	it('should check dragging of ingredients and buns and dropping it into constructor and creating of order', () => {
		const dataTransfer = new DataTransfer();

		cy.getByTestId('ingerdientDrop').as('ingerdientDrop');
		cy.get('[data-ingredient-type="main"]').eq(1).as('mainContainer1');
		cy.get('[data-ingredient-type="bun"]').eq(0).as('bunContainer0');
		cy.get('[data-ingredient-type="bun"]').eq(1).as('bunContainer1');
		cy.getByTestId('topBunDrop').as('topBunDrop');
		cy.getByTestId('bottomBunDrop').as('bottomBunDrop');

		/* first drag of ingredient */
		//dragstart ingredient
		cy.get('@mainContainer1').trigger('dragstart', { dataTransfer });
		//drop ingredient
		cy.get('@ingerdientDrop').first().trigger('drop', { dataTransfer });
		//check ingredient appeared in drop area
		cy.get('@ingerdientDrop').first().within(($drop) => {
			cy.get('ul:first').within(($ul) => {
				cy.getByTestId('ingredient-in-constructor').should('have.length', 1);
			});
		});
		//check counter appear in ingredients list
		cy.get('@mainContainer1').within(($ingredient) => {
			cy.get('p[class="counter__num"]:first').should('have.length', 1);
		});
		//check counter is equal to 1
		cy.get('@mainContainer1').within(($ingredient) => {
			cy.get('p[class="counter__num"]:first').should('have.html', '1');
		});

		/* second drag of ingredient */
		//dragstart same ingredient
		cy.get('@mainContainer1').trigger('dragstart', { dataTransfer });
		//drop same ingredient
		cy.get('@ingerdientDrop').first().trigger('drop', { dataTransfer });
		//check one more same ingredient appeared in ingredients list
		cy.get('@ingerdientDrop').first().within(($drop) => {
			cy.get('ul:first').within(($ul) => {
				cy.get('li[draggable="true"]').should('have.length', 2);
			});
		});
		//check counter is still on ingredient in ingredients list
		cy.get('@mainContainer1').within(($ingredient) => {
			cy.get('p[class="counter__num"]:first').should('have.length', 1);
		});
		//check that counter increased by 1 and equal to 2
		cy.get('@mainContainer1').within(($ingredient) => {
			cy.get('p[class="counter__num"]:first').should('have.html', '2');
		});

		/*drag first bun into top drop element*/
		//dragstart bun
		cy.get('@bunContainer0').trigger('dragstart', { dataTransfer });
		//drop bun in the top area for buns
		cy.get('@topBunDrop').first().trigger('drop', { dataTransfer });
		//check that bun is shown at top area
		cy.get('@topBunDrop').first().within(($drop) => {
			cy.getByTestId('top-bun-added').should('have.length', 1);
		});
		//check that bun is shown at bottom area
		cy.get('@bottomBunDrop').first().within(($drop) => {
			cy.getByTestId('bottom-bun-added').should('have.length', 1);
		});
		//check this bun in the ingredients list got the counter and it is equal to 2
		cy.get('@bunContainer0').within(($bun) => {
			cy.get('p[class="counter__num"]:first').should('have.html', '2');
		});

		/*drag of second bun into bottom drop area*/
		//dragstart bun
		cy.get('@bunContainer1').trigger('dragstart', { dataTransfer });
		//drop bun in the bottom area for buns
		cy.get('@bottomBunDrop').first().trigger('drop', { dataTransfer });

		//check that bun is shown at the top area
		cy.get('@topBunDrop').first().within(($drop) => {
			cy.getByTestId('top-bun-added').should('have.length', 1);
		});
		//check that bun is shown at the bottom area
		cy.get('@bottomBunDrop').first().within(($drop) => {
			cy.getByTestId('bottom-bun-added').should('have.length', 1);
		});
		//check this bun in the ingredients list got the counter and it is equal to 2
		cy.get('@bunContainer1').within(($bun) => {
			cy.get('p[class="counter__num"]:first').should('have.html', '2');
		});
		//check that previous bun doesn't have counter, because bun was changed
		cy.get('@bunContainer0').within(($bun) => {
			cy.get('p[class="counter__num"]').should('have.length', '0');
		});

		//click on button to create order
		cy.getByTestId('make-order-btn').click();
		//check modal appeared
		const modal = cy.getByTestId('modal').as('modal');
		cy.get('@modal').should('have.length', 1);
		cy.get('@modal').should('be.visible');
		cy.wait('@getOrderInfo').then(({ request, response }) => {
			expect(response?.body?.order?.number).to.eq(76731);
		});
		//check order was created
		cy.getByTestId('order-number').as('orderNumber');
		cy.get('@orderNumber').should('have.length', 1);
		cy.get('@orderNumber').should('have.html', '76731');
	});
});
