import React from 'react';
import AddCustomer from '../../src/pages/AddCustomer';

describe('AddCustomer.cy.tsx', () => {
  it('check everything is working', () => {
    cy.mount(<AddCustomer/>)
  })
})