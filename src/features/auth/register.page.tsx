import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/model/routes";
import { AuthLayout } from "./ui/auth-layout";
import { RegisterForm } from "./ui/register-form";

function RegisterPage() {
    return (
        <AuthLayout
            title='Sign Up'
            description='Enter your email and password to sign up'
            form={<RegisterForm />}
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