# serverless-lambdas-dynamodb

### Iniciar Serverless en local
```
npm i
sls dynamodb install
sls offline start
```

Iniciar Serverless 
> ![sls offline start](https://github.com/perudesarrollo/serverless-lambdas-dynamodb/blob/main/image/sls-offline-start.png?raw=true)

### Si tienes usando el puerto 8000 usar:
```
kill -9 $(lsof -i TCP:8000 | grep LISTEN | awk '{print $2}')
```
### Pruebas desde local con Postman
Crear Personaje 
> ![Crear](https://github.com/perudesarrollo/serverless-lambdas-dynamodb/blob/main/postman/postam-create.png?raw=true)

Listar Personaje
> ![Listar](https://github.com/perudesarrollo/serverless-lambdas-dynamodb/blob/main/postman/postman-get.png?raw=true)

Eliminar Personaje
> ![Eliminar](https://github.com/perudesarrollo/serverless-lambdas-dynamodb/blob/main/postman/postman-delete.png?raw=true)

### Vista desde AWS
Lambda
> ![Lambda](https://github.com/perudesarrollo/serverless-lambdas-dynamodb/blob/main/image/lambda.png?raw=true)

Dynamodb
> ![Dynamodb](https://github.com/perudesarrollo/serverless-lambdas-dynamodb/blob/main/image/dynamodb.png?raw=true)


Deploy Serverless en AWS
```
sls deploy
```
> ![sls deploy](https://github.com/perudesarrollo/serverless-lambdas-dynamodb/blob/main/image/sls-deploy.png?raw=true)
