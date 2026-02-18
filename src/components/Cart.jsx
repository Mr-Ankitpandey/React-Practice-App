import { useContext } from 'react'
import Modal from './Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting'
import Button from './Button'
import UserProgressContext from '../store/UserProgressContext'
import CartItem from './CartItem'

const Cart = () => {
    const { items, addItem, removeItem } = useContext(CartContext)
    const {progress, hideCart, showCheckout} = useContext(UserProgressContext)
    const cartTotal = items.reduce((prevPrice, item)=>{
        return prevPrice + (item?.quantity * item?.price);
    }, 0)
  return (
    <Modal className='cart' open={progress === 'cart'} onClose={progress === 'cart' ? hideCart: null}>
        <h2>Your Cart</h2>
        <ul>
        {items.map((item)=> (
            <CartItem key={item.id} item={item} onIncrease={()=> addItem(item)} onDecrease={()=>removeItem(item.id)}/>
        ))}
        </ul>
        <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
        <p className='modal-actions'>
            <Button textOnly onClick={hideCart}>Close</Button>
            {items.length >= 1 && <Button onClick={showCheckout}>Checkout</Button>}
            
        </p>
    </Modal>
  )
}

export default Cart
