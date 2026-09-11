import { InfoIcon } from "lucide-react";
import { Button } from "../kit/button";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "../kit/alert";
import { useEffect } from "react";

interface NetworkErrorProps {
    onRetry?: () => void;
};

export function NetworkError({
    onRetry = () => window.location.reload()
}: NetworkErrorProps) {
    useEffect(() => {
        const overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = overflow;
        };
    }, []);

    return (
        <div
            className='
                fixed inset-0 z-[9999] flex
                items-center justify-center
                bg-background/80
                backdrop-blur-sm p-4
                touch-none overscroll-contain
            '
        >
            <Alert
                variant="destructive"
                className="max-w-md gap-8"
            >
                <div
                    className="flex flex-col justify-between gap-4"
                >
                    <div
                        className="gap-2 flex items-center"
                    >
                        <InfoIcon
                            className="shrink-0"
                        />
                        <AlertTitle>
                            Network Error
                        </AlertTitle>
                    </div>
                    <AlertDescription>
                        Failed to connect to the server. Please check your internet connection and try again.
                    </AlertDescription>
                </div>
                <div
                    className="flex"
                >
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={onRetry}
                        className="w-full"
                    >
                        Try again
                    </Button>
                </div>
            </Alert >
        </div>
    );
};