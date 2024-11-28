import React from 'react';
import CustomerInformation from '../../src/pages/CustomerInformation';

describe('CustomerInformation.cy.tsx', () => {
  it('check everything is working', () => {
    cy.mount(<CustomerInformation/>)
  })
})