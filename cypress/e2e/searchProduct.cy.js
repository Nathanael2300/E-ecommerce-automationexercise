describe('Search Product', () => {
    const visitHomePage = () => cy.visit('/');
    const goToProductsPage = () => {
        cy.get('a[href="/products"]').click();
        cy.url().should('eq', 'https://www.automationexercise.com/products');
    };

    const searchProduct = (productName) => {
        cy.get('#search_product').type(productName);
        cy.get('#submit_search').should('be.visible').click();
    };

    const verifyProduct = (imageSrc, price, productName) => {
        cy.get(`img[src="${imageSrc}"`).should(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
        cy.contains('h2', price).should('be.visible');
        cy.contains(productName).should('be.visible');
    };

    beforeEach(() => {
        visitHomePage();
        cy.url().should('include', 'https://www.automationexercise.com');
    });

    context('When the product is "Summer White Top"', () => {
        it('Should return the correct product', () => {
            goToProductsPage();
            searchProduct('Summer White Top');
            verifyProduct('/get_product_picture/6', 'Rs. 400', 'Summer White Top');
        });
    });

    context('When the product is "Pure Cotton V-Neck T-Shirt"', () => {
        it('Should return the correct product', () => {
            goToProductsPage();
            searchProduct('Pure Cotton V-Neck T-Shirt');
            verifyProduct('/get_product_picture/28', 'Rs. 1299', 'Pure Cotton V-Neck T-Shirt');
        });
    });
});

