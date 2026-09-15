import { ROUTES } from '@/shared/model/routes';
import { App } from './app';
import { Providers } from './providers';
import { protectedLoader, ProtectedRoute } from './protected-route';
import { AppHeader } from '@/features/header';
import { NotFound } from '@/shared/ui/states/not-found';
import {
    createBrowserRouter,
    Outlet,
    redirect,
    ScrollRestoration,
} from 'react-router-dom';

export const router = createBrowserRouter([
    {
        element: (
            <Providers>
                <App />
                <ScrollRestoration />
            </Providers>
        ),
        children: [
            {
                element: (
                    <>
                        <AppHeader />
                        <Outlet />
                    </>
                ),
                children: [
                    {
                        loader: protectedLoader,
                        element: <ProtectedRoute />,
                        children: [
                            {
                                path: ROUTES.BOARDS,
                                lazy: () => import('@/features/boards-list/boards-list.page'),
                            },
                            {
                                path: ROUTES.FAVORITE_BOARDS,
                                lazy: () => import('@/features/boards-list/boards-list-favorite.page'),
                            },
                            {
                                path: ROUTES.RECENT_BOARDS,
                                lazy: () => import('@/features/boards-list/boards-list-recent.page'),
                            },
                            {
                                path: ROUTES.BOARD,
                                lazy: () => import('@/features/board/board.page'),
                            },
                        ],
                    },
                    {
                        path: '*',
                        element: <NotFound />,
                    },
                ],
            },
            {
                path: ROUTES.LOGIN,
                lazy: () => import('@/features/auth/login.page'),
            },
            {
                path: ROUTES.REGISTER,
                lazy: () => import('@/features/auth/register.page'),
            },
            {
                path: ROUTES.RESET_PASSWORD,
                lazy: () => import('@/features/auth/reset-password.page'),
            },
            {
                path: ROUTES.UPDATE_PASSWORD,
                lazy: () => import('@/features/auth/update-password.page'),
            },
            {
                path: ROUTES.HOME,
                loader: () => redirect(ROUTES.BOARDS),
            },
        ],
    },
])