import PaymentMethod from '../../src/pages/Payment';
import React from 'react';

describe('Test the complete functionality', () => {
  it('check everything is working', () => {
    cy.mount(<PaymentMethod/>)
  })
})