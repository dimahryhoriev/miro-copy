export { BoardCard } from './board-card';
import { ROUTES } from '@/shared/model/routes';
import { Link, href } from 'react-router-dom';

export function BoardsListPage() {
    return (
        <div>
            Boards list
            <Link to={href(ROUTES.BOARD, { boardId: '1' })}>Board 1</Link>
        </div>
    )
}
