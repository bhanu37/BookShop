import { createContext, useContext, useReducer } from "react"
import { filterReducer } from "../reducers"
//initial state of the state object which we want to get through context and reducers
const filterInitialState = {
    productList: [],
    onlyInStock: false,
    bestSellerOnly: false,
    sortBy: null,
    rating: null
}

//Creating the context for the state
const FilterContext = createContext(filterInitialState);

//Creating provider for the context
export const FilterProvider = ({children}) => {
    const [state, dispatch] = useReducer(filterReducer, filterInitialState);

    function initialProductList(products){
        dispatch({
            type: "PRODUCT_LIST",
            payload: {
                products: products
            }
        })
    }

    function bestsellerProducts(products){ 
        if(state.bestSellerOnly){
            return products.filter((product) => product.best_seller === true); 
        }
        return products;
    }

    function instockProducts(products){ 
        if(state.onlyInStock){
            return products.filter((product) => product.in_stock === true); 
        }
        return products;
    }
    
    function sortByPrice(products)
    {
        if(state.sortBy === "LToH"){
            return products.sort((a, b) => a.price - b.price);
        }
        
        if(state.sortBy === "HToL"){
            return products.sort((a, b) => b.price - a.price);
        }
        
        return products;
    }
    
    function filterByRating(products)
    {
        if(state.rating === "4AndA"){
            return products.filter((product) => product.rating >= 4);
        }
        
        if(state.rating === "3AndA"){
            return products.filter((product) => product.rating >= 3);
        }

        if(state.rating === "2AndA"){
            return products.filter((product) => product.rating >= 2);
        }

        if(state.rating === "1AndA"){
            return products.filter((product) => product.rating >= 1);
        }

        return products;
    }

    const filteredProducts = filterByRating(sortByPrice(instockProducts(bestsellerProducts(state.productList))));
    const value = {
        state,
        dispatch,
        products: filteredProducts,
        initialProductList
    }

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    )
}

export const useFilter = () => {
    const context = useContext(FilterContext);
    return context;
}

