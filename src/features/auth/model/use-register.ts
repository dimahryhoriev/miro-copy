import { type ApiSchemas } from "@/shared/api/schema";
import { supabase } from "@/shared/api/supabase/client";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
    const registerMutation = useMutation(
        {
            mutationFn: async (
                data: ApiSchemas['RegisterRequest']
            ) => {
                const {
                    data: authData,
                    error,
                } = await supabase.auth.signUp(
                    {
                        email: data.email,
                        password: data.password,
                    },
                );

                if (error) throw error;
                return authData;
            }
        }
    );

    const register = (data: ApiSchemas['RegisterRequest']) => {
        registerMutation.mutate(data);
    };

    const errorMessage = registerMutation.isError
        ? registerMutation.error.message
        : undefined

    return {
        register,
        isPending: registerMutation.isPending,
        isSuccess: registerMutation.isSuccess,
        registeredEmail: registerMutation.variables?.email,
        errorMessage,
    };
}