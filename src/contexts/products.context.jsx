import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener
    , createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import PRODUCTS from '../shopdata.json'

//the actual value you want to access
export const ProductsContext = createContext({
    products: [],
});

//the actual component
export const ProductsProvider = ({ children }) => {
    //TODO this will change to an API call to the DB
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products };

    return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
};