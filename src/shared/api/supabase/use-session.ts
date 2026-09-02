import { useEffect, useState } from "react";
import { type Session } from "@supabase/supabase-js";
import { supabase } from "./client";

export function useSession() {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(
            (
                _event,
                session,
            ) => {
                setSession(session);
                setIsLoading(false);
            },
        );

        supabase.auth.getSession()
            .then(
                ({ data }) => {
                    setSession(data.session)
                }
            )
            .finally(
                () => {
                    setIsLoading(false);
                }
            );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return {
        session,
        isLoading,
    };
};