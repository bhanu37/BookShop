import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext"

export const CartCard = ({cartItem}) => {
    const { removeFromCart } = useCart();
    return (
      <div className="flex flex-wrap justify-between border-b dark:border-slate-700 max-w-4xl m-auto p-2 mb-5 ">
        <div className="flex">
            <Link to={`/products/${cartItem.id}`}>
              <img className="w-32 rounded" src={cartItem.poster} alt="" />
            </Link>
            <div className="">
              <Link to={`/products/${cartItem.id}`}>
                <p className="text-lg ml-2 dark:text-slate-200">{cartItem.overview}</p>
              </Link>            
              <button onClick={() => removeFromCart(cartItem)} className="text-base ml-2 text-red-400">Remove</button>
            </div>
        </div>
        <div className="text-lg m-2 dark:text-slate-200">
          <span>${cartItem.price}</span>
        </div>
      </div>
    )
  }