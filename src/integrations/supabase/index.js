import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const queryClient = new QueryClient();

export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

export function useEvents() {
    return useQuery('events', async () => {
        const { data, error } = await supabase.from('events').select('*');
        if (error) throw new Error(error.message);
        return data;
    });
}

export function useAddEvent() {
    const queryClient = useQueryClient();
    return useMutation(
        async (newEvent) => {
            const { data, error } = await supabase.from('events').insert(newEvent);
            if (error) throw new Error(error.message);
            return data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('events');
            },
        }
    );
}

export function useDeleteEvent() {
    const queryClient = useQueryClient();
    return useMutation(
        async (eventId) => {
            const { data, error } = await supabase.from('events').delete().eq('id', eventId);
            if (error) throw new Error(error.message);
            return data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('events');
            },
        }
    );
}
