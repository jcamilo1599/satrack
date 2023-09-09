# Prueba Satrack

Se crea un backend en node.js con TypeScript y un frontend con Angular; ambos con Firebase, con el fin de desplegarlo en
cloud functions y el hosting gratuito de Firebase. Adicionalmente como autenticación se utiliza el mismo servicio e
Firebase.

La prueba se encuentra desplegada en Firebase, el link de las cloud functions (backend)
es `https://us-central1-satrack-2485a.cloudfunctions.net/api`.
El hosting se puede encontrar en `https://satrack-2485a.web.app/`.

## Información Frontend

- Se desarrollo con angular v16 y material angular v16.2.3.
- Para ejecutar de forma local, se debe ingresar a la carpeta "frontend" desde la terminal `cd frontend`,
  posteriormente ejecutar el comando `npm start`. En la terminal indicará el puerto del servidor local.
- Como requerimiento de la prueba técnica se solicitaba que las tareas pudieran ser filtradas por categoría; se añade un
  filtro que permite filtrar todos los datos de la tabla por cualquier dato.
- En la tabla con las tareas, en la parte derecha se encuentra un botón con un icono de 3 puntos, el cual al presionar
  abre un menú que tiene 3 opciones (Completar, Editar y Eliminar), las cuales tenía como requisito la prueba.

## Información Backend

- Se desarrollo con node v18.17.1 y npm 9.6.7.
- Se desarrollo con `firebase-functions` para desplegar en las cloud functions.
- Para ejecutar localmente, se debe ingresar a la carpeta "functions" desde la termina `cd functions`, posteriormente
  ejecutar el comando `npm run serve`. En la terminal indicará el servidor local (similar
  a `http://127.0.0.1:5001/satrack-2485a/us-central1/api`).
