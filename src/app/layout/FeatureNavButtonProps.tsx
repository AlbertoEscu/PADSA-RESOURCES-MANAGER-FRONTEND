import { Link, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

interface FeatureNavButtonProps {
  to: string;
  children: ReactNode;
}

export default function FeatureNavButton({
  to,
  children,
}: FeatureNavButtonProps) {

  const location = useLocation();

  const isActive = location.pathname.startsWith(to);

  const baseClasses = `
    w-full
    rounded-lg
    py-2
    px-3
    text-left
    transition
    duration-200
    ease-in-out
    transform
    backdrop-blur-lg
    active:scale-95
  `;

  const activeClasses = `
    bg-blue-500/80
    text-white
    shadow-lg
    shadow-blue-900/40
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
    <Link to={to} className="w-full">
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