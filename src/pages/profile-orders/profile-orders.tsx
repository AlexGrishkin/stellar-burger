import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../../src/services/store';
import { getUserOrdersThunk } from '../../../src/services/userSlice/userSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.burgerUser.orders);

  useEffect(() => {
    dispatch(getUserOrdersThunk());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
