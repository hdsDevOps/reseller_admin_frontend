import React from 'react';
import EditCustomer from '../../src/pages/EditCustomer';

describe('EditCustomer.cy.tsx', () => {
  it('check everything is working', () => {
    cy.mount(<EditCustomer/>)
  })
})