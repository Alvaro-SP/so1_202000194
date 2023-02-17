FROM ubuntu:latest
# Copiamos el script ejec.sh a la imagen
COPY ejec.sh /scripts/

# al final creo que no uso curl.
RUN apt-get update && apt-get install -y curl

# para escuchar le archivo de logstext
RUN apt-get update && apt-get install -y inotify-tools

# Establecemos /scripts como directorio de trabajo
WORKDIR /scripts

# Establecemos el comando por defecto para ejecutar el script
# CMD ["./ejec.sh"]
