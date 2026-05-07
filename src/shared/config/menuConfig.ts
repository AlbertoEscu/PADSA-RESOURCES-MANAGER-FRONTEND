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
  {
    basePath: "/dashboard",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        label: "Catálogos",
        icon: Building2,
        children: [
          { label: "Personal", path: "/personal" },
          { label: "Perfiles", path: "/perfiles" },
          { label: "Clientes", path: "/clients" },
          { label: "Proyectos", path: "/projects" },
          { label: "Compañías", path: "/companies" },
          { label: "Tarifas", path: "/rates" },
        ],
      },
      {
        label: "Reportes",
        icon: FileText,
        children: [
          { label: "Reporte Axity", path: "/reports" },
          { label: "Horas Mes/Recurso", path: "/hours" },
        ],
      },
    ],
  },

  {
    basePath: "/companies",
    title: "Detalles de compañía",
    items: [
      {
        label: "Compañía",
        icon: Building2,
        children: [
          { label: "Datos Generales", path: "/companies" },
          { label: "Nueva compañía", path: "/companies/new", hidden: true },
          { label: "Editar compañía", path: "/companies/edit/", hidden: true },
        ],
      },
    ],
  },

  {
    basePath: "/hours",
    title: "Horas Mes / Recurso",
    items: [
      {
        label: "Horas",
        icon: Clock,
        children: [
          { label: "Consulta Horas", path: "/hours" },
          { label: "Nuevo registro", path: "/hours/new", hidden: true },
          { label: "Editar registro", path: "/hours/edit/", hidden: true },
        ],
      },
    ],
  },

  {
    basePath: "/payments",
    title: "Pagos",
    items: [
      {
        label: "Pagos",
        icon: CreditCard,
        children: [
          { label: "Consulta Pagos", path: "/payments" },
          { label: "Nuevo registro", path: "/payments/new", hidden: true },
          { label: "Editar registro", path: "/payments/edit/", hidden: true },
        ],
      },
    ],
  },

  {
    basePath: "/rates",
    title: "Tarifas",
    items: [
      {
        label: "Tarifas",
        icon: DollarSign,
        children: [
          { label: "Consulta Tarifas", path: "/rates" },
          { label: "Nuevo registro", path: "/rates/new", hidden: true },
          { label: "Editar registro", path: "/rates/edit/", hidden: true },
        ],
      },
    ],
  },

  {
    basePath: "/personal",
    title: "Personal",
    items: [
      {
        label: "Personal",
        icon: Building2,
        children: [
          { label: "Datos Generales", path: "/personal" },
          { label: "Proyecto", path: "/personal/projects" },
          { label: "Nuevo personal", path: "/personal/new", hidden: true },
          { label: "Editar personal", path: "/personal/edit/", hidden: true },
        ],
      },
    ],
  },

  {
    basePath: "/projects",
    title: "Proyectos",
    items: [
      {
        label: "Proyectos",
        icon: Building2,
        children: [
          { label: "Datos Generales", path: "/projects" },
          { label: "Nuevo proyecto", path: "/projects/new", hidden: true },
          { label: "Editar proyecto", path: "/projects/edit/", hidden: true },
        ],
      },
    ],
  },

  {
    basePath: "/clients",
    title: "Clientes",
    items: [
      {
        label: "Clientes",
        icon: Building2,
        children: [
          { label: "Datos Generales", path: "/clients" },
          { label: "Nuevo cliente", path: "/clients/new", hidden: true },
          { label: "Editar cliente", path: "/clients/edit/", hidden: true },
        ],
      },
    ],
  },

  {
    basePath: "/perfiles",
    title: "Perfiles",
    items: [
      {
        label: "Perfiles",
        icon: Building2,
        children: [
          { label: "Consulta Perfiles", path: "/perfiles" },
          { label: "Nuevo perfil", path: "/perfiles/new", hidden: true },
          { label: "Editar perfil", path: "/perfiles/edit/", hidden: true },
        ],
      },
    ],
  },
];