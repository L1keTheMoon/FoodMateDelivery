import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addMeal } from '../../store/store';
import Button from '../Button/Button';
import Counter from '../Counter/Counter';
import { Meal } from '../../types/types';
import './FoodCard.css'

interface FoodCardProps {
  data: Meal,
  animationDelay: string
}

export default function FoodCard({ data, animationDelay }: FoodCardProps) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  function changeQuantity(number: number) {
    const newQuantity = quantity + number;
    if (newQuantity < 1 || newQuantity > 99) return
    setQuantity(newQuantity)
  }

  return (
    <li className="card" style={{ animationDelay }}>
      <div className="meal-info">
        <img src={data.image} alt={data.name} className='meal-image' />
        <div className="discripton">
          <h2>{data.name}</h2>
          <span>{data.price}₽</span>
        </div>
      </div>
      <div className="add">
        <Counter clickMinus={() => changeQuantity(-1)} clickPlus={() => changeQuantity(1)} quantity={quantity} />
        <Button onClick={() => {
          dispatch(addMeal({ meal: data, quantity }));
          setQuantity(1);
        }}>Добавить</Button>
      </div>
    </li>
  )
}
