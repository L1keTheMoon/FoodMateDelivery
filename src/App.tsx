import { useState, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Header from './components/Header/Header'
import Info from './components/Info/Info'
import Menu from './components/Menu/Menu'
import Modal from './components/Modal/Modal'
import Cart from './components/Cart/Cart'
import Footer from './components/Footer/Footer'
import Message from './components/Message/Message'

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const [order, setOrder] = useState(false);
  const timer = useRef(0);

  useEffect(() => {
    if (!order) {
      clearTimeout(timer.current);
    } else {
      timer.current = (setTimeout(() => {
        setOrder(false);
      }, 4000))
    }
  }, [order])

  useEffect(() => {
    document.body.style.overflow = showCart ? 'hidden' : 'auto';
  }, [showCart])

  function changeOrder() {
    if (order) setOrder(false);
    setTimeout(() => {
      setOrder(true);
    }, 0)
  }

  return (
    <Provider store={store}>
      {showCart &&
        <Modal hideCart={() => setShowCart(false)}>
          <Cart hideCart={() => setShowCart(false)} changeOrder={changeOrder} />
        </Modal>}
      <Header showCart={() => setShowCart(!showCart)} />
      <Info />
      <Menu />
      <Footer />
      {order && <Message setOrder={setOrder} />}
    </Provider>
  )
}