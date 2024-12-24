describe('customer management test', () => {
  const baseUrl = "http://localhost:4000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3MzUwMzQ0NzksImV4cCI6MTczNTAzODA3OX0.-0LmLIYKWMGDWs3Ni9IT8RVF94Z8JbFHwUVPHHwJ-D4";
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