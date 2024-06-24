import { orderBurgerApi } from '@api';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export type TConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  order: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

export const initialState: TConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  order: null,
  isLoading: false,
  error: null
};

export const postOrderThunk = createAsyncThunk(
  'burgerConstructor/post',
  async (array: string[]) => orderBurgerApi(array)
);

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      //этот редьюсер будет обрабатывать экшены, загружаемые из списка ингридиентов, сам обработчик мы поместили в компонент ингридиента, он использует экшен креатор и отправляет данные самого ингредиента в этот слайс, где его обрабатывает этот редьюсер
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        action.payload.type === 'bun'
          ? (state.constructorItems.bun = action.payload)
          : state.constructorItems.ingredients.push(action.payload);
      },
      //сначала срабатывает функция подготовки, которая присваивает объекту ингредиента уникальное id
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    //редюсер который удаляет ингридиент из конструктора бургера, сам обработчик мы поместили в компонент элемента конструктора, он использует экшен креатор и отправляет данные самого ингредиента в этот слайс, где его обрабатывает этот редьюсер
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },

    //редюсер который перемещает ингридиент на позицию вверх в конструкторе бургера, сам обработчик мы поместили в компонент элемента конструктора, он использует экшен креатор и отправляет данные самого ингредиента в этот слайс, где его обрабатывает этот редьюсер
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const arr = state.constructorItems.ingredients;
      const index = action.payload;
      arr.splice(index, 0, arr.splice(index - 1, 1)[0]);
    },

    //редюсер который перемещает ингридиент на позицию вниз в конструкторе бургера, сам обработчик мы поместили в компонент элемента конструктора, он использует экшен креатор и отправляет данные самого ингредиента в этот слайс, где его обрабатывает этот редьюсер
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const arr = state.constructorItems.ingredients;
      const index = action.payload;
      arr.splice(index, 0, arr.splice(index + 1, 1)[0]);
    },

    //после оформления заказа конструктор должен быть пустой
    removeOrder: (state) => {
      state.order = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(postOrderThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.order = action.payload.order;
        state.constructorItems = initialState.constructorItems;
      });
  },
  selectors: {}
});

export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  removeOrder
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
