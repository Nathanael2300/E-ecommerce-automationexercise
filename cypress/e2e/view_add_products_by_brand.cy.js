describe('View and add to cart by brand', () => {
    const visitHomePage = () => cy.visit('/');
    const validateCartPage = () => {
        cy.url().should('include', 'https://www.automationexercise.com/view_cart');
    }
    const addToCart = () => {
        cy.get('button').contains('Add to cart').click();
        cy.contains('h4', 'Added!').should('be.visible');
        cy.get('p').contains('Your product has been added to cart.').should('be.visible');
        cy.get('.btn.btn-success.close-modal.btn-block').contains('Continue Shopping').should('be.visible');
        cy.get('u').contains('View Cart').should('be.visible').click();
    };
    const accessProducts = (id) => {
        cy.get(`a[href="/product_details/${id}"]`).should('be.visible').click();
    }
    
    const addProductToCart = (id) => {
        accessProducts(id);
        addToCart();
        validateCartPage();
        cy.verifyCart(); // Assuming cy.verifyCart() is a custom command to verify the cart
        visitHomePage();
    }
    
    it('Should access the brand and add to cart', () => {
        const brandProducts = [
            { brand: 'Polo', product: 'Blue Top', id: 1},
            { brand: 'H&M', product: 'Men Tshirt', id: 2},
            { brand: 'Madame', product: 'Sleeveless Dress', id: 3},
            { brand: 'Mast & Harbour', product: 'Winter Top', id: 5},
            { brand: 'Babyhug', product: 'Sleeves Printed Top - White', id: 11},
            { brand: 'Allen Solly Junior', product: 'Frozen Tops For Kids', id: 13},
            { brand: 'Kookie Kids', product: 'Full Sleeves Top Cherry - Pink', id: 14},
            { brand: 'Biba', product: 'Blue Cotton Indie Mickey Dress', id: 21},
        ];
        
        visitHomePage();

        brandProducts.forEach(product => {
            cy.contains('a', product.brand).should('be.visible').click();
            cy.contains('p', product.product).should('be.visible');
            addProductToCart(product.id);
        });
    });
});

