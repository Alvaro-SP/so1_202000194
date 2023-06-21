package main

// Importar la biblioteca redigo
import (
	"os"
	"fmt"
	"context"
	"database/sql"
	"encoding/json"
	_"github.com/go-sql-driver/mysql"
	"github.com/gomodule/redigo/redis"
	//"github.com/joho/godotenv" //solo local
)

type voto struct {
	Sede int `json:"sede"`
	Municipio string `json:"municipio"`
	Departamento string `json:"departamento"`
	Papeleta string `json:"papeleta"`
	Partido string `json:"partido"`
}
//var  errEnv = godotenv.Load() //solo local

func main() {
	
	fmt.Println("Started Subscriber.......")
	fmt.Println("Connecting to Redis SUB... En: " + os.Getenv("REDIS_HOST") + ":6379")
	fmt.Println("Connecting to MYSQL SUB... En: " + os.Getenv("MYSQL_HOST") + ":3306")

	//if errEnv != nil {panic("ERR CONN ENV " + errEnv.Error())} //solo local

	//conecion MYSQL
	var db, errConnection = createConnection()
	var ctx = context.Background()
	if errConnection != nil {
		panic("ERR CONN BASE MYSQL: " + errConnection.Error())
	}
	fmt.Println("Connected to MySQL")

	// Conexión para suscribirse
	subConn, err := redis.Dial("tcp",  os.Getenv("REDIS_HOST") + ":6379")
	conn, err := redis.Dial("tcp",  os.Getenv("REDIS_HOST") + ":6379")

	if err != nil {
		panic("ERR CONN BASE SUB" + err.Error())
	}
	defer subConn.Close()
	defer conn.Close()

	fmt.Println("Connected to Redis SUB")

	// Crear un objeto de conexión de Pub/Sub para la conexión de suscripción
	psc := redis.PubSubConn{Conn: subConn}

	// Suscribirse a un canal
	err = psc.Subscribe("votos")
	if err != nil {
		panic("ERR SUB A CANAL" + err.Error())
	}
	fmt.Println("======Waiting for messages...======")
	// Escuchar mensajes del canal
	for {
		 switch v := psc.Receive().(type) {
		 case redis.Message:
				fmt.Printf("==========Mensaje recibido del canal=========\n")
				var newVoto voto
				json.Unmarshal(v.Data, &newVoto)
				
			 	err := insertarVotoRedis(conn, newVoto)
				if err != nil { fmt.Println("ERR INSERTAR VOTO REDIS",err) }

				err = insertarVotoMySQL(ctx,db, newVoto);
				if err != nil {fmt.Println("ERR INSERTAR VOTO MYSWQL",err)}

				fmt.Printf("%s: %s\n", v.Channel, v.Data)
		 case redis.Subscription:
				fmt.Printf("%s: %s %d\n", v.Channel, v.Kind, v.Count)
		 case error:
				fmt.Println("ERR ESCUCHAR MENSAJE",err)
				return
		 }
	}
}

func createConnection() (*sql.DB,error){
	//db, err := sql.Open("mysql", "root:SerchiBoi502@@/Operaciones")
	//db, err := sql.Open("mysql", "sopesuser:password@tcp(proy1_mysql_server:3306)/dbproy1sopes")
	//db, err := sql.Open("mysql", "user:secret@tcp(localhost:3306)/Operaciones")

	db, err := sql.Open("mysql", "sopesuser:password@tcp(" + os.Getenv("MYSQL_HOST") +":3306)/dbproy1sopes")
	if err != nil {
		return nil, err
	}
	
	err = db.Ping()
	if err != nil {
		return nil, err
	}

	return db, nil
}

func insertarVotoMySQL(ctx context.Context,db *sql.DB, voto voto ) error{
	query := "INSERT INTO Voto (sede,municipio,departamento,papeleta,partido) VALUES(?,?,?,?,?);"

	result,err := db.ExecContext(ctx, query, 
		voto.Sede,
		voto.Municipio,
		voto.Departamento,
		voto.Papeleta, 
		voto.Partido)

	if err != nil {
		return err
	}
	id,err := result.LastInsertId()
	if err != nil {
		return err
	}

	fmt.Println("Inser id",id)
	return nil
}

func insertarVotoRedis(conn redis.Conn, voto voto) error {
		_, err :=  
		conn.Do(
			"EVAL",
		 	"local nuevo_id = redis.call('INCR', 'idVotos') redis.call('HSET', 'votos:'..nuevo_id, 'sede', ARGV[1], 'municipio', ARGV[2], 'departamento', ARGV[3], 'papeleta', ARGV[4], 'partido', ARGV[5], 'id', nuevo_id)",
			0,
			voto.Sede,
			voto.Municipio,
			voto.Departamento,
			voto.Papeleta, 
			voto.Partido)
		if err != nil {
			return err
		}
	return nil
}