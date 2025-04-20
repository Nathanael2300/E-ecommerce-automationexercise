import { faker } from '@faker-js/faker';

const userData = {
    card_name: faker.name.fullName(),
    card_number: faker.finance.creditCardNumber('####-####-####-####'),
    cvc: faker.finance.creditCardCVV(),
    expiration_month: faker.date.future().getMonth() + 1,
    expiration_year: faker.date.future().getFullYear()
};

describe('Download invoice after placing order', () => {

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

    const comment = () => {
        const comentary = faker.lorem.paragraph();
        cy.get('.form-control').type(comentary);
    };
    
    const dateCard = () => {
        cy.get('[data-qa="name-on-card"]').should('be.visible').type(userData.card_name);

        const cardNumber = userData.card_number.replace(/-/g, '');
        expect(cardNumber.length, 'Card number must have between 13 and 19 digits').to.be.within(13, 19);
        cy.get('[data-qa="card-number"]').should('be.visible').type(userData.card_number);

        const cardCvc = userData.cvc;
        expect([3, 4], 'CVC must have 3 or 4 digits').to.include(cardCvc.length);
        cy.get('[data-qa="cvc"]').should('be.visible').type(userData.cvc);

        cy.get('[data-qa="expiry-month"]').should('be.visible').type(userData.expiration_month);
        cy.get('[data-qa="expiry-year"]').should('be.visible').type(userData.expiration_year);
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
    }

    it('Should download invoice after order is completed', () => {
        visitHomePage();
        login();
        accessProduct();
        addToCart();
        cy.verifyCart();
        validateAddressInCheckout();
        comment();
        cy.get('a[href="/payment"]').contains('Place Order').click();
        dateCard();
        cy.get('b').contains('Order Placed!').should('be.visible');
        cy.get('p').contains('Congratulations! Your order has been confirmed!').should('be.visible');
        cy.contains('a', 'Download Invoice').click()
        .should('have.attr', 'href').and('include', '/download_invoice/1500').then((href) => {
                cy.request({
                    url: href,
                    encoding: 'binary'
                }).then((response) => {
                    expect(response.status).to.eq(200); // sucesso no download
                });
            });
    });
});

