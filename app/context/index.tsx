'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { error } from 'console';

interface IAppContext {
    user: User | undefined;
};

const AppContext = createContext<IAppContext | undefined>(undefined);

export function AppWrapper({ children }: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false); // Change to true when using Supabase

    useEffect(() => {
        const fetchCurrentUser = () => {
            try {
                setLoading(true);
                // Supabase fetch current user
                
            } catch (error) {
                // Handle error
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCurrentUser();
    }, []);

    if (loading) return (
        <div>
            Loading...
        </div>
    ); // Update to skeleton loader

    return (
        <AppContext.Provider value={{
            user
        }}>
            {children}
        </AppContext.Provider>
    );
};

export function useAppContext() {
    return useContext(AppContext);
};