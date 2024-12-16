describe('customer management add new test', () => {
  const baseUrl = "http://localhost:3000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkQ4UGhESWxaNU1oZ1VjalI3MGFZRWQ0QXNBazIiLCJpYXQiOjE3MzM4OTkwMTAsImV4cCI6MTczMzkwMjYxMH0.qKynRTrxM_ckEB9kIX2GJeA0XI4YeUv0Fi5BLBxXTH0";
  it('customer management test flow to add new customer', () => {
    // step 1: visit customer management page
    cy.visit(`${baseUrl}/customers`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: add new user
    cy.get('button[button-name="customers-add-new"]').click();
    cy.get('input[name="first_name"]').type('Hesham');
    cy.get('input[name="last_name"]').type('Reza');
    cy.get('input[name="address"]').type('Old UBI Road');
    cy.get('input[name="country"]').type('India');
    cy.get('p[dropdown-name="country-dropdown"]', { timeout: 10000 }).should('be.visible');
    cy.get('p[dropdown-name="country-dropdown"]')
      .contains('India')
      .click();
    // cy.get('input[name=""]').type('');
    // cy.get('input[name=""]').type('');
    // cy.get('input[name=""]').type('');
    // cy.get('input[name=""]').type('');

    // cy.get().click();
  })
})