import { ButtonHTMLAttributes } from 'react'
import './Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> { }

export default function Button({ children, className = '', ...props }: ButtonProps) {

  return (
    <button className={'button' + className} {...props}>
      {children}
    </button>
  )
}
