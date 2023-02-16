import React, { useState, useEffect } from 'react'
const Context = React.createContext({
    isLoggedIn: false,
    onLogin: (email, password) => { },
    onLogout: () => { }
})

export const ContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            setIsLoggedIn(true)
        }
    }, []);


    const loginHandler = (email, password) => {
        setIsLoggedIn(true);
        console.log(Context);
    };
    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn')
        setIsLoggedIn(false);
    };
    return (
        <Context.Provider value={{ onLogin: loginHandler, onLogout: logoutHandler, isLoggedIn: isLoggedIn }} >
            {props.children}
        </Context.Provider >
    )
}



export default Context 
