describe('GenreSelect', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should add active class on click', () => {
    cy.get('.genres-list li').contains('Documentary').click().should('have.class', 'active');
  });
});
