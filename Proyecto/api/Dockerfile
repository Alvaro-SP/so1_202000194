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
EXPOSE 8080

#* Definimos el comando para ejecutar la aplicación
CMD [ "node", "index.js" ]
#! sudo docker build -t proy1_api . --force-rm --no-cache
#! sudo docker run  -p 8080:8080 proy1_api


#sudo docker build --pull --rm -f "Dockerfile" -t serchiboi/proy1_api:latest "./"
#sudo docker push serchiboi/proy1_api