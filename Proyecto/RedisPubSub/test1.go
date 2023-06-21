package main

// Importar la biblioteca redigo
import (
	"fmt"
	"os"
	"github.com/gomodule/redigo/redis"
)

func main() {
	// Conexión para publicar
	pubConn, err := redis.Dial("tcp", "localhost:6379")

	if err != nil {
		fmt.Println("ERR CONN BASE PUB",err)
		os.Exit(0)
	}
	defer pubConn.Close()

	// Conexión para suscribirse
	subConn, err := redis.Dial("tcp", "localhost:6379")
	if err != nil {
		fmt.Println("ERR CONN BASE SUB",err)
		os.Exit(0)
	}
	defer subConn.Close()

	fmt.Println("CONEXIONES CREADAS CORRECTAMENTE :D")

	// Crear un objeto de conexión de Pub/Sub para la conexión de suscripción
	psc := redis.PubSubConn{Conn: subConn}

	// Suscribirse a un canal
	err = psc.Subscribe("mi-canal")
	if err != nil {
		fmt.Println("ERR SUB A CANAL",err)
		os.Exit(0)
	}

	// Enviar un mensaje al canal
	_, err = pubConn.Do("PUBLISH", "mi-canal", "Hola, mundo! 1")
	if err != nil {
		fmt.Println("ERR PUB A CANAL",err)
		os.Exit(0)
	}

	// Escuchar mensajes del canal
	for {
		 switch v := psc.Receive().(type) {
		 case redis.Message:
			  fmt.Printf("%s: %s\n", v.Channel, v.Data)
		 case redis.Subscription:
			  fmt.Printf("%s: %s %d\n", v.Channel, v.Kind, v.Count)
		 case error:
				fmt.Println("ERR ESCUCHAR MENSAJE",err)
			  return
		 }
	}
}