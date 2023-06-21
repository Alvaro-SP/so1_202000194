FROM golang:alpine AS build

RUN apk add --no-cache git

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o my-app

FROM alpine:latest

WORKDIR /app

COPY --from=build /app/my-app ./

ENTRYPOINT ["./my-app"]

# EXPOSE 5000
#sudo docker build --pull --rm -f "Dockerfile" -t serchiboi/sub_redis:latest "./"
#sudo docker push serchiboi/sub_redis