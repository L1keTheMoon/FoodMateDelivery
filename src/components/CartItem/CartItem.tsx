import { useAppDispatch } from '../../hooks/useStore'
import { addMeal, removeMeal } from '../../store/store';
import Counter from '../Counter/Counter';
import Button from '../Button/Button';
import { Order } from '../../types/types';
import './CartItem.css'

interface CartItemProps extends Order { }

export default function CartItem({ meal, quantity }: CartItemProps) {
  const dispatch = useAppDispatch();
  const clickMinus = () => dispatch(removeMeal({ meal, quantity: 1 }));
  const clickPlus = () => dispatch(addMeal({ meal, quantity: 1 }));

  return (
    <li className='cart-item' >
      <img src={meal.image} alt={meal.name} className='order-image' />
      <div className="cart-info">
        <h3>{meal.name}</h3>
        <div className='price-and-counter'>
          <div className='price'>{(+meal.price * quantity).toFixed(2)}₽</div>
          <Counter clickMinus={clickMinus} clickPlus={clickPlus} quantity={quantity} />
        </div>
      </div>
      <Button className={' button--color-reverse button--small'} title={'Удалить'}
        onClick={() => dispatch(removeMeal({ meal, quantity: Infinity }))}
      >×</Button>
    </li>
  )
}