describe('Product Details', () => {
    beforeEach(() => { cy.visit('/') });

    it('Should return all product details successfully for "Blue Top"', () => {
        cy.get('a[href="/product_details/1"]').click();
        cy.url().should('include', '/product_details/1');
        cy.contains('h2', 'Blue Top').should('be.visible');
        cy.contains('span', 'Rs. 500').should('be.visible');
        cy.get('img[src="/get_product_picture/1"]').should(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
        cy.contains('p', 'Category: Women > Tops').should('be.visible');
        cy.get('b').contains('Availability:').parent().should('contain', 'In Stock');
        cy.get('b').contains('Condition:').parent().should('contain', 'New');
        cy.get('b').contains('Brand:').parent().should('contain', 'Polo');
    });

    it('Should return all product details successfully for "Men Tshirt"', () => {
        cy.get('a[href="/product_details/2"]').click();
        cy.url().should('include', '/product_details/2');
        cy.contains('h2', 'Men Tshirt').should('be.visible');
        cy.contains('span', 'Rs. 400').should('be.visible');
        cy.get('img[src="/get_product_picture/2"]').should(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
        cy.get('p').contains('Category').parent().should('contain', 'Men');
        cy.get('b').contains('Availability:').parent().should('contain', 'In Stock');
        cy.get('b').contains('Condition:').parent().should('contain', 'New');
        cy.get('b').contains('Brand:').parent().should('contain', 'H&M');
    });
});
