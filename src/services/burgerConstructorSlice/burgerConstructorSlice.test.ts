import constructorSlice, {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  initialState
} from './burgerConstructorSlice';

import { mock_bun, mock_ingredient_1, mock_ingredient_2 } from './mockData';

describe('Проверка работы редьюсера constructorSlice', () => {
  test('Проверка добавления ингредиента', () => {
    const newState = constructorSlice(
      initialState,
      addIngredient(mock_ingredient_1)
    );

    expect(newState.constructorItems.ingredients[0]).toEqual({
      ...mock_ingredient_1,
      id: expect.any(String)
    });
  });

  test('Проверка удаления ингредиента', () => {
    const initialState = {
      constructorItems: {
        bun: { ...mock_bun, id: 'mock_id0' },
        ingredients: [{ ...mock_ingredient_1, id: 'mock_id0' }]
      },
      order: null,
      isLoading: false,
      error: null
    };

    const newState = constructorSlice(
      initialState,
      removeIngredient('mock_id0')
    );

    expect(newState.constructorItems.ingredients).toEqual([]);
  });

  test('  Проверка перемещения ингредиента вверх', () => {
    const initialState = {
      constructorItems: {
        bun: { ...mock_bun, id: 'mock_id0' },
        ingredients: [
          { ...mock_ingredient_1, id: 'mock_id1' },
          { ...mock_ingredient_2, id: 'mock_id2' }
        ]
      },
      order: null,
      isLoading: false,
      error: null
    };

    const newState = constructorSlice(initialState, moveDownIngredient(0));

    expect(newState.constructorItems.ingredients).toEqual([
      { ...mock_ingredient_2, id: 'mock_id2' },
      { ...mock_ingredient_1, id: 'mock_id1' }
    ]);
  });

  test('  Проверка перемещения ингредиента вниз', () => {
    const initialState = {
      constructorItems: {
        bun: { ...mock_bun, id: 'mock_id0' },
        ingredients: [
          { ...mock_ingredient_1, id: 'mock_id1' },
          { ...mock_ingredient_2, id: 'mock_id2' }
        ]
      },
      order: null,
      isLoading: false,
      error: null
    };

    const newState = constructorSlice(initialState, moveUpIngredient(1));

    expect(newState.constructorItems.ingredients).toEqual([
      { ...mock_ingredient_2, id: 'mock_id2' },
      { ...mock_ingredient_1, id: 'mock_id1' }
    ]);
  });
});
