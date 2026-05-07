import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../auth/context/useAuth";
import { useNavigate } from "react-router-dom";
import { dashboardService } from "../services/dashboard.service";
import type { DashboardKpis } from "../types/dashboard.types";
import { KpiCard } from "../../../shared/components/ui/KpiCard";
import logo from "../../../assets/logo.png";

export const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [error] = useState<string | null>(null);

  const [kpis, setKpis] = useState<DashboardKpis | null>(null);
  const [kpisLoading, setKpisLoading] = useState(true);

  const loadKpis = async () => {
    try {
      setKpisLoading(true);
      const response = await dashboardService.getKpis();
      setKpis(response);
    } catch (err) {
      console.error("Error cargando KPIs", err);
    } finally {
      setKpisLoading(false);
    }
  };

  useEffect(() => {
    loadKpis();
  }, []);

  const kpiConfig = [
    { key: "personal", title: "Personal", icon: "👤", color: "blue", path: "/personal" },
    { key: "perfiles", title: "Perfiles", icon: "🪪", color: "purple", path: "/perfiles" },
    { key: "clientes", title: "Clientes", icon: "🏢", color: "cyan", path: "/clients" },
    { key: "proyectos", title: "Proyectos", icon: "📁", color: "indigo", path: "/projects" },
    { key: "companias", title: "Compañías", icon: "🏭", color: "orange", path: "/companies" },
    { key: "tarifas", title: "Tarifas", icon: "💰", color: "green", path: "/rates" },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative space-y-8 overflow-hidden"
    >

      {/* 🌌 BACKGROUND GRID */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* ✨ PARTICULAS */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: 0,
            }}
            animate={{
              y: ["0%", "-20%", "0%"],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Bienvenido, {user?.username} 👋
        </h1>

        <p className="text-padsa-text-secondary mt-1">
          Administración general de recursos activos.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiConfig.map((kpi) => (
          <KpiCard
            key={kpi.key}
            title={kpi.title}
            value={kpis?.[kpi.key] ?? 0}
            loading={kpisLoading}
            icon={kpi.icon}
            color={kpi.color}
            onClick={() => navigate(kpi.path)}
          />
        ))}
      </div>

      <div className="h-px bg-padsa-border my-6"></div>

      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-xl">
          {error}
        </div>
      )}

      {/* 🧠 HERO */}
      <div className="relative flex flex-col items-center justify-center py-20">

        {/* GLOW dinámico */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl"
        />

        {/* LOGO flotante */}
        <motion.img
          src={logo}
          alt="Logo"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -10, 0]
          }}
          transition={{
            duration: 0.6,
            y: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="w-40 md:w-56 lg:w-64 relative z-10 drop-shadow-2xl"
        />

        {/* TEXTO */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-white">
            Plataforma de Gestión PADSA
          </h2>

          <p className="text-padsa-text-secondary mt-2 max-w-md">
            Administra catálogos, recursos y reportes desde un solo lugar.
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
};