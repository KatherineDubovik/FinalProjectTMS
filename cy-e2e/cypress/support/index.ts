import '@shelex/cypress-allure-plugin';

// Alternatively you can use CommonJS syntax:
// require('./commands')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})