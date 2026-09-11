import 'react-router-dom';

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    BOARDS: '/boards',
    BOARD: '/boards/:boardId',
    FAVORITE_BOARDS: '/boards/favorite',
    RECENT_BOARDS: '/boards/recent',
    RESET_PASSWORD: '/reset-password',
    UPDATE_PASSWORD: '/update-password',
} as const;

export type PathParams = {
    [ROUTES.BOARD]: {
        boardId: string;
    }
}

declare module 'react-router-dom' {
    interface Register {
        pages: {
            [Route in keyof PathParams]: {
                params: PathParams[Route];
            }
        }
    }
}