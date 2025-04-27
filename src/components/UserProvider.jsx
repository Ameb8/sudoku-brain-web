import { createContext, useState, useEffect, useContext } from 'react';

// Create Context
export const UserContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

// Provider Component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/users/secured/me", {
                    credentials: "include", // Ensure cookies or tokens are sent with the request
                });
                if (!response.ok) throw new Error("Not logged in");
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
