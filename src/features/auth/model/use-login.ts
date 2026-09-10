import { type ApiSchemas } from "@/shared/api/schema";
import { supabase } from "@/shared/api/supabase/client";
import { ROUTES } from "@/shared/model/routes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const navigate = useNavigate();

    const loginMutation = useMutation(
        {
            mutationFn: async (
                data: ApiSchemas['LoginRequest']
            ) => {
                const {
                    data: authData,
                    error,
                } = await supabase.auth.signInWithPassword(
                    {
                        email: data.email,
                        password: data.password,
                    },
                );

                if (error) throw error;
                return authData;
            },
            onSuccess() {
                navigate(ROUTES.HOME);
            },
        },
    );

    const login = (data: ApiSchemas['LoginRequest']) => {
        loginMutation.mutate(data);
    };

    const errorMessage = loginMutation.isError
        ? loginMutation.error.message
        : undefined

    return {
        login,
        isPending: loginMutation.isPending,
        errorMessage,
    };
}