import { supabase } from "@/shared/api/supabase";
import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/session";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

interface ConfirmEmailParams {
    email: string;
    token: string;
};

export function useConfirmEmail() {
    const navigate = useNavigate();
    const session = useSession();

    const verifyMutation = useMutation(
        {
            mutationFn: async ({
                email,
                token,
            }: ConfirmEmailParams) => {
                const {
                    data,
                    error,
                } = await supabase.auth.verifyOtp(
                    {
                        email,
                        token,
                        type: 'signup',
                    },
                );

                if (error) throw error;
                return data;
            },
            onSuccess(data) {
                if (data.session?.access_token) {
                    session.login(data.session.access_token);
                    navigate(ROUTES.HOME);
                };
            },
        },
    );

    return {
        confirmEmail: verifyMutation.mutate,
        isPending: verifyMutation.isPending,
        errorMessage: verifyMutation.error?.message,
    };
};