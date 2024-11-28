import React from 'react';
import CustomerGroup from '../../src/pages/CustomerGroup';

describe('CustomerGroup.cy.tsx', () => {
  it('check everything is working', () => {
    cy.mount(<CustomerGroup/>)
  })
})