describe('Тестирование приложений cypress', () => {
  const localhost = 'http://localhost:4000';
  const modalCy = '[data-cy="modal"]';
  const closeButtonCy = '[data-cy="close-button"]';

  it('Проверка доступа корневой страницы localhost:4000/', () => {
    cy.visit(localhost);
    cy.viewport(1280, 720);
  });

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    });

    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });

    cy.setCookie('accessToken', 'mockAccessToken');
    localStorage.setItem('refreshToken', 'mockRefreshToken');
    cy.visit(localhost);
  });

  afterEach(() => {
    cy.setCookie('accessToken', '');
    localStorage.setItem('refreshToken', '');
  });

  describe('Тестирование модальных окон', () => {
    beforeEach(() => {
      cy.get('[data-cy="ingredients-category"]').children('li').first().click();
      cy.get(modalCy).should('be.not.empty');
    });
    it('Проверка закрытия модального окна', () => {
      cy.get(closeButtonCy).should('be.not.empty');
      cy.get(modalCy).should('not.exist');
    });
    it('Проверка открытия с описанием модального окна', () => {
      cy.get(modalCy).should('be.not.empty');
      cy.get('[data-cy="ingredient-image"]').should('be.visible');
      cy.get('[data-cy="ingredient-name"]').should('not.be.empty');
      cy.get('li').children('p').contains('Калории, ккал');
      cy.get('li').children('p').contains('Белки, г');
      cy.get('li').children('p');
      cy.get('li').children('p').contains('Углеводы, г');
    });
  });

  describe('Добавление ингрединетов в заказ', () => {
    it('Проверка добавление булки в заказ', () => {
      cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
      cy.get('div').contains('Выберите булки').should('not.exist');
    });
    it('Проверка добавление ингредиентов в заказ', () => {
      cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click();
      cy.get('h3').contains('Соусы').next('ul').contains('Добавить').click();
      cy.get('div').contains('Выберите начинку').should('not.exist');
    });
  });

  describe('Оформление заказа', () => {
    beforeEach(() => {
      cy.intercept('POST', 'api/orders', {
        fixture: 'order.json'
      });
    });

    it('Проверка формирование заказа', () => {
      cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
      cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click();
      cy.get('h3').contains('Соусы').next('ul').contains('Добавить').click();
      cy.contains('Оформить заказ').click();
      cy.contains('11111');
      cy.get(closeButtonCy).should('be.not.empty');
      cy.get(modalCy).should('not.exist');
    });
  });
});
