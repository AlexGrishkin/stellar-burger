import ingredientsSlice, {
  getIngredientsThunk,
  initialState
} from './ingredientsSlice';

describe('Проверка работы редьюсера ingredientsSlice', () => {
  test('Проверка работы экшена getIngredientsThunk.pending', () => {
    const action = { type: getIngredientsThunk.pending.type };
    const state = ingredientsSlice(initialState, action);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(null);
  });

  test('Проверка работы экшена getIngredientsThunk.fulfilled', () => {
    const mockIngredients = ['1', '2', '3'];
    const action = {
      type: getIngredientsThunk.fulfilled.type,
      payload: mockIngredients
    };
    const state = ingredientsSlice(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  test('Проверка работы экшена getIngredientsThunk.rejected', () => {
    const error = 'Some error';
    const action = {
      type: getIngredientsThunk.rejected.type,
      error: { message: error }
    };
    const state = ingredientsSlice(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(error);
  });
});
