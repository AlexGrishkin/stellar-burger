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

export type TUserState = {
  userData: TUser | null;
  orders: TOrder[];
  error: string | null;
  isLoading: boolean;
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
  error: null,
  isLoading: false,
  isAuthenticated: getCookie('accessToken') != undefined
};

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
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    console.log(response); // Добавьте это для проверки ответа
    return response;
  }
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
        state.error = null;
        state.isLoading = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.error = action.error.message as string;
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.userData = action.payload.user;
        state.isAuthenticated = false;
      })

      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
        state.isAuthenticated = false;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.userData = action.payload.user;
        state.isAuthenticated = true;
      })

      .addCase(getUserThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(getUserThunk.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
      })
      .addCase(getUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.userData = action.payload.user;
        state.isAuthenticated = true;
      })

      .addCase(getUserOrdersThunk.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getUserOrdersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getUserOrdersThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.orders = action.payload;
        state.isAuthenticated = true;
      })

      .addCase(userUpdateThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userUpdateThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(userUpdateThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.userData = action.payload.user;
      })

      .addCase(userLogoutThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthenticated = true;
      })
      .addCase(userLogoutThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
        state.isAuthenticated = true;
      })
      .addCase(userLogoutThunk.fulfilled, (state) => {
        state.userData = null;
        state.orders = [];
        state.error = null;
        state.isLoading = false;
        state.isAuthenticated = false;
      });
  }
});

export const {} = userSlice.actions;
export default userSlice.reducer;
