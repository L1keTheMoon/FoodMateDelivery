import { ReactNode } from 'react';
import './Modal.css'

interface ModalProps {
  hideCart: () => void,
  children?: ReactNode
}

export default function Modal({ hideCart, children }: ModalProps) {
  return (
    <div className='modal' onClick={(e) => {
      if ((e.target as HTMLDivElement).classList.contains('modal')) hideCart();
    }}>
      {children}
    </div>
  )
}
