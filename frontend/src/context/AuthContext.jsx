import { useEffect, createContext, useState } from "react";
import api from "../api/api";
import { useContext } from "react";


const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const[checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try{
                const res = await api.get("/user/me");
                setUser(res.data.user);
            } catch{
                setUser(null);
            } finally{
                setCheckingAuth(false);
            }
        };

        checkAuth();
       
    }, []);

    const value = {
        user,
        setUser,
        checkingAuth,
        isLoggedIn: !!user,
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => useContext(AuthContext);