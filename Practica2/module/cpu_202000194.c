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
#include <linux/jiffies.h>
#include <linux/types.h>
#include <asm/uaccess.h>
#include <linux/mm.h>
#include <linux/time.h>

#define PROC_NAME "cpu_202000194"

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("obtain CPU information");
MODULE_AUTHOR("Alvaro Emmanuel Socop Perez");


static int escribir_archivo(struct seq_file *archivo, void *v)
{
    struct task_struct *task;
    // struct task_struct *task_hijo;
    // struct list_head *children;

    printk(KERN_INFO "Procesos en ejecución:\n");

    for_each_process(task) {
        // switch (task->stats) {
        //     case TASK_RUNNING:
        //         strcpy(estado, "Running");
        //         break;
        //     case TASK_INTERRUPTIBLE:
        //         strcpy(estado, "Interruptible");
        //         break;
        //     case TASK_UNINTERRUPTIBLE:
        //         strcpy(estado, "Uninterruptible");
        //         break;
        //     case __TASK_STOPPED:
        //         strcpy(estado, "Stopped");
        //         break;
        //     case __TASK_TRACED:
        //         strcpy(estado, "Traced");
        //         break;
        //     default:
        //         strcpy(estado, "Unknown");
        //         break;
        // }

        printk(KERN_INFO "\"pid\": %d",
                task->pid);
        seq_printf(archivo, "pid: %d\n", task->pid);

        children = &(task->children);
        list_for_each_entry(task_hijo, children, sibling) {
            printk(KERN_CONT " %d", task_hijo->pid);
        }
        printk(KERN_CONT "\n");
    }
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