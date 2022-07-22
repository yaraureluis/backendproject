# API REST - PROYECTO BACKEND CODERHOUSE

## RUTAS

- Obtiene todos los productos: GET {{SERVER}}/api/productos
- Ingresa un producto: POST {{SERVER}}/api/productos
- Obtiene un producto: GET {{SERVER}}/api/productos/{{PRODUCTO_ID}
- Actualiza producto: PUT {{SERVER}}/api/productos/{{PRODUCT_ID}}
- Elimina un producto: DELETE {{SERVER}}/api/productos/{{PRODUCTO_ID}}
- Agrega productos al carrito: POST {{SERVER}}/api/carritos/{{ID_CARRITO}} EN EL BODY ID DE PRODUCTO:(ID: "XXX")
- Registro (usuario): POST {{SERVER}}/registro
- Lista productos del carrito: GET {{SERVER}}/api/carritos/{{CARRITO_ID}}/productos
- Borra producto (POR ID) del carrito: DELETE {{SERVER}}/api/carritos/{{CARRITO_ID}}/productos/{{PRODUCTO_ID}}
- Genera una nueva orden: POST {{SERVER}}/api/carritos/{{CARRITO_ID}}/venta
- Login (usuario): POST {{SERVER}}/login
- Logout: GET {{SERVER}}/logout

## NOTA

- DEBE COLOCAR SUS CREDENCIALES EN EL STRING DE CONEXIÓN A MONGO: mongodb+srv://xxxx:xxxx@cluster0.xjcx5.mongodb.net/API_BACKEND?retryWrites=true&w=majority

## VARIABLES DE ENTORNO:

- SERVER_MODE=CLUSTER -> para iniciar el servidor en modo CLUSTER, por defecto se inicia modo fork.
- PORT=8080 -> por defecto es 8080, pero puede ser modificado.
- NODE_ENV=production -> de este modo se escriben los loggs (error y warn) en los archivos destinados para ello.
- GMAIL_PORT, GMAIL_USER, GMAIL_PASSWORD, EMAIL_ADMIN, PHONE_ADMIN, SMS_MASIVO_KEY, SMS_MASIVO_WHATSAPP_ACCOUNT, SMS_MASIVO_DEVICE -> son necesarias para las configuraciones al enviar emails desde Gmail con node mailer; las de SMS_MASIVO son las utilizadas en la configuración de las peticiones a la API que envía los mensajes de whatsapp y sms.
- El archivo config.js tiene seteado PERS: "mongodb" esto para arrancar el proyecto utilizando la base de datos MongoDB, existe la posibilidad de utilizar otras (como firebase por ejemplo), pero a términos de ésta entrega, se debe mantener "mongodb".

## CAPTURAS DE PANTALLA

- Puede ver algunas capturas de pantalla en la carpeta "capturas_pf3".
