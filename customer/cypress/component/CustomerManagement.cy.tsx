import React from 'react';
import CustomerManagement from '../../src/pages/CustomerManagement';

describe('CustomerManagement.cy.tsx', () => {
  it('check everything is working', () => {
    cy.mount(<CustomerManagement/>)
  })
})