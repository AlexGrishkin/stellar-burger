import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '../../utils/burger-api';

export type TIngredientState = {
  orderData: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TIngredientState = {
  orderData: null,
  isLoading: false,
  error: null
};

export const getOrderByNumberThunk = createAsyncThunk(
  'burgerOrderByNumber/get',
  async (number: number) => getOrderByNumberApi(number)
);

export const orderByNumberSlice = createSlice({
  name: 'burgerOrderByNumber',
  initialState,
  reducers: {},
  selectors: {
    getOrderByNumberSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumberThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumberThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload.orders[0];
      });
  }
});

export default orderByNumberSlice.reducer;
