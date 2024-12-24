describe('notification template add new template', () => {
  const baseUrl = "http://localhost:4000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3MzUwMzQ0NzksImV4cCI6MTczNTAzODA3OX0.-0LmLIYKWMGDWs3Ni9IT8RVF94Z8JbFHwUVPHHwJ-D4";
  it('voucher list add flow', () => {
    // step 1: visit voucher list page
    cy.visit(`${baseUrl}/notification-template`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: go to add new template
    cy.get('button[button-name="add-new-template"]').click();
    cy.wait(1000);
    cy.get('input[name="subject"]').type("Cypress");
    cy.get('button[button-name="add-voucher-submit-btn"]').click();
  })
})