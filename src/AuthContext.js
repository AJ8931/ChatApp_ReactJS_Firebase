import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

const AuthContext = React.createContext();


export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [Loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const history = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
            user ? history('/chat') : history('/')

        })

    }, [user, history])
    const value = { user };

    return (
        <AuthContext.Provider value={value}>
            {!Loading && children}
        </AuthContext.Provider>
    )


}