import { supabase } from "@/shared/api/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateLastOpened() {
    const queryClient = useQueryClient();

    const updateLastOpenedMutation = useMutation({
        mutationFn: async (boardId: string) => {
            const { error } = await supabase
                .from('boards')
                .update({ last_opened_at: new Date().toISOString() })
                .eq('id', boardId)

            if (error) throw error;
        },
        onSettled: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['boards'],
            });
        },
    });

    return {
        updateLastOpened: updateLastOpenedMutation.mutate,
    };
};