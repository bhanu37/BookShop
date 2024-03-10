import { CartList } from "./components/CartList";
import { CartEmpty } from "./components/CartEmpty";
import { useCart } from "../../context/CartContext";
import { useTitle } from "../../hooks/useTitle";

export const CartPage = () => {
    const { cartItems } = useCart();
    useTitle(`Cart (${cartItems.length})`)
    return (
      <main>
        { cartItems.length ? <CartList/> : <CartEmpty/> }        
      </main>
    )
}