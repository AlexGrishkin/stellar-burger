import feedSlice, { getFeedThunk, initialState } from './feedSlice';

describe('Проверка работы редьюсера feedSlice', () => {
  test('Проверка работы экшена getFeedThunk.pending', () => {
    const action = { type: getFeedThunk.pending.type };
    const state = feedSlice(initialState, action);
    expect(state.isLoading).toEqual(true);
    expect(state.error).toEqual(null);
  });

  test('Проверка работы экшена getFeedThunk.fulfilled', () => {
    const mockOrders = ['1', '2', '3'];
    const action = {
      type: getFeedThunk.fulfilled.type,
      payload: { orders: mockOrders }
    };
    const state = feedSlice(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.orders).toEqual(mockOrders);
  });

  test('Проверка работы экшена getFeedThunk.rejected', () => {
    const error = 'Some error';
    const action = {
      type: getFeedThunk.rejected.type,
      error: { message: error }
    };
    const state = feedSlice(initialState, action);
    expect(state.isLoading).toEqual(false);
    expect(state.error).toEqual(error);
  });
});
