describe('GenreSelect', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Change the URL if needed
  });

  it('should add active class on click', () => {
    cy.get('.genres-list li').contains('DOCUMENTARY').click().should('have.class', 'active');
  });
});
