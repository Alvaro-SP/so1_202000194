FROM mysql:8
COPY . .
ENV MYSQL_DATABASE=mydb \
    MYSQL_PASSWORD=myuser \
    MYSQL_ROOT_PASSWORD=2412
COPY init_db.sql /docker-entrypoint-initdb.d/