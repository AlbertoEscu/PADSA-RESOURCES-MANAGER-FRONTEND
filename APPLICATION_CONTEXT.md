# Contexto de la aplicación

Este documento sirve como referencia compacta para cualquier desarrollador que se incorpore al proyecto **padsa-resources-manager-frontend**. Contiene las tecnologías empleadas, la estructura de carpetas principal y una descripción general de cómo funciona la aplicación.

---

## 1. Tecnologías principales

- **React** con **TypeScript**
- **Vite** como bundler/dev server
- **TailwindCSS** para estilos utilitarios
- **Framer Motion** para animaciones
- **React Router DOM** para enrutamiento
- **Axios** para llamadas HTTP

Se emplea también:
- `zod` para validaciones (npm package en `node_modules`)
- Hooks personalizados y contextos para manejo de estado

---

## 2. Estructura de carpetas (focus en `src/`)

```text
src/
├── api/                # Configuración de cliente HTTP
├── app/                # Rutas protegidas y router principal
├── assets/             # Imágenes, iconos, etc.
├── components/         # Componentes globales únicos
├── core/               # Funcionalidades fundamentales (authStorage)
├── features/           # Módulos funcionales (auth, dashboard, clients...)
│   └── ...             # Cada feature sigue el patrón pages/components/services/types
├── hooks/              # Hooks reutilizables
├── layouts/            # Layouts: AuthLayout, MainLayout, Sidebar, Header
├── models/             # Interfaces/modelos compartidos
├── pages/              # Páginas de alto nivel (Dashboard, Personal)
├── router/             # Configuración del router principal (AppRouter)
├── services/           # Servicios globales adicionales
├── shared/             # UI shared components, config, utils (jwt, menuConfig)
├── App.tsx             # Componente raíz
├── index.css           # Estilos globales
└── main.tsx            # Punto de entrada del bundle
```

La estructura por *feature* permite modularidad y escalabilidad: cada carpeta de característica agrupa sus páginas, componentes internos, servicios API y tipos TypeScript.

---

## 3. Comportamiento general de la aplicación

### Sidebar dinámico

- El sidebar identifica el módulo activo a partir de `location.pathname`.
- Cambia los ítems mostrados según el módulo (Dashboard, Recursos, etc.).
- Es colapsable y mantiene estado en `localStorage`.
- El ítem activo lleva un indicador animado (`layoutId`) y un glow sutil; el rojo se reserva para botones primarios.
- Incluye un botón para volver al menú principal si se navega dentro de un módulo.

### Dashboard

- Carga todos los registros desde el backend sin paginación.
- Filtra y págin­a en el frontend usando `slice()` y estados derivados.
- Filtros por columna con inputs en el `thead`. La página se resetea al cambiar filtros.
- Skeleton loader y estado vacío manejados con componentes dedicados.

### Autenticación

- Contexto global (`AuthContext`) y hook `useAuth` para siempre consultar el estado de sesión.
- `ProtectedRoute` envuelve rutas privadas y comprueba tokens JWT.
- Token y usuario almacenados en `authStorage` (localStorage/sessionStorage).
- Servicio `authService` usa Axios para llamadas de login/logout.

### Patrón de desarrollo

1. **Componentes desacoplados**: lógica en la página, presentación en componentes puros.
2. **Hooks reutilizables**: `useDebounce`, `useResources`, etc.
3. **Tipado exhaustivo**: interfaces en cada módulo.
4. **Animaciones consistentes**: entradas de página, microinteracciones con Framer Motion.
5. **Diseño pantone**: dark theme, superficies glass, paleta controlada.

---

## 4. Uso del documento

Este archivo debe ser la primera referencia cuando se revisa el proyecto o se inicia un nuevo desarrollo. Al crear un nuevo módulo, siga la estructura de carpetas y los patrones descritos arriba.  

---

*Fin del contexto de la aplicación.*
