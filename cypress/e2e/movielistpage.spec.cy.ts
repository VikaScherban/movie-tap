describe('MovieListPage', () => {
  it('displays search form and movie list', () => {
    cy.visit('http://localhost:3000/');
    cy.get('form').should('exist');
    cy.get('.movie-list').should('exist');
  });

  it("updates URL with 'query' parameter and refreshes movie list", () => {
    cy.visit('http://localhost:3000/');
    cy.get("input[name='query']").type('coco');
    cy.get("button[type='submit']").click();
    cy.url().should('include', 'search=coco');
    cy.get('.movie-name').first().should('contain', 'Coco');
  });

  it('displays search form with entered text and relevant movie list', () => {
    cy.visit('http://localhost:3000/?search=zoo');
    cy.get("input[name='query']").should('have.value', 'zoo');
    cy.get('.movie-name').first().should('contain', 'Zoo');
  });

  it('displays selected genre in the url', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.genre-tab').eq(2).click();
    cy.url().should('include', 'genre=Comedy');
    cy.get('.movie-list').should('contain', 'Comedy');
  });

  it('reads selected genre from the url', () => {
    cy.visit('http://localhost:3000/?genre=Comedy');
    cy.get('.genres-list li').contains('Comedy').click().should('have.class', 'active');
    cy.get('.movie-list').should('contain', 'Comedy');
  });

  it('displays selected sort in the url', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.sort-by-dropdown').select('title');
    cy.url().should('include', 'sort=title');

    cy.get('.movie-name').eq(0).should('have.text', '¡Three Amigos!');
    cy.get('.movie-name').eq(1).should('have.text', '\'71');
    cy.get('.movie-name').eq(2).should('have.text', '(500) Days of Summer');
    cy.get('.movie-name').eq(3).should('have.text', '[REC]');
  });

  it('reads selected sort from the url', () => {
    cy.visit('http://localhost:3000/?sortBy=release_date');
    cy.get('.sort-by-dropdown').should('have.value', 'release_date');

    cy.get('.movie-name').eq(0).should('have.text', 'Fifty Shades Freed');
    cy.get('.movie-name').eq(1).should('have.text', 'Zootopia');
    cy.get('.movie-name').eq(2).should('have.text', 'Star Wars: The Last Jedi');
    cy.get('.movie-name').eq(3).should('have.text', 'Black Panther');
  });

  it('should get all three params from url sort by title', () => {
    cy.visit('http://localhost:3000/?search=Col&genre=Comedy&sort=title');
    cy.get("input[name='query']").should('have.value', 'Col');
    cy.get('.genres-list li').contains('Comedy').click().should('have.class', 'active');
    cy.get('.sort-by-dropdown').should('have.value', 'title');
    cy.get('.movie-list')
      .should('contain', 'Col')
      .and('contain', 'Comedy');

    cy.get('.movie-name').eq(0).should('have.text', 'Charlie and the Chocolate Factory');
    cy.get('.movie-name').eq(1).should('have.text', 'Chocolat');
    cy.get('.movie-name').eq(2).should('have.text', 'Colossal');
    cy.get('.movie-name').eq(3).should('have.text', 'Ice Age: Collision Course');
  });

  it('should get all params from url sort by date', () => {
    cy.visit('http://localhost:3000/354912?search=Col&genre=Comedy&sort=release_date');
    cy.get('.genres-list li').contains('Comedy').click().should('have.class', 'active');
    cy.get('.sort-by-dropdown').should('have.value', 'release_date');
    cy.get('.movie-list')
      .should('contain', 'Col')
      .and('contain', 'Comedy');

    cy.get('.movie-name').eq(0).should('have.text', 'Chocolat');
    cy.get('.movie-name').eq(1).should('have.text', 'Charlie and the Chocolate Factory');
    cy.get('.movie-name').eq(2).should('have.text', 'Ice Age: Collision Course');
    cy.get('.movie-name').eq(3).should('have.text', 'Colossal');

    cy.get('.detail-text-name').should('have.text', 'Coco');
  });

  it('reads movie id from the url', () => {
    cy.visit('http://localhost:3000/354912');
    cy.get('.detail-text-name').should('have.text', 'Coco');
  });

  it('displays selected movie id in the url', () => {
    cy.visit('http://localhost:3000/');
    cy.get('.movie-poster').eq(4).click();
    cy.url().should('include', '354912');
    cy.get('.detail-text-name').should('have.text', 'Coco');
  });
});
