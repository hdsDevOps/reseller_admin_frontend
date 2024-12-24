describe('customer management information page test', () => {
  const baseUrl = "http://localhost:4000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3MzUwMzQ0NzksImV4cCI6MTczNTAzODA3OX0.-0LmLIYKWMGDWs3Ni9IT8RVF94Z8JbFHwUVPHHwJ-D4";
  it('customer management test flow to go to information page', () => {
    // step 1: visit customer management page
    cy.visit(`${baseUrl}/customers`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });
    cy.wait(2000);

    // step 2: go to customer informaion page
    cy.get('tbody tr').first().find('a[button-name="go-to-customer-information"]').click();

    // cy.get('a[button-name="customer-information-reset-password"]').click();

    // step 4: add new user

    // cy.get().click();
  })
})