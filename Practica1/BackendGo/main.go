package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql" // La librería que nos permite conectar a MySQL
	"github.com/gorilla/mux"
)

var result float64
var db *sql.DB

type Data struct {
	Num1       string `json:"num1"`
	Num2       string `json:"num2"`
	Operator   string `json:"operator"`
	Resultado  string `json:"resultado"`
	FechaYHora string `json:"fechayhora"`
}

// funcion para obtener conexion de la base de datos
func obtenerBaseDeDatos() (db *sql.DB, e error) {
	// * open the db connection.
	usuario := "myuser"
	pass := "2412"
	host := "tcp(db:3306)" // can the 127.0.0.1 ip too instead of db
	nombreBaseDeDatos := "mydb"
	// Debe tener la forma usuario:contraseña@host/nombreBaseDeDatos
	dbtemp, err := sql.Open("mysql", fmt.Sprintf("%s:%s@%s/%s", usuario, pass, host, nombreBaseDeDatos))
	if err != nil {
		panic(err)
	}
	return dbtemp, nil
}

// ! Funcion para mandar los logs almacenados en la base de datos
func logsfetch(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT num1, num2, operator, resultado, fechayhora FROM operacion")
	if err != nil {
		fmt.Println("Error al ejecutar la consulta: %v", err)
	}
	defer rows.Close()

	var data []Data
	for rows.Next() {
		var d Data
		err := rows.Scan(&d.Num1, &d.Num2, &d.Operator, &d.Resultado, &d.FechaYHora)
		if err != nil {
			fmt.Println("Error al escanear los resultados: %v", err)
		}
		data = append(data, d)
	}
	fmt.Println("Endpoint de retorno de tabla")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

// ! Funcion para meter datos a la base de datos
func insertValues(num1 string, num2 string, operator string, result string, date time.Time) error {
	stmt, err := db.Prepare("INSERT INTO operacion (num1, num2, operator, resultado, fechayhora) VALUES (?, ?, ?, ?, ?)")
	if err != nil {
		fmt.Println("ERROR: ", err)
		return err
	}
	defer stmt.Close()
	fechaHoraActual := time.Now().Format("02/01/2006 15:04:05")
	_, err = stmt.Exec(num1, num2, operator, result, fechaHoraActual)
	if err != nil {
		fmt.Println("ERROR: ", err)
		return err
	}
	return nil
}

// ! Funcion para realizar la suma y guardar en la base de datos
func home(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
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
	if num2 == 0 {
		// insert to the database the data

		return
	}
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
	var err error
	db, err = obtenerBaseDeDatos()
	if err != nil {
		fmt.Printf("Error obteniendo base de datos: %v", err)
		return
	}
	// Terminar conexión al terminar función
	defer db.Close()

	// Ahora vemos si tenemos conexión
	err = db.Ping()
	if err != nil {
		fmt.Printf("Error conectando: %v", err)
		return
	}
	// Listo, aquí ya podemos usar a db!
	fmt.Printf("Conectado correctamente a la base de datos")

	r := mux.NewRouter()
	r.HandleFunc("/{num1}/{operation}/{num2}", home).Methods("GET")
	r.HandleFunc("/logsget", logsfetch).Methods("GET")
	// intentar conectar a la base de datos

	fmt.Println("Servidor iniciado en *************** CORRECTAMENTE localhost:8080")
	err = http.ListenAndServe(":8080", r)
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
