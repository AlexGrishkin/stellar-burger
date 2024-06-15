import { useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
  /** получаем статус получения ингридиентов с сервера */
  const isIngredientsLoading = useSelector((state) => state.ingredients.status);

  return (
    <>
      {
        /* {если ингридиенты загружаются, то ставим прелоадер} */
        isIngredientsLoading === 'Loading' ? (
          <Preloader />
        ) : (
          <main className={styles.containerMain}>
            <h1
              className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
            >
              Соберите бургер
            </h1>
            <div className={`${styles.main} pl-5 pr-5`}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </main>
        )
      }
    </>
  );
};
