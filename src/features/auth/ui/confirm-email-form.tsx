import { Field, FieldLabel, FieldError } from "@/shared/ui/kit/field";
import { Button } from "@/shared/ui/kit/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from 'react-hook-form';
import {
    type SlotProps,
    OTPInput,
    REGEXP_ONLY_DIGITS
} from 'input-otp';
import { z } from 'zod';
import { useConfirmEmail } from "../model/use-confirm-email";
import { cn } from "@/shared/lib/css";


const confirmOtpSchema = z.object({
    token: z
        .string()
        .min(1, 'Code is required')
        .min(6, 'Code must be at least 6 characters')
});

type ConfirmOtpFormValues = z.infer<typeof confirmOtpSchema>;

interface ConfirmEmailFormProps {
    email: string;
};

export function ConfirmEmailForm({
    email
}: ConfirmEmailFormProps) {
    const form = useForm<ConfirmOtpFormValues>({
        resolver: zodResolver(confirmOtpSchema),
        defaultValues: {
            token: '',
        },
    });

    const { confirmEmail, isPending, errorMessage } = useConfirmEmail();

    const onSubmit = form.handleSubmit(
        (data) => {
            confirmEmail({
                email,
                token: data.token.trim(),
            });
        },
    );

    return (
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <p className="text-sm text-muted-foreground">
                We sent a verification code to:{" "}
                <span className="font-semibold text-foreground">
                    {email}
                </span>
            </p>

            <Controller
                name="token"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Verification Code</FieldLabel>
                        <OTPInput
                            maxLength={8}
                            value={field.value}
                            onChange={field.onChange}
                            pattern={REGEXP_ONLY_DIGITS}
                            containerClassName="flex justify-between w-full gap-2"
                            render={
                                ({
                                    slots
                                }) => (
                                    <>
                                        {
                                            slots.map((slot, idx) => (
                                                <OtpSlot
                                                    key={idx}
                                                    {...slot}
                                                />
                                            ))
                                        }
                                    </>
                                )
                            }
                        />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {errorMessage && <p className="text-destructive text-sm">{errorMessage}</p>}

            <Button disabled={isPending} type="submit" className="w-full">
                {
                    isPending
                        ? "Verifying..."
                        : "Verify Code"
                }
            </Button>
        </form>
    )
}

function OtpSlot(
    props: SlotProps
) {
    return (
        <div
            className={
                cn(
                    'flex flex-1 h-12 text-xl font-mono font-semibold items-center',
                    'justify-center border rounded-md transition-all',
                    props.isActive
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-input'
                )
            }
        >
            {
                props.char !== null ? props.char : ''
            }
            {
                props.hasFakeCaret
                &&
                <span
                    className="w-0.5 h-5 bg-foreground animate-pulse"
                />
            }
        </div>
    )
}