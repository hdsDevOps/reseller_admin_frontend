describe('customer management add new test', () => {
  const baseUrl = "http://localhost:4000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3MzUwMjgzMzUsImV4cCI6MTczNTAzMTkzNX0.QIa_tF-q6o-JlPvs0bNl2GrgK8GnnyhbJmpfxGIIpsc";
  it('customer management test flow to add new customer', () => {
    // step 1: visit customer management page
    cy.visit(`${baseUrl}/customers`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: add new user
    cy.wait(1000);
    cy.get('button[button-name="customers-add-new"]').click();
    cy.get('input[name="first_name"]').type('Hesham');
    cy.get('input[name="last_name"]').type('Reza');
    cy.get('input[name="address"]').type('Old UBI Road');
    cy.get('input[name="country"]').type('India');
    cy.get('p[dropdown-name="country-dropdown"]', { timeout: 10000 }).should('be.visible');
    cy.get('p[dropdown-name="country-dropdown"]')
      .contains('India')
      .click();
    cy.get('input[name="state_name"]').type('West Bengal');
    cy.get('p[dropdown-name="country-dropdown"]')
      .contains('West Bengal')
      .click();
    cy.get('input[name="city"]').type('Kolkata');
    cy.get('p[dropdown-name="city-dropdown"]')
      .contains('Kolkata')
      .click();
    cy.get('input[name="zipcode"]').type('123457');
    cy.get('input[name="phone_no"]').type('1234567890');
    cy.get('input[name="email"]').type('abc@gmail.com');
    // cy.get('input[name=""]').type('');
    // cy.get('input[name=""]').type('');
    // cy.get('input[name=""]').type('');
    // cy.get('input[name=""]').type('');

    // cy.get().click();
    cy.wait(2000);
    cy.get('button[type="submit"]').click();
  })
})