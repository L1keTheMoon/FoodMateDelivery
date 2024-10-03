import { useState, useEffect } from 'react'
import FoodCard from '../FoodCard/FoodCard'
import useAPIServices from '../../service/APIService'
import Spiner from '../../assets/Spinner.svg'
import Error from '../../assets/error.jpg'
import american from '../../assets/american.jpg'
import british from '../../assets/british.jpg'
import french from '../../assets/french.jpg'
import italian from '../../assets/italian.jpg'
import japanese from '../../assets/japanese.jpg'
import russian from '../../assets/russian.jpg'
import { Meal } from '../../types/types'
import './Menu.css'

interface IMenu {
  [key: string]: Meal[]
}
interface counrtyFlagsAndNames {
  [key: string]: string
}

const counrtyNames: counrtyFlagsAndNames = {
  russian: 'Русская',
  japanese: 'Японская',
  american: 'Американская',
  italian: 'Итальянская',
  french: 'Французская',
  british: 'Британская'
};
const counrtyFlags: counrtyFlagsAndNames = {
  russian,
  japanese,
  american,
  italian,
  french,
  british
}

export default function Menu() {
  const [activeCountry, setActiveCountry] = useState('russian');
  const [menu, setMenu] = useState<IMenu>({});
  const [dropdown, setDropdown] = useState(false)
  const { loading, error, getMeals } = useAPIServices(true);

  useEffect(() => {
    onCountryChange(activeCountry);
  }, [activeCountry])

  function onCountryChange(country: string) {
    if (!menu[country]) {
      getMeals(country)
        .then(res => {
          if (res) {
            setMenu(prevMenu => {
              const newMenu = { ...prevMenu };
              newMenu[country] = res.filter((_e, i) => (+i < 10));
              return newMenu
            })
          }
        })
    }
  }

  return (
    <div className='menu'>
      <div className='country-tabs'>
        {Object.entries(counrtyFlags).map((e, i) => {
          let className = 'country-tab';
          if (activeCountry === e[0]) className += ' active';
          return (
            <div onClick={() => setActiveCountry(e[0])} className={className} key={i}>
              <img src={e[1]} alt={e[0]} className='flag' />
            </div>
          )
        })}
      </div>
      <div className='country-dropdown' onClick={() => {
        setDropdown(!dropdown);
        document.addEventListener('click', (e) => {
          if (e.target && !(e.target as HTMLElement).closest('.country-dropdown')) setDropdown(false);
        }, { once: true, capture: true })
      }}>
        <div className='select choosen-country'>
          <img src={counrtyFlags[activeCountry]} alt={activeCountry} className='flag flag-select' />
          <span className='country'>{counrtyNames[activeCountry] + ' кухня'}</span>
        </div>
        {dropdown && <ul className="list" >
          {Object.entries(counrtyFlags).map((e, i) => {
            return (
              <li key={i} className='select'
                onClick={() => setActiveCountry(e[0])}>
                <img src={e[1]} alt={e[0]} className='flag flag-select' />
                <span>{counrtyNames[e[0]] + ' кухня'}</span>
              </li>
            )
          })}
        </ul>}
      </div>
      {loading && <img src={Spiner} height='300px'></img>}
      {error && <img src={Error} style={{ height: '300px', width: '300px', display: 'block', margin: 'auto' }}></img>}
      <ul>
        {menu[activeCountry]?.map((e, i) => {
          return <FoodCard data={e} key={e.id} animationDelay={i / 5 + 0.3 + 's'} />
        })}
      </ul>
    </div>
  )
}