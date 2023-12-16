import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener
    , createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
    //TODO this will change to an API call to the DB
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        //if calling an async function within useEffect, declare a new async function
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
        
    }, [] //only run when the provider gets mounted, not every load or change
    );

    const value = { categoriesMap };

    return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
};