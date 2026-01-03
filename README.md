# Financial Dev Dashboard 🚀

Un dashboard de finanzas personales construido bajo la metodología SCRUM, enfocado en la visualización de datos en tiempo real y persistencia local.

## Características
Visualización Avanzada: Gráficos dinámicos (Línea, Donut, Barras) utilizando Recharts.

Gestión de Transacciones: CRUD completo de ingresos y gastos con filtrado automático.

Persistencia de Datos: Implementación de Custom Hooks para sincronización con localStorage.

UI/UX Moderna: Diseño responsivo "Mobile-First" con Tailwind CSS e iconos de alta calidad.

Arquitectura Limpia: Estructura de componentes atómicos y utilidades separadas por lógica de negocio.

## Stack Tecnológico
Core: React 18 + Vite.

Lenguaje: TypeScript (Tipado fuerte para seguridad de datos).

Estilos: Tailwind CSS.

Gráficos: Recharts.

Iconografía: React Icons (Heroicons).

## Arquitectura del Proyecto

```plaintext
src/
├── components/   # UI Reutilizable (Cards, Charts, Tables)
├── hooks/        # Lógica de persistencia (useLocalStorage)
├── types/        # Definiciones de interfaces TypeScript
├── utils/        # Formatters y Agregadores de datos
└── App.tsx       # Orquestador del Dashboard
```

## Aprendizajes Clave
Durante este proyecto, implementé:

Agregación de datos: Lógica para transformar transacciones crudas en formatos legibles para gráficos.

Metodologías Ágiles: Desarrollo basado en User Stories y Epics.

Optimización de Renderizado: Uso eficiente de estados de React para evitar re-renders innecesarios en la tabla de datos.

Creado por Armando Garrido (alef lemat) - [GitHub]()