FROM mysql:5.7

#* Establecemos una variable de entorno para la contraseña de root de MySQL
ENV MYSQL_ROOT_PASSWORD=fullstack

#* Copiamos un archivo SQL con los comandos para crear la base de datos y las tablas necesarias
COPY db.sql /docker-entrypoint-initdb.d/

#* Exponemos el puerto 3306 para que se pueda acceder a MySQL desde fuera del contenedor
EXPOSE 3306

#! sudo docker build -t proy1_dbmysql . --no-cache

#  sudo docker build --pull --rm -f "Dockerfile" -t serchiboi/proy1_dbmysql:latest "./"
# docker push serchiboi/proy1_dbmysql:latest
#! docker run -d -p 3307:3306 --name proy1_mysql_server  -e MYSQL_ROOT_PASSWORD=fullstack --mount src=mysql-data,dst=/var/lib/mysql proy1_dbmysql -rm-proy1_dbmysql



