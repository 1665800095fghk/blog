---
title: "MIT6.S081: Lec1 And Lab1 And Chap.1"
description: "学习MIT6.S081的Lec1, 看配套书本的Chap.1, 并完成Lab1"
pubDate: "2023-11-9"
updatedDate: "2023-11-10"
tags: ["OperatingSystem", "xv6", "MTI6.S081"]
---

## Chap.1 阅读  

### 操作系统接口  

操作系统的任务是:

1. 使计算机的资源在多个程序之间共享
2. 管理和抽象底层的硬件系统
3. 多路复用, 使多个程序可以(起码看起来是)同时运行的  
4. 给程序提供一种受控的交互方式  

在课程中，使用`xv6`来阐述操作系统的概念, 它提供了Unix系统中的基本结构， xv6使用了传统的内核概念--内核是一个向其他运行中的程序提供服务的特殊程序, 系统中的每个进程都有自己的指令、数据、栈内存空间  

进程通过系统调用使用内核服务，系统调用进入内核, 然后内核执行服务并返回, 所以进程总是在用户空间和内核空间之间来回切换

以下是xv6提供的系统调用

- fork() 创建进程
- exit() 结束当前进程
- wait() 等待子进程结束
- kill(pid) 结束 pid 所指进程
- getpid() 获得当前进程 pid
- sleep(n) 睡眠 n 秒
- exec(filename, *argv) 加载并执行一个文件
- sbrk(n) 为进程内存空间增加 n 字节
- open(filename, flags) 打开文件，flags 指定读/写模式
- read(fd, buf, n) 从文件中读 n 个字节到 buf
- write(fd, buf, n) 从 buf 中写 n 个字节到文件
- close(fd) 关闭打开的 fd
- dup(fd) 复制 fd
- pipe( p) 创建管道， 并把读和写的 fd 返回到p
- chdir(dirname) 改变当前目录
- mkdir(dirname) 创建新的目录
- mknod(name, major, minor) 创建设备文件
- fstat(fd) 返回文件信息
- link(f1, f2) 给 f1 创建一个新名字(f2)
- unlink(filename) 删除文件

### 进程和内存

xv6分为用户空间和内核空间, 在执行程序时会在两个空间来回切切换, 内核将每一个进程与一个`pid` 关联  

进程可以通过进行系统调用`fork()`来创建进程, fork创建的进程是子进程, 子进程的内容和创建它的父进程一样, fork在父子进程中都返回, 对于父进程, 它返回子进程的pid, 对于子进程, 它返回0

```c
int pid = fork();

if (pid > 0)
{
  printf("parent: child=%d\n", pid);
  pid = wait((int*)0);
  printf("child %d is done\n", pid);
}
else
{
  printf("child: exiting");
  exit(0);
}
exit(0);
```

系统调用`exec`是从某个文件读取内存镜像, 并将其替换到调用它的进程的内存，当exec执行完毕后，不会回到之前的进程，而是从执行的ELF文件声明的入口开始

```c
char *argv = {
  "echo",
  "hello",
  0
};
exec("echo", argv);
printf("exec error\n");
```

当exec成功调用，子进程会转去其他的程序，在执行的程序内，会在某个时刻调用`exit`，这会使得父进程从`wait`返回。

```c
if(fork() == 0) {
  char *argv[3] = {
    "echo",
    "hello",
    0
  }
  exec("echo", argv);
} else {
  wait((int*)0);
  printf("Child exit\n");
  exit();
}
```

### IO和文件描述符

`文件描述符`是一个整数，代表一个进程可以读写被内核管理的对象。

进程可以打开文件、目录、设备或创建管道(pipe)来获取文件描述符，或者复制已有的文件描述符，文件描述符就是对文件、管道、设备的抽象，这种抽象使他们看起来就像是字节流。

每个进程含有一张表，xv6以文件描述符作为表的索引。按照惯例，进程从0读入(标准输入)，从1输出(标准输出)，从2输出错误(标准错误输出),shell就是利用这一点完成了I/O重定向

系统调用`read`和`wirte`从文件描述符所指的文件中读或写

```c
// 从 fd 中读取 n 个字符到 buf
read(fd, buf, n);
// 向 fd 写入 n 个来自 buf 的字符
write(fd, buf, n);
```

`read`在读取字符后回返回读取的字符数量。每一个`fd`与一个偏移量惯例，每一次read都会增加偏移量，使下一处read从偏移的位置开始读取，当没有数据可读，返回0。

`write`返回的值小于n时就是发生了错误，和`read`一样，`write`也回从偏移量处开始写，在写的过程中增加偏移

下面是一个关于`read`和`write`的例子，它在运行之后会读取shell的输入然后输出

