"use client";
import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState, createContext, useContext } from "react";



type AuthContextType = {
    user: User | null;
    loading?: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user || null);
            setLoading(false);
            console.log("User state changed:", user?.phoneNumber);
        });
        return () => unsubscribe();
    }, [auth]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}