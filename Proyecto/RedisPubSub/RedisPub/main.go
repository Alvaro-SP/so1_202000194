package main

import (
	"os"
	"log"
	"fmt"
	"net/http"
	"io/ioutil" 
	"github.com/rs/cors"
	"github.com/gorilla/mux"
	//"github.com/joho/godotenv" solo local
	"github.com/gomodule/redigo/redis"
)

//var pubConn, errConnection = redis.Dial("tcp", "localhost:6379")
// var  errEnv = godotenv.Load() solo local
var pubConn, errConnection = redis.Dial("tcp", os.Getenv("REDIS_HOST") + ":6379")

func postNewMessage(w http.ResponseWriter, r *http.Request) {
	
	reqBody, err := ioutil.ReadAll(r.Body)

	if err != nil { panic("Error data not valid:" + err.Error()) }

	// Enviar un mensaje al canal
	_, err = pubConn.Do("PUBLISH", "votos", reqBody)
	if err != nil {panic("ERR PUBLISH: " + err.Error())}

	fmt.Println("===Mensaje enviado al canal====")
	fmt.Fprintf(w, "1. Mensaje enviado al canal:\n" + string(reqBody))
}

func postNewMessage2(w http.ResponseWriter, r *http.Request) {
	
	reqBody, err := ioutil.ReadAll(r.Body)

	if err != nil { panic("Error data not valid:" + err.Error()) }

	// Enviar un mensaje al canal
	_, err = pubConn.Do("PUBLISH", "votos", reqBody)
	if err != nil {panic("ERR PUBLISH: " + err.Error())}

	fmt.Println("===Mensaje enviado al canal====")
	fmt.Fprintf(w, "2. Mensaje enviado al canal:\n" + string(reqBody))
}

func handleRoute(w http.ResponseWriter, r *http.Request){
	fmt.Fprintf(w, "Weltome to my  API :D")
}


func main() {
	fmt.Println("Server started on port 5000")
	fmt.Println("Connecting to Redis PUB... En: " + os.Getenv("REDIS_HOST") + ":6379")

	// if errEnv != nil {panic("ERR CONN ENV " + errEnv.Error())} solo local

	if errConnection != nil { panic("ERR CONN BASE SUB " + errConnection.Error())}
		
	defer pubConn.Close()
	fmt.Println("Connected to Redis PUB")
	fmt.Println("======Waiting for messages...======")

	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", handleRoute)
	router.HandleFunc("/NewMessage", postNewMessage).Methods("POST")
	router.HandleFunc("/NewMessages", postNewMessage2).Methods("POST")

	handler := cors.Default().Handler(router)
	log.Fatal(http.ListenAndServe(":5000", handler))
}




