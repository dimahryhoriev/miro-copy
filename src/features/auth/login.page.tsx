import { Link } from "react-router-dom";
import { AuthLayout } from "./auth-layout";
import { ROUTES } from "@/shared/model/routes";

function LoginPage() {
    return (
        <AuthLayout
            title='Log In'
            description='Enter your email and password to log in'
            form={<form></form>}
            footerText={
                <>
                    {"Don't have an account?"} <Link to={ROUTES.REGISTER}>Sign Up</Link>
                </>
            }
        >
        </AuthLayout>
    )
}

export const Component = LoginPage;