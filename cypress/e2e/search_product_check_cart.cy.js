describe('Search product and verify cart after login', () => {

    const verifyHomePageUrl = () => {
        cy.url().should('include', 'https://www.automationexercise.com');
    };

    const verifyProductPageUrl = () => {
        cy.url().should('include', 'https://www.automationexercise.com/product_details/30');
    };

    const verifyProductsPageUrl = () => {
        cy.url().should('include', 'https://www.automationexercise.com/products');
    };

    const verifyCartPageUrl = () => {
        cy.url().should('include', 'https://www.automationexercise.com/view_cart');
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

    const searchProduct = () => {
        cy.get('a[href="/products"]').click();
        verifyProductsPageUrl();
        cy.get('#search_product').type(product.name);
        cy.get('button#submit_search').click();
    };

    const accessProduct = () => {
        cy.get(`a[href="/product_details/${product.id}"]`).should('be.visible').click();
        verifyProductPageUrl();
    };

    const addToCart = () => {
        cy.get('button').contains('Add to cart').first().click();
        cy.contains('h4', 'Added!').should('be.visible');
        cy.get('p').contains('Your product has been added to cart.').should('be.visible');
        cy.get('u').contains('View Cart').should('be.visible');
        cy.get('.btn.btn-success.close-modal.btn-block').contains('Continue Shopping').should('be.visible').click();
    };

    const performLogin = () => {
        cy.get('a[href="/login"]').contains('Signup / Login').should('be.visible').click();
        verifyLoginPageUrl();
        cy.loginIfNeeded(); // novo nome do comando customizado
    };

    const accessCart = () => {
        cy.get('a[href="/view_cart"]').contains('Cart').click({ force: true });
        verifyCartPageUrl();
    };

    it('Should search for a product and verify it remains in the cart after login', () => {
        visitHomePage();
        searchProduct();
        accessProduct();
        addToCart();
        performLogin();
        accessCart();
        cy.verifyCart(); 
    });
});

