describe('Email Log', () => {
  const baseUrl = "http://localhost:3000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkQ4UGhESWxaNU1oZ1VjalI3MGFZRWQ0QXNBazIiLCJpYXQiOjE3MzM5MTQxNTQsImV4cCI6MTczMzkxNzc1NH0.O3I4xFzsc_rmeWVisK_rUQyyOWyOgLnnIP_fv2mM-Lc";
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