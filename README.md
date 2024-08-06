# Event Logs App

# Descripción

Event Logs App es una aplicación para gestionar eventos, permitiendo registrar y consultar eventos a través de una API. Esta aplicación utiliza AWS Lambda, DynamoDB y Serverless Framework para su despliegue y funcionamiento.

# Requisitos

Node.js (v20.x o superior)
npm (v6.x o superior)
AWS CLI (configurado con credenciales válidas)
Serverless Framework

# Estructura del Proyecto
event-logs-app/
├── src/
│   ├── controllers/
│   │   └── eventController.ts
│   ├── lambdas/
│   │   ├── get-events.ts
│   │   └── register-events.ts
│   ├── services/
│   │   └── dynamoService.ts
│   └── swagger.yml
├── dist/
│   ├── lambdas/
│   │   ├── get-events.js
│   │   └── register-events.js
├── serverless.yml
├── package.json
└── README.md

# Clonar el Repositorio
Para clonar el repositorio, utiliza el siguiente comando:

git clone https://github.com/andersonrugeles/event-log
cd event-log

# Instalación
Instala las dependencias del proyecto:
npm install


# Ejecutar Localmente
Para ejecutar la aplicación localmente y simular el entorno de AWS Lambda, usa el siguiente comando:
npm run offline
Esto iniciará serverless-offline, permitiéndote probar las funciones Lambda localmente.

# Despliegue en AWS
Para desplegar la aplicación en AWS, usa Serverless Framework. Asegúrate de haber configurado tus credenciales de AWS CLI antes de proceder.

# Configuración de Credenciales
Si no tienes configuradas tus credenciales de AWS, utiliza el comando aws configure para establecer tus claves de acceso:

aws configure

# Desplegar
Despliega la aplicación en AWS con el siguiente comando:
npm run deploy
Este comando creará los recursos necesarios en AWS, incluyendo las funciones Lambda, la tabla DynamoDB y el API Gateway.

# Arquitectura
La aplicación está compuesta por los siguientes componentes:

AWS Lambda: Funciones sin servidor para manejar las operaciones de registro y consulta de eventos.
DynamoDB: Base de datos NoSQL para almacenar los registros de eventos.
API Gateway: Para exponer las funciones Lambda como endpoints HTTP.
Serverless Framework: Para definir y desplegar la infraestructura como código.
Recursos Definidos en serverless.yml
Functions:
registerEvent: Maneja el registro de nuevos eventos.
getEvents: Recupera eventos de la base de datos.
DynamoDB Table:
EventLogs: Tabla para almacenar los eventos. La clave primaria es eventId.
