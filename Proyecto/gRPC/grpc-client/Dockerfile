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
EXPOSE 4000

#* Definimos el comando para ejecutar la aplicación
CMD [ "node", "client.js" ]
#! sudo docker build -t proy1_clientgrpc . --force-rm --no-cache
#! sudo docker run  -p 5000:5000 proy1_clientgrpc


# sudo docker build -t alvarosp24/proy1_clientgrpc .
# sudo docker push alvarosp24/proy1_clientgrpc
