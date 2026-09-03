import { ROUTES } from "@/shared/model/routes";
import { supabase } from "@/shared/api/supabase";
import { Outlet, redirect } from "react-router-dom";

export function ProtectedRoute() {
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