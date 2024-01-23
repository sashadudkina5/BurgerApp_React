describe('Dragtest', () => {
  it('should dragndrop', () => {
    cy.visit('http://localhost:3000/')

    cy.get('.sourceitem').drag('.targetitem').then((success) => {
      assert.isTrue(success)
    })
  })
})