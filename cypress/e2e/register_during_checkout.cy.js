import { faker } from '@faker-js/faker';

const userData = {
  cardName: faker.name.fullName(),
  cardNumber: faker.finance.creditCardNumber('####-####-####-####'),
  cvc: faker.finance.creditCardCVV(),
  expiryMonth: faker.date.future().getMonth() + 1,
  expiryYear: faker.date.future().getFullYear()
};

const visitHomePage = () => {
  cy.visit('/');
}

describe('Register during checkout', () => {
  beforeEach(() => {
    visitHomePage();
    cy.url().should('include', 'https://www.automationexercise.com');
  });

  it('Should register during checkout', () => {
    // Access product and add to cart
    cy.url().should('include', 'https://www.automationexercise.com');
    cy.get('a[href="/product_details/1"]').should('be.visible').click();
    cy.get('button').contains('Add to cart').should('be.visible').click();
    cy.get('.modal-title.w-100').should('be.visible');
    cy.get('p').contains('Your product has been added to cart.').should('be.visible');
    cy.get('u').contains('View Cart').should('be.visible');
    cy.get('button').contains('Continue Shopping').should('be.visible').click();
    cy.contains('Cart').should('be.visible').click();
    cy.url().should('include', 'https://www.automationexercise.com/view_cart');

    // Verify cart elements
    cy.verifyCart();

    // Proceed to checkout and register account
    cy.contains('Proceed To Checkout').should('be.visible').click();
    cy.get('h4').contains('Checkout').should('be.visible');
    cy.get('p').contains('Register / Login account to proceed on checkout.').should('be.visible');
    cy.get('u').contains('Register / Login').should('be.visible').click();

    // Login/register
    cy.loginIfNeeded();

    // Go back to cart
    cy.contains('Cart').should('be.visible').click();
    cy.verifyCart();

    // Begin final checkout
    cy.contains('Proceed To Checkout').should('be.visible').click();

    // Review order
    cy.reviewOrder();

    // Order comment
    let comment = 'test123';
    cy.get('.form-control').type(comment).should('be.visible');

    // Fill in payment details
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
    cy.get('[data-qa="expiry-month"]').should('be.visible').type(userData.expiryMonth);
    cy.get('[data-qa="expiry-year"]').should('be.visible').type(userData.expiryYear);
    cy.get('button').contains('Pay and Confirm Order').should('be.visible').click();

    // Verify success message
    cy.get('body').then(($body) => {
      const success = $body.find('#success_message');
      if(success.length > 0) {
        expect(success.text()).to.include('Your order has been placed successfully!')
      } else {
        cy.log('Invalid card number! Must be between 13 and 19 digits.');
      };
    });

    cy.get('b').contains('Order Placed!').should('be.visible');
    cy.get('p').contains('Congratulations! Your order has been confirmed!').should('be.visible');
    cy.url().should('include', 'https://www.automationexercise.com');
  });
});