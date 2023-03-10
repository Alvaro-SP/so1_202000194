#include <linux/module.h>
// para usar KERN_INFO
#include <linux/kernel.h>
//Header para los macros module_init y module_exit
#include <linux/init.h>
//Header necesario porque se usara proc_fs
#include <linux/proc_fs.h>
/* for copy_from_user */
#include <asm/uaccess.h>
/* Header para usar la lib seq_file y manejar el archivo en /proc*/
#include <linux/seq_file.h>
// implementacion de sysinfo
#include <linux/sysinfo.h>
#include <sys/swap.h>
#define PROC_NAME "ram_202000194"

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("obtain ram information");
MODULE_AUTHOR("Alvaro Emmanuel Socop Perez");


static int escribir_archivo(struct seq_file *archivo, void *v)
{
    // take the info from the system
    struct sysinfo si;
    si_meminfo(&si);
    seq_printf(archivo, "{\n");
    seq_printf(archivo, "Memoria total: %lu KB\n", si.totalram/1024);
    seq_printf(archivo, "Memoria libre: %lu KB\n", si.freeram/1024);
    seq_printf(archivo, "Memoria en uso: %lu KB\n", (si.totalram - si.freeram)/1024);
    seq_printf(archivo, "\"}\n");
    return 0;
}

//Funcion que se ejecuta cuando se le hace un cat al modulo.
static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

// Si el su Kernel es 5.6 o mayor
static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

static int _insert(void)
{
    proc_create("ram_202000194", 0, NULL, &operaciones);
    printk(KERN_INFO "202000194\n");
    return 0;
}

static void _remove(void)
{
    remove_proc_entry("ram_202000194", NULL);
    printk(KERN_INFO "Sistemas Operativos 1\n");
}

module_init(_insert);
module_exit(_remove);