```c
char buf[512];
int n;
for (;;)
{
  n = read(0, buf, sizeof buf);
  if (n == 0)
  {
    break;
  }
  if (n < 0)
  {
    fprintf(2, "read error\n");
    exit(-1);
  }
  if (write(1, buf, n) != n)
  {
    fprintf(2, "write error\n");
    exit(-1);
  }
}
```

`close`会释放一个文件描述符，使它在之后能被`open`，`pipe`，`dup`等调用重用。一个新的文件描述符永远是目前最小的未被使用的。

```c
char *argv[2] = {
  "cat",
  0
};
if(fork() == 0) {
  close(0);
  open("input.txt", O_RDONLY);
  exec("cat", argv);
}
```

上面的代码，子进程关闭了默认的输入，打开了名为input.txt的文件，因为刚刚关闭了文件描述符0，所以打开的文件会使用0作为文件描述符，之后的`cat`会在标准输入指向input.txt的情况下执行。

虽然`fork`会复制文件描述符，但是每一个文件的偏移是父子进程之间进行共享的，例如下面的带啊吗，会完整的输出"helloworld\n"

```c
if (fork() == 0)
{
  write(1, "hello", 6);
  exit(0);
}
else
{
  wait((int *)0);
  write(1, "world\n", 6);
}
```

`dup`会复制一个已有的文件描述符，返回一个指向相同对象的文件描述符，两个描述符共享同一个偏移

```c
int fd = dup(1);
write(1, "Hello", 6);
write(fd, "world\n", 6);
```

### 管道

管道是一个小的内核缓冲区，以文件描述符的形式提供给进程，一个用于写，一个用于读，管道的一端写的数据从另一端读取，管道提供了进程之间交互的方式。

```c
int p[2];
char *argv[2] = {
    "wc",
    0};
pipe(p);
if (fork() == 0)
{
  close(0);
  dup(p[0]);
  close(p[0]);
  close(p[1]);
  exec("wc", argv);
}
else
{
  write(p[1], "hello world\n", 12);
  close(p[0]);
  close(p[1]);
}
```

`pipe`用于创建一个管道，并记录于p中，在fork之后，父子进程都有指向管道的文件描述符，子进程将读端口拷在端口描述符0上，执行wc时，wc指向的标准输入实际指向管道的输出，父进程向管道中写入了"hello world\n"。

如果数据没有准备好，对管道的`read`会一直等待，直到有数据或者其他绑定在这个管道的描述符都已经关闭，再最后的情况，`read`返回0，如同文件到了最后。

对于管道与临时文件的不同点，看起来，使用命令
`echo hello world | wc`
和使用临时文件
`echo hello world > /tmp/xyz; wc < /tmp/xyz`
并没有什么区别，但是，实际上有几点不同：

1. 管道会进行自我清扫，如果使用临时文件，我们需要在结束后清扫"/tmp/xyz"
2. 管道可以传输任意长度的数据
3. 管道允许同步，两个进程可以使用一对管道进行双向数据传递，每一个读操作都阻塞进程

### 文件系统

xv6中的文件就是字节数组，而目包含指向其他目录和文件的引用。

调用进程的当前目录可以使用系统调用`chdir`进行改变，这些代码都会打开同一个文件

```c
chdir("/a");
chdir("b");
open("c", O_RDONLY);

open("/a/b/c", O_RDONLY);
```

有很多的系统调用可以创建新的文件和目录，如`mkdir`创建新的目录，`open`的`O_CREATE`可以打开新的文件，`mknod`创建新的设备文件

```c
mkdir("/dir");
fd = open("/dir/file", O_CREATE | O_WRONGLY);
close(fd);
mknod("/console", 1, 1);
```

`mknod`在文件系统中创建文件，用于记录主设备号和辅设备号，这两个设备号缺点一个内核设备，当进程打开文件，内核将读写的系统调用转发到内核设备的实现上，而不是传给文件系统

`fstat`可以获取一个文件描述符指向文件的信息，它填充一个名为`stat`的结构体，它的定义为：

```c
#define T_DIR 1
#define T_FILE 2
#define T_DEV 3

struct stat {
  short type; // 文件类型
  int dev;    // 文件系统磁盘设备
  uint ino;   // 索引节点
  short nlink;// 文件名数量
  uint size;  // 文件大小
}
```

对于文件，文件名和文件本身有很大的区别，同一个文件(inode)可以有多个名字，称为连接(link)，可以使用系统调用`link`创建另一个文件的名字，它指向同一个inode，如：

```c
open("a", O_CREATE | O_WRONGLY);
link("a", "b");
```

读写a就是读写b，每个inode通过唯一的inode号确定

`nlink`可以去除一个文件名，一个文件的inode和磁盘空间只有它的连接数量为0时才会被清空

```c
unlink("a");
```

下面是一种创建临时inode的方法，这个inode会在进程关闭`fd`或者退出的时候被清空

```c
fd = open("/tmp/xyz", O_CREATE | O_RDWR);
unlink("/tmp/xyz");
```

## Lec1
