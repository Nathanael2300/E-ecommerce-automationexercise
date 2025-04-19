import { faker } from '@faker-js/faker';

const userData = {
    card_name: faker.name.fullName(),
    card_number: faker.finance.creditCardNumber('####-####-####-####'),
    cvc: faker.finance.creditCardCVV(),
    expiration_month: faker.date.future().getMonth() + 1,
    expiration_year: faker.date.future().getFullYear()
};

describe('Login before checkout', () => {
    beforeEach(() => { cy.visit('/') });

    it('Should perform login before checkout', () => {
        cy.url().should('include', 'https://www.automationexercise.com');
        cy.get('a[href="/login"]').contains('Signup / Login').click();
        cy.get('h2').contains('Login to your account').should('be.visible');
        cy.get('[data-qa="login-email"]').type(Cypress.env('USER_EMAIL'));
        cy.get('[data-qa="login-password"]').type(Cypress.env('USER_PASSWORD'));
        cy.get('button').contains('Login').should('be.visible').click();

        cy.get('a[href="/product_details/1"]').contains('View Product').should('be.visible').click();
        cy.get('h2').contains('Blue Top').should('be.visible');
        cy.get('p').contains('Category:').parent().should('contain', 'Women > Tops');
        cy.get('span').contains('Rs. 500').should('be.visible');
        cy.get('label').contains('Quantity:').should('be.visible');
        cy.get('input[type="number"]').should('be.visible');
        cy.get('b').contains('Availability:').parent().should('contain', 'In Stock');
        cy.get('b').contains('Condition:').parent().should('contain', 'New');
        cy.get('b').contains('Brand:').parent().should('contain', 'Polo');

        cy.get('button').contains('Add to cart').should('be.visible').click();
        cy.get('.modal-title').contains('Added!').should('be.visible');
        cy.get('a[href="/view_cart"]').contains('View Cart').should('be.visible').click();
        cy.url().should('include', 'https://www.automationexercise.com/view_cart');

        cy.verifyCart(); 

        cy.get('.btn.btn-default.check_out').contains('Proceed To Checkout').should('be.visible').click();

        cy.reviewOrder(); 

        const comment = "test123";
        cy.get('.form-control').should('be.visible').type(comment);
        cy.get('a[href="/payment"]').contains('Place Order').should('be.visible').click();

        cy.get('[data-qa="name-on-card"]').should('be.visible').type(userData.card_name);
        
        const cardNumber = userData.card_number.replace(/-/g, '');
        expect(cardNumber.length, 'Card number must have between 13 and 19 digits').to.be.within(13, 19);
        cy.get('[data-qa="card-number"]').should('be.visible').type(userData.card_number);
        
        const cardCVC = userData.cvc;
        expect([3, 4], 'CVC must be 3 or 4 digits long').to.include(cardCVC.length);
        cy.get('[data-qa="cvc"]').should('be.visible').type(userData.cvc);

        cy.get('[data-qa="expiry-month"]').should('be.visible').type(userData.expiration_month);
        cy.get('[data-qa="expiry-year"]').should('be.visible').type(userData.expiration_year);
        cy.get('button').contains('Pay and Confirm Order').should('be.visible').click();

        cy.get('body').then(($body) => {
            const success = $body.find('#success_message');

            if (success.length > 0) {
                cy.log('🎉 Message appeared in the DOM!');
                expect(success.text()).to.include('Your order has been placed successfully!');
            } else {
                throw new Error('Invalid card number! Must be between 13 and 19 digits.');
            };
        });

        cy.get('b').contains('Order Placed!').should('be.visible');
        cy.get('p').contains('Congratulations! Your order has been confirmed!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
        cy.url().should('include', 'https://www.automationexercise.com');
    });
});
