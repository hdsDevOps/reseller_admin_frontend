describe('Email Log', () => {
  const baseUrl = "http://localhost:4000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3MzUwMzQ0NzksImV4cCI6MTczNTAzODA3OX0.-0LmLIYKWMGDWs3Ni9IT8RVF94Z8JbFHwUVPHHwJ-D4";
  it('Email Log flow', () => {
    // step 1: visit Email Log page
    cy.visit(`${baseUrl}/email-log`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: view details of Email Log row
    cy.get('button[cypress-name="view-details-1"').click();
    cy.wait(3000);
    cy.get('button[cypress-name="modal-close-btn"]').click();
  })
})