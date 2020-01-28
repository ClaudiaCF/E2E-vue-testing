// https://docs.cypress.io/api/introduction/api.html

describe('Home test', () => {
  it('Types in the filter and sees result', () => {
    cy.visit('/')
    cy.contains('Filter by username')
    cy.get('input[name=input-filter]').type('Clau{enter}')
    cy.get('td').should('contain', 'Claudia') 
    cy.get('td').should('not.contain', 'Jose') 
  })

  it('Reset filter', () => {
    cy.visit('/')
    cy.contains('Filter by username')
    cy.get('input[name=input-filter]').type('Clau{enter}')
    cy.get('td').should('contain', 'Claudia') 
    cy.get('td').should('not.contain', 'Jose') 
    cy.get('.resetFilter').click()
    cy.get('td').should('contain', 'Jose') 
  })

  it('Remove an item', () => {
    cy.visit('/')
    cy.get('table')
    .find('tr')
    .find('td').last()
    .find('button').as('deleteBtn')

    cy.get('@deleteBtn').click()
    cy.get('td').should('not.contain', 'Jose') 
  })
})
