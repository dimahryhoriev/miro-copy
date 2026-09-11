import { type ApiSchemas } from "@/shared/api/schema";
import { supabase } from "@/shared/api/supabase";
import { useMutation } from "@tanstack/react-query";

export function useResetPassword() {
    const resetMutation = useMutation({
        mutationFn: async (
            data: ApiSchemas['ResetPasswordRequest']
        ) => {
            const {
                data: resetData,
                error,
            } = await supabase.auth.resetPasswordForEmail(
                data.email
            );

            if (error) throw error;
            return resetData;
        },
    });

    const resetPassword = (
        data: ApiSchemas['ResetPasswordRequest']
    ) => {
        resetMutation.mutate(data);
    };

    const errorMessage = resetMutation.isError
        ? resetMutation.error.message
        : undefined

    return {
        resetPassword,
        isPending: resetMutation.isPending,
        isSuccess: resetMutation.isSuccess,
        email: resetMutation.variables?.email,
        errorMessage,
    };
};