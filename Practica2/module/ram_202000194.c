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
// #include <linux/sysinfo.h>
// #include <linux/swap.h>
// #include <linux/mmzone.h>
#include <linux/hugetlb.h>
#include <linux/fs.h>
#define PROC_NAME "ram_202000194"

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("obtain ram information");
MODULE_AUTHOR("Alvaro Emmanuel Socop Perez");


// static int escribir_archivo(struct seq_file *archivo, void *v)
// {
//     // take the info from the system
//     struct sysinfo si;
//     si_meminfo(&si);
//     seq_printf(archivo, "{\"TOTAL\":\"%ld \n",si.totalram);
//     seq_printf(archivo, "{\"freeram\":\"%ld \n",si.freeram);
//     seq_printf(archivo, "{\"Porcentaje\":\"%ld \n",(((si.totalram)-(si.freeram))*100)/(si.totalram));
//     seq_printf(archivo, "\"}");
//     return 0;
// }

static int escribir_archivo(struct seq_file *archivo, void *v) {
    // unsigned long long total_memoria = (unsigned long long)totalram_pages * (unsigned long long)PAGE_SIZE;
    // unsigned long long memoria_libre = (unsigned long long)si_mem_available();

    struct sysinfo si;
    si_meminfo(&si);

    unsigned long long memoria_total = (unsigned long long)si.totalram * (unsigned long long)si.mem_unit;
    unsigned long long memoria_usada = memoria_total - (unsigned long long)si.freeram * (unsigned long long)si.mem_unit;

    seq_printf(archivo, "{\n");
    // printk(KERN_ERR "Memoria total: %llu mB\n", memoria_total /(1000000));
    // printk(KERN_ERR "Memoria libre: %llu KB\n", 
    // si.freeram * (unsigned long long)si.mem_unit /(1000000));
    // printk(KERN_ERR "Buffered: %llu KB\n", 
    // (si.bufferram* (unsigned long long)si.mem_unit));
    // printk(KERN_ERR "Memoria en uso: %llu KB\n", memoria_usada /(1000000));
    seq_printf(archivo, "\"Porcentaje\":%lld \n",
    (((memoria_total)-(si.freeram * (unsigned long long)si.mem_unit) - (si.bufferram* (unsigned long long)si.mem_unit)- (si.sharedram *(unsigned long long)si.mem_unit))*10000)/(memoria_total));

    seq_printf(archivo, "}\n");
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