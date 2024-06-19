import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../utils/burger-api';

enum RequestStatus {
  //начальное состояние, когда запрос еще не начат
  Idle = 'Idle',
  //состояние, когда запрос выполняется
  Loading = 'Loading',
  //состояние, когда запрос успешно завершился
  Success = 'Success',
  //состояние, когда запрос завершился неудачно
  Failed = 'Failed'
}

export type TOrderState = {
  data: TOrder | null;
  status: RequestStatus;
};

export const initialState: TOrderState = {
  data: null,
  status: RequestStatus.Idle
};

export const getOrder = createAsyncThunk(
  'burgerOrder/getBurgerOrder',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: 'burgerOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrder.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.data = action.payload.orders[0];
      });
  },
  selectors: {
    selectorOrderData: (state: TOrderState) => state.data,
    selectorOrderStatus: (state: TOrderState) => state.status
  }
});

export const selectorOrder = orderSlice.selectors;
