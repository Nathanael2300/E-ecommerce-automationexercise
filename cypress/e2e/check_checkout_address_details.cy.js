describe('Verify address details in checkout', () => {

    const verifyHomePageUrl = () => {
        cy.url().should('include', 'https://www.automationexercise.com');
    };

    const visitHomePage = () => {
        cy.visit('/');
        verifyHomePageUrl();
    };

    const verifyLoginPageUrl = () => {
        cy.url().should('include', 'https://www.automationexercise.com/login');
    };

    const product = { 
        name: 'Premium Polo T-Shirts', id: 30 
    };

    const verifyProductPageUrl = () => {
        cy.url().should('include', `https://www.automationexercise.com/product_details/${product.id}`);
    };

    const accessProduct = () => {
        cy.get(`a[href="/product_details/${product.id}"]`).should('be.visible').click();
        verifyProductPageUrl();
    };

    const addToCart = () => {
        cy.get('button').contains('Add to cart').first().click();
        cy.contains('h4', 'Added!').should('be.visible');
        cy.get('p').contains('Your product has been added to cart.').should('be.visible');
        cy.get('.btn.btn-success.close-modal.btn-block').contains('Continue Shopping').should('be.visible');
        cy.get('u').contains('View Cart').should('be.visible').click();
    };

    const login = () => {
        cy.contains('a', 'Signup / Login').click();
        verifyLoginPageUrl();
        cy.loginIfNeeded(); 
    };

    const validateAddressInCheckout = () => {
        cy.contains('.btn.btn-default.check_out', 'Proceed To Checkout').click();
        cy.reviewOrder();
    };

    it('Should verify address details in checkout', () => {
        visitHomePage();
        login();
        accessProduct();
        addToCart();
        cy.verifyCart(); 
        validateAddressInCheckout();
    });
});

