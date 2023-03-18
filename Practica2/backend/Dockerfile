FROM golang:1.20
LABEL developer="Alvaro Socop" \
    email="socop2412@gmail.com"
# Seteamos el work directory
WORKDIR /app
COPY . .
# Download the dependencies
RUN go mod download
# Import the gorilla library
RUN go get -u github.com/gorilla/mux
# Import the MySQL driver
RUN go get -u github.com/go-sql-driver/mysql
RUN go build -o main
# EXPOSE 8080
# VOLUME /proc:/proc
CMD ["./main"]
# --------------------- EXECUTED COMMANDS ---------------------
# docker build -t practica2_backend .
# docker login
# ----docker tag mi-imagen mi-usuario/mi-repo
# docker tag practica2_backend alvarosp24/practica2_backend
# docker push alvarosp24/practica2_backend