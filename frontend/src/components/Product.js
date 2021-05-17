import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = ({ imageUrl, name, price, description, productId }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  let inCart;
  if (productId) {
    inCart = cartItems.map((item) => item.product).includes(productId);
  }
  return (
    <div className="product">
      <img src={imageUrl[0]} alt={name} />
      <div className="product_info">
        <p className="info_name">{name}</p>
        <p className="info_description">
          {description.substring(0, 100)}...
        </p>
        <p className="info-price">${price}</p>
        {inCart ? (
          <div className="incart">
            Already In Cart
          </div>
        ) : (
          <Link className="info_button" to={`/product/${productId}`}>
            View
          </Link>
        )}
      </div>
    </div>
  )
};

export default Product;
