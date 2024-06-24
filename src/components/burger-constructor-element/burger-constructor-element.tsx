import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useDispatch } from '../../../src/services/store';
import {
  moveDownIngredient,
  moveUpIngredient,
  removeIngredient
} from '../../../src/services/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    //В этом случае мы вызываем экшен-креатор, автоматически сгенерированный для редюсера removeIngredient, и передаем в него ingredient.id. Этот экшен-креатор создает действие, которое будет обработано редюсером removeIngredient.
    //Когда мы используем createSlice, Redux Toolkit автоматически создает экшен-креаторы для каждого редюсера, определенного в reducers.
    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };
    const handleMoveUp = () => {
      dispatch(moveUpIngredient(index));
    };

    const handleMoveDown = () => {
      dispatch(moveDownIngredient(index));
    };
    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
