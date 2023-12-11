'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../types';
import { createClient } from '@/app/utils/supabase/client';

interface IAppContext {
    user: User | undefined;
    supabase: any; // Update to SupabaseClient
};

const AppContext = createContext<IAppContext | undefined>(undefined);

export function AppWrapper({ children }: {
    children: React.ReactNode;
}) {
    const supabase = createClient();

    const [user, setUser] = useState<User | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false); // Change to true when using Supabase

    useEffect(() => {
        const fetchCurrentUser = () => {
            try {
                setLoading(true);
                // Supabase fetch current user
                
            } catch (e) {
                // Handle error
                console.log(e);
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
            user,
            supabase
        }}>
            {children}
        </AppContext.Provider>
    );
};

export function useAppContext() {
    return useContext(AppContext);
};