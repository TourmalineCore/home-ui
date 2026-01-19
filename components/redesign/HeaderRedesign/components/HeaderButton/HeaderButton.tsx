import clsx from "clsx";
import { ReactNode } from "react";

export function HeaderButton({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick: (isOpen: boolean) => void;
}) {
  return (
    <button
      className={clsx(
        `header-button`,
        className,
      )}
      type="button"
      onClick={() => onClick(true)}
    >
      {children}
    </button>
  );
}
