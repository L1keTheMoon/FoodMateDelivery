import { useAppSelector, useAppDispatch } from '../../hooks/useStore'
import { clearCart } from '../../store/store'
import CartItem from '../CartItem/CartItem'
import Button from '../Button/Button'
import './Cart.css'

interface CartProps {
  hideCart: () => void,
  changeOrder: () => void
}

export default function Cart({ hideCart, changeOrder }: CartProps) {
  const cart = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  return (
    <div className='cart'>
      <ul className='cart-items'>
        {cart.length === 0 ? <h2 className='empty'>В корзине пусто...</h2> : cart.map((e) => {
          return <CartItem {...e} key={e.meal.id} />
        })}
      </ul>
      <div className="order-info">
        <div className="total">
          <span>Итого:</span>
          <span style={{ color: '#47035d' }}>{cart.length === 0 ? 0 : cart.reduce((acc, e) => acc + (+e.meal.price * e.quantity), 0).toFixed(2)}₽</span>
        </div>
        <div className="buttons">
          <Button className={' button--color-reverse'} onClick={hideCart}>Закрыть</Button>
          <Button style={{ marginLeft: '20px' }}
            onClick={() => {
              if (cart.length > 0) {
                dispatch(clearCart());
                changeOrder();
                hideCart();
              }
            }}>Заказать</Button>
        </div>
      </div>
    </div >
  )
}
