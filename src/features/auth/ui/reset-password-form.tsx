import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { useResetPassword } from "../model/use-reset-password";
import { Field, FieldError, FieldLabel } from "@/shared/ui/kit/field";
import { Input } from "@/shared/ui/kit/input";
import { Button } from "@/shared/ui/kit/button";
import { VerifyOtpForm } from "./verify-otp-form";

const resetPasswordFormSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .pipe(z.email('Please enter a valid email address')),
});

export function ResetPasswordForm() {
    const form = useForm({
        resolver: zodResolver(resetPasswordFormSchema),
        defaultValues: {
            email: '',
        },
    });

    const {
        resetPassword,
        isPending,
        isSuccess,
        email,
        errorMessage,
    } = useResetPassword();

    const onSubmit = form.handleSubmit(resetPassword);

    return (
        <div className="flex flex-col gap-4">
            <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="user@gmail.com"
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {errorMessage && <p className="text-destructive text-sm">{errorMessage}</p>}

            {
                isSuccess && email
                    ? (
                        <VerifyOtpForm
                            email={email}
                            type='recovery'
                        />
                    )
                    : (
                        <form onSubmit={onSubmit}>
                            <Button
                                disabled={isPending}
                                type="submit"
                                className="w-full"
                            >
                                Reset Password
                            </Button>
                        </form>
                    )
            }
        </div>
    )
};