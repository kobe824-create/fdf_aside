"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type AuthContextType = {
    user: CachedUser | null;
    loading: boolean;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
};

interface CachedUser {
    id: string;
    phoneNumber: string;
    role: string;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<CachedUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        refreshUser(); // Fetch user on component mount
    }, []);

    const refreshUser = async () => {
        try {
            const response = await axios.get("/api/auth");
            setUser(response.data.user);
        } catch (error) {
            console.log("User not logged in", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        await axios.delete("/api/auth");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
