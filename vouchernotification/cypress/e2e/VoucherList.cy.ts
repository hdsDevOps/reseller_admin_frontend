describe('voucher list get', () => {
  const baseUrl = "http://localhost:3000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkQ4UGhESWxaNU1oZ1VjalI3MGFZRWQ0QXNBazIiLCJpYXQiOjE3MzM4OTkwMTAsImV4cCI6MTczMzkwMjYxMH0.qKynRTrxM_ckEB9kIX2GJeA0XI4YeUv0Fi5BLBxXTH0";
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
      cy.get('button[button-name="vouhcer-list-clear-filter"').click();
  })
})