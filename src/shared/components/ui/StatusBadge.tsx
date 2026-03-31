interface StatusBadgeProps {
  status: "Pendiente" | "Aprobado" | "Rechazado";
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const styles = {
    Pendiente:
      "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Aprobado:
      "bg-green-500/20 text-green-400 border-green-500/30",
    Rechazado:
      "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full border font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};