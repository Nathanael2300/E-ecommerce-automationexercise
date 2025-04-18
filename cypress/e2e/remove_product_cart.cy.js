describe('Remove products from the cart', () => {
    const visitHomePage = () => cy.visit('/');

    beforeEach(() => {
        visitHomePage();
        cy.url().should('include', 'https://www.automationexercise.com');
    });

    const addProductsToCart = (id) => {
        cy.get(`a[href="/product_details/${id}"]`).click();
        cy.get('button').contains('Add to cart').click();
        cy.get('h4').contains('Added!').should('be.visible');
        visitHomePage();
        cy.url().should('include', 'https://www.automationexercise.com');
    };

    const removeProductsFromCart = () => {
        cy.url().should('include', 'https://www.automationexercise.com');
        cy.contains('Cart').click();
        cy.url().should('include', 'https://www.automationexercise.com/view_cart');
        cy.get('.fa.fa-times').each(($el) => {
            cy.wrap($el).should('be.visible').click();
        });
    };

    it('Should remove products from the cart', () => {
        visitHomePage();
        addProductsToCart(1);
        addProductsToCart(2);
        addProductsToCart(3);
        removeProductsFromCart();
    });
});

