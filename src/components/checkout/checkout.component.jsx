import './checkout.styles.scss';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


const Checkout = () => {
    // const { isCartOpen, setIsCartOpen, cartQuantity } = useContext(CartContext);


    return (
        <div className='cart-icon-container' onClick={toggleIsCartOpen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartQuantity}</span>
        </div>
    );
};

export default CartIcon;