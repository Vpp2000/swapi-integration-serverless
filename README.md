# DOCUMENTACIÓN DEL PROYECTO

## ¿COMO USAR EL PROYECTO?
- Crear un usuario en AWS (por motivos prácticos puedes darle más permisos de los que necesita)
- Instalar AWS CLI
- Configurar AWS con las claves del usuario que creaste
- Instalar las dependencias:
```shell
npm install
```
- Desplegar el proyecto:
```shell
sls deploy
```
o tambien
```shell
npx sls deploy
```
- Mi proyecto cuanta con su interfaz Swagger en https://hxhib56dij.execute-api.us-west-2.amazonaws.com/swagger por si se desea probar.

## ARQUITECTURA DEL PROYECTO
![serverless_architecture drawio](https://github.com/Vpp2000/swapi-integration-serverless/assets/48797063/bc42bdb1-f183-4161-acfd-aebcf5f41fa8)
### Evento GET /vehicle
- Consulto a swapi en su URL https://swapi.py4e.com/api/vehicles/ usando axios.
- Por motivos prácticos solo utilizo los datos de la primera página (su API está paginada)
- Creo nuevos objetos con los campos en español y les agraedo el campo **id** con un **string** vacío también por motivos prácticos.
- Consulto los elementos de DynamoDb (estos ya se crean con los campos en español).
- Junto todos los datos y los devuelvo en mi respuesta.

### Evento POST /vehicle
- Se lee el cuerpo del request.
- Se valida usando Zod (el schema se encuentra en los **helpers**).
- Se valida que no exista un vehiculo con el mismo **nombre**.
- Se crea el vehiculo en DynamoDb
- Payload de ejemplo:
```json
{
    "capacidad_carga": 50000,
    "consumibles": "2 months",
    "costo_en_creditos": 150000,
    "creadoEn": "2014-12-10T15:36:25.724000Z",
    "flota": 46,
    "editadoEn": "2014-12-20T21:30:21.661000Z",
    "tamaño": 36.8,
    "fabricante": "Corellia Mining Corporation",
    "velocidad_atmosferica_maxima": 30,
    "modelo": "Digger Crawler",
    "nombre": "NEORIS EMPLOYEE NAME",
    "pasajeros": 30,
    "pilotos": [

    ],
    "peliculas": [
      "https://swapi.py4e.com/api/films/1/",
      "https://swapi.py4e.com/api/films/5/"
    ],
    "url": "https://swapi.py4e.com/api/vehicles/4/",
    "clase_vehiculo": "wheeled"
}
```
### Evento GET /vehicle/{vehicleId}
- Se lee el **vehicleId**
- Se busca el elemento en DynamoDb
- Se devuelve el elemento encontrado

## ESTRUCTURA DE CARPETAS
![folders_structure](https://github.com/Vpp2000/swapi-integration-serverless/assets/48797063/e7082ee3-1928-4e2f-a746-6a48c2de49ca)
- **client**: contiene clases para interactuar con DynamoDb y con SWAPI.
- **errors**: contiene un manejador de errores y una clase para mapear los errores con mayor facilidad
- **helpers**: contiene constantes que uso en la aplicación con el nombre de la tabla de DynamoDb por ejemplo
- **services**: contiene la lógica de negocio de mi aplicación.
- **types**: contiene interfaces y tipos que me ayudan a programar con mayor comodidad y me ayudan a generar la documentación de Swagger.
- **handlers.ts**: contiene los manejadores de los eventos de los lambdas.

## PRUEBAS UNITARIAS
Se realizaron pruebas unitarias básicas a mi clase VehicleService:
- Se probó el servicio que es utilizado por el lambda del método GET /vehicle
- Se probó el servicio que es utilizado para crear un nuevo vehículo cuando ocurre un error.
- Se probó el servicio que es utilizado para obtener un vehículo de DynamoDb por su **id**.

## DOCUMENTACIÓN SWAGGER
- URL desplegado: https://hxhib56dij.execute-api.us-west-2.amazonaws.com/swagger
- Se utilizó un plugin llamado **serverless-auto-swagger** para autogenerar Swagger.
- La configuración necesaria se hace en el fichero **serverless.yml**.
- Este plugin me da la facilidad de que la documentación se despliegue en la nube y sea accesible fácilmente
- Cabe recalcar que he notado ciertas limitaciones del plugin:
  - Le cuesta entender interfaces de Typescript que extienden o implementan otras.
  - No soporta el tipo **Date**.
- Sin embargo el plugin me ha ayudado a cumplir el requerimiento con mayor facilidad y a cumplir con la fecha límite establecida ya que no logré usar otros plugins existentes para cumplir mi cometido.
