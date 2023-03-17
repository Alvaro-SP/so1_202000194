FROM golang:1.15-alpine
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
VOLUME /proc:/proc
CMD ["./main"]

# docker build -t practica2-backend .