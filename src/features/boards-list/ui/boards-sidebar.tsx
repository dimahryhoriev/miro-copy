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
        <div className={cn('w-64 border-r p-4 space-y-4', className)}>
            <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500 px-2">
                    Navigation
                </div>
                <Button
                    variant='ghost'
                    className="w-full justify-start"
                    asChild
                >
                    <Link
                        to={ROUTES.BOARDS}
                        className={
                            cn(
                                location.pathname === ROUTES.BOARDS
                                    ? 'bg-blue-500/10'
                                    : 'bg-transparent'
                            )
                        }
                    >
                        <LayoutGridIcon
                            className="mr-2 h-4 w-4"
                        />
                        All boards
                    </Link>
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                >
                    <Link
                        to={ROUTES.FAVORITE_BOARDS}
                        className={
                            cn(
                                location.pathname === ROUTES.FAVORITE_BOARDS
                                    ? 'bg-blue-500/10'
                                    : 'bg-transparent'
                            )
                        }
                    >
                        <StarIcon className="mr-2 h-4 w-4" />
                        Favorites
                    </Link>
                </Button>
                <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                >
                    <Link
                        to={ROUTES.RECENT_BOARDS}
                        className={
                            cn(
                                location.pathname === ROUTES.RECENT_BOARDS
                                    ? 'bg-blue-500/10'
                                    : 'bg-transparent'
                            )
                        }
                    >
                        <ClockIcon className="mr-2 h-4 w-4" />
                        Recents
                    </Link>
                </Button>
            </div>
        </div>
    )
}