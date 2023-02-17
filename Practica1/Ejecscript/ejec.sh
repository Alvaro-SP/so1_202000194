#!/bin/bash
while inotifywait -e close_write logsdata.txt; do
    echo "************************** INICIO DE REPORTE **************************"
    # Nombre del archivo de entrada
    filename="logsdata.txt"
    # Fecha actual
    current_date=$(date +%d/%m/%Y)

    # Contadores
    total_lines=0
    count_b=0
    count_g=0
    count_add=0
    count_sub=0
    count_mul=0
    count_div=0
    count=0
    # Archivo de salida
    output_file="ejemplosalida.txt"

    # Borramos el archivo de salida si ya existe
    if [ -f "$output_file" ]; then
        rm "$output_file"
    fi
    lineasfechaActual=()
    # Lee el archivo
    while read line; do
        # Separo los campos por coma
        IFS=',' read -r -a fields <<< "$line"
        # Cuenta el total de líneas
        ((count++))
        # Analiza la línea y cuenta los B y G
        case "${fields[0]}" in
            B)
                ((count_b++))
                ;;
            G)
                ((count_g++))
                ;;
        esac
        # echo "field5 : ${fields[5]}"
        # Analiza la fecha y guarda las coincidencias en la pantalla
        fecha_cortada=$(echo "${fields[5]}" | cut -d " " -f1)
        if [[ "$fecha_cortada" == $(date "+%d/%m/%Y") ]]; then
            lineasfechaActual+=("$line")
        fi
        # Cuenta los operadores
        case "${fields[3]}" in
            "+")
                ((count_add++))
                ;;
            "-")
                ((count_sub++))
                ;;
            "*")
                ((count_mul++))
                ;;
            "/")
                ((count_div++))
                ;;
        esac
    done < "logsdata.txt"

    # Imprime los resultados en pantalla
    echo "**************************************"
    echo "- CANTIDAD TOTAL DE LOGS REGISTRADOS:"
    echo "           $count"
    echo "**************************************"
    echo "- CANTIDAD TOTAL DE OPERACIONES QUE RESULTARON EN ERROR:"
    echo "           $count_g"
    echo "**************************************"
    echo "- CANTIDAD DE OPERACIONES:"
    echo "(+)=sumas, (+)=restas, (+)=multiplicaciones, (+)=divisiones"
    echo "--------------------------------------"
    echo "- (+) ="
    echo "           $count_add"
    echo "--------------------------------------"
    echo "- (-) ="
    echo "           $count_sub"
    echo "--------------------------------------"
    echo "- (*) ="
    echo "           $count_mul"
    echo "--------------------------------------"
    echo "- (/) ="
    echo "           $count_div"
    echo "**************************************"
    echo "- LOGS DEL DÍA DE HOY:"
    echo "Num1 | Num2 | Opera | Result | fecha | hora |"
    echo "*-----------------------------------------*"
    # Recorre la lista de líneas y las imprime en pantalla


    for linea3 in "${lineasfechaActual[@]}"; do
        # echo "$linea3"
        # Elimina la primera letra B y las comas
        linea3=${linea3#*,}
        linea3=${linea3//,/ }

        # Separa los campos por espacio y guarda en un array
        IFS=' ' read -r -a field4 <<< "$linea3"

        # Recorre el array e imprime cada elemento separado por una tabulación
        for field4 in "${field4[@]}"; do
        echo -ne "${field4}\t"
        done
        echo ""
    done
    echo "************************** FIN DE REPORTE **************************"
done