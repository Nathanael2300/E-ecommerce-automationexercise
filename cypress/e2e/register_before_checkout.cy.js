import { faker } from '@faker-js/faker';

const userData = {
    cardName: faker.name.fullName(),
    cardNumber: faker.finance.creditCardNumber('####-####-####-####'),
    cvc: faker.finance.creditCardCVV(),
    expiryMonth: faker.date.future().getMonth() + 1,
    expiryYear: faker.date.future().getFullYear()
};

describe('Register before checkout', () => {
    beforeEach(() => { cy.visit('/') });

    it('Should register before checkout', () => {
        cy.url().should('contain', 'https://www.automationexercise.com');
        cy.get('a[href="/login"]').contains('Signup / Login').should('be.visible').click();

        cy.registerUser();

        cy.get('button.btn.btn-default').contains('Create Account').click();
        cy.get('b').contains('Account Created!').should('be.visible');
        cy.get('p').contains('Congratulations! Your new account has been successfully created!').should('be.visible');
        cy.get('p').contains('You can now take advantage of member privileges to enhance your online shopping experience with us.')
            .should('be.visible');
        cy.get('[data-qa="continue-button"]').click();

        cy.get('a[href="/product_details/1"]').click();
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
        cy.get('.text-center').contains('Your product has been added to cart.').should('be.visible');
        cy.get('button').contains('Continue Shopping').should('be.visible');
        cy.get('u').contains('View Cart').should('be.visible').click();
        cy.url().should('include', 'https://www.automationexercise.com/view_cart');

        cy.verifyCart();

        cy.contains('Proceed To Checkout').should('be.visible').click();

        cy.reviewOrder();

        const comment = 'test123';
        cy.get('.form-control').type(comment).should('be.visible');

        cy.get('a[href="/payment"]').should('be.visible').click();
        cy.get('[data-qa="name-on-card"]').should('be.visible').type(userData.cardName);

        const cardNumber = userData.cardNumber.replace(/-/g, '');
        expect(cardNumber.length, 'Card number must have between 13 and 19 digits').to.be.within(13, 19);
        cy.get('[data-qa="card-number"]').should('be.visible').type(userData.cardNumber);

        const cardCvc = userData.cvc;
        expect([3, 4], 'CVC must have 3 or 4 digits').to.include(cardCvc.length);
        cy.get('[data-qa="cvc"]').should('be.visible').type(userData.cvc);

        cy.get('[data-qa="expiry-month"]').should('be.visible').type(userData.expiryMonth);
        cy.get('[data-qa="expiry-year"]').should('be.visible').type(userData.expiryYear);
        cy.get('button').contains('Pay and Confirm Order').should('be.visible').click();

        cy.get('body').then(($body) => {
            const success = $body.find('#success_message');
            if (success > 0) {
                cy.log('🎉 Message appeared in the DOM!');
                expect(success.text()).to.include('Your order has been placed successfully!');
            } else {
                cy.log('Invalid card number! Must be between 13 and 19 digits.');
            };
        });

        cy.get('b').contains('Order Placed!').should('be.visible');
        cy.get('p').contains('Congratulations! Your order has been confirmed!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
    });
});
