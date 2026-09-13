import { SearchXIcon } from "lucide-react";
import { Button } from "../kit/button";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "../kit/alert";
import { useSession } from "@/shared/api/supabase";
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/model/routes";

interface NotFoundProps {
    onNavigate?: () => void;
};

export function NotFound({
    onNavigate,
}: NotFoundProps) {
    const { session } = useSession();
    const navigate = useNavigate();

    return (
        <div
            className='
                z-[9999] flex flex-1 lg:pb-15
                items-center justify-center
                bg-background p-4
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
                        <SearchXIcon
                            className="shrink-0"
                        />
                        <AlertTitle>
                            Page Not Found
                        </AlertTitle>
                    </div>
                    <AlertDescription>
                        The page you're looking for doesn't exist or has been moved.
                    </AlertDescription>
                </div>
                <div
                    className="flex"
                >
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={
                            onNavigate
                                ? onNavigate
                                : () => (
                                    navigate(
                                        session
                                            ? ROUTES.HOME
                                            : ROUTES.LOGIN
                                    )
                                )
                        }
                        className="w-full"
                    >
                        {
                            session
                                ? "Go to Home"
                                : "Log In"
                        }
                    </Button>
                </div>
            </Alert >
        </div >
    );
};