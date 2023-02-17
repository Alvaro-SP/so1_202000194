FROM mysql:8
ENV MYSQL_DATABASE=mydb \
    MYSQL_USER=myuser \
    MYSQL_PASSWORD=2412 \
    MYSQL_ROOT_PASSWORD=2412
COPY ./init_db.sql /docker-entrypoint-initdb.d/
