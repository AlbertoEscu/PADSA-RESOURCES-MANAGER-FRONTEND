import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface TopNavButtonProps {
  to: string;
  children: ReactNode;
}

export default function TopNavButton({ to, children }: TopNavButtonProps) {

  const location = useLocation();

  const isActive = location.pathname.startsWith(to);

  const baseClasses = `
    flex-1
    text-white
    px-4
    py-2
    rounded-xl
    transition
    duration-200
    ease-in-out
    transform
    backdrop-blur-md
    active:scale-95
    text-center
  `;

  const activeClasses = `
    bg-blue-500/80
    shadow-lg
    shadow-blue-900/40
    scale-105
  `;

  const inactiveClasses = `
    bg-gray-500/30
    text-gray-300
    hover:bg-blue-600
    hover:text-white
    hover:scale-105
    hover:shadow-lg
    hover:shadow-blue-900/40
  `;

  return (
    <Link to={to} className="flex-1">
      <button
        className={`${baseClasses} ${
          isActive ? activeClasses : inactiveClasses
        }`}
      >
        {children}
      </button>
    </Link>
  );
}