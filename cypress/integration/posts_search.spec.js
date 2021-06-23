/// <reference types="cypress" />

describe('PostSerach', () => {
  //global variables
  const searchParam = 'Hej';

  beforeEach(() => {
    cy.visit('/posts');
  });

  it('can search', () => {
    cy.get('#cy_test').type(searchParam);
    cy.contains('22/06/2021');
  });
});
