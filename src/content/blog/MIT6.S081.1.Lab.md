---
title: "MIT6.S081: Lab1"
description: "完成Lab1"
pubDate: "2023-11-20"
updatedDate: "2023-11-20"
tags: ["OperatingSystem", "xv6", "MTI6.S081"]
---


## Lab.1: Xv6 && Unix utilities

### boot xv6 (<span style="color: #0f0;">Easy</span>)

在配置环境方面，我使用了他人的docker镜像来配置开发环境，如何安装docker为就不过多描述

首先先拉取镜像

```shell
$ docker pull linxi177229/mit6.s081:latest
```

接下来直接run一个容器就可以了

```shell
$ docker run --name mit6.s081 -itd linxi177229/mit6.s081:latest
```

使用终端连接可以使用`docker attach mit6.s081`来进行连接，开发我使用的是vscode使用`Dev Containers`插件来连接docker容器进行开发

在镜像中，xv6源代码处于`/xv6-labs-2020`中，进入这个目录使用git命令切换到当前Lab的分支

```shell
$ git checkout util
```

在项目根目录就可以对系统进行编译

```shell
$ make qemu
```

这样就会进入Xv6系统，如果要退出Xv6系统，可以使用`Ctrl-a x`快捷键进行退出

在Lab中，如果需要知道自己的代码是否存在问题，可以使用`make grade`对当前Lab进行评分

### Sleep (<span style="color: #0f0;">Easy</span>)

> 实现Unix的程序sleep；这个程序将暂停用户指定的滴答数。时钟周期是xv6内核定义的时间概念，即定时器芯片两次中断之间的时间，代码应该存于`user/sleep.c`中

- 可以查阅`user/`中的其他程序(参阅`user/echo.c`, `user/grep.c`,`user/rm.c`)，了解如何获取用户传递给程序的命令行参数
- 如果用户忘记传递参数，应该打印错误信息
- 命令行参数作为字符串传递，可以使用`atoi`转为整数(参阅`user/ulib.c`)
- 使用系统调用`sleep`
- 参阅`kernel/sysproc.c`以了解实现sleep系统调用的内核代码(查找`sys_sleep`)
- 参阅`user/user.h`以了解从用户程序调用sleep的c定义，以及`user/usys.S`以了解汇编代码从用户代码跳转到内核进行sleep
- 确保main调用exit退出程序
- 将sleep添加到`Makefile`的`UPROGS`中，以保证在xv6中能运行它
- 编写完毕后使用`.grade-lab-util sleep`测试代码是否正确

根据上面的提示，我们只需要判断参数的输入是否正确，然后进行系统调用就行

```c
if (argc <= 1)
{
    fprintf(2, "Parameter Error\n", 16);
    exit(1);
}
sleep(atoi(argv[1]));
exit(0);
```

### PingPong (<span style="color: #0f0;">Easy</span>)

> 使用系统调用通过一对管道，在两个进程之间传递"pingpong"，父进程向子进程发送"ping"，子进程会打印"<pid>: received ping"，然后子进程向父进程传递"pong"，父进程打印"<pid>: received pong"，然后退出

- 使用`pipe`创建管道
- 使用`fork`创建子进程
- 使用`read`从管道读取数据，`write`写入数据
- 使用`getpid`获取当前进程的id
- xv6具有一些可用库函数，位于`user/user.h`，源代码位于`user/ulib.c`, `user/printf.c`, `user/umalloc.c`中

我们首先定义管道的0端为读取端，1为写入端，方便后面代码的编写，然后创建了需要传递的字节buf，以及用于传递数据的两个管道

在子进程，首先关闭了不需要的两个端口，然后读取数据，输出ping，然后向管道写入数据，关闭端口

在父进程，同样关闭端口，但根据需求，先向子进程写入数据，然后读取了子进程返回的数据，然后输出pong，关闭端口

```c
#define R 0
#define W 1

char buf = 'x';
int p2c[2], c2p[2];
pipe(p2c), pipe(c2p);
if(fork() == 0) {
    close(p2c[W]), close(c2p[R]);
    read(p2c[R], &buf, sizeof(char));
    printf("%d: received ping\n", getpid());
    write(c2p[W], &buf, sizeof(char));
    close(p2c[R]), close(c2p[W]);
    exit(0);
} else {
    close(p2c[R]), close(c2p[W]);
    write(p2c[W], &buf, sizeof(char));
    read(c2p[R], &buf, sizeof(char));
    pritnf("%d: received pong\n", getpid());
    close(p2c[W]), close(c2p[R]);
}
exit(0);
```

### Primes (<span style="color: #00f;">Moderate</span>)/(<span style="color: #f00;">Hard</span>)

> 写一个管道版本的素数筛，素数筛参见[link](http://swtch.com/~rsc/thread/)，目标是通过pipe和fork来设置管道，第一个进程将数字2~35输入管道，对于每个素数，安排一个新的进程，通过管道从左侧邻居读取数据，并通过一个管道向右侧写入数据，解决方案存于`user/primes.c`中

![image](https://swtch.com/~rsc/thread/sieve.gif)

- 请小心关闭进程不需要的文件描述符
- 一旦第一个进程到达35，它应该等待整个管道终止，包括子进程、孙进程等
- 当管道的写入端关闭时，读取返回0
- 应该在需要时在管道中创建进程

伪代码: 

```
p = 从左侧获取数字
print p
loop:
    n = 从左侧获取一个数字
    if (p不能整除n)
        把n发往右侧邻居
```


