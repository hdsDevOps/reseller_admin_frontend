describe('auth microservice test', () => {
  const baseUrl = "http://localhost:4000";
  
  it('Should complete the login flow with OTP verification', () => {
    // Step 1: Visit the login page
    cy.visit(`${baseUrl}/login`);

    // Step 2: Enter valid username and password
    cy.wait(2000);
    cy.get('input[name="email"]').clear().type('mtreza59@gmail.com');
    cy.get('input[name="password"]').clear().type('0987654321');
    cy.get('button[type="submit"]').click();

    // Step 3: Redirect to OTP verification page
    cy.wait(2000);
    cy.url().should('include', '?mode=signin');
    cy.contains('OTP verification').should('be.visible');

    // Step 4: Enter OTP
    cy.wait(1000 * 60);
    cy.get('button[type="submit"]').click();

    // Step 5: Redirect to success page
    cy.url().should('include', '/dashboard');
  })
})