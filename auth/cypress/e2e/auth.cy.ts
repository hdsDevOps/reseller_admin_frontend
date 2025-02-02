describe('auth microservice test', () => {
  const baseUrl = "http://localhost:4000";
  
  it('Should complete the login flow with OTP verification', () => {
    // Step 1: Visit the login page
    cy.visit(`${baseUrl}/login`);

    // Step 2: Enter valid username and password
    cy.get('input[name="email"]').type('mtreza59@gmail.com');
    cy.get('input[name="password"]').type('0987654321');
    cy.get('button[type="submit"]').click();

    // cy.on('window:before:load', (win) => {
    //   cy.stub(win.console, 'log').callsFake((...args) => {
    //     // Logs all intercepted requests for debugging
    //     if (args[0].includes('https://api.admin.gworkspace.withhordanso.com/adminservices/admin/api/v1/login')) {
    //       console.log('Intercepted OTP API Request:', args);
    //     }
    //   });
    // });

    cy.intercept('**', (req) => {
      console.log('Intercepted request:', req.url);
    }).as('getOtp');

    // Step 3: Redirect to OTP verification page
    cy.wait('@getOtp').then((interception) => {
      const otp = interception?.response?.body?.otp;
      console.log("otp", otp)
      const otpString = otp?.toString();

      cy.url().should('include', '?mode=signin');
      cy.contains('OTP verification').should('be.visible');

      // Step 4: Enter OTP
      otpString?.split('').forEach((digit, index) => {
        cy.get(`input[data-otp-index="${index+1}"`).type(digit);
      });
      cy.wait(2000);
      cy.get('button[type="submit"]').click();

      // Step 5: Redirect to success page
      cy.url().should('include', '/dashboard');
    })
  })
})