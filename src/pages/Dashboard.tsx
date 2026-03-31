export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <h1
        className="
        text-2xl
        font-semibold
        tracking-tight
      "
      >
        Dashboard
      </h1>

      <div
        className="
        grid
        grid-cols-1 md:grid-cols-2 lg:grid-cols-3
        gap-6
      "
      >
        <Card title="Usuarios" value="124" />
        <Card title="Consultores" value="32" />
        <Card title="Reportes" value="18" />
      </div>
    </div>
  );
};

const Card = ({ title, value }: any) => (
  <div
    className="
    bg-padsa-surface
    border border-padsa-border
    rounded-xl
    p-5

    hover:border-padsa-primary/40

    transition-all duration-300
  "
  >
    <div className="text-padsa-text-secondary text-sm">{title}</div>

    <div className="text-2xl font-semibold mt-2">{value}</div>
  </div>
);

export default DashboardPage;
