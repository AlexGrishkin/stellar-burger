import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../src/services/store';
import {
  postOrderThunk,
  removeOrder
} from '../../services/burgerConstructorSlice/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Деструктурируем необходимые данные из нашего burgerConstructor (имя слайса) подключенного к рут редьюсеру
  const { constructorItems, order, isLoading } = useSelector(
    (state) => state.burgerConstructor
  );

  const isAuthenticatedUser = useSelector(
    (state) => state.burgerUser.isAuthenticated
  );

  function prepareOrder(): string[] {
    let order: string[] = [];

    if (constructorItems.bun) {
      const ingredients: string[] = constructorItems.ingredients.map(
        (ingredient) => ingredient._id
      );

      order = [
        constructorItems.bun._id,
        ...ingredients,
        constructorItems.bun._id
      ];
    }

    return order;
  }

  const onOrderClick = () => {
    if (isAuthenticatedUser) {
      const order = prepareOrder();
      dispatch(postOrderThunk(order));
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(removeOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isLoading}
      constructorItems={constructorItems}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

export default BurgerConstructor;
