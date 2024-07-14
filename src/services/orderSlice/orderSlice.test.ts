import orderByNumberSlice, {
  initialState,
  getOrderByNumberThunk
} from './orderSlice';

describe('Проверка работы редьюсера orderByNumberSlice', () => {
  test('Проверка работы экшена getOrderByNumberThunk.pending', () => {
    const action = { type: getOrderByNumberThunk.pending.type };
    const state = orderByNumberSlice(initialState, action);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(null);
  });

  test('Проверка работы экшена getOrderByNumberThunk.rejected', () => {
    const error = 'Some error';
    const action = {
      type: getOrderByNumberThunk.rejected.type,
      error: { message: error }
    };
    const state = orderByNumberSlice(initialState, action);
    expect(state.error).toEqual(error);
    expect(state.isLoading).toEqual(false);
  });

  test('Проверка работы экшена getOrderByNumberThunk.fulfilled', () => {
    const mockOrder = ['1'];
    const action = {
      type: getOrderByNumberThunk.fulfilled.type,
      payload: { orders: mockOrder }
    };
    const state = orderByNumberSlice(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.orderData).toEqual(mockOrder[0]);
  });
});
