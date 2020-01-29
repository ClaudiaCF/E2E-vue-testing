// https://docs.cypress.io/api/introduction/api.html

describe('Home tests', () => {
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
    .find('tbody tr').first()
    .find('td').last()
    .find('button').as('deleteBtn')

    cy.get('@deleteBtn').click()
    cy.get('td').should('not.contain', 'Nico') 
  })

  it('Clone an object', () => {
    cy.visit('/')
    cy.get('table')
    .find('tbody tr').first()
    .find('td').last().prev()
    .find('button').as('cloneBtn')

    cy.get('@cloneBtn').click()
    cy.get('td').should('contain', 'Articulo 1 copy (2)') 
    cy.get('@cloneBtn').click()
    cy.get('td').should('contain', 'Articulo 1 copy (3)') 

  })

  it('Clone an object and remove it', () => {
    cy.visit('/')
    cy.get('table')
    .find('tbody tr').first()
    .find('td').last().prev()
    .find('button').as('cloneBtn')

    cy.get('@cloneBtn').click()
    cy.get('td').should('contain', 'Articulo 1 copy (2)') 

    cy.get('table')
    .find('tbody tr').last()
    .find('td').last()
    .find('button').as('deleteBtn')

    cy.get('@deleteBtn').click()
    cy.get('td').should('not.contain', 'Articulo 1 copy (2)') 

  })

  it('Go to the second route and come back', () => {
    cy.visit('/')
    cy.contains('Second Route').click() 
    cy.url().should('include', '/secondRoute')
    cy.go('back')
    cy.url().should('not.include', '/secondRoute')
  })

})
