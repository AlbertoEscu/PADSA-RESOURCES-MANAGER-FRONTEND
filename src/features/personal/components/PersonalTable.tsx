interface Personal {
  numero: string;
  compania: string;
  nombre: string;
  curp: string;
  rfc: string;
  telefono: string;
  email: string;
  direccion: string;
  esquema: string;
  tipo: string;
  nss: string;
  fechaAlta: string;
  fechaBaja: string;
  fechaMod: string;
  usuarioMod: string;
}

interface Props {
  data: Personal[];
  loading: boolean;
}

const PersonalTable = ({ data, loading }: Props) => {
  if (loading) return <p className="text-white">Cargando...</p>;

  return (
    <div className="overflow-auto">
      <table className="min-w-full text-sm text-white">
        <thead className="bg-blue-600">
          <tr>
            <th className="px-4 py-2">Número Personal</th>
            <th className="px-4 py-2">Compañía</th>
            <th className="px-4 py-2">Nombre Completo</th>
            <th className="px-4 py-2">CURP</th>
            <th className="px-4 py-2">RFC</th>
            <th className="px-4 py-2">Teléfono</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Dirección</th>
            <th className="px-4 py-2">Esquema</th>
            <th className="px-4 py-2">Tipo Recurso</th>
            <th className="px-4 py-2">NSS</th>
            <th className="px-4 py-2">Fecha Alta</th>
            <th className="px-4 py-2">Fecha Baja</th>
            <th className="px-4 py-2">Fecha Mod</th>
            <th className="px-4 py-2">Usuario Mod</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>

        <tbody>
          {data.map((p, i) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0 ? "bg-green-600/40" : "bg-green-400/30"
              } hover:bg-blue-500/40 transition`}
            >
              <td className="px-4 py-2">{p.numero}</td>
              <td className="px-4 py-2">{p.compania}</td>
              <td className="px-4 py-2">{p.nombre}</td>
              <td className="px-4 py-2">{p.curp}</td>
              <td className="px-4 py-2">{p.rfc}</td>
              <td className="px-4 py-2">{p.telefono}</td>
              <td className="px-4 py-2">{p.email}</td>
              <td className="px-4 py-2">{p.direccion}</td>
              <td className="px-4 py-2">{p.esquema}</td>
              <td className="px-4 py-2">{p.tipo}</td>
              <td className="px-4 py-2">{p.nss}</td>
              <td className="px-4 py-2">{p.fechaAlta}</td>
              <td className="px-4 py-2">{p.fechaBaja}</td>
              <td className="px-4 py-2">{p.fechaMod}</td>
              <td className="px-4 py-2">{p.usuarioMod}</td>
              <td className="px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-lg text-white transition">
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonalTable;
