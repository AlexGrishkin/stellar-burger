import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { ingredientsSlice } from './ingredientsSlice/ingredientsSlice';
import { burgerConstructorSlice } from './burgerConstructorSlice/burgerConstructorSlice';
import { userSlice } from './userSlice/userSlice';
import { orderByNumberSlice } from './orderSlice/orderSlice';
import { feedSlice } from './feedSlice/feedSlice';

describe('Тесты корневого редьюсера', () => {
  it('проверяющий правильную настройку и работу rootReducer', () => {
    const rootReducer = combineReducers({
      [ingredientsSlice.name]: ingredientsSlice.reducer,
      [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [orderByNumberSlice.name]: orderByNumberSlice.reducer,
      [feedSlice.name]: feedSlice.reducer
    });

    const store = configureStore({
      reducer: rootReducer
    });

    expect(store.getState()).toEqual(
      rootReducer(undefined, { type: 'UNKNOWN_ACTION' })
    );
  });
});
