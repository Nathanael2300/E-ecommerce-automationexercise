describe('Validate Home Subscription', () => {
    beforeEach(() => { cy.visit('/') });
    it('Should check if categories are visible.', () => {
        cy.url().should('include', 'https://www.automationexercise.com');
        const categories = [
            { name: 'Women', links: ['/category_products/1', '/category_products/2', '/category_products/7'] },
            { name: 'Men', links: ['/category_products/3', '/category_products/6'] },
            { name: 'Kids', links: ['/category_products/4', '/category_products/5'] }
        ];
        cy.contains('h2', 'Category').should('be.visible');
        categories.forEach(category => {
            cy.get('.panel-heading').contains(category.name).should('be.visible').click();

            category.links.forEach(link => {
                cy.get(`a[href="${link}"]`).should('be.visible');
            });
        });
    });

    it('Should check if the brands are visible.', () => {
        cy.url().should('include', 'https://www.automationexercise.com');
        const brands = [
            { name: 'Polo' },
            { name: 'H&M' },
            { name: 'Madame' },
            { name: 'Mast & Harbour' },
            { name: 'Babyhug' },
            { name: 'Allen Solly Junior' },
            { name: 'Kookie Kids' },
            { name: 'Biba' }
        ];
        const brandsSelector = '.brands-name';
        const categoryHeading = 'h2';
        cy.get(categoryHeading).contains('Brands').should('be.visible');
        brands.forEach(brand => {
            cy.get(brandsSelector).contains(brand.name).should('be.visible');
        });
    });

    it('Should validate if images on the page are visible and loaded correctly.', () => {
        cy.url().should('include', 'https://www.automationexercise.com');
        cy.get('img').should(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0)
        });
    });

    it('Should test if the brand filter works correctly.', () => {
        cy.url().should('include', 'https://www.automationexercise.com');
        const brands = [
            { name: 'Polo' },
            { name: 'H&M' },
            { name: 'Madame' },
            { name: 'Mast & Harbour' },
            { name: 'Babyhug' },
            { name: 'Allen Solly Junior' },
            { name: 'Kookie Kids' },
            { name: 'Biba' }
        ];
        const brandsFilter = '.brands-name'
        const h2 = '.title'
        brands.forEach(brand => {
            cy.get(brandsFilter).contains(brand.name).should('be.visible').click();
            cy.get(h2).should('be.visible');
        });
    });

    it('Should verify subscription on the cart page.', () => {
        cy.contains('Cart').click();
        cy.url().should('eq', 'https://www.automationexercise.com/view_cart');
        cy.get('.active').contains('Shopping Cart').should('be.visible');
        cy.get('.text-center').should('be.visible');
    });

    it('Should check if the “View Product” links lead to the product page.', () => {
        cy.url().should('include', 'https://www.automationexercise.com');

        // Access the product page
        cy.get('a[href="/product_details/1"]').should('be.visible').click();

        // Check product information
        cy.get('p').contains('Category').parent().should('contain', 'Women > Tops');
        cy.get('span').contains('Rs. 500').should('be.visible');

        // Check if the product details are visible
        cy.get('label').contains('Quantity:').should('be.visible');
        cy.get('input[type="number"]').should('be.visible');
        cy.get('button').contains('Add to cart').should('be.visible');

        // Check additional product information
        cy.get('b').contains('Availability:').parent().should('contain', 'In Stock').should('be.visible');
        cy.get('b').contains('Condition:').parent().should('contain', 'New').should('be.visible');
        cy.get('p').contains('Brand:').parent().should('contain', 'Polo').should('be.visible');

        // Review form
        cy.get('a').contains('Write Your Review').should('be.visible');
        cy.get('input[type="text"]').as('nameInput').should('be.visible');
        cy.get('input[type="email"]').as('emailInput').should('be.visible');
        cy.get('textarea').as('reviewTextarea').should('be.visible');
    });

    it('Should test if the “Add to cart” buttons work correctly.', () => {
        cy.get('a[href="/product_details/1"]').should('be.visible').click();
        cy.get('button').contains('Add to cart').should('be.visible').click();
        cy.get('.modal-title.w-100').should('be.visible');
        cy.get('p').contains('Your product has been added to cart.').should('be.visible');
        cy.get('u').contains('View Cart').should('be.visible');
        cy.get('button').contains('Continue Shopping').should('be.visible').click();
        cy.contains('Cart').should('be.visible').click();
        cy.url().should('include', 'https://www.automationexercise.com/view_cart');

        cy.get('.active').contains('Shopping Cart').should('be.visible');
        cy.get('.image').contains('Item').should('be.visible');
        cy.get('.description').contains('Description').should('be.visible');
        cy.get('.price').contains('Price').should('be.visible');
        cy.get('.quantity').contains('Quantity').should('be.visible');
        cy.get('.total').contains('Total').should('be.visible');
        cy.get('.product_image').should(($img) => {
            expect($img[0].naturalWidth).to.be.greaterThan(0);
        });
        cy.get('a').contains('Blue Top').should('be.visible');
        cy.get('p').contains('Women').parent().should('contain', 'Tops').should('be.visible');
        cy.get('p').contains('Rs. 500').should('be.visible');
        cy.get('.disabled').should('be.visible');
        cy.get('.cart_total_price').contains('Rs. 500').should('be.visible');
    });
});

