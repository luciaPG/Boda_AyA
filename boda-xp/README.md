# Boda XP

App React + Vite preparada para desplegar en Vercel con una API serverless base en `api/`.

## Deploy en Vercel

1. Sube el repositorio a GitHub.
2. Importa el proyecto en Vercel.
3. Vercel detectará `npm run build` y usará `dist` como salida.
4. Las rutas backend viven en `api/` y se publican como funciones serverless.

## Endpoints

- `GET /api/health` para comprobar que la API está viva.
- `GET /api/rsvp` devuelve un mensaje de estado.
- `POST /api/rsvp` acepta el payload del formulario y ahora mismo solo lo devuelve; después se conectará a Google Sheets o Excel.

## Nota sobre Docker

Docker no es el mecanismo de despliegue de Vercel. Si quieres, puedo añadir un `Dockerfile` para desarrollo local o para otro hosting, pero para Vercel lo correcto es esta estructura con `api/` y `vercel.json`.

## Deploy automático por commit

Este repo ya tiene un workflow en `.github/workflows/vercel-deploy.yml` para desplegar en Vercel cada vez que haces push.

Necesitas crear estos secretos en GitHub:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Flujo recomendado:

1. Conecta el repo a GitHub.
2. Crea el proyecto en Vercel e impórtalo desde GitHub.
3. Copia los valores de org y project desde Vercel.
4. Añade los secretos en GitHub en Settings > Secrets and variables > Actions.
5. Haz push a `main` para producción.
6. Haz push a cualquier otra rama para preview.
7. Un commit local no despliega por sí solo; el trigger real es el push al repositorio.
