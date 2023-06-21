FROM golang:alpine AS build
RUN  apk add --no-cache git

WORKDIR /app   

COPY ["go.mod", "go.sum", "./"]
RUN go mod download

COPY . .

RUN go build -o app -v .

FROM alpine:latest
LABEL Name="backend" 
RUN apk update
RUN apk --no-cache add ca-certificates

WORKDIR /app

COPY --from=build /app/app .

ENTRYPOINT [ "./app" ]
EXPOSE 5000

#sudo docker build --pull --rm -f "Dockerfile" -t serchiboi/pub_redis:latest "./"
#sudo docker push serchiboi/pub_redis