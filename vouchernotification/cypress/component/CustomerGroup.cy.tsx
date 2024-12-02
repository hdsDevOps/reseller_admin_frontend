import CustomerGroup from '../../src/pages/CustomerGroup';
import React from 'react';

describe('CustomerGroup.cy.tsx', () => {
  it('check everything is working', () => {
    cy.mount(<CustomerGroup/>)
  })
})