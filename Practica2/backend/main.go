package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	// "io/ioutil"
	// "net/http"
	"strconv"
	// "strings"
	// "time"
	"os/user"
	_ "github.com/go-sql-driver/mysql" // La librería que nos permite conectar a MySQL

)

var result float64
var db *sql.DB
type EjemploModulo struct {
    CPUUsage int             `json:"cpu_usage"`
    Data     json.RawMessage `json:"data"`
}
type PorcentajeRAM struct {
    Valor int `json:"Porcentaje"`
}

var jsonStr = `{
	"cpu_usage":17 ,
	"data":  {
		"0_systemd": {
			"estado": "1",
			"nombre": "systemd",
			"pid": 1,
			"procesoshijos": [
				{
					"estado": "1",
					"nombre": "systemd-journal",
					"pid": 347,
					"ram": 20,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "systemd-udevd",
					"pid": 376,
					"ram": 8,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "haveged",
					"pid": 403,
					"ram": 6,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "systemd-timesyn",
					"pid": 404,
					"ram": 7,
					"usuario": "996"
				},
				{
					"estado": "1",
					"nombre": "accounts-daemon",
					"pid": 586,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "dbus-daemon",
					"pid": 588,
					"ram": 7,
					"usuario": "106"
				},
				{
					"estado": "1",
					"nombre": "polkitd",
					"pid": 590,
					"ram": 13,
					"usuario": "993"
				},
				{
					"estado": "8193",
					"nombre": "smartd",
					"pid": 593,
					"ram": 6,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "systemd-logind",
					"pid": 594,
					"ram": 8,
					"usuario": "0"
				},
				{
					"estado": "8193",
					"nombre": "cron",
					"pid": 628,
					"ram": 2,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "NetworkManager",
					"pid": 640,
					"ram": 28,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "ModemManager",
					"pid": 671,
					"ram": 16,
					"usuario": "0"
				},
				{
					"estado": "8193",
					"nombre": "containerd",
					"pid": 719,
					"ram": 53,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "gdm3",
					"pid": 787,
					"ram": 14,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "mariadbd",
					"pid": 814,
					"ram": 288,
					"usuario": "100"
				},
				{
					"estado": "1",
					"nombre": "rtkit-daemon",
					"pid": 901,
					"ram": 1,
					"usuario": "131"
				},
				{
					"estado": "1",
					"nombre": "udisksd",
					"pid": 986,
					"ram": 19,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "upowerd",
					"pid": 1057,
					"ram": 8,
					"usuario": "0"
				},
				{
					"estado": "8193",
					"nombre": "dockerd",
					"pid": 1099,
					"ram": 87,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "power-profiles-",
					"pid": 1394,
					"ram": 12,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "wpa_supplicant",
					"pid": 1415,
					"ram": 6,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "colord",
					"pid": 1436,
					"ram": 17,
					"usuario": "132"
				},
				{
					"estado": "1",
					"nombre": "systemd",
					"pid": 1800,
					"ram": 13,
					"usuario": "1000"
				}
			],
			"ram": 14,
			"usuario": "0"
		},
		"1_kthreadd": {
			"estado": "1",
			"nombre": "kthreadd",
			"pid": 2,
			"procesoshijos": [
				{
					"estado": "1026",
					"nombre": "rcu_gp",
					"pid": 3,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "rcu_par_gp",
					"pid": 4,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "slub_flushwq",
					"pid": 5,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "netns",
					"pid": 6,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/0:0H",
					"pid": 8,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "mm_percpu_wq",
					"pid": 10,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "rcu_tasks_kthre",
					"pid": 11,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "rcu_tasks_rude_",
					"pid": 12,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "rcu_tasks_trace",
					"pid": 13,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "ksoftirqd/0",
					"pid": 14,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "rcu_preempt",
					"pid": 15,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "migration/0",
					"pid": 16,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "cpuhp/0",
					"pid": 18,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "cpuhp/1",
					"pid": 19,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "migration/1",
					"pid": 20,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "ksoftirqd/1",
					"pid": 21,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/1:0H",
					"pid": 23,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "cpuhp/2",
					"pid": 24,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "migration/2",
					"pid": 25,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "ksoftirqd/2",
					"pid": 26,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/2:0H",
					"pid": 28,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "cpuhp/3",
					"pid": 29,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "migration/3",
					"pid": 30,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "ksoftirqd/3",
					"pid": 31,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/3:0H",
					"pid": 33,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "kdevtmpfs",
					"pid": 38,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "inet_frag_wq",
					"pid": 39,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "8193",
					"nombre": "kauditd",
					"pid": 40,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "khungtaskd",
					"pid": 41,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "8193",
					"nombre": "oom_reaper",
					"pid": 42,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "writeback",
					"pid": 43,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "8193",
					"nombre": "kcompactd0",
					"pid": 44,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "8193",
					"nombre": "ksmd",
					"pid": 45,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "8193",
					"nombre": "khugepaged",
					"pid": 47,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kintegrityd",
					"pid": 48,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kblockd",
					"pid": 49,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "blkcg_punt_bio",
					"pid": 50,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "tpm_dev_wq",
					"pid": 51,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "edac-poller",
					"pid": 53,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "devfreq_wq",
					"pid": 54,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/3:1H",
					"pid": 56,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "kswapd0",
					"pid": 57,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kthrotld",
					"pid": 63,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "irq/122-aerdrv",
					"pid": 65,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "irq/123-aerdrv",
					"pid": 66,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "acpi_thermal_pm",
					"pid": 67,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "xenbus_probe",
					"pid": 68,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "mld",
					"pid": 70,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/0:1H",
					"pid": 71,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "ipv6_addrconf",
					"pid": 72,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kstrp",
					"pid": 77,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "zswap-shrink",
					"pid": 82,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/u9:0",
					"pid": 83,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/1:1H",
					"pid": 141,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "irq/51-DELL0792",
					"pid": 160,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "cryptd",
					"pid": 161,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "ata_sff",
					"pid": 224,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "scsi_eh_0",
					"pid": 229,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "scsi_tmf_0",
					"pid": 230,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "scsi_eh_1",
					"pid": 231,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "scsi_tmf_1",
					"pid": 232,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "irq/127-i2c_hid",
					"pid": 235,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "card0-crtc0",
					"pid": 245,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "card0-crtc1",
					"pid": 246,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "card0-crtc2",
					"pid": 247,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "jbd2/sdb6-8",
					"pid": 293,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "ext4-rsv-conver",
					"pid": 294,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/2:2H",
					"pid": 461,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "watchdogd",
					"pid": 532,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kmemstick",
					"pid": 534,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "cfg80211",
					"pid": 553,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "rpciod",
					"pid": 608,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "xprtiod",
					"pid": 609,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/u9:1",
					"pid": 697,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "ath10k_wq",
					"pid": 698,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "ath10k_aux_wq",
					"pid": 699,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "ath10k_tx_compl",
					"pid": 700,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/u8:1",
					"pid": 4410,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1",
					"nombre": "irq/134-mei_me",
					"pid": 5120,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/u8:43",
					"pid": 5122,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/2:1",
					"pid": 6812,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/2:0",
					"pid": 7146,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/3:3",
					"pid": 7415,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/1:2",
					"pid": 7449,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/0:1",
					"pid": 7873,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/3:1",
					"pid": 8126,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/0:2",
					"pid": 8129,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/u8:0",
					"pid": 8211,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/1:1",
					"pid": 8244,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/0:0",
					"pid": 8395,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/2:2",
					"pid": 8396,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/0:3",
					"pid": 8397,
					"ram": 13,
					"usuario": "0"
				},
				{
					"estado": "1026",
					"nombre": "kworker/u9:2",
					"pid": 8408,
					"ram": 13,
					"usuario": "0"
				}
			],
			"ram": 13,
			"usuario": "0"
		},
		"2_rcu_gp": {
			"estado": "1026",
			"nombre": "rcu_gp",
			"pid": 3,
			"procesoshijos": [],
			"ram": 13,
			"usuario": "0"
		}
	}
}`
// ! funcion para obtener conexion de la base de datos
func obtenerBaseDeDatos() (db *sql.DB, e error) {
	// * open the db connection.
	usuario := "root"
	pass := "2412"
	host := "tcp(localhost:3306)" // can the 127.0.0.1 ip too instead of db
	nombreBaseDeDatos := "practica2sopes"
	// Debe tener la forma usuario:contraseña@host/nombreBaseDeDatos
	dbtemp, err := sql.Open("mysql", fmt.Sprintf("%s:%s@%s/%s", usuario, pass, host, nombreBaseDeDatos))
	if err != nil {
		fmt.Println("ERROR DE CONEXION CON LA BASE DE DATOS \n")
	}
	return dbtemp, nil
}

