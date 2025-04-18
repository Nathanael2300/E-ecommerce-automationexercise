import { faker } from '@faker-js/faker';

Cypress.Commands.add('registerUser', () => {
    const userData = {
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        birthDate: {
            day: faker.number.int({ min: 1, max: 31 }),
            month: faker.number.int({ min: 1, max: 12 }),
            year: faker.number.int({ min: 1955, max: 2025 }),
        },
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        company: faker.company.name(),
        address: faker.location.streetAddress(),
        state: faker.address.state(),
        city: faker.location.city(),
        zipCode: faker.location.zipCode(),
        phoneNumber: faker.phone.number('(##) #####-####'),
    };

    cy.get('[data-qa="signup-name"]').type(userData.username);
    cy.get('[data-qa="signup-email"]').type(userData.email);
    cy.get('button.btn.btn-default').contains('Signup').click();

    cy.get('input[type="radio"][value="Mr"]').check();
    cy.get('[data-qa="name"]').type(userData.username);
    cy.get('[data-qa="email"]').type(userData.email, { force: true });
    cy.get('[data-qa="password"]').type(userData.password);
    cy.get('[data-qa="days"]').select(userData.birthDate.day.toString());
    cy.get('[data-qa="months"]').select(userData.birthDate.month.toString());
    cy.get('[data-qa="years"]').select(userData.birthDate.year.toString());

    cy.get('[data-qa="first_name"]').type(userData.firstName);
    cy.get('[data-qa="last_name"]').type(userData.lastName);
    cy.get('[data-qa="company"]').type(userData.company);
    cy.get('[data-qa="address"]').type(userData.address);
    cy.get('[data-qa="state"]').type(userData.state);
    cy.get('[data-qa="city"]').type(userData.city);
    cy.get('[data-qa="zipcode"]').type(userData.zipCode);
    cy.get('[data-qa="mobile_number"]').type(userData.phoneNumber);
});

Cypress.Commands.add('verifyCart', () => {
    cy.url().should('include', 'view_cart');
    cy.get('.active').contains('Shopping Cart').should('be.visible');
    cy.get('.image').contains('Item').should('be.visible');
    cy.get('.description').contains('Description').should('be.visible');
    cy.get('.price').contains('Price').should('be.visible');
    cy.get('.quantity').contains('Quantity').should('be.visible');
    cy.get('.total').contains('Total').should('be.visible');
    cy.get('.product_image').should(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
    });
});

Cypress.Commands.add('loginIfNeeded', () => {
    cy.get('body').then(($body) => {
        if ($body.find('a:contains("Logged in as")').length === 0) {
            cy.get('h2').contains('Login to your account');
            cy.get('[data-qa="login-email"]').type(Cypress.env('USER_EMAIL'));
            cy.get('[data-qa="login-password"]').type(Cypress.env('USER_PASSWORD'));
            cy.get('[data-qa="login-button"]').click();
            cy.get('a').contains('Logged in as').should('be.visible');
        } else {
            cy.log('User already logged in. Skipping login.');
        }
    });
});

Cypress.Commands.add('reviewOrder', () => {
    cy.get('.active').contains('Checkout').should('be.visible');
    cy.get('h2').contains('Address Details').should('be.visible');
    cy.get('#address_delivery').should('be.visible');
    cy.get('#address_invoice').should('be.visible');
    cy.get('h2').contains('Review Your Order').should('be.visible');
    cy.get('.image').contains('Item').should('be.visible');
    cy.get('.description').contains('Description').should('be.visible');
    cy.get('.price').contains('Price').should('be.visible');
    cy.get('.quantity').contains('Quantity').should('be.visible');
    cy.get('.total').contains('Total').should('be.visible');
    cy.get('div#cart_info').should('be.visible')
});
