import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { menuConfig } from "../config/menuConfig";
import logo from "../../assets/logo.png";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

export const Sidebar = () => {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const [animateKey, setAnimateKey] = useState(0);

  /**
   * ==========================================
   * RESTORE COLLAPSE STATE
   * ==========================================
   */
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved) setCollapsed(saved === "true");
  }, []);

  const toggleSidebar = useCallback(() => {
    setCollapsed((prev) => {
      const newState = !prev;
      localStorage.setItem("sidebar-collapsed", String(newState));
      return newState;
    });
  }, []);

  /**
   * ==========================================
   * CURRENT MODULE
   * ==========================================
   */
  const currentModule = useMemo(() => {
    return (
      menuConfig.find((m) =>
        location.pathname.startsWith(m.basePath)
      ) || menuConfig[0]
    );
  }, [location.pathname]);

  const isMainModule = currentModule.basePath === "/dashboard";

  /**
   * ==========================================
   * ANIMATION KEY
   * ==========================================
   */
  useEffect(() => {
    setAnimateKey((prev) => prev + 1);
  }, [location.pathname]);

  /**
   * ==========================================
   * AUTO OPEN SUBMENU
   * ==========================================
   */
  useEffect(() => {
    const activeParent = currentModule.items.find((item) =>
      item.children?.some((sub) =>
        location.pathname.startsWith(sub.path)
      )
    );

    if (!activeParent) return;

    setOpenMenus((prev) => {
      if (prev.includes(activeParent.label)) return prev;
      return [...prev, activeParent.label];
    });
  }, [location.pathname, currentModule.items]);

  /**
   * ==========================================
   * TOGGLE SUBMENU
   * ==========================================
   */
  const toggleSubmenu = useCallback((label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  }, []);

  /**
   * ==========================================
   * ROUTE ACTIVE
   * ==========================================
   */
  const isRouteActive = useCallback(
    (path: string) => {
      const currentPath = location.pathname;

      if (path.endsWith("/")) {
        return currentPath.startsWith(path);
      }

      const hasChildRoute = currentModule.items.some((item) =>
        item.children?.some((child) =>
          child.path.startsWith(path + "/")
        )
      );

      if (hasChildRoute) {
        return currentPath === path;
      }

      return currentPath.startsWith(path);
    },
    [location.pathname, currentModule.items]
  );

  useEffect(() => {
    if (collapsed) setOpenMenus([]);
  }, [collapsed]);

  /**
   * ==========================================
   * STYLES
   * ==========================================
   */
  const navItem = `
    relative flex items-center gap-3
    px-3 py-2
    rounded-xl
    transition-all duration-200 ease-out
    hover:bg-padsa-surface-light
    hover:scale-[1.02] active:scale-[0.98]
  `;

  const active = `
    text-white
    bg-white/10
    shadow-[0_0_12px_rgba(255,255,255,0.15)]
    ring-1 ring-white/10
  `;

  const inactive = "text-padsa-text-secondary hover:text-white";

  return (
    <aside
      className={`
        h-screen bg-padsa-surface/95 backdrop-blur-xl
        border-r border-padsa-border flex flex-col
        transition-all duration-300 ease-in-out shadow-xl
        ${collapsed ? "w-16" : "w-64"}
      `}
    >
      {/* HEADER */}
      <div className="h-16 flex items-center justify-between px-3 border-b border-padsa-border">
        <div className="flex items-center gap-2">
          <motion.img
            src={logo}
            className="w-8"
            animate={{ scale: collapsed ? 0.9 : 1 }}
          />

          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="text-white font-semibold"
              >
                PADSA
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={toggleSidebar}
          className="p-1 text-padsa-text-secondary hover:text-white hover:bg-padsa-surface-light rounded"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* BACK BUTTON */}
      {!isMainModule && (
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 px-3 py-2 mb-2 rounded-xl text-padsa-text-secondary hover:text-white hover:bg-padsa-surface-light"
        >
          <ChevronLeft size={18} />
          {!collapsed && (
            <span className="text-sm font-medium">
              Volver al menú principal
            </span>
          )}
        </NavLink>
      )}

      {/* NAV */}
      <nav className="flex-1 p-2 overflow-y-auto">
        <LayoutGroup>
          <div key={animateKey} className="space-y-2">
            {currentModule.items
              .filter((item) => !item.hidden)
              .map((item) => {
                const Icon = item.icon;
                const isOpen = openMenus.includes(item.label);

                if (!item.children) {
                  const isActive = isRouteActive(item.path!);

                  return (
                    <NavLink
                      key={item.label}
                      to={item.path!}
                      className={`${navItem} ${
                        isActive ? active : inactive
                      } ${collapsed ? "justify-center" : ""}`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-indicator"
                          className={`
                            absolute
                            ${
                              collapsed
                                ? "inset-1 rounded-xl bg-white/10"
                                : "left-0 top-1 bottom-1 w-1 bg-white rounded-r-full"
                            }
                          `}
                        />
                      )}

                      <Icon size={20} />
                      {!collapsed && <span>{item.label}</span>}
                    </NavLink>
                  );
                }

                return (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleSubmenu(item.label)}
                      className={`${navItem} w-full justify-between ${
                        isOpen ? "bg-white/5 text-white" : inactive
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={20} />
                        {!collapsed && <span>{item.label}</span>}
                      </div>

                      {!collapsed && (
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      )}
                    </button>

                    <AnimatePresence initial={false}>
                      {!collapsed && isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.25,
                            ease: "easeInOut",
                          }}
                          className="overflow-hidden"
                        >
                          <div className="ml-8 mt-1 space-y-1">
                            {item.children
                              .filter(
                                (sub) =>
                                  !sub.hidden ||
                                  location.pathname.startsWith(sub.path)
                              )
                              .map((sub) => {
                                const isActive = isRouteActive(sub.path);

                                return (
                                  <NavLink
                                    key={sub.path}
                                    to={sub.path}
                                    className={`
                                      block px-3 py-2 text-sm rounded-lg
                                      ${
                                        isActive
                                          ? "bg-padsa-primary text-white"
                                          : "text-padsa-text-secondary hover:text-white hover:bg-padsa-surface-light"
                                      }
                                    `}
                                  >
                                    {sub.label}
                                  </NavLink>
                                );
                              })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
          </div>
        </LayoutGroup>
      </nav>

      {/* FOOTER */}
      <div className="p-3 border-t border-padsa-border">
        {!collapsed && (
          <div className="text-xs text-padsa-text-secondary">
            PADSA Enterprise AI
          </div>
        )}
      </div>
    </aside>
  );
};