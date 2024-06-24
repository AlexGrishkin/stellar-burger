import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../../src/services/store';

export const AppHeader: FC = () => {
  const user = useSelector((state) => state.burgerUser.userData);
  return <AppHeaderUI userName={'' || user?.name} />;
};
