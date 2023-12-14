import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    //find if cart items contains prodcutToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    //if found, increment qty
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? 
        { ...cartItem, quantity: cartItem.quantity + 1 } :
        cartItem
        );
    }

    //return new array w/ modified cart items
    return [...cartItems, { ...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find if cart items contains prodcutToAdd
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    //if equal to 1, remove from array
    if(existingCartItem.quantity === 1) {

        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);   
    }

    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id  ? 
    { ...cartItem, quantity: cartItem.quantity - 1 } :
        cartItem
    );
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);   
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartQuantity: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0
});

export const CartProvider = ({ children }) => {
    
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartQuantity = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0);
        setCartQuantity(newCartQuantity);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price),0);
        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    };

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    };


    const value = {
            isCartOpen, 
            setIsCartOpen, 
            addItemToCart, 
            cartItems, 
            cartQuantity, 
            setCartQuantity, 
            removeItemFromCart, 
            clearItemFromCart,
            cartTotal        
        };
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};