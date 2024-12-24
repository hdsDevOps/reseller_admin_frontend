describe('voucher list get', () => {
  const baseUrl = "http://localhost:4000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3MzUwMzQ0NzksImV4cCI6MTczNTAzODA3OX0.-0LmLIYKWMGDWs3Ni9IT8RVF94Z8JbFHwUVPHHwJ-D4";
  it('voucher list get filter flow', () => {
    // step 1: visit voucher list page
    cy.visit(`${baseUrl}/voucher-list`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: filter voucher list
    cy.get('input[name="voucher_code"]').type("Test");
    cy.get('input[name="start_date"]').type("2024-12-30");
    cy.get('input[name="end_date"]', {setTimeout: 2000}).type("2025-12-31");
      // cy.get('button[button-name="vouhcer-list-clear-filter"').click();
  })
})