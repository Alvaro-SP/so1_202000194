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
// implementacion de sysinfojiffie
#include <linux/sysinfo.h>
// implementacion de sched para obtener el uso de CPU
#include <linux/sched.h>
#include <linux/sched/signal.h>
#include <asm/uaccess.h>
#define PROC_NAME "cpu_202000194"

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("obtain CPU information");
MODULE_AUTHOR("Alvaro Emmanuel Socop Perez");

static unsigned long long last_total_jiffies = 0;
static unsigned long long last_work_jiffies = 0;

static int escribir_archivo(struct seq_file *archivo, void *v)
{
    struct task_struct *task; // task_struct es una estructura que contiene la informacion de un proceso
    struct task_struct *child; // task_struct es una estructura que contiene la informacion de un proceso pero hijo
    struct sysinfo si; // Estructura que contiene la informacion del sistema

    //! USO DEL CPU:
    // Obtiene información del sistema
    si_meminfo(&info);

    // Obtiene el tiempo actual de CPU
    unsigned long long total_s = get_jiffies_64();
    unsigned long long work_jiffies = get_cpu_usecs(0);

    // Calcula el porcentaje de uso actual de CPU
    float cpu_usage = ((float)(work_jiffies - last_work_jiffies) / (total_jiffies - last_total_jiffies)) * 100.0;

    // Actualiza los valores del último tiempo de CPU utilizado
    last_total_jiffies = total_jiffies;
    last_work_jiffies = work_jiffies;

    seq_printf(archivo, "Porcentaje de uso actual de CPU: %.2f%%\n", cpu_usage);


    si_meminfo(&si); // Obtenemos la informacion del sistema
    seq_printf(archivo, "{\n");
    seq_printf(archivo, "\"cpu_usage\": %.2f,\n", cpu_usage);   //* "cpu_usage": 25.35,

    seq_printf(archivo, "\"data\": {");  //* "data": { "proceso1":{"pid": 254, ... , "procesoshijos": [...]"}, "proceso2":{...}, ... },
    for_each_process(task) {
        seq_printf(archivo, "\"%s\": {\"pid\": %d, \"nombre\": \"%s\", \"usuario\": \"%s\", \"estado\": \"%ld\", \"ram\": %lu, \"procesoshijos\": [",
            task->comm, task->pid, task->comm, get_task_comm(task->real_cred->user->user_struct), task->state, task_resident_set_size(task) * (si.mem_unit / 1024));
        list_for_each_entry(child, &task->children, sibling) {
            seq_printf(archivo, "{\"pid\": %d, \"nombre\": \"%s\", \"usuario\": \"%s\", \"estado\": \"%ld\", \"ram\": %lu}",
                child->pid, child->comm, get_task_comm(child->real_cred->user->user_struct), child->state, task_resident_set_size(child) * (si.mem_unit / 1024));
            if (child->sibling.next != &task->children) {
                seq_printf(archivo, ",");
            }
        }
        seq_printf(archivo, "]}");
        if (task->sibling.next != &init_task.tasks) {
            seq_printf(archivo, ",");
        }
    }
    seq_printf(archivo, "}}");
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
    proc_create("cpu_202000194", 0, NULL, &operaciones);
    printk(KERN_INFO "202000194\n");
    return 0;
}

static void _remove(void)
{
    remove_proc_entry("cpu_202000194", NULL);
    printk(KERN_INFO "Sistemas Operativos 1\n");
}

module_init(_insert);
module_exit(_remove);