describe('Dragtest', () => {

  before(function() {
    cy.visit('/')
  });
  
  it('should dragndrop', () => {
    cy.get('.sourceitem').drag('.targetitem').then((success) => {
      assert.isTrue(success)
    })
  })
})