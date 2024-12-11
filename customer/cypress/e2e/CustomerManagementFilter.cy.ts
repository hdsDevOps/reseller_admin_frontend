describe('customer management test', () => {
  const baseUrl = "http://localhost:3000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkQ4UGhESWxaNU1oZ1VjalI3MGFZRWQ0QXNBazIiLCJpYXQiOjE3MzM4OTkwMTAsImV4cCI6MTczMzkwMjYxMH0.qKynRTrxM_ckEB9kIX2GJeA0XI4YeUv0Fi5BLBxXTH0";
  it('customer management test flow with add, edit, delete, view, filter', () => {
    // step 1: visit customer management page
    cy.visit(`${baseUrl}/customers`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    //step 2: filter few data
    cy.get('input[name="search_data"]').type('hesham');
    cy.get('button[button-name="customers-filter-btn"]').click();
    // cy.get('button[button-name="customers-filter-close"]').click();
    cy.get('select[name="country"]').select("India");
    cy.get('select[name="state_name"]').select("West Bengal");
    // cy.get('button[button-name="customers-filter-reset"]').click();
    cy.get('select[name="authentication"]').select("ON");
    cy.get('input[name="license_usage"]').type("0");
    cy.get('button[button-name="customers-filter-search-btn"]').click();

    // cy.get().click();
  })
})