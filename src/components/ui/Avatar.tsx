interface AvatarProps {
  name: string;
  size?: number;
}

export function Avatar({ name, size = 40 }: AvatarProps): JSX.Element {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="flex items-center justify-center rounded-full border border-border-soft bg-primary-soft font-display text-sm font-semibold text-accent"
    >
      {initials}
    </div>
  );
}
