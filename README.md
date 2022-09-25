# Next.js OpenJira App
Para correr localmente, se necesita la base de datos
```
docker-compose up -d
```
* El -d, significa __detached__

* MongoDB URLLocal:
```
mongo://localhost:27017/entriesdb
```

## Configurar las variables de entorno
Renombrar el archivo __.env.template__ a __.env__

*Recostruir los modulos de node y levantar Next
```
npm install
npm run ev
```

## Llenar la base de datos con información de pruebas

Llamar: 
```
http://localhost:3000/api/seed
```