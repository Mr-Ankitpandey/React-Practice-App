import { useContext } from "react"
import { currencyFormatter } from "../util/formatting"
import Button from "./Button"
import CartContext from "../store/CartContext"

const MealItem = ({meal}) => {
    const {addItem} =   useContext(CartContext)
    
    const addToCart = ()=> {
      addItem(meal)
    }
  return (
    <li className="meal-item">
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
            <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                <p className="meal-item-description">{meal.description}</p>
            </div>
            <p className="meal-item-action">
                <Button onClick={addToCart}>Add to Cart</Button>
            </p>
        </article>
    </li>
  )
}

export default MealItem
