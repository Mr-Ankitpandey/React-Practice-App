import { useContext } from 'react'
import  logoImg  from '../assets/logo.jpg'
import Button from './Button'
import CartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext'

const Header = () => {
    const {items} = useContext(CartContext)
    const {showCart} = useContext(UserProgressContext)
    const totalCartItems = items.reduce((tottalItems,item)=> {
        return tottalItems + item.quantity
    }, 0)
  return (
    <header id='main-header'>
        <div id="title">
            <img src={logoImg} alt="FoodZone Logo" />
            <h1>Food Zone</h1>
        </div>
        <nav>
            <Button textOnly onClick={showCart}>Cart ({totalCartItems})</Button>
        </nav>
    </header>
  )
}

export default Header
