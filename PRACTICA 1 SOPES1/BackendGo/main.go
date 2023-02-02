package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// Struct que contiene los datos enviados por React
type operationRequest struct {
	Num1 int `json:"num1"`
	Op string `json:"Op"`
	Num2 int `json:"num2"`
}

func main() {
	http.HandleFunc("/calculate", func(w http.ResponseWriter, r *http.Request) {
		// Decodifica los datos enviados por React
		var req operationRequest
		err := json.NewDecoder(r.Body).Decode(&req)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		// Realiza la operación
		var result int
		switch req.Op {
		case "+":
			fmt.Println("Se hizo una suma")
			result = req.Num1 + req.Num2
		case "-":
			fmt.Println("Se hizo una resta")
			result = req.Num1 - req.Num2
		case "*":
			fmt.Println("Se hizo una multiplicacion")
			result = req.Num1 * req.Num2
		case "/":
			fmt.Println("Se hizo una division")
			result = req.Num1 / req.Num2
		default:
			w.WriteHeader(http.StatusBadRequest)
			return
		}



		//  AL ESTAR LOS DATOS COOL LOS AGREGO AL DATABASE
		// Conectarse a la base de datos MySQL
		db, err := sql.Open("mysql", "user:password@tcp(host:port)/database")
		if err != nil {
			fmt.Println(err)
			return
		}
		defer db.Close()
		// Inserte los datos de la operación en la tabla
		stmt, err := db.Prepare("INSERT INTO operations (num1, operator, num2, result, datetime) VALUES (?, ?, ?, ?, ?)")
		if err != nil {
			fmt.Println(err)
			return
		}
		defer stmt.Close()

		// Ejecuta la consulta INSERT
		t := time.Now()
		timeStr := "fecha: " + t.Format("02/01/2006 a las 15:04")

		_, err = stmt.Exec(req.Num1, req.Op, req.Num2, result, timeStr)
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Println("Datos de la operación guardados en la base de datos.")

		// Devuelve el resultado en formato JSON
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]int{"result": result})
	})

	fmt.Println("Servidor iniciado en http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}