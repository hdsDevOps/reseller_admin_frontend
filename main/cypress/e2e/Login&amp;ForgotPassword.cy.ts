describe('auth microservice test', () => {
  const baseUrl = "http://localhost:4000";
  
  it('Should complete the login flow with OTP verification', () => {
    // Step 1: Visit the login page
    cy.visit(`${baseUrl}/login`);

    cy.wait(5000); // wait for 5 seconds

    // Step 2: Go to Forgot Password to change your password
    cy.get('a[data-testid="forgot-password"]').should('be.visible').click(); // click on forgot password button to go to that page

    cy.wait(2000); // wait for 2 seconds
    cy.url().should('include', 'forgotpassword'); // the url should include the text "forgotpassword"

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="email"]').should('be.visible').clear().type('mtreza59@gmail.com');

    cy.get('button[type="submit"]').should('be.visible').click();

    // Step 3: go to otp page
    cy.wait(2000); // wait for 2 seconds
    cy.url().should('include', 'otp'); // the url should include the text "otp"

    cy.wait(1000 * 60); // wait for 2 seconds

    cy.get('button[type="submit"]').should('be.visible').click();

    // Step 4: go to reset password page
    cy.wait(2000); // wait for 2 seconds
    cy.url().should('include', 'resetpassword'); // the url should include the text "resetpassword"

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="newPassword"]').should('be.visible').clear().type('0987654321');
    cy.get('input[name="confirmPassword"]').should('be.visible').clear().type('0987654321');

    cy.get('button[type="submit"]').should('be.visible').click();

    // Step 5: successfull password reset message page
    cy.wait(2000); // wait for 2 seconds
    cy.url().should('include', 'password-reset-successful'); // the url should include the text "password-reset-successful"

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[data-testid="log-in"]').should('be.visible').click();

    // Step 5: log in page
    cy.wait(2000); // wait for 2 seconds
    cy.url().should('include', 'login'); // the url should include the text "login"

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="email"]').clear().type('mtreza59@gmail.com');
    cy.get('input[name="password"]').clear().type('0987654321');
    cy.get('button[type="submit"]').click();

    // Step 6: Redirect to OTP verification page
    cy.wait(2000);
    cy.url().should('include', '?mode=signin');
    cy.wait(2000);
    cy.contains('OTP verification').should('be.visible');

    // Step 7: Enter OTP manually
    cy.wait(1000 * 60);
    cy.get('button[type="submit"]').click();

    // Step 8: Redirect to success page
    cy.wait(2000);
    cy.url().should('include', '/dashboard');
  })
})