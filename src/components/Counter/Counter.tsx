import { MouseEventHandler } from 'react'
import Button from '../Button/Button'
import './Counter.css'

interface CounterProps {
  clickMinus: MouseEventHandler,
  clickPlus: MouseEventHandler,
  quantity: number
}

export default function Counter({ clickMinus, clickPlus, quantity }: CounterProps) {
  return (
    <div className='counter'>
      <Button className={' button--color-reverse button--small'} title={'Убрать 1'}
        onClick={clickMinus}
      >−</Button>
      <div className='quantity'>{quantity}</div>
      <Button className={' button--color-reverse button--small'} title={'Добавть 1'}
        onClick={clickPlus}
      >+</Button>
    </div>
  )
}
