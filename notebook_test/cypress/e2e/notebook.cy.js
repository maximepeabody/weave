describe('empty spec', () => {
  it('passes', () => {
    // cy.visit('http://localhost:8888')
    cy.visit('http://localhost:8888/notebooks/Test%20automation.ipynb')
    cy.get('#kernellink').click()
    cy.get('#restart_run_all a').click()
    cy.get('button.btn-danger').click()
    cy.wait(2000)
    cy.get('.cell.running', {timeout: 30000}).should('not.exist', )
    cy.get('.output_area .output_error', {timeout: 1000}).should('not.exist', )
  })
})