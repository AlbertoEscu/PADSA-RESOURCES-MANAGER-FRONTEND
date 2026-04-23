import {
  LayoutDashboard,
  Building2,
  Clock,
  CreditCard,
  DollarSign,
  FileText,
  BadgeCheck,
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
      {
        label: "Perfiles",
        icon: BadgeCheck,
        children: [
          {
            label: "Consulta Perfiles",
            path: "/perfiles",
          },
        ],
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
  /**
   * ==========================================
   * MÓDULO Proyectos
   * ==========================================
   */

  {
    basePath: "/projects",
    title: "Proyectos",
    items: [
      {
        label: "Proyectos",
        icon: Building2,
        children: [
          {
            label: "Datos Generales",
            path: "/projects",
          },
        ],
      },

      // ✅ WIZARD (oculto pero usable)
      {
        label: "Alta Proyecto",
        icon: Building2,
        hidden: true,
        children: [
          {
            label: "Datos Generales",
            path: "/projects/new",
          },
        ],
      },

      // ✅ SOLO EDIT oculto (opcional)
      {
        label: "Editar Proyecto",
        icon: Building2,
        hidden: true,
        children: [
          {
            label: "Editar",
            path: "/projects/edit/",
            hidden: true,
          },
        ],
      },
    ],
  },
  /**
   * ==========================================
   * MÓDULO CLIENTES
   * ==========================================
   */

  {
    basePath: "/clients",
    title: "Clientes",
    items: [
      {
        label: "Clientes",
        icon: Building2,
        children: [
          {
            label: "Datos Generales",
            path: "/clients",
          },
        ],
      },

      // ✅ WIZARD (oculto pero usable)
      {
        label: "Alta Cliente",
        icon: Building2,
        hidden: true,
        children: [
          {
            label: "Datos Generales",
            path: "/clients/new",
          },
        ],
      },

      // ✅ SOLO EDIT oculto (opcional)
      {
        label: "Editar Cliente",
        icon: Building2,
        hidden: true,
        children: [
          {
            label: "Editar",
            path: "/clients/edit/",
            hidden: true,
          },
        ],
      },
    ],
  },
  /**
   * ==========================================
   * MÓDULO PERFILES
   * ==========================================
   */
  {
    basePath: "/perfiles",
    title: "Perfiles",
    items: [
      {
        label: "Perfiles",
        icon: Building2,
        children: [
          {
            label: "Consulta Perfiles",
            path: "/perfiles",
          },
        ],
      },

      // ✅ CREATE (oculto)
      {
        label: "Alta Perfil",
        icon: Building2,
        hidden: true,
        children: [
          {
            label: "Nuevo Perfil",
            path: "/perfiles/new",
          },
        ],
      },

      // ✅ EDIT (oculto)
      {
        label: "Editar Perfil",
        icon: Building2,
        hidden: true,
        children: [
          {
            label: "Editar",
            path: "/perfiles/edit/",
            hidden: true,
          },
        ],
      },
    ],
  },
];
