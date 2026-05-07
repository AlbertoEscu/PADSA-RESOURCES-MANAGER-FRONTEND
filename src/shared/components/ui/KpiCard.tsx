import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface Props {
  title: string;
  value: number;
  icon: string;
  loading?: boolean;
  onClick?: () => void;
  color?: "blue" | "green" | "purple" | "orange" | "cyan" | "indigo";
}

const colorMap = {
  blue: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
  green: "from-green-500/20 to-green-500/5 border-green-500/20",
  purple: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
  orange: "from-orange-500/20 to-orange-500/5 border-orange-500/20",
  cyan: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
  indigo: "from-indigo-500/20 to-indigo-500/5 border-indigo-500/20",
};

export const KpiCard = ({
  title,
  value,
  icon,
  loading,
  onClick,
  color = "blue",
}: Props) => {

  // 🔥 motion value
  const count = useMotionValue(0);

  // 🔥 transform to integer
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    if (loading) return;

    const controls = animate(count, value, {
      duration: 0.8,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [value, loading]);

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        cursor-pointer
        rounded-2xl p-4
        border
        bg-gradient-to-br ${colorMap[color]}
        backdrop-blur-xl
        transition-all duration-300
        hover:shadow-xl hover:shadow-black/20
      `}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>

        {loading ? (
          <div className="h-6 w-12 bg-white/10 animate-pulse rounded" />
        ) : (
          <motion.span className="text-2xl font-bold text-white">
            {rounded}
          </motion.span>
        )}
      </div>

      <div className="mt-3 text-sm text-padsa-text-secondary">
        {title}
      </div>
    </motion.div>
  );
};