import { ROUTES } from "@/shared/model/routes";
import { Button } from "@/shared/ui/kit/button";
import { Link, useLocation } from "react-router";
import {
    LayoutGridIcon,
    StarIcon,
    ClockIcon,
} from 'lucide-react';
import { cn } from "@/shared/lib/css";

interface BoardsSidebarProps {
    className?: string;
}

export function BoardsSidebar({
    className
}: BoardsSidebarProps) {
    const location = useLocation();

    return (
        <div
            className={
                cn(
                    'w-full border-b p-4 space-y-4 bg-background sm:h-[100vh]',
                    'sm:border-r sm:border-b-0 sm:w-64 self-start sm:sticky top-[57px]',
                    className,
                )
            }
        >
            <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500 px-2">
                    Navigation
                </div>
                <Button
                    variant={
                        location.pathname === ROUTES.BOARDS
                            ? 'secondary'
                            : 'ghost'
                    }
                    className="w-full justify-start"
                    asChild
                >
                    <Link
                        to={ROUTES.BOARDS}
                    >
                        <LayoutGridIcon
                            className="mr-2 h-4 w-4"
                        />
                        All boards
                    </Link>
                </Button>
                <Button
                    variant={
                        location.pathname === ROUTES.FAVORITE_BOARDS
                            ? 'secondary'
                            : 'ghost'
                    }
                    className="w-full justify-start"
                    asChild
                >
                    <Link
                        to={ROUTES.FAVORITE_BOARDS}
                    >
                        <StarIcon className="mr-2 h-4 w-4" />
                        Favorites
                    </Link>
                </Button>
                <Button
                    variant={
                        location.pathname === ROUTES.RECENT_BOARDS
                            ? 'secondary'
                            : 'ghost'
                    }
                    className="w-full justify-start"
                    asChild
                >
                    <Link
                        to={ROUTES.RECENT_BOARDS}
                    >
                        <ClockIcon className="mr-2 h-4 w-4" />
                        Recents
                    </Link>
                </Button>
            </div>
        </div>
    )
}