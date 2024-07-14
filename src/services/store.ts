import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredientsSlice/ingredientsSlice';
import { burgerConstructorSlice } from './burgerConstructorSlice/burgerConstructorSlice';
import { userSlice } from './userSlice/userSlice';
import { orderByNumberSlice } from './orderSlice/orderSlice';
import { feedSlice } from './feedSlice/feedSlice';

const rootReducer = {
  //заключаем ingredientsSlice.name в квадратные скобки, чтобы имя слайса вычислялось динамически
  //Инкапсуляция логики: ingredientsSlice.reducer является инкапсуляцией всей логики изменения состояния, связанной с этим срезом. Когда мы создаем срез с помощью createSlice, он автоматически создает для нас редьюсер на основе переданных редьюсеров и extraReducers.
  //Инкапсуляция логики означает, что вся логика, связанная с определенной функциональностью, упакована и скрыта внутри отдельного модуля или компонента, делая её независимой и изолированной от других частей системы.
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [burgerConstructorSlice.name]: burgerConstructorSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [orderByNumberSlice.name]: orderByNumberSlice.reducer,
  [feedSlice.name]: feedSlice.reducer
}; // Заменить на импорт настоящего редьюсера

const store = configureStore({
  //подключаем корневой редьюсер
  reducer: rootReducer,
  //devTools является опциональным параметром конфигурации configureStore, который определяет, должны ли включаться Redux DevTools Extension для отладки Redux-приложения в браузере.
  devTools: process.env.NODE_ENV !== 'production'
});

//Когда определяется RootState, TypeScript может понимать структуру и типы всего состояния хранилища. Это позволяет использовать строгую типизацию при доступе к состоянию через селекторы и хуки, такие как useSelector.
//Использование ReturnType<typeof store.getState> гарантирует, что тип RootState будет автоматически обновляться, если структура состояния изменится. Это особенно полезно в больших приложениях, где состояние может меняться часто.
export type RootState = ReturnType<typeof store.getState>;

//Определение типа AppDispatch позволяет TypeScript знать, какие действия могут быть отправлены (dispatched) в хранилище. Это особенно важно, когда используются асинхронные действия, созданные с помощью createAsyncThunk
//store.dispatch — это метод хранилища Redux, который используется для отправки действий (actions) в хранилище. Отправка действия вызывает все редьюсеры в хранилище, которые затем могут изменить состояние в зависимости от типа экшена и его полезной нагрузки (payload).
export type AppDispatch = typeof store.dispatch;

// useSelector позволяет извлекать данные из хранилища.
// useDispatch даёт доступ к функции dispatch для отправки экшенов в хранилище.
// хуки нужно типизировать, чтобы TypeScript понимал, какие:
// типы данных лежат в хранилище,
// экшены можно отправлять в хранилище.

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
