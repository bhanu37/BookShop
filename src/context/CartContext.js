import { createContext, useContext, useReducer } from "react"
import { cartReducers } from "../reducers/cartReducers";

const cartInitialState = {
    cartItems: [],
    cartTotalAmmount: 0
}

const CartContext = createContext(cartInitialState);

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducers, cartInitialState);

    function addToCart(product){
        const updatedCartItem = state.cartItems.concat(product);
        const updatedTotal = state.cartTotalAmmount + product.price;
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                products: updatedCartItem,
                total: updatedTotal
            }
        })
    }
    
    function removeFromCart(product){
        const updatedCartItem = state.cartItems.filter(item => item.id !== product.id);
        const updatedTotal = state.cartTotalAmmount - product.price;
        
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: {
                products: updatedCartItem,
                total: updatedTotal
            }
        })
    }
    
    function clearCart(){
        dispatch({
            type: "CLEAR_CART",
            payload: {
                products: [],
                total: 0
            }
        })
    }

    const value = {
        cartItems: state.cartItems,
        cartTotalAmmount: state.cartTotalAmmount,
        addToCart,
        removeFromCart,
        clearCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext);
    return context;
}