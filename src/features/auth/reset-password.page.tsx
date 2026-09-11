import { ROUTES } from "@/shared/model/routes";
import { AuthLayout } from "./ui/auth-layout";
import { ResetPasswordForm } from "./ui/reset-password-form";
import { Link } from "react-router";

function ResetPasswordPage() {
    return (
        <AuthLayout
            title='Reset Password'
            description='Enter your email to receive a verification code'
            form={<ResetPasswordForm />}
            footerText={
                <>
                    {"Remember your password?"} <Link to={ROUTES.LOGIN}>Log In</Link>
                </>
            }
        >
        </AuthLayout>
    )
}

export const Component = ResetPasswordPage;