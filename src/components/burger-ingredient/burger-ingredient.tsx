import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../../src/services/store';
import { addIngredient } from '../../../src/services/burgerConstructorSlice';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    //диспатчим экшн креатор для того, чтобы ингридиент добавлялся в слайс конструктор бургера, там он обрабатывается соответствующим редьюсером
    const dispath = useDispatch();
    const handleAdd = () => {
      dispath(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
