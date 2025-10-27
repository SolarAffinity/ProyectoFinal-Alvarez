# ProyectoFinal+Alvarez — Solar Affinity (React + Vite + Firebase)

SPA de e‑commerce:listado/detalle de productos, navegación SPA con React Router,
**Context** para carrito, **Firestore** (productos + generación de órdenes), loaders y mensajes condicionales.

## Requisitos previos
- **Node.js LTS 20.x** (o 22.x) — indispensable
- **Git** (opcional pero recomendado)
- **VS Code** con extensiones: *ESLint* y *Prettier* (opcional)
- Una cuenta de **Firebase** con Firestore activado

## Configuración
1. Descarga y descomprime este ZIP.
2. Abre la carpeta en VS Code.
4. Instala dependencias:
   ```bash
   npm install
   ```
5. Ejecuta en modo desarrollo:
   ```bash
   npm run dev
   ```

## Seed 
En `scripts/seed-products.json` hay **15+ productos** de ejemplo.

## Build / Deploy
```bash
npm run build
npm run preview
```

> Sugerido para deploy: **Vercel** o **Netlify**.
