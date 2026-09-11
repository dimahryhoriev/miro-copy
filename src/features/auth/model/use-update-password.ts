import { type ApiSchemas } from "@/shared/api/schema";
import { supabase } from "@/shared/api/supabase";
import { ROUTES } from "@/shared/model/routes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useUpdatePassword() {
    const navigate = useNavigate();

    const updateMutation = useMutation({
        mutationFn: async (
            data: ApiSchemas['UpdatePasswordRequest']
        ) => {
            const {
                error,
            } = await supabase.auth.updateUser({
                password: data.password,
            });

            if (error) throw error;
        },
        onSuccess() {
            navigate(ROUTES.HOME);
        },
    });

    const updatePassword = (
        data: ApiSchemas['UpdatePasswordRequest']
    ) => {
        updateMutation.mutate(data);
    };

    const errorMessage = updateMutation.isError
        ? updateMutation.error.message
        : undefined

    return {
        updatePassword,
        isPending: updateMutation.isPending,
        isSuccess: updateMutation.isSuccess,
        errorMessage,
    };
};