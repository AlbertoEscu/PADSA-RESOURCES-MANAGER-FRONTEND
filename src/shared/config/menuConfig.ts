import {
  LayoutDashboard,
  Building2,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
} from "lucide-react";

export interface SubMenuItem {
  label: string;
  path: string;
  hidden?: boolean;
}

export interface MenuItem {
  label: string;
  path?: string;
  icon: any;
  children?: SubMenuItem[];
  hidden?: boolean; //  FIX
}

export interface ModuleMenu {
  basePath: string;
  title?: string;
  items: MenuItem[];
}

export const menuConfig: ModuleMenu[] = [
  /**
   * ==========================================
   * DASHBOARD (MENÚ PRINCIPAL)
   * ==========================================
   */
  {
    basePath: "/dashboard",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Detalles compañía",
        icon: Building2,
        children: [
          {
            label: "Datos Generales",
            path: "/companies",
          },
        ],
      },
      {
        label: "Horas Mes/Recurso",
        icon: Clock,
        children: [
          {
            label: "Consulta Horas",
            path: "/hours",
          },
        ],
      },
      {
        label: "Información pagos",
        icon: CreditCard,
        children: [
          {
            label: "Consulta Pagos",
            path: "/payments",
          },
        ],
      },
      {
        label: "Tarifas recurso",
        icon: DollarSign,
        children: [
          {
            label: "Consulta Tarifas",
            path: "/rates",
          },
        ],
      },
      {
        label: "Generar reportes",
        path: "/reports",
        icon: FileText,
      },
    ],
  },

  /**
   * ==========================================
   * MÓDULO COMPANIES
   * ==========================================
   */
  {
    basePath: "/companies",
    title: "Detalles de compañía",
    items: [
      {
        label: "Compañía",
        icon: Building2,
        children: [
          {
            label: "Datos Generales",
            path: "/companies",
          },

          {
            label: "Nueva compañía",
            path: "/companies/new",
            hidden: true,
          },

          {
            label: "Editar compañía",
            path: "/companies/edit/",
            hidden: true,
          },
        ],
      },
    ],
  },

  /**
   * ==========================================
   * MÓDULO HORAS MES / RECURSO
   * ==========================================
   */
  {
    basePath: "/hours",
    title: "Horas Mes / Recurso",
    items: [
      {
        label: "Horas",
        icon: Clock,
        children: [
          {
            label: "Consulta Horas",
            path: "/hours",
          },

          {
            label: "Nuevo registro",
            path: "/hours/new",
            hidden: true,
          },

          {
            label: "Editar registro",
            path: "/hours/edit/",
            hidden: true,
          },
        ],
      },
    ],
  },
  /**
   * ==========================================
   * MÓDULO INFORMACION DE PAGOS
   * ==========================================
   */
  {
    basePath: "/payments",
    title: "Información de Pagos",
    items: [
      {
        label: "Pagos",
        icon: CreditCard,
        children: [
          {
            label: "Consulta Pagos",
            path: "/payments",
          },

          {
            label: "Nuevo registro",
            path: "/payments/new",
            hidden: true,
          },

          {
            label: "Editar registro",
            path: "/payments/edit/",
            hidden: true,
          },
        ],
      },
    ],
  },
  /**
   * ==========================================
   * MÓDULO INFORMACION DE Tarifas por recurso
   * ==========================================
   */
  {
    basePath: "/rates",
    title: "Información de Tarifas por Recurso",
    items: [
      {
        label: "Tarifas",
        icon: DollarSign,
        children: [
          {
            label: "Consulta Tarifas",
            path: "/rates",
          },

          {
            label: "Nuevo registro",
            path: "/rates/new",
            hidden: true,
          },

          {
            label: "Editar registro",
            path: "/rates/edit/",
            hidden: true,
          },
        ],
      },
    ],
  },
  /**
   * ==========================================
   * MÓDULO PERSONAL
   * ==========================================
   */

  {
    basePath: "/personal",
    title: "Personal",
    items: [
      {
        label: "Personal",
        icon: Building2,
        children: [
          {
            label: "Datos Generales",
            path: "/personal",
          },
          {
            label: "Perfil / Habilidades",
            path: "/personal/profile",
          },
          {
            label: "Proyecto",
            path: "/personal/projects",
          },
        ],
      },

      // ✅ WIZARD (oculto pero usable)
      {
        label: "Alta Personal",
        icon: Building2,
        hidden: true,
        children: [
          {
            label: "Datos Generales",
            path: "/personal/new",
          },
          {
            label: "Perfil",
            path: "/personal/new/profile",
          },
          {
            label: "Habilidades",
            path: "/personal/new/skills",
          },
          {
            label: "Proyecto",
            path: "/personal/new/project",
          },
        ],
      },

      // ✅ SOLO EDIT oculto (opcional)
      {
        label: "Editar personal",
        icon: Building2,
        hidden: true,
        children: [
          {
            label: "Editar",
            path: "/personal/edit/",
            hidden: true,
          },
        ],
      },
    ],
  },
];
