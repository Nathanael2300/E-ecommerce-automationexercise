describe('View products by category', () => {
    const visitHomePage = () => cy.visit('/');

    beforeEach(() => {
        visitHomePage();
        cy.url().should('include', 'https://www.automationexercise.com');
    });

    const verifyURL = (id) => {
        cy.url().should('include', `https://www.automationexercise.com/category_products/${id}`);
    };

    const categoriesList = {
        Women: ['Dress', 'Tops', 'Saree'],
        Men: ['Tshirts', 'Jeans'],
        Kids: ['Dress', 'Tops & Shirts'],
    }

    const verifyWomenCategory = () => {
        const dressProducts = [
            'Sleeveless Dress',
            'Stylish Dress',
            'Rose Pink Embroidered Maxi Dress'
        ];

        const topsProducts = [
            'Blue Top',
            'Winter Top',
            'Summer White Top',
            'Madame Top For Women',
            'Fancy Green Top',
            'Lace Top For Women'
        ];

        const sareeProducts = [
            'Cotton Silk Hand Block Print Saree',
            'Rust Red Linen Saree',
            'Beautiful Peacock Blue Cotton Linen Saree'
        ];

        const accessCategory = (category, subcategory) => {
            cy.get('.panel-title').contains(category).should('be.visible').click();
            cy.get('a').contains(subcategory).should('be.visible').click();
        };

        accessCategory('Women', categoriesList.Women[0]);
        verifyURL(1);
        cy.get('h2').contains('Women - Dress Products').should('be.visible');
        dressProducts.forEach(product => {
            cy.contains(product).should('be.visible');
        });

        accessCategory('Women', categoriesList.Women[1]);
        verifyURL(2);
        cy.get('h2').contains('Women - Tops Products').should('be.visible');
        topsProducts.forEach(product => {
            cy.get('p').contains(product).should('be.visible');
        });

        accessCategory('Women', categoriesList.Women[2]);
        verifyURL(7);
        cy.get('h2').contains('Women - Saree Products').should('be.visible');
        sareeProducts.forEach(product => {
            cy.get('p').contains(product).should('be.visible');
        });
    };

    const verifyMenCategory = () => {
        const tshirtProducts = [
            'Men Tshirt',
            'Pure Cotton V-Neck T-Shirt',
            'Green Side Placket Detail T-Shirt',
            'Premium Polo T-Shirts',
            'Pure Cotton Neon Green Tshirt',
            'GRAPHIC DESIGN MEN T SHIRT - BLUE'
        ];

        const jeansProducts = [
            'Soft Stretch Jeans',
            'Regular Fit Straight Jeans',
            'Grunt Blue Slim Fit Jeans'
        ];

        const accessCategory = (category, subcategory) => {
            cy.get('.panel-title').contains(category).should('be.visible').click();
            cy.get('a').contains(subcategory).should('be.visible').click();
        };

        accessCategory('Men', categoriesList.Men[0]);
        verifyURL(3);
        tshirtProducts.forEach(product => {
            cy.get('p').contains(product).should('be.visible');
        });
        accessCategory('Men', categoriesList.Men[1]);
        jeansProducts.forEach(product => {
            cy.get('p').contains(product).should('be.visible');
        });
    };

    const verifyKidsCategory = () => {
        const dressProducts = [
            'Sleeves Top and Short - Blue & Pink',
            'Sleeveless Unicorn Patch Gown - Pink',
            'Cotton Mull Embroidered Dress',
            'Blue Cotton Indie Mickey Dress',
            'Long Maxi Tulle Fancy Dress Up Outfits -Pink',
            'Sleeveless Unicorn Print Fit & Flare Net Dress - Multi'
        ];

        const topsAndShirtsProducts = [
            'Sleeves Printed Top - White',
            'Half Sleeves Top Schiffli Detailing - Pink',
            'Frozen Tops For Kids',
            'Full Sleeves Top Cherry - Pink',
            'Printed Off Shoulder Top - White',
            'Little Girls Mr. Panda Shirt',
            'Colour Blocked Shirt – Sky Blue'
        ];

        const accessCategory = (category, subcategory) => {
            cy.get('.panel-title').contains(category).click();
            cy.get('.panel-collapse.in').should('be.visible').within(() => {
                cy.contains(subcategory).should('be.visible').click();
            });
        };

        accessCategory('Kids', categoriesList.Kids[0]);
        verifyURL(4);
        dressProducts.forEach(product => {
            cy.get('p').contains(product).should('be.visible');
        });

        accessCategory('Kids', categoriesList.Kids[1]);
        verifyURL(5);
        topsAndShirtsProducts.forEach(product => {
            cy.get('p').contains(product).should('be.visible');
        });
    }

    it('Should view products from the category', () => {
        verifyWomenCategory();
        verifyMenCategory();
        verifyKidsCategory();
    });
});


