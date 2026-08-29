import { Input } from "@/shared/ui/kit/input";

interface BoardCreationInputProps {
    value: string;
    onChange: (value: string) => void;
}

export function BoardNamingInput({
    value,
    onChange,
}: BoardCreationInputProps) {
    return (
        <Input
            id="search"
            placeholder="Enter board name..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full"
        />
    )
}