// ! Funcion para meter datos a la base de datos
func insertValues(ram_json,cpu_json,cpu_process,percent_ram,percent_cpu string) error {
	stmt, err := db.Prepare("INSERT INTO cpu_ram (ram_json,cpu_json,cpu_process,percent_ram,percent_cpu) VALUES (?, ?, ?, ?, ?)")
	if err != nil {
		fmt.Println("ERROR: ", err)
		return err
	}
	defer stmt.Close()
	_, err = stmt.Exec(ram_json,cpu_json,cpu_process,percent_ram,percent_cpu)
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
		processUser, err := user.LookupId(usernamestr)
		if err != nil {
			panic(err)
		}
        proceso["usuario"] = processUser.Username

		//! Iterar sobre la lista de procesos hijos y cambiar el valor del campo "usuario" de cada elemento
		if procesosHijos, ok := proceso["procesoshijos"].([]interface{}); ok {
			for _, procesoHijo := range procesosHijos {
				if procesoHijoMap, ok := procesoHijo.(map[string]interface{}); ok {
					usernamestr = fmt.Sprintf("%v", procesoHijoMap["usuario"])
					processUser, err = user.LookupId(usernamestr)
					procesoHijoMap["usuario"] = processUser.Username
				}
			}
		}
    }
	//! Codificar el mapa modificado en un string JSON
    jsonBytes, err := json.Marshal(procesos)
    if err != nil {
        fmt.Println("Error:", err)
        return
    }
    jsonStrModified := string(jsonBytes)
    fmt.Println(jsonStrModified)
	CPUACTUAL := strconv.Itoa(ejemplo.CPUUsage)
	fmt.Println(CPUACTUAL)

	//! TOMAR LA LISTA DE LA BASE DE DATOS (RAM Y CPU)
	// ! RAM
	rows, err := db.Query("SELECT ram_json FROM cpu_ram")
	if err != nil {
		fmt.Println("Error obteniendo datos de la base de datos: %v", err)
	}
	defer rows.Close()
	var ram_json string
	for rows.Next() {
		err := rows.Scan(&ram_json)
		if err != nil {
			fmt.Println("Error obteniendo datos de la base de datos: %v", err)
		}
	}

	jsonStr2 := `{
		"Porcentaje":"61 
		}`
	var porcentajeram PorcentajeRAM
	err := json.Unmarshal([]byte(jsonStr2), &porcentajeram)
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	var ramlist []int   // ! lista de ram que se llena de lo que hay en tabla
	err := json.Unmarshal([]byte(ram_json), &ramlist)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(ramlist)
	ramlist = append(ramlist, porcentajeram.Valor)





	// LOOP INFINITUS
	// for {
		// cmd := exec.Command("sh", "-c", "cat /proc/ejemplo_modulo")
		// out, err := cmd.CombinedOutput()
		// if err != nil {
		// 	fmt.Println(err)
		// }
		// output := string(out[:])
	// 	fmt.Println(output)
	// 	time.Sleep(2 * time.Second)
	// }

}
