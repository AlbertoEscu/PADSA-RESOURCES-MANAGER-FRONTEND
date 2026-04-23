import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { empleadoProyectoService } from "../services/personalProyecto.service";
import { personalService } from "../services/personal.service";
import { projectService } from "../../projects/services/project.service";

interface ProyectoOption {
  id: number;
  nombre: string;
}

interface EmpleadoOption {
  id: number;
  nombre: string;
  idPerfil?: number;
}

interface PerfilOption {
  id: number;
  nombre: string;
}

interface Asignacion {
  idEmpleado: number;
  nombreEmpleado: string;
  idProyecto: number;
  nombreProyecto: string;
}

export const AltaPersonalProjectPage = () => {
  const navigate = useNavigate();

  const [proyectos, setProyectos] = useState<ProyectoOption[]>([]);
  const [empleados, setEmpleados] = useState<EmpleadoOption[]>([]);
  const [perfiles, setPerfiles] = useState<PerfilOption[]>([]);

  const [selectedProyecto, setSelectedProyecto] = useState<number | "">("");
  const [selectedEmpleado, setSelectedEmpleado] = useState<number | "">("");
  const [selectedPerfil, setSelectedPerfil] = useState<number | "">("");

  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * =========================
   * LOAD DATA
   * =========================
   */
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const empleadosData = await personalService.getAll();

      setEmpleados(
        empleadosData.map((e) => ({
          id: e.id,
          nombre: e.nombreCompleto,
          idPerfil: (e as any).perfilId, // 👈 si no viene tipado
        }))
      );

      const proyectosData = await projectService.getProjects();

      setProyectos(
        proyectosData.map((p: any) => ({
          id: p.id,
          nombre: p.nombre,
        }))
      );

      const perfilesData = await personalService.getPerfiles();
      setPerfiles(perfilesData);

    } catch (error) {
      console.error("Error cargando catálogos:", error);
    }
  };

  /**
   * =========================
   * FILTRO POR PERFIL
   * =========================
   */
  const empleadosFiltrados = selectedPerfil
    ? empleados.filter((e) => e.idPerfil === selectedPerfil)
    : empleados;

  /**
   * =========================
   * AGREGAR A LISTA
   * =========================
   */
  const handleAgregar = () => {
    if (!selectedEmpleado || !selectedProyecto) return;

    const empleado = empleados.find((e) => e.id === selectedEmpleado);
    const proyecto = proyectos.find((p) => p.id === selectedProyecto);

    if (!empleado || !proyecto) return;

    const exists = asignaciones.some(
      (a) =>
        a.idEmpleado === empleado.id &&
        a.idProyecto === proyecto.id
    );

    if (exists) return;

    setAsignaciones((prev) => [
      ...prev,
      {
        idEmpleado: empleado.id,
        nombreEmpleado: empleado.nombre,
        idProyecto: proyecto.id,
        nombreProyecto: proyecto.nombre,
      },
    ]);
  };

  /**
   * =========================
   * ELIMINAR
   * =========================
   */
  const handleEliminar = (index: number) => {
    setAsignaciones((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * =========================
   * GUARDAR (BULK)
   * =========================
   */
  const handleGuardar = async () => {
    if (asignaciones.length === 0) return;

    setLoading(true);

    try {
      const requests = asignaciones.map((a) =>
        empleadoProyectoService.create({
          clave: `EP-${a.idEmpleado}-${a.idProyecto}-${Date.now()}`,
          empleadoId: a.idEmpleado,
          proyectoId: a.idProyecto,
        })
      );

      await Promise.all(requests);

      navigate("/personal/projects");
    } catch (error) {
      console.error("Error al guardar asignaciones:", error);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full bg-padsa-surface-light border border-padsa-border rounded-lg px-3 py-2 text-sm";

  const labelStyle = "text-xs text-padsa-text-secondary mb-1 block";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 space-y-6"
    >
      <h1 className="text-2xl font-bold text-white">
        Nueva asignación Empleado - Proyecto
      </h1>

      <div className="bg-padsa-surface border border-padsa-border rounded-2xl p-6 space-y-6">

        {/* =========================
            SELECTS
        ========================== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* Proyecto */}
          <div>
            <label className={labelStyle}>Proyecto</label>
            <select
              value={selectedProyecto}
              onChange={(e) => setSelectedProyecto(Number(e.target.value))}
              className={inputStyle}
            >
              <option value="">Selecciona</option>
              {proyectos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Perfil */}
          <div>
            <label className={labelStyle}>Perfil</label>
            <select
              value={selectedPerfil}
              onChange={(e) => setSelectedPerfil(Number(e.target.value))}
              className={inputStyle}
            >
              <option value="">Todos</option>
              {perfiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Empleado */}
          <div>
            <label className={labelStyle}>Empleado</label>
            <select
              value={selectedEmpleado}
              onChange={(e) => setSelectedEmpleado(Number(e.target.value))}
              className={inputStyle}
            >
              <option value="">Selecciona</option>
              {empleadosFiltrados.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Agregar */}
          <div className="flex items-end">
            <button
              onClick={handleAgregar}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Agregar
            </button>
          </div>

        </div>

        {/* =========================
            LISTA
        ========================== */}
        <div className="mt-6">
          <table className="w-full text-sm">
            <thead className="text-left text-gray-400">
              <tr>
                <th>Empleado</th>
                <th>Proyecto</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {asignaciones.map((a, i) => (
                <tr key={i} className="border-t border-padsa-border">
                  <td>{a.nombreEmpleado}</td>
                  <td>{a.nombreProyecto}</td>
                  <td>
                    <button
                      onClick={() => handleEliminar(i)}
                      className="text-red-500"
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* =========================
            BOTONES
        ========================== */}
        <div className="flex justify-end gap-4 pt-4 border-t border-padsa-border">

          <button
            onClick={() => navigate("/personal/projects")}
            className="px-4 py-2 bg-padsa-surface-light rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={handleGuardar}
            disabled={loading || asignaciones.length === 0}
            className="px-6 py-2 bg-green-600 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>

        </div>
      </div>
    </motion.div>
  );
};