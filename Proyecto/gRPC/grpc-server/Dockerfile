#* Utilizamos la imagen base de Node.js con Alpine Linux
FROM node:alpine

#* Creamos el directorio de trabajo dentro del contenedor
WORKDIR /app

#* Copiamos el archivo package.json a la carpeta de trabajo
COPY package*.json ./

#* Instalamos las dependencias
RUN npm install

#* Copiamos el resto de la aplicación a la carpeta de trabajo
COPY . .

#* Exponemos el puerto del cliente
EXPOSE 50051

#* Definimos el comando para ejecutar la aplicación
CMD [ "node", "server.js" ]
#! sudo docker build -t proy1_servergrpc . --force-rm --no-cache
#! sudo docker run  -p 50051:50051 proy1_servergrpc


# sudo docker build -t alvarosp24/proy1_servergrpc .
# sudo docker push alvarosp24/proy1_servergrpc
