import { faker } from '@faker-js/faker';

const userData = {
    username: faker.internet.username(),
    email: faker.internet.email(),
    comment: faker.lorem.sentence()
};

describe('Add product review', () => {
    const verifyHomePageUrl = () => {
        cy.url().should('include', 'https://www.automationexercise.com');
    };

    const visitHomePage = () => {
        cy.visit('/');
        verifyHomePageUrl();
    };

    const product = {
        name: 'Premium Polo T-Shirts',
        id: 30
    };

    const accessProduct = () => {
        cy.get(`a[href="/product_details/${product.id}"]`).should('be.visible').click();
        verifyProductPageUrl();
    };

    const verifyProductPageUrl = () => {
        cy.url().should('include', 'https://www.automationexercise.com/product_details/30');
    };

    const submitProductReview = () => {
        cy.get('input#name').type(userData.username);
        cy.get('input#email').type(userData.email);
        cy.get('textarea#review').type(userData.comment);
        cy.get('button#button-review').click();
        cy.contains('span', 'Thank you for your review.').should('be.visible');
    };

    it.only('Should add a product review', () => {
        visitHomePage();
        accessProduct();
        submitProductReview();
    });
});
