import { TOrder } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '../utils/burger-api';

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

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  status: RequestStatus;
};

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  status: RequestStatus.Idle
};

export const getFeedThunk = createAsyncThunk('feed/get', getFeedsApi);

export const feedSlice = createSlice({
  name: 'burgerFeed',
  initialState,
  reducers: {},
  selectors: {
    getFeedStateSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedThunk.pending, (state) => {
        state.isLoading = true;
        state.status = RequestStatus.Loading;
      })
      .addCase(getFeedThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.status = RequestStatus.Failed;
      })
      .addCase(getFeedThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.status = RequestStatus.Success;
      });
  }
});

export default feedSlice.reducer;
