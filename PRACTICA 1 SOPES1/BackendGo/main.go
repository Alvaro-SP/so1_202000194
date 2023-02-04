package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"

	// "database/sql"
	// "time"
	"strconv"
	"strings"
)

// Struct que contiene los datos enviados por React
var result float64

func home(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	// Decodifica los datos enviados por React
	// var req operationRequest

	vars := mux.Vars(r)
	num1prev := vars["num1"]
	num2prev := vars["num2"]
	operationprev := vars["operation"]

	// values := strings.Split(r.URL.Path[1:], "/")
	// if len(values) != 3 {
	// 	http.Error(w, "Invalid number of values", http.StatusBadRequest)
	// 	return
	// }
	fmt.Println(vars)

	// Realiza la operación
	num1, err := strconv.ParseFloat(strings.Replace(num1prev, ",", ".", -1), 64)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	num2, err := strconv.ParseFloat(strings.Replace(num2prev, ",", ".", -1), 64)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	operation := operationprev
	// Realiza la operación

	switch operation {
	case "suma":
		fmt.Println("Se hizo una suma")
		result = num1 + num2
	case "resta":
		fmt.Println("Se hizo una resta")
		result = num1 - num2
	case "multi":
		fmt.Println("Se hizo una multiplicacion")
		result = num1 * num2
	case "divi":
		fmt.Println("Se hizo una division")
		result = num1 / num2
	default:
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	// Lógica para la nueva ruta
	fmt.Println(result)
	responseData := map[string]float64{"result": result}
	responseJSON, err := json.Marshal(responseData)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(responseJSON)

}

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/{num1}/{operation}/{num2}", home).Methods("GET")
	fmt.Println("Servidor iniciado en http://localhost:8080")
	err := http.ListenAndServe(":8080", r)
	if err != nil {
		fmt.Println(err)
	}
}

//  AL ESTAR LOS DATOS COOL LOS AGREGO AL DATABASE
// Conectarse a la base de datos MySQL
// db, err := sql.Open("mysql", "user:password@tcp(host:port)/database")
// if err != nil {
// 	fmt.Println(err)
// 	return
// }
// defer db.Close()
// // Inserte los datos de la operación en la tabla
// stmt, err := db.Prepare("INSERT INTO operations (num1, operator, num2, result, datetime) VALUES (?, ?, ?, ?, ?)")
// if err != nil {
// 	fmt.Println(err)
// 	return
// }
// defer stmt.Close()

// // Ejecuta la consulta INSERT
// t := time.Now()
// timeStr := "fecha: " + t.Format("02/01/2006 a las 15:04")

// _, err = stmt.Exec(num1, operation, num2, result, timeStr)
// if err != nil {
// 	fmt.Println(err)
// 	return
// }
// fmt.Println("Datos de la operación guardados en la base de datos.")

// Devuelve el resultado en formato JSON
