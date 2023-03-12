
# Tomar la ruta actual
ruta=$(pwd)

# Moverse a la ruta del repositorio Git
cd $ruta
sudo rmmod ram_202000194
make clean
make all
sudo insmod ram_202000194.ko
cat /proc/ram_202000194