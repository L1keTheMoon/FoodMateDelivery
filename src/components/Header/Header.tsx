import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hooks/useStore';
import Button from '../Button/Button';
import CartIcon from '../../assets/cart-icon.svg'
import './Header.css'

interface HeaderProps {
  showCart: () => void
}

export default function Header({ showCart }: HeaderProps) {
  const cart = useAppSelector(state => state.cart);
  const [classes, setClasses] = useState(' header__button');

  useEffect(() => {
    if (cart.length === 0) return
    setClasses(' header__button pulse');
  }, [cart])

  return (
    <header className='header'>
      <div className="header-container">
        <h1>FoodMate</h1>
        <Button className={classes} onClick={showCart} onAnimationEnd={() => setClasses(' header__button')}>
          <img src={CartIcon} alt="cart" />
          <p>Корзина</p>
          <div className='amount'>
            {cart.reduce((acc, e) => acc + e.quantity, 0)}
          </div>
        </Button>
      </div>
    </header>
  )
}
