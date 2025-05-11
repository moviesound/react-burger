declare namespace Cypress {
	interface Chainable<Subject> {
		/**
		 * Получить элемент по data-testid
		 */
		getByTestId(selector: string): Chainable<Subject>;
		interceptIngredients(): void;
		interceptOrder(): void;
		interceptUserAuth(): void;
	}
}