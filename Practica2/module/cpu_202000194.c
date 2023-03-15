
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
// #include <linux/sysinfo.h>
// implementacion de sched para obtener el uso de CPU
#include <linux/sched.h>
#include <linux/sched/signal.h>
#include <linux/jiffies.h>
#include <linux/types.h>
#include <asm/uaccess.h>
#include <linux/mm.h>
#include <linux/time.h>
#include <linux/hugetlb.h>
#include <linux/fs.h>
#include <linux/cred.h>
#include <linux/uidgid.h>
#include <linux/delay.h>

#define PROC_NAME "cpu_202000194"


MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("obtain CPU information");
MODULE_AUTHOR("Alvaro Emmanuel Socop Perez");

static int escribir_archivo(struct seq_file *archivo, void *v)
{
    struct task_struct *task;
    struct task_struct *task_hijo;
    struct list_head *children;
    long memproc;
    long memproc2;
    int indext = 0; // indice para el nombre de proceso
    struct file *file;
    struct file *file2;
    char *filename = "/proc/stat";
    char *filename2 = "/CPUANTERIOR";
    char buffer[256];
    int len;
    long cpu_usage=20;
    struct sysinfo info;
    long mem_usage;
    bool first = true; // solo para el primer proceso la coma
    long memoria_total = 0;
    // variables para guardar cantidad de procesos
    long int ejecucion;
    long int suspendido;
    long int detenido;
    long int zombie;
    long int totales;

    // !------------------------ SE ABRE ARCHIVO GUARDADO --------------------------
    file = filp_open(filename, O_RDONLY, 0);
    if (IS_ERR(file)) {
        printk(KERN_ERR "Error opening file %s\n", filename);
    }

    /* Read the contents of the file */
    len = kernel_read(file, buffer, sizeof(buffer), 0);
    if (len < 0) {
        printk(KERN_ERR "Error reading file %s\n", filename);
        filp_close(file, NULL);
    }
    /* Close the file */
    filp_close(file, NULL);

    /* Parse the CPU statistics */
    long userx, nice, system, idle, iowait, irq, softirq;
    long userx2, nice2, system2, idle2, iowait2, irq2, softirq2;

    // printk(KERN_INFO "\n %s \n",buffer);

    sscanf(buffer, "cpu %lu %lu %lu %lu %lu %lu %lu", &userx, &nice, &system, &idle, &iowait, &irq, &softirq);
    

    
    // !------------------------ SE ABRE ARCHIVO ACTUAL --------------------------
    // file = filp_open(filename, O_RDONLY, 0);
    // if (IS_ERR(file)) {
    //     printk(KERN_ERR "Error opening file %s\n", filename);
    // }
    // if (len < 0) {
    //     printk(KERN_ERR "Error reading file %s\n", filename);
    //     filp_close(file, NULL);
    // }
    // /* Close the file */
    // filp_close(file, NULL);

    // // Extrae los valores de tiempo de CPU después de 1 segundo
    // sscanf(buffer, "cpu %lu %lu %lu %lu %lu %lu %lu", &userx2, &nice2, &system2, &idle2, &iowait2, &irq2, &softirq2);
    
    // !------------------ SE GUARDA EN FILENAME2 LO DE ACTUAL ----------------------
    // file2 = filp_open(filename2, O_WRONLY | O_CREAT, 0644);
    // if (IS_ERR(file2)) {
    //     printk(KERN_ERR "Error opening file %s\n", filename2);
    // }
    // // Cambiar el segmento de usuario al segmento de kernel
    // // old_fs = get_fs();
    // // set_fs(KERNEL_DS);
    // /* Write the contents of the file */
    // len = sprintf(buffer, "cpu %lu %lu %lu %lu %lu %lu %lu\n", userx2, nice2, system2, idle2, iowait2, irq2, softirq2);
    // len = kernel_write(file2, buffer, len, 0);
    // if (len < 0) {
    //     printk(KERN_ERR "Error writing file %s\n", filename2);
    //     filp_close(file2, NULL);
    // }
    // // Restaurar el segmento de usuario
    // // set_fs(old_fs);
    // /* Close the file */
    // filp_close(file2, NULL);
    //! ************************  Calculate the CPU usage ************************
    //*   user: normal processes executing in user mode
    //*   nice: niced processes executing in user mode
    //*   system: processes executing in kernel mode
    //*   idle: twiddling thumbs
    //*   iowait: waiting for I/O to complete
    //*   irq: servicing interrupts
    //*   softirq: servicing softirqs

    long total_time1, total_time2;
    // long delta_idle_time, delta_total_time;
    total_time1 = userx + nice + system + idle + iowait + irq + softirq;
    total_time2 = userx2 + nice2 + system2 + idle2 + iowait2 + irq2 + softirq2;


    // delta_total_time = total_time2 - total_time1;
    // delta_idle_time = idle2 - idle;
    // cpu_usage = ((delta_total_time - delta_idle_time) * 100) / delta_total_time;

    cpu_usage = (idle * 100) / total_time1;
    cpu_usage = 100 - cpu_usage;
    /* Print the CPU usage */
    printk(KERN_INFO "CPU userx: %lu \n", userx);
    printk(KERN_INFO "CPU nice: %lu \n", nice);
    printk(KERN_INFO "CPU system: %lu \n", system);
    printk(KERN_INFO "CPU idle: %lu \n", idle);
    printk(KERN_INFO "CPU iowait: %lu \n", iowait);
    printk(KERN_INFO "CPU irq: %lu \n", irq);
    printk(KERN_INFO "CPU softirq: %lu \n", softirq);

    printk(KERN_INFO "CPU cpu_usage: %lu \n", cpu_usage);

























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

    // total_mem = (info.totalram * info.mem_unit) >> 10;  // ! memoria total en MB
    // printk(KERN_INFO "Total memory: %lu mB\n", total_mem/1000);
    memoria_total = (info.totalram * info.mem_unit);
    printk(KERN_INFO "Total memory: %lu MB\n", (memoria_total/1000000));
    seq_printf(archivo, "{\n");
    seq_printf(archivo, "\"cpu_usage\":");   //* "cpu_usage": 25.35,
    seq_printf(archivo, "%lu , \n", cpu_usage);
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
            memproc = (get_mm_rss(task->mm)<<PAGE_SHIFT)/(1024*1024);
            // printk(KERN_INFO "Memoria de %s: %lu MB", task->comm, memproc);
            mem_usage = (memproc*10000 / (long)(memoria_total/1000000));      //! PORCENTAJE CON 2 DECIMALES PARSEAR EN FRONT
            // printk(KERN_INFO "Porcentaje de memoria de %s: %lu %%\n", task->comm,mem_usage);

        }
        if(task->__state == 0 || task->__state == 1026|| task->__state == 2){
            ejecucion++;
        }else if(task->__state == 4){
            zombie++;
        }else if(task->__state == 8 || task->__state == 8193){
            detenido++;
        }else if(task->__state == 1 || task->__state == 1026){\
            suspendido++;
        }
        totales++;
        /* Get the passwd structure for the UID */
        // char *nombre_usuario = get_cred_username(task->real_cred);

        seq_printf(archivo, "\"%d_%s\": {\"pid\": %d, \"nombre\": \"%s\", \"usuario\": \"%d\", \"estado\": \"%d\", \"ram\": %lu, \n\"procesoshijos\": [",
            indext,
            task->comm,
            task->pid,
            task->comm,
            task->cred->uid,
            task->__state
            , mem_usage);
        indext++;
        task_lock(task);
        children = &(task->children);
        list_for_each_entry(task_hijo, children, sibling) {
            if(task_hijo->mm) {
                memproc2 = (get_mm_rss(task_hijo->mm)<<PAGE_SHIFT)/(1024*1024); // ! memoria de cada proceso hijo
                mem_usage = (memproc2*10000 / (long)(memoria_total/1000000));
            }
            /* Get the passwd structure for the UID */
            // pw = getpwuid(task_hijo->cred->uid.val);
            seq_printf(archivo, "{\"pid\": %d, \"nombre\": \"%s\", \"usuario\": \"%d\", \"estado\": \"%d\", \"ram\": %lu}",
                task_hijo->pid,
                task_hijo->comm,
                task_hijo->real_cred->uid,
                task_hijo->__state,
                mem_usage);

            if (task_hijo->sibling.next != &task->children) {
                seq_printf(archivo, ",");
            }
        }
        task_unlock(task);
        seq_printf(archivo, "]\n}");
        first=false;
    }


    seq_printf(archivo, "}, \n");
    seq_printf(archivo, "\"ejecucion\":");
    seq_printf(archivo, "%li , \n", ejecucion);

    seq_printf(archivo, "\"zombie\":");
    seq_printf(archivo, "%li , \n", zombie);

    seq_printf(archivo, "\"detenido\":");
    seq_printf(archivo, "%li , \n", detenido);

    seq_printf(archivo, "\"suspendido\":");
    seq_printf(archivo, "%li , \n", suspendido);

    seq_printf(archivo, "\"totales\":");
    seq_printf(archivo, "%li  \n", totales);
    seq_printf(archivo, "}");

    



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


// https://stackoverflow.com/questions/33594124/why-is-the-process-state-in-task-struct-stored-as-type-long