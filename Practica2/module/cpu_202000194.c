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
#include <stdio.h>   // Include the stdio.h header file
#define PROC_NAME "cpu_202000194"

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("obtain CPU information");
MODULE_AUTHOR("Alvaro Emmanuel Socop Perez");

float getpercent() {
    FILE* fp;
    char buf[1024];
    unsigned long user, nice, system, idle, iowait, irq, softirq, steal, guest, guest_nice;
    unsigned long prev_idle, prev_total, total, diff_idle, diff_total;
    float usage;

    fp = fopen("/proc/stat", "r");
    if (fp == NULL) {
        perror("Failed to open /proc/stat");
        return 1;
    }

    fgets(buf, sizeof(buf), fp);
    sscanf(buf, "cpu %lu %lu %lu %lu %lu %lu %lu %lu %lu %lu",
           &user, &nice, &system, &idle, &iowait, &irq, &softirq, &steal, &guest, &guest_nice);

    prev_idle = idle;
    prev_total = user + nice + system + idle + iowait + irq + softirq + steal;
    sleep(1);

    fseek(fp, 0, SEEK_SET);
    fgets(buf, sizeof(buf), fp);
    sscanf(buf, "cpu %lu %lu %lu %lu %lu %lu %lu %lu %lu %lu",
           &user, &nice, &system, &idle, &iowait, &irq, &softirq, &steal, &guest, &guest_nice);

    total = user + nice + system + idle + iowait + irq + softirq + steal;
    diff_idle = idle - prev_idle;
    diff_total = total - prev_total;
    usage = 100.0 * (diff_total - diff_idle) / diff_total;

    printf("CPU usage: %.2f%%\n", usage);

    fclose(fp);
    return usage;
}

static int escribir_archivo(struct seq_file *archivo, void *v)
{
    struct task_struct *task;
    struct task_struct *task_hijo;
    struct list_head *children;
    struct sysinfo si;
    long memproc;
    float cpu_usage = getpercent();
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
    seq_printf(archivo, "{\n");
    seq_printf(archivo, "\"cpu_usage\": %f,\n", cpu_usage);   //* "cpu_usage": 25.35,

    seq_printf(archivo, "\"data\": {");  //* "data": { "proceso1":{"pid": 254, ... , "procesoshijos": [...]"}, "proceso2":{...}, ... },
    for_each_process(task) {
        if(task->mm) {
            memproc = get_mm_rss(task->mm); // ! memoria de cada proceso
        }
        seq_printf(archivo, "\"%s\": {\"pid\": %d, \"nombre\": \"%s\", \"usuario\": \"%s\", \"estado\": \"%ld\", \"ram\": %lu, \"procesoshijos\": [",
            task->comm, task->pid, task->comm, task->cred->uid.val, task->stats, memproc);
        task_lock(task);
        children = &(task->children);
        list_for_each_entry(task_hijo, children, sibling) {
            seq_printf(archivo, "{\"pid\": %d, \"nombre\": \"%s\", \"usuario\": \"%s\", \"estado\": \"%ld\", \"ram\": %lu}",
                task_hijo->pid, task_hijo->comm, task_hijo->cred->uid, task_hijo->stats, memproc);

            if (task_hijo->sibling.next != &task->children) {
                seq_printf(archivo, ",");
            }
        }
        task_unlock(task);
        seq_printf(archivo, "]}");
        if (task->sibling.next != &init_task.tasks) {
            seq_printf(archivo, ",");
        }
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