import './message.css'

interface MessageProps {
  setOrder: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Message({ setOrder }: MessageProps) {

  return (
    <div className='message' onClick={() => setOrder(false)} >
      <p>Спасибо за заказ, в ближайшее время мы с вами свяжимся!</p>
      <div className='message-status'></div>
    </div>
  )
}
