# ! --------------- COMANDOS USADOS PARA DOCKER -----------------
# *------------------ Start MySQL -----------------------
sudo docker build -t proy1_dbmysql ./db_mysql --no-cache
# withoyt volume and an user
docker run -d -p 3307:3306 --name proy1_mysql_server -e MYSQL_ROOT_PASSWORD=fullstack -e MYSQL_USER=sopesuser -e MYSQL_PASSWORD=password -e MYSQL_DATABASE=dbproy1sopes proy1_dbmysql
# with a volume
# docker run -d -p 3307:3306 --name proy1_mysql_server  -e MYSQL_ROOT_PASSWORD=fullstack --mount src=mysql-data,dst=/var/lib/mysql proy1_dbmysql --skip-name-resolve=0

# *------------------ Start Redis -----------------------




# *------------------Start Api -----------------------
sudo docker build -t alvarosp24/proy1_api:latest ./api --force-rm --no-cache
sudo docker run  -p -d 8080:8080 alvarosp24/proy1_api:latest

# *------------------Start gRPC's-----------------------
# ? CLIENTE
sudo docker build -t alvarosp24/proy1_clientgrpc ./gRPC/grpc-client --force-rm --no-cache
sudo docker run  -d -p 4000:4000 alvarosp24/proy1_clientgrpc
# ? SERVIDOR
sudo docker build -t alvarosp24/proy1_servergrpc ./gRPC/grpc-server --force-rm --no-cache
sudo docker run -d -p 50051:50051 --name alvarosp24/proy1_servergrpc --link proy1_mysql_server:mysql alvarosp24/proy1_servergrpc

# ! --------------- CLOUD RUN -----------------
# *------------------ Start frontend -----------------------
sudo docker build -t alvarosp24/proy1_frontend ./frontend --force-rm --no-cache
sudo docker run -d -p 3000:3000 alvarosp24/proy1_frontend
# al subir a run se taggea:
docker pull alvarosp24/proy1_frontend
docker tag alvarosp24/proy1_frontend gcr.io/sotest-380100/proy1_frontend
docker images
docker push gcr.io/sotest-380100/proy1_frontend
# autorizar

# ir a container registry y ver imagenes
# ir a cloud run y le damos en crear servicio
# seleccionamos la imagen container registry
# todo default   
#  publicar para todos      
#  poner el puerto donde se expone en mi caso el puerto 3000
#  y creamos la conexion   
# cuando se publique el frontend copiamos el https y conectamos.

-

# docker logs -f id
# docker volume rm mysql-data

# * PUSH IMAGES
sudo docker push alvarosp24/proy1_dbmysql
sudo docker push alvarosp24/proy1_api
sudo docker push alvarosp24/proy1_clientgrpc
sudo docker push alvarosp24/proy1_servergrpc
sudo docker push alvarosp24/proy1_frontend

# ! PARA LA INYECCION CON LINKERD INSTALARLO EN NUESTRO CLUSTER

# * linkerd inject
kubectl -n proyecto get deploy -o yaml | linkerd inject - | kubectl apply -f -

kubectl get deployment api-web -n proyecto -o yaml | linkerd inject - | kubectl apply -f -
kubectl get deployment pub-redis -n proyecto -o yaml | linkerd inject - | kubectl apply -f -
kubectl get deployment grpc-client -n proyecto -o yaml | linkerd inject - | kubectl apply -f -

linkerd viz dashboard