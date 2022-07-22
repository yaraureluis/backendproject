# API REST - PROYECTO BACKEND CODERHOUSE

## RUTAS

- Obtiene todos los productos: GET {{SERVER}}/api/productos
- Ingresa un producto: POST {{SERVER}}/api/productos
- Obtiene un producto: GET {{SERVER}}/api/productos/{{PRODUCTO_ID}
- Actualiza producto: PUT {{SERVER}}/api/products/{{PRODUCT_ID}}
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
