import { Link } from "react-router-dom";
import { AuthLayout } from "./auth-layout";
import { ROUTES } from "@/shared/model/routes";

function RegisterPage() {
    return (
        <AuthLayout
            title='Sign Up'
            description='Enter your email and password to sign up'
            form={<form></form>}
            footerText={
                <>
                    {"Already have an account?"} <Link to={ROUTES.LOGIN}>Log In</Link>
                </>
            }
        >
        </AuthLayout>
    )
}

export const Component = RegisterPage;