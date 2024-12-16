describe('Forgot Password Flow', () => {
  const baseUrl = 'http://localhost:3000'; // Update with your app's URL

  it('Should complete the forgot password flow', () => {
    // Step 1: Visit the forgot password page
    cy.visit(`${baseUrl}/forgotpassword`);

    // Step 2: Enter email/username
    cy.get('input[name="email"]').type('sumon99@gmail.com');
    cy.get('button[type="submit"]').click();

    cy.intercept('**', (req) => {
      console.log('Intercepted request:', req.url);
    }).as('getOtp');

    cy.wait('@getOtp').then((interception) => {
      const otp = interception.response.body.otp;
      console.log("otp", otp)
      const otpString = otp.toString();

      // Step 4: Enter OTP
      cy.contains('OTP verification').should('be.visible');
      otpString.split('').forEach((digit, index) => {
        cy.get(`input[data-otp-index="${index}"`).type(digit);
      });
      cy.get('button[type="submit"]').click();

      // Step 5: Redirect to reset password page
      cy.url().should('include', '/resetpassword');
      cy.contains('Password').should('be.visible');

      // Step 6: Enter new password
      cy.get('input[name="newPassword"]').type('1234567890');
      cy.get('input[name="confirmPassword"]').type('1234567890');
      cy.get('button[type="submit"]').click();

      // Step 7: Redirect to success page
      cy.url().should('include', '/password-reset-successful');
      cy.contains('Successful password reset!').should('be.visible');

      // Step 8: Redirect back to login page
      cy.get('button[data-testid="log-in"]').click();
      cy.url().should('include', '/login');
    })
  });
});
