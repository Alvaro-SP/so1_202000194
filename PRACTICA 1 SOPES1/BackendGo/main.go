package main

import (
	// "encoding/json"
	"fmt"
	"net/http"
	// "database/sql"
	// "time"
	"strconv"
	"strings"
)

// Struct que contiene los datos enviados por React


func home(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	// Decodifica los datos enviados por React
	// var req operationRequest
	values := strings.Split(r.URL.Path[1:], "/")
	if len(values) != 3 {
		http.Error(w, "Invalid number of values", http.StatusBadRequest)
		return
	}
	fmt.Println(values)

	// Realiza la operación
	num1, err := strconv.Atoi(values[0])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	num2, err := strconv.Atoi(values[2])
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	operation := values[1]
	// Realiza la operación
	var result int
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


	fmt.Println(result)
	
	w.Write([]byte(strconv.Itoa(result)))
	// json.NewEncoder(w).Encode(map[string]int{"result": result})
}
func main() {
	http.HandleFunc("/", home)

	fmt.Println("Servidor iniciado en http://localhost:8080")
	err := http.ListenAndServe(":8080", nil)
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