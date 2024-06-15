import { orderBurgerApi } from '@api';
import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

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

type TBurgerConstructorState = {
  data: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  order: TOrder | null;
  status: RequestStatus;
};

const initialState: TBurgerConstructorState = {
  data: {
    bun: null,
    ingredients: []
  },
  order: null,
  status: RequestStatus.Idle
};

export const postOrder = createAsyncThunk(
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
          ? (state.data.bun = action.payload)
          : state.data.ingredients.push(action.payload);
      },
      //сначала срабатывает функция подготовки, которая присваивает объекту ингредиента уникальное id
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    //редюсер который удаляет ингридиент из конструктора бургера, сам обработчик мы поместили в компонент элемента конструктора, он использует экшен креатор и отправляет данные самого ингредиента в этот слайс, где его обрабатывает этот редьюсер
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.data.ingredients = state.data.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },

    //редюсер который перемещает ингридиент на позицию вверх в конструкторе бургера, сам обработчик мы поместили в компонент элемента конструктора, он использует экшен креатор и отправляет данные самого ингредиента в этот слайс, где его обрабатывает этот редьюсер
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const arr = state.data.ingredients;
      const index = action.payload;
      arr.splice(index, 0, arr.splice(index - 1, 1)[0]);
    },

    //редюсер который перемещает ингридиент на позицию вниз в конструкторе бургера, сам обработчик мы поместили в компонент элемента конструктора, он использует экшен креатор и отправляет данные самого ингредиента в этот слайс, где его обрабатывает этот редьюсер
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const arr = state.data.ingredients;
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
      .addCase(postOrder.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.order = action.payload.order;
      })
      .addCase(postOrder.rejected, (state) => {
        state.status = RequestStatus.Failed;
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
