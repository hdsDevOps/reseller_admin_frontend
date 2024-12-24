describe('plan & price setup delete page', () => {
  const baseUrl = "http://localhost:4000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3MzUwMzQ0NzksImV4cCI6MTczNTAzODA3OX0.-0LmLIYKWMGDWs3Ni9IT8RVF94Z8JbFHwUVPHHwJ-D4";
  const fileName = 'image.jpg';
  const filePath = 'images/'+fileName;
  it('plan & price setup add flow', () => {
    // step 1: visit plan & price setup page
    cy.visit(`${baseUrl}/plan-and-price-setup`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: open the modal
    cy.wait(1000);
    cy.get('div[cypress-grid-name="grid1"]').find('button[cypress-name="plan-and-price-delete"]').click();

    // step 3: delete the plan
    cy.get('button[cypress-name="delete-plan-and-price"]').click();
  })
})