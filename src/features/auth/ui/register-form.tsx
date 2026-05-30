import { Field, FieldLabel, FieldError } from "@/shared/ui/kit/field";
import { Button } from "@/shared/ui/kit/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/shared/ui/kit/input";
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRegister } from "../model/use-register";


const registerSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .pipe(z.email('Please enter a valid email address')),
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
)

export function RegisterForm() {
    const form = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    const { errorMessage, isPending, register } = useRegister();

    const onSubmit = form.handleSubmit(register);

    return (
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
                            placeholder="admin@gmail.com"
                            autoComplete="off"
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
                        <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
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

            <Button disabled={isPending} type="submit">
                Sign Up
            </Button>
        </form>
    )
}