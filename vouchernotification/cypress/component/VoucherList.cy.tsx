import VoucherList from '../../src/pages/VoucherList';
import React from 'react';

describe('VoucherList.cy.tsx', () => {
  it('check everything is working', () => {
    cy.mount(<VoucherList/>)
  })
})