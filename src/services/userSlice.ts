import { TOrder, TUser } from '@utils-types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  TLoginData,
  TRegisterData,
  getOrdersApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../utils/burger-api';
import { getCookie } from '../utils/cookie';

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

export type TUserState = {
  userData: TUser | null;
  orders: TOrder[];
  status: RequestStatus;
  isAuthenticated: boolean;
};

function loadUser(): TUser | null {
  const emailL = getCookie('user.email');
  const nameL = getCookie('user.name');
  if (emailL != undefined && nameL != undefined) {
    return {
      email: emailL,
      name: nameL
    };
  } else {
    return null;
  }
}

export const initialState: TUserState = {
  userData: loadUser(),
  orders: [],
  status: RequestStatus.Idle,
  isAuthenticated: getCookie('accessToken') != undefined
};

console.log(initialState);

export const getUserThunk = createAsyncThunk('burgerUser/get', getUserApi);

export const getUserOrdersThunk = createAsyncThunk(
  'burgerUser/orders',
  getOrdersApi
);

export const userUpdateThunk = createAsyncThunk(
  'burgerUser/update',
  async (data: Partial<TRegisterData>) => await updateUserApi(data)
);

export const registerUserThunk = createAsyncThunk(
  'burgerUser/register',
  async (data: TRegisterData) => await registerUserApi(data)
);

export const loginUserThunk = createAsyncThunk(
  'burgerUser/login',
  async (data: TLoginData) => await loginUserApi(data)
);

export const userLogoutThunk = createAsyncThunk('burgerUser/logout', logoutApi);

export const userSlice = createSlice({
  name: 'burgerUser',
  initialState,
  reducers: {},
  selectors: {
    getUserStateSelector: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.isAuthenticated = false;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.isAuthenticated = false;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.userData = action.payload.user;
        state.isAuthenticated = false;
      })

      .addCase(loginUserThunk.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.isAuthenticated = false;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.isAuthenticated = false;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.userData = action.payload.user;
        state.isAuthenticated = true;
      })

      .addCase(getUserThunk.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.isAuthenticated = false;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.status = RequestStatus.Failed;
        state.isAuthenticated = false;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.userData = action.payload.user;
        state.isAuthenticated = true;
      })

      .addCase(getUserOrdersThunk.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.orders = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(userUpdateThunk.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(userUpdateThunk.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(userUpdateThunk.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.userData = action.payload.user;
      })

      .addCase(userLogoutThunk.pending, (state) => {
        state.status = RequestStatus.Loading;
        state.isAuthenticated = true;
      })
      .addCase(userLogoutThunk.rejected, (state, action) => {
        state.status = RequestStatus.Failed;
        state.isAuthenticated = true;
      })
      .addCase(userLogoutThunk.fulfilled, (state) => {
        state.userData = null;
        state.orders = [];
        state.status = RequestStatus.Success;
        state.isAuthenticated = false;
      });
  }
});

export const {} = userSlice.actions;
export default userSlice.reducer;
