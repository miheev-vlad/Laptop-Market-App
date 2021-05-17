import { Link } from 'react-router-dom'
import './CartItem.css'

const CartItem = ({ item, qtyChangeHandler, removeHandler, link }) => {
  return (
    <div className="cartitem">
      <div className="cartitem_image">
        <img src={item.imageUrl[0]} alt={item.name} />
      </div>
      {link ? (
        <Link to={`/product/${item.product}`} className="cartitem_name">
          <p>{item.name}</p>
        </Link>
      ) : (
        <p>{item.name}</p>
      )}
      <p className="cartitem_price">${item.price}</p>
      {qtyChangeHandler ? (
        <select
          className="cartitem_select"
          value={item.qty}
          onChange={(e) => qtyChangeHandler(item.product, e.target.value)}
        >
          {[...Array(item.countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>{x + 1}</option>
          ))}
        </select>
      ) : (
        <p className="cartitem_price">x {item.qty}</p>
      )}
      
      {removeHandler && (
        <button className="cartitem_deleteBtn" onClick={(e) => removeHandler(item.product)}>
          <i className="fas fa-trash"></i>
        </button>
      )}
    </div>
  )
}

export default CartItem
