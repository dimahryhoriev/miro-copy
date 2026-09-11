import { useOnlineStatus } from '@/shared/lib/network/use-online-status';
import { NetworkError } from '@/shared/ui/states/network-error';
import { Outlet } from 'react-router-dom';

export function App() {
    const isOnline = useOnlineStatus();

    return (
        <div
            className='
                min-h-screen flex flex-col
            '
        >
            <Outlet />

            {
                !isOnline && <NetworkError />
            }
        </div>
    );
};