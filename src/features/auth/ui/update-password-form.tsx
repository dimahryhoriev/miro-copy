import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/shared/ui/kit/field";
import { useUpdatePassword } from "../model/use-update-password";
import { Input } from "@/shared/ui/kit/input";
import z from "zod";
import { Button } from "@/shared/ui/kit/button";

const updatePasswordFormSchema = z.object({
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters.')
        .max(32, 'Password must be at most 32 characters.'),
    confirmPassword: z
        .string()
        .optional(),
}).refine(
    (data) => data.password === data.confirmPassword,
    {
        path: ['confirmPassword'],
        message: 'Passwords don\'t match',
    }
);

export function UpdatePasswordForm() {
    const form = useForm({
        resolver: zodResolver(updatePasswordFormSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const {
        updatePassword,
        isPending,
        errorMessage,
    } = useUpdatePassword();

    const onSubmit = form.handleSubmit(updatePassword);

    return (
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            placeholder="******"
                            autoComplete="off"
                            type="password"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Confirm new password</FieldLabel>
                        <Input
                            {...field}
                            id={field.name}
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                            type="password"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {errorMessage && <p className="text-destructive text-sm">{errorMessage}</p>}

            <Button
                disabled={isPending}
                type="submit"
                className="w-full"
            >
                Update Password
            </Button>
        </form>
    )
};