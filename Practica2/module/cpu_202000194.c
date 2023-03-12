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
#include <linux/fs.h>
#include <linux/cred.h>
#include <linux/uidgid.h>

#define PROC_NAME "cpu_202000194"

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("obtain CPU information");
MODULE_AUTHOR("Alvaro Emmanuel Socop Perez");

static int escribir_archivo(struct seq_file *archivo, void *v)
{
    struct task_struct *task;
    struct task_struct *task_hijo;
    struct list_head *children;
    struct sysinfo si;
    long memproc;
    long memproc2;
    int indext = 0; // indice para el nombre de proceso
    struct file *file;
    char *filename = "/proc/stat";
    char buffer[256];
    int len;
    int cpu_usage=20;
    unsigned long total_mem = 0;
    unsigned long free_mem = 0;
    struct sysinfo info;
    long mem_usage;
    struct user_struct *user;
    char *username = "unknown";
    bool first = true; // solo para el primer proceso la coma

    file = filp_open(filename, O_RDONLY, 0);
    if (IS_ERR(file)) {
        printk(KERN_ERR "Error opening file %s\n", filename);
        return PTR_ERR(file);
    }

    // /* Read the contents of the file */
    // len = kernel_read(file, buffer, sizeof(buffer), 0);
    // if (len < 0) {
    //     printk(KERN_ERR "Error reading file %s\n", filename);
    //     filp_close(file, NULL);
    //     return len;
    // }

    // /* Close the file */
    // filp_close(file, NULL);

    // /* Parse the CPU statistics */
    // unsigned long long user, nice, system, idle, iowait, irq, softirq;
    // int num_cpus;
    // int i;
    // char *line, *tok;

    // line = strtok(buffer, "\n");
    // while (line) {
    //     if (strncmp(line, "cpu", 3) == 0) {
    //         tok = strtok(line, " ");
    //         i = 0;
    //         while (tok) {
    //             switch (i) {
    //                 case 1:
    //                     kstrtoull(tok, 0, &user);
    //                     break;
    //                 case 2:
    //                     kstrtoull(tok, 0, &nice);
    //                     break;
    //                 case 3:
    //                     kstrtoull(tok, 0, &system);
    //                     break;
    //                 case 4:
    //                     kstrtoull(tok, 0, &idle);
    //                     break;
    //                 case 5:
    //                     kstrtoull(tok, 0, &iowait);
    //                     break;
    //                 case 6:
    //                     kstrtoull(tok, 0, &irq);
    //                     break;
    //                 case 7:
    //                     kstrtoull(tok, 0, &softirq);
    //                     break;
    //             }
    //             i++;
    //             tok = strtok(NULL, " ");
    //         }
    //     } else if (strncmp(line, "intr", 4) == 0) {
    //         /* Count the number of CPUs */
    //         num_cpus = 0;
    //         for (i = 0; i < strlen(line); i++) {
    //             if (line[i] == ' ') {
    //                 num_cpus++;
    //             }
    //         }
    //         num_cpus -= 1;
    //     }
    //     line = strtok(NULL, "\n");
    // }

    // /* Calculate the CPU usage */
    // unsigned long long total, busy;
    
    // total = user + nice + system + idle + iowait + irq + softirq;
    // busy = user + nice + system + irq + softirq;
    // cpu_usage = ((double) busy / (double) total) * 100.0;

    /* Print the CPU usage */
    printk(KERN_INFO "CPU usage: %.2f%%\n", cpu_usage);
    // unsigned long long total_cpu_time = jiffies_to_nsecs(jiffies);
    // unsigned long long process_cpu_time = 0;
    // int totalram, freeram;
    // unsigned int cpu_percentage=0;
    // unsigned long long current_cpu_time = 0;

    printk(KERN_INFO "\nProcesos en ejecución:\n");
    // for_each_process(task) {
        // process_cpu_time += task->utime + task->stime;
        // children = &(task->children);
        // list_for_each_entry(task_hijo, children, sibling) {
        //     printk(KERN_CONT " - -  %d", task_hijo->pid);
        // }
        // printk(KERN_CONT "\n");
    // }




    

    si_meminfo(&info);

    total_mem = (info.totalram * info.mem_unit) >> 10;  // ! memoria total en KB
    printk(KERN_INFO "Total memory: %lu KB\n", total_mem);

    seq_printf(archivo, "{\n");
    seq_printf(archivo, "\"cpu_usage\":");   //* "cpu_usage": 25.35,
    seq_printf(archivo, "%d , \n", cpu_usage);
    seq_printf(archivo, "\"data\": {");  //* "data": { "proceso1":{"pid": 254, ... , "procesoshijos": [...]"}, "proceso2":{...}, ... },
    for_each_process(task) {
        if (!first) {
            seq_printf(archivo, ",");
        }
        //! 0 : ejecutando
        //! 4 : zombie
        //! 8 : detenido
        //! 1 o 1026 : suspendido

        if(task->mm) {
            memproc = get_mm_rss(task->mm); // ! memoria de cada proceso
            mem_usage = (memproc / total_mem) * 100.0;
        }
        /* Get the passwd structure for the UID */
        // char *nombre_usuario = get_cred_username(task->real_cred);

        seq_printf(archivo, "\"%d_%s\": {\"pid\": %d, \"nombre\": \"%s\", \"usuario\": \"%s\", \"estado\": \"%d\", \"ram\": %lu, \n\"procesoshijos\": [",
            indext, task->comm, task->pid, task->comm, "x", task->__state, memproc);
        indext++;
        task_lock(task);
        children = &(task->children);
        list_for_each_entry(task_hijo, children, sibling) {
            if(task_hijo->mm) {
                memproc2 = get_mm_rss(task_hijo->mm); // ! memoria de cada proceso hijo
                mem_usage = (memproc2 / total_mem) * 100.0;
            }
            /* Get the passwd structure for the UID */
            // pw = getpwuid(task_hijo->cred->uid.val);
            seq_printf(archivo, "{\"pid\": %d, \"nombre\": \"%s\", \"usuario\": \"%s\", \"estado\": \"%d\", \"ram\": %lu}",
                task_hijo->pid, task_hijo->comm, "uid_str", task_hijo->__state, memproc);

            if (task_hijo->sibling.next != &task->children) {
                seq_printf(archivo, ",");
            }
        }
        task_unlock(task);
        seq_printf(archivo, "]\n}");
        first=false;
    }
    seq_printf(archivo, "}}");



    // current_cpu_time = total_cpu_time - jiffies_to_nsecs(get_jiffies_64());
    // cpu_percentage = ((total_cpu_time - current_cpu_time) * 100) / total_cpu_time;
    // printk(KERN_INFO "total_cpu_time: %llu%%\n", total_cpu_time);
    // printk(KERN_INFO "current_cpu_time: %llu%%\n", current_cpu_time);
    // if (total_cpu_time > 0) {
    //     printk(KERN_INFO "Uso total de CPU: %d%%\n", cpu_percentage);
    // }
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