describe('Dragtest', () => {

  before(function() {
    cy.visit('http://localhost:3000/')
  });
  
  it('should dragndrop', () => {
    cy.get('.sourceitem').drag('.targetitem').then((success) => {
      assert.isTrue(success)
    })
  })
})