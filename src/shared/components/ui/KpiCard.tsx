interface Props {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
}

export const KpiCard = ({ title, value, icon }: Props) => {
  return (
    <div
      className="bg-padsa-surface border border-padsa-border rounded-2xl p-5 flex items-center justify-between
hover:border-padsa-primary transition"
    >
      <div>
        <p className="text-sm text-padsa-text-secondary">{title}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
      </div>

      {icon && <div className="text-2xl text-padsa-text-secondary">{icon}</div>}
    </div>
  );
};
