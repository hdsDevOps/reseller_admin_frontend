describe('plan & price setup list page', () => {
  const baseUrl = "http://localhost:4000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3MzUwMzQ0NzksImV4cCI6MTczNTAzODA3OX0.-0LmLIYKWMGDWs3Ni9IT8RVF94Z8JbFHwUVPHHwJ-D4";
  it('plan & price setup list page flow', () => {
    // step 1: visit plan & price setup page
    cy.visit(`${baseUrl}/plan-and-price-setup`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: change plan & price view mode
    cy.wait(5000);
    cy.get('button[button-name="change-plan-and-price-view-mode-table"]').click();
    cy.wait(5000);
    cy.get('button[button-name="change-plan-and-price-view-mode-grid"]').click();
  })
})