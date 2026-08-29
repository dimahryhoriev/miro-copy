import { useState } from "react";

export function useBoardNaming() {
    const [name, setName] = useState('');

    return {
        name,
        setName,
    }
}