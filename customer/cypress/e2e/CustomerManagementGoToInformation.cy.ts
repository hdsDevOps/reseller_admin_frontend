describe('customer management information page test', () => {
  const baseUrl = "http://localhost:3000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkQ4UGhESWxaNU1oZ1VjalI3MGFZRWQ0QXNBazIiLCJpYXQiOjE3MzM4OTkwMTAsImV4cCI6MTczMzkwMjYxMH0.qKynRTrxM_ckEB9kIX2GJeA0XI4YeUv0Fi5BLBxXTH0";
  it('customer management test flow to go to information page', () => {
    // step 1: visit customer management page
    cy.visit(`${baseUrl}/customers`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: go to customer informaion page
    cy.get('tbody tr').first().find('a[button-name="go-to-customer-information"]').click();

    cy.get('a[button-name="customer-information-reset-password"]').click();

    // step 4: add new user

    // cy.get().click();
  })
})