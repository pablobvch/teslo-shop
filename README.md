# Descripcion

E-commerce Teslo Shop simil Tesla site

# Correr en dev

1. Clonar el repo: `git clone`
2. Crear una copia del archivo `.env.template`, renombrar a `.env` y cambiar las variables de entorno
3. Instalar deps: `npm install`
4. Levantar la DB: `docker compose up -d`
5. Correr las migraciones de Prisma `npx prisma migrate dev`
6. Ejecutar seed `npm run seed`
7. Correr el proyecto: `npm run dev`
