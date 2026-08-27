export function Actions({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            className="
                    absolute left-1/2 sm:left-4 bottom-12 sm:bottom-auto sm:top-1/2
                    flex flex-row gap-2 bg-white p-1 sm:flex-col
                    rounded-md shadow -translate-y-0 -translate-x-1/2
                    sm:-translate-y-1/2 sm:-translate-x-0
                "
        >
            {children}
        </div>
    )
}