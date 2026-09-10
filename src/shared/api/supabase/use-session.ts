import { type Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "./client";
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/model/routes";

export function useSession() {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

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

    const logout = async () => {
        await supabase.auth.signOut();
        setSession(null);
        navigate(ROUTES.LOGIN);
    };

    return {
        session,
        isLoading,
        logout,
    };
};