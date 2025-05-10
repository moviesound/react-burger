/// <reference types="cypress" />

describe('creating order test:', () => {
	let mockUser;
	let mockOrder;

	beforeEach(() => {
		cy.visit('http://localhost:8080');
		//set tokens
		cy.window().then((win) => {
			win.localStorage.setItem('accessToken', 'my-token-value');
			win.localStorage.setItem('refreshToken', 'my-2token-value');
		});
		//intercept query on user info
		cy.fixture('user').then((data) => {
			mockUser = data;

			cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
				statusCode: 200,
				body: mockUser,
			});
		});
	});

	it('should check that ingredients are on the page', () => {
		cy.get('[data-testid="ingredientsUnique"]').should(
			'have.length.greaterThan',
			0
		);
		cy.get('[data-ingredient-type="main"]').should(
			'have.length.greaterThan',
			0
		);
		cy.get('[data-ingredient-type="sauce"]').should(
			'have.length.greaterThan',
			0
		);
	});

	it('should check that buns are on the page', () => {
		cy.get('[data-testid="ingredientsUnique"]').should(
			'have.length.greaterThan',
			0
		);
		cy.get('[data-ingredient-type="bun"]').should('have.length.greaterThan', 0);
	});

	it('should check that drop areas are on the page', () => {
		cy.get('[data-testid="topBunDrop"]').should('have.length.greaterThan', 0);
		cy.get('[data-testid="bottomBunDrop"]').should(
			'have.length.greaterThan',
			0
		);
		cy.get('[data-testid="ingerdientDrop"]').should(
			'have.length.greaterThan',
			0
		);
	});

	it('should check dragging of ingredients and buns and dropping it into constructor and creating of order', () => {
		cy.fixture('order').then((order) => {
			cy.intercept('POST', 'https://norma.nomoreparties.space/api/orders', {
				statusCode: 200,
				body: order,
			}).as('getOrderInfo');
		});

		const dataTransfer = new DataTransfer();
		/* first drag of ingredient */
		//dragstart ingredient
		cy.get('[data-ingredient-type="main"]')
			.eq(1)
			.trigger('dragstart', { dataTransfer });
		//drop ingredient
		cy.get('[data-testid="ingerdientDrop"]')
			.first()
			.trigger('drop', { dataTransfer });
		//check ingredient appeared in drop area
		cy.get('[data-testid="ingerdientDrop"]')
			.first()
			.within(($drop) => {
				cy.get('ul:first').within(($ul) => {
					cy.get('li[draggable="true"]').should('have.length', 1);
				});
			});
		//check counter appear in ingredients list
		cy.get('[data-ingredient-type="main"]')
			.eq(1)
			.within(($ingredient) => {
				cy.get('p[class="counter__num"]:first').should('have.length', 1);
			});
		//check counter is equal to 1
		cy.get('[data-ingredient-type="main"]')
			.eq(1)
			.within(($ingredient) => {
				cy.get('p[class="counter__num"]:first').should('have.html', '1');
			});

		/* second drag of ingredient */
		//dragstart same ingredient
		cy.get('[data-ingredient-type="main"]')
			.eq(1)
			.trigger('dragstart', { dataTransfer });
		//drop same ingredient
		cy.get('[data-testid="ingerdientDrop"]')
			.first()
			.trigger('drop', { dataTransfer });
		//check one more same ingredient appeared in ingredients list
		cy.get('[data-testid="ingerdientDrop"]')
			.first()
			.within(($drop) => {
				cy.get('ul:first').within(($ul) => {
					cy.get('li[draggable="true"]').should('have.length', 2);
				});
			});
		//check counter is still on ingredient in ingredients list
		cy.get('[data-ingredient-type="main"]')
			.eq(1)
			.within(($ingredient) => {
				cy.get('p[class="counter__num"]:first').should('have.length', 1);
			});
		//check that counter increased by 1 and equal to 2
		cy.get('[data-ingredient-type="main"]')
			.eq(1)
			.within(($ingredient) => {
				cy.get('p[class="counter__num"]:first').should('have.html', '2');
			});

		/*drag first bun into top drop element*/
		//dragstart bun
		cy.get('[data-ingredient-type="bun"]')
			.eq(0)
			.trigger('dragstart', { dataTransfer });
		//drop bun in the top area for buns
		cy.get('[data-testid="topBunDrop"]')
			.first()
			.trigger('drop', { dataTransfer });
		//check that bun is shown at top area
		cy.get('[data-testid="topBunDrop"]')
			.first()
			.within(($drop) => {
				cy.get('[data-testid="top-bun-added"]').should('have.length', 1);
			});
		//check that bun is shown at bottom area
		cy.get('[data-testid="bottomBunDrop"]')
			.first()
			.within(($drop) => {
				cy.get('[data-testid="bottom-bun-added"]').should('have.length', 1);
			});
		//check this bun in the ingredients list got the counter and it is equal to 2
		cy.get('[data-ingredient-type="bun"]')
			.eq(0)
			.within(($bun) => {
				cy.get('p[class="counter__num"]:first').should('have.html', '2');
			});

		/*drag of second bun into bottom drop area*/
		//dragstart bun
		cy.get('[data-ingredient-type="bun"]')
			.eq(1)
			.trigger('dragstart', { dataTransfer });
		//drop bun in the bottom area for buns
		cy.get('[data-testid="bottomBunDrop"]')
			.first()
			.trigger('drop', { dataTransfer });

		//check that bun is shown at the top area
		cy.get('[data-testid="topBunDrop"]')
			.first()
			.within(($drop) => {
				cy.get('[data-testid="top-bun-added"]').should('have.length', 1);
			});
		//check that bun is shown at the bottom area
		cy.get('[data-testid="bottomBunDrop"]')
			.first()
			.within(($drop) => {
				cy.get('[data-testid="bottom-bun-added"]').should('have.length', 1);
			});
		//check this bun in the ingredients list got the counter and it is equal to 2
		cy.get('[data-ingredient-type="bun"]')
			.eq(1)
			.within(($bun) => {
				cy.get('p[class="counter__num"]:first').should('have.html', '2');
			});
		//check that previous bun doesn't have counter, because bun was changed
		cy.get('[data-ingredient-type="bun"]')
			.eq(0)
			.within(($bun) => {
				cy.get('p[class="counter__num"]').should('have.length', '0');
			});

		//click on button to create order
		cy.get('[data-testid="make-order-btn"]').click();
		//check modal appeared
		cy.get('[data-testid="modal"]').should('have.length', 1);
		cy.get('[data-testid="modal"]').should('be.visible');
		cy.wait('@getOrderInfo').then(({ request, response }) => {
			expect(response?.body?.order?.number).to.eq(76731);
		});
		//check order was created
		cy.get('[data-testid="order-number"]').should('have.length', 1);
		cy.get('[data-testid="order-number"]').should('have.html', '76731');
	});
});
