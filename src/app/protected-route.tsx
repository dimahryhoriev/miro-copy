import { ROUTES } from "@/shared/model/routes";
import { supabase, useSession } from "@/shared/api/supabase";
import { Navigate, Outlet, redirect } from "react-router-dom";

export function ProtectedRoute() {
    const {
        session,
        isLoading,
    } = useSession();

    if (isLoading) {
        return null
    };

    if (!session) {
        return <Navigate replace to={ROUTES.LOGIN} />
    };

    return <Outlet />;
}

export async function protectedLoader() {
    const {
        data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
        return redirect(ROUTES.LOGIN);
    };

    return null;
}