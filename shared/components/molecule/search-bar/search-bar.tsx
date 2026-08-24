import { Search } from "lucide-react";
import { Input } from "../../input/input";

export interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
}

export function SearchBar({
  placeholder = "Cari",
  value,
  onChange,
  disabled = false,
}: SearchBarProps) {
  return (
    <div className="flex h-10 w-full max-w-265.5 items-center gap-2.5 rounded-lg border border-(--primary) bg-(--white) px-4">
      <Search
        size={20}
        strokeWidth={1.7}
        className="shrink-0 text-(--primary)"
        aria-hidden="true"
      />

      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-label="Cari"
        className="h-auto flex-1 border-0 bg-transparent p-0 focus:ring-0"
      />
    </div>
  );
}