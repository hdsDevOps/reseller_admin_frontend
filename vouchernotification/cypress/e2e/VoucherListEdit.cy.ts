describe('voucher list edit', () => {
  const baseUrl = "http://localhost:4000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3MzUwMzQ0NzksImV4cCI6MTczNTAzODA3OX0.-0LmLIYKWMGDWs3Ni9IT8RVF94Z8JbFHwUVPHHwJ-D4";
  it('voucher list edit flow', () => {
    // step 1: visit voucher list page
    cy.visit(`${baseUrl}/voucher-list`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: go to edit voucher
    cy.get('tbody tr').first().find('button[button-name="voucher-list-edit"]').click();
    cy.get('input[name="voucher_code"]').clear().type("New Voucher Code", { delay: 100 });
    cy.get('button[button-name="edit-voucher-list"]').click();
  })
})