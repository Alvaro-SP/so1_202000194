package main

import (
        "database/sql"
        "encoding/json"
        "fmt"
        // "io/ioutil"
        // "net/http"
        // "strconv"
        "strings"
        "time"
        //"os/user"
        "os/exec"
        _ "github.com/go-sql-driver/mysql" // La librería que nos permite conectar a MySQL

)

var result float64
var db *sql.DB
type EjemploModulo struct {
    CPUUsage int             `json:"cpu_usage"`
    Data                json.RawMessage `json:"data"`
    Ejecucion           int `json:"ejecucion"`
    Zombie              int `json:"zombie"`
    Detenido            int `json:"detenido"`
    Suspendido      int `json:"suspendido"`
    Totales             int `json:"totales"`
}
type PorcentajeRAM struct {
    Valor int `json:"Porcentaje"`
}

// var jsonStr = `{
//      "cpu_usage":17 ,
//      "data":  {},
//      "ejecucion":25 ,
//      "zombie":10 ,
//      "detenido":20 ,
//      "suspendido":30 ,
//      "totales":85
// }`
// ! funcion para obtener conexion de la base de datos
func obtenerBaseDeDatos() (db *sql.DB, e error) {
        // * open the db connection.
        usuario := "root"
        pass := "2412"
        host := "tcp(35.238.175.158:3306)" // can the 127.0.0.1 ip too instead of db
        nombreBaseDeDatos := "practica2sopes"
        // Debe tener la forma usuario:contraseña@host/nombreBaseDeDatos
        dbtemp, err := sql.Open("mysql", fmt.Sprintf("%s:%s@%s/%s", usuario, pass, host, nombreBaseDeDatos))
        if err != nil {
                fmt.Println("ERROR DE CONEXION CON LA BASE DE DATOS \n")
        }
        return dbtemp, nil
}

// ! Funcion para meter datos a la base de datos
func insertValues(ram_json []byte,cpu_json []byte,cpu_process []byte,percent_ram,percent_cpu,ejecucion,zombie,detenido,suspendido,totales int) error {
        stmt, err := db.Prepare("UPDATE cpu_ram SET ram_json=?, cpu_json=?, cpu_process=?, percent_ram=?, percent_cpu=?,ejecucion=?,zombie=?,detenido=?,suspendido=?,totales=? WHERE id=1")
        if err != nil {
                fmt.Println("ERROR: ", err)
                return err
        }
        defer stmt.Close()
        _, err = stmt.Exec(ram_json,cpu_json,cpu_process,percent_ram,percent_cpu,ejecucion,zombie,detenido,suspendido,totales)
        if err != nil {
                fmt.Println("ERROR: ", err)
                return err
        }
        return nil
}


func main() {
        var err error
        db, err = obtenerBaseDeDatos()
        if err != nil {
                fmt.Println("Error obteniendo base de datos: %v", err)
                return
        }
        // Terminar conexión al terminar función
        defer db.Close()

        // Ahora vemos si tenemos conexión
        err = db.Ping()
        if err != nil {
                fmt.Println("Error conectando: %v", err)
                return
        }
        // Listo, aquí ya podemos usar a db!
        fmt.Println("Conectado correctamente a la base de datos")

        // todo *****************************************************************************
        // LOOP INFINITUS
        for {
        cmd := exec.Command("sh", "-c", "cat /proc/cpu_202000194")
        out, err := cmd.CombinedOutput()
        if err != nil {
                fmt.Println(err)
        }
        jsonStr := string(out[:])
        // fmt.Println(output)

        cmd2 := exec.Command("sh", "-c", "cat /proc/ram_202000194")
        out2, err := cmd2.CombinedOutput()
        if err != nil {
                fmt.Println(err)
        }
        jsonStr2 := string(out2[:])
        // fmt.Println(jsonStr2)
        // jsonStr2 := `{
        //      "Porcentaje":61
        //      }`
        // ! Decodificar el objeto JSON en un objeto Go
        var ejemplo EjemploModulo
        err = json.Unmarshal([]byte(jsonStr), &ejemplo)
        if err != nil {
                fmt.Println("Error:", err)
                return
        }
        //! Decodificar el objeto JSON en un mapa de Go
    var procesos map[string]map[string]interface{}
    err = json.Unmarshal([]byte(ejemplo.Data), &procesos)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
        //! Modificar el valor del campo "usuario" de cada elemento
    for _, proceso := range procesos {
                // ! Aqui se busca el nombre del usuario y se cambia
                // Obtener usuario a partir de PID
                usernamestr := fmt.Sprintf("%v", proceso["usuario"])
                //  processUser, err := user.LookupId(usernamestr)
				cmd := exec.Command("bash", "-c", "echo $(id -un "+usernamestr+")")
				output, err := cmd.Output()
				if err != nil {
					panic(err)
				}
				usernameNEW := strings.TrimSpace(string(output))
                proceso["usuario"] = usernameNEW
                // proceso["usuario"] = processUser.Username

                //! Iterar sobre la lista de procesos hijos y cambiar el valor del campo "usuario" de cada elemento
                if procesosHijos, ok := proceso["procesoshijos"].([]interface{}); ok {
                        for _, procesoHijo := range procesosHijos {
                                if procesoHijoMap, ok := procesoHijo.(map[string]interface{}); ok {
                                        usernamestr = fmt.Sprintf("%v", procesoHijoMap["usuario"])
                                        cmd := exec.Command("bash", "-c", "echo $(id -un "+usernamestr+")")
										output, err := cmd.Output()
										if err != nil {
											panic(err)
										}
										usernameNEW := strings.TrimSpace(string(output))
                                        procesoHijoMap["usuario"] = usernameNEW
                                }
                        }
                }
    }
        //! Codificar el mapa modificado en un string JSON
        // var xd []int
    jsonBytes, err := json.Marshal(procesos)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    // jsonStrModified := string(jsonBytes)
    // fmt.Println(jsonStrModified)

        //! TOMAR LA LISTA DE LA BASE DE DATOS (RAM Y CPU)
        // ! RAM
        rows, err := db.Query("SELECT ram_json, cpu_json FROM cpu_ram")
        if err != nil {
                fmt.Println("Error obteniendo datos de la base de datos: %v", err)
        }
        defer rows.Close()
        var ram_json string
        var cpu_json string

        for rows.Next() {
                err := rows.Scan(&ram_json, &cpu_json)
                if err != nil {
                        fmt.Printf("Error obteniendo datos de la base de datos: %v\n", err)
                }
        }


        var porcentajeram PorcentajeRAM
        err = json.Unmarshal([]byte(jsonStr2), &porcentajeram)
        if err != nil {
                fmt.Println("Error:", err)
                return
        }

        var ramlist []int   // ! lista de ram que se llena de lo que hay en tabla
        var cpulist []int   // ! lista de CPU que se llena de lo que hay en tabla

        if(ram_json == ""){
                ram_json = "[]"
        }
        if(cpu_json == ""){
                cpu_json = "[]"
        }
        err = json.Unmarshal([]byte(ram_json), &ramlist)
        if err != nil {
                fmt.Println(err)
                return
        }
        err = json.Unmarshal([]byte(cpu_json), &cpulist)
        if err != nil {
                fmt.Println(err)
                return
        }



        ramlist = append(ramlist, porcentajeram.Valor)
        cpulist = append(cpulist, ejemplo.CPUUsage)
        ram_json_bytes, err := json.Marshal(ramlist)
        if err != nil {
                fmt.Println(err)
                return
        }
        cpu_json_bytes, err := json.Marshal(cpulist)
        if err != nil {
                fmt.Println(err)
                return
        }
        // fmt.Println(string(ram_json_bytes))
        // fmt.Println(string(cpu_json_bytes))
        //* ram_json,cpu_json,cpu_process,
        //* percent_ram,percent_cpu,ejecucion,zombie,detenido,suspendido,totales string
        insertValues(
                ram_json_bytes,
                cpu_json_bytes,
                jsonBytes,
        (porcentajeram.Valor),
        (ejemplo.CPUUsage),
        (ejemplo.Ejecucion),
        (ejemplo.Zombie),
        (ejemplo.Detenido),
        (ejemplo.Suspendido),
        (ejemplo.Totales))






        fmt.Println("Dato enviado")
                time.Sleep(1 * time.Second)
        }

}