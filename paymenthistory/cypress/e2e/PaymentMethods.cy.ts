describe('payment methods', () => {
  const baseUrl = "http://localhost:3000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkQ4UGhESWxaNU1oZ1VjalI3MGFZRWQ0QXNBazIiLCJpYXQiOjE3MzM5MTAxMjEsImV4cCI6MTczMzkxMzcyMX0.2F319NtBa2Ao6Lce4Xtpgz-7qCBkXo1zyx19he4L6a0";
  it('payment methods flow', () => {
    // step 1: visit payment methods page
    cy.visit(`${baseUrl}/payment-method`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: update payment methods
    cy.get('select[cypress-name="payment-status-0"]').select("Active");
  })
})