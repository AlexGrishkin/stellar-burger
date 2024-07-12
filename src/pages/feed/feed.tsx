import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeedThunk } from '../../../src/services/feedSlice';
import { useDispatch, useSelector } from '../../../src/services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.burgerFeed);

  useEffect(() => {
    dispatch(getFeedThunk());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  } else {
    return (
      <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeedThunk())} />
    );
  }
};
