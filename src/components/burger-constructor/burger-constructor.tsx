import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../../src/services/store';
import {
  postOrder,
  removeOrder
} from '../../../src/services/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Деструктурируем необходимые данные из нашего burgerConstructor (имя слайса) подключенного к рут редьюсеру
  const { data, order, isLoading } = useSelector(
    (state) => state.burgerConstructor
  );
  const isAuthenticatedUser = useSelector(
    (state) => state.burgerUser.isAuthenticated
  );
  console.log(isAuthenticatedUser);
  function prepareOrder(): string[] {
    let order: string[] = [];

    if (data.bun) {
      const ingredients: string[] = data.ingredients.map(
        (ingredient) => ingredient._id
      );
      order = [data.bun._id, ...ingredients, data.bun._id];
    }

    return order;
  }

  const onOrderClick = () => {
    if (isAuthenticatedUser) {
      const order = prepareOrder();
      dispatch(postOrder(order));
    } else {
      navigate('/login');
    }
  };

  const closeOrderModal = () => {
    dispatch(removeOrder());
  };

  const price = useMemo(
    () =>
      (data.bun ? data.bun.price * 2 : 0) +
      data.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [data]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={isLoading}
      constructorItems={data}
      orderModalData={order}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};

export default BurgerConstructor;
