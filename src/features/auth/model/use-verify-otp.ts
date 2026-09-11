import { supabase } from "@/shared/api/supabase/client";
import { ROUTES } from "@/shared/model/routes";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export interface VerifyOtpParams {
    email: string;
    token: string;
    type: 'signup' | 'recovery';
};

export function useVerifyOtp() {
    const navigate = useNavigate();

    const verifyMutation = useMutation(
        {
            mutationFn: async ({
                email,
                token,
                type,
            }: VerifyOtpParams) => {
                const {
                    data,
                    error,
                } = await supabase.auth.verifyOtp(
                    {
                        email,
                        token,
                        type,
                    },
                );

                if (error) throw error;
                return {
                    data,
                    type,
                };
            },
            onSuccess({ type }) {
                if (type === 'signup') navigate(ROUTES.HOME);
                if (type === 'recovery') navigate(ROUTES.UPDATE_PASSWORD);
            },
        },
    );

    return {
        verifyOtp: verifyMutation.mutate,
        isPending: verifyMutation.isPending,
        errorMessage: verifyMutation.error?.message,
    };
};