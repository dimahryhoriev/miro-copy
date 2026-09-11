import { ROUTES } from "@/shared/model/routes";
import { AuthLayout } from "./ui/auth-layout";
import { UpdatePasswordForm } from "./ui/update-password-form";
import { Link } from "react-router";

function UpdatePasswordPage() {
    return (
        <AuthLayout
            title='Update Password'
            description='Enter your new password below'
            form={<UpdatePasswordForm />}
            footerText={
                <>
                    {"Remember your password?"} <Link to={ROUTES.LOGIN}>Log In</Link>
                </>
            }
        >
        </AuthLayout>
    )
}

export const Component = UpdatePasswordPage;