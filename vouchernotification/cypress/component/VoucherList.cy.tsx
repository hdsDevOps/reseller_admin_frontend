import React from 'react';
import VoucherList from '../../src/pages/VoucherList';

describe('VoucherList.cy.tsx', () => {
  it('check everything is working', () => {
    cy.mount(<VoucherList/>)
  })
})