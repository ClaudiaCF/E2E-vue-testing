// https://docs.cypress.io/api/introduction/api.html

describe('SecondRoute tests', () => {
  it('Look for the select placeholder and watch the inputs autofill', () => {
    cy.visit('/#/secondRoute')
    cy.get('select').should('have.value', 'Choose one!') 
    cy.get('.inheritInputOne').should('have.value', '') 
    cy.get('.inheritInputTwo').should('have.value', '') 
    cy.get('select').select('Option 1').should('have.value', 'Option 1') 
    cy.get('.inheritInputOne').should('have.value', 'Option 1') 
    cy.get('.inheritInputTwo').should('have.value', 'Option 1') 
    cy.get('select').select('Option 3').should('have.value', 'Option 3') 
    cy.get('.inheritInputOne').should('have.value', 'Option 3') 
    cy.get('.inheritInputTwo').should('have.value', 'Option 3') 
  })

  it('Launch and close modal', () => {
    cy.get('.btn-launchModal').click() 
    cy.contains('Click!')
    cy.get('.circle-launchModal').click() 
    cy.url().should('not.include', 'Click!')
  })

  it('Click on radiobuttons', () => {
    cy.visit('/#/secondRoute')
    cy.get('[type="radio"]').check('Carolina')
    cy.get('[id="carolina"]').should('be.checked') 
    cy.get('[id="barney"]').should('not.be.checked') 
    cy.get('[id="moe"]').should('not.be.checked') 
    cy.get('[type="radio"]').check('Moe')
    cy.get('[id="carolina"]').should('not.be.checked') 
    cy.get('[id="barney"]').should('not.be.checked') 
    cy.get('[id="moe"]').should('be.checked') 
  })

  it('Click on checkboxes', () => {
    cy.visit('/#/secondRoute')
    cy.get('[type="checkbox"]').check(['Nico', 'Taco'])
    cy.get('[id="nico"]').should('be.checked') 
    cy.get('[id="taco"]').should('be.checked') 
    cy.get('[id="claudia"]').should('not.be.checked') 
    cy.get('[type="checkbox"]').check('Claudia')
    cy.get('[id="claudia"]').should('be.checked') 

  })

  it('Check input validation', () => {
    cy.visit('/#/secondRoute')
    cy.get('input[name=input-validation]').type('12')
    cy.contains('Not validated')
    cy.get('input[name=input-validation]').clear()
    cy.get('input[name=input-validation]').type('12345')
    cy.contains('Not validated')
    cy.get('input[name=input-validation]').clear()
    cy.get('input[name=input-validation]').type('123456789')
    cy.contains('Not validated')
    cy.get('input[name=input-validation]').clear()
    cy.get('input[name=input-validation]').type('12345678D')
    cy.contains('Validation ok')

  })

  it('Go to the first route and come back', () => {
    cy.visit('/#/secondRoute')
    cy.contains('Home').click() 
    cy.url().should('not.include', '/#/secondRoute')
    cy.go('back')
    cy.url().should('include', '/#/secondRoute')
  })

})
