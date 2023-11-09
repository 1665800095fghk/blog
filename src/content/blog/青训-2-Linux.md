---

title: "青训-Linux"
description: ""
pubDate: "2023-4-14"
updatedDate: "2023-4-14"
tags: ["字节跳动青训", "Linux"]
---

## 学习 Linux 的价值

- Linux 是现代化应用程序交付的首选平台
- 公司内部服务(TCE, FaaS, SCM)统一使用 Debian Linux 系统
- 熟悉 Linux 基础指令，熟练运用运维前端常用服务(Nginx, Node.js)
- 加深对操作系统概念和实现的理解

## 1.计算机硬件

### 组成

- 控制器
- 运算器
- 存储单元
- 输入单元
- 输出单元

## 2.操作系统启动流程

1. BIOS
   1. Power up
   1. BIOS
   1. BIOS 自检
   1. Bootloader
   1. OS
2. UEFI
   1. Power up
   1. UEFI
   1. Bootloader
   1. OS

## 3.版本

- 内核版本
- 发行版本

Linux 内核 + 常用软件 = Linux 发行版本

### 查看内核版本

```bash
uname -a
# or
cat /proc/version
```

### Linux 应用领域

- IT 服务器
- 嵌入式和智能设备
- 个人办公桌面
- 学术研究和软件研发

## 4.Linux 系统结构

一般是四个部分

- 内核
- shell
- 文件系统
- 应用程序

### 体系结构

- 用户空间
  - 应用程序
  - GUN C Library - 系统封装好的调用库
- 内核空间

  - 系统调用
  - 内核
    - 系统调用接口
    - 进程管理
    - 内存管理
    - 虚拟文件系统
    - 网络堆栈
    - 设备驱动程序
  - 平台架构相关代码

- 内核是硬件与软件之间的中间层
- 内核是一个资源管理程序
- 内核提供一组面向系统的命令

### 进程管理

- 进程是正在执行的一个程序或命令
- 进程有自己的地址空间
- 一个 CPU 核同一时间只能运行一个进程
- 进程由它的进程 ID (PID) 和它的夫进程 ID (PPID) 唯一识别

### 查看进程信息

```bash
# 查看启动的 nginx 进程
ps -ef | grep nginx
# 查看某个进程
top -p 93824
# 关闭指定进程
kill 93824
# 全部进程动态实时视图
top
```

### 进程调度

进程调度是指操作系统按某种策略或规则选择进程占用 CPU 运行的过程

进程状态:

- R (TASK_RUNNING) 可执行状态
- S (TASK_INTERRUPTIBLE) 可中断睡眠状态
- D (TASK_UNINTERRUPTIBLE) 不可中断睡眠状态
- T (TASK_STOPPED or TASK_TRACED) 暂停状态或跟踪状态
- Z (TASK_DEAD - EXIT_ZOMBIE) 退出状态，进程成为僵尸状态
- X (TASK_DEAD - EXIT_DEAD) 退出状态，进程即将被销毁

进程调度原则:
![](https://github.com/1665800095fghk/images/blob/main/blog/%E9%9D%92%E8%AE%AD-Linux-01.png?raw=true)

- 一个 CPU 核同一时间只能运行一个进程
- 每个进程有近乎相等的执行时间
- 对于逻辑 CPU 而言，进程调度使用轮询的方式执行，当轮询完成则回到第一个进程反复
- 进程执行消耗时间和进程量成正比

### 进程的系统调用

- 内核空间: 系统内核运行的空间，当应用在内核空间运行时，被称为内核态
- 用户空间: 应用程序运行的空间，当应用在用户空间运行时，被称为用户态

## 4.Linux 系统结构

### 文件系统

Linux 中一切皆文件，文件系统负责管理持久化数据的子系统，负责把用户的文件存储到磁盘中

Linux 中 `/` 是根目录，在 `/` 中有以下目录

- bin - 是 Binaries 的缩写，该目录存放常用命令
- boot - 存放 Linux 启动时的核心文件
- dev - 是 Device 的缩写，该目录下存放外部设备，Linux 中访问设备的方式和访问文件的方式是一样的
- etc - 是 Etcetera 的缩写，存放所有系统管理所需要的配置文件和子目录
- home - 用户的主目录，每个用户在该目录中都有一个目录，以用户名命名
- lib - 是 Library 的缩写，存放系统最基本的动态链接库，几乎所有应用都需要这些共享库
- mnt - 该目录是为了让用户临时挂载别的文件系统，比如可以挂载光驱
- opt - 是 optional 的缩写，这是给主机额外安装软件的目录
- proc - 是 processes 的缩写，/proc 是一种伪文件系统(虚拟文件系统)，存储的是当前内核运行状态的一系列特殊文件，这个目录是一个虚拟的目录，它是系统内存的映射，我们可以访问这个目录来获取系统信息
- root - 该目录是系统管理员，也是超级权限者的用户目录
- sbin - 就是 Super User 的意思，是 Superuser Binaries 的缩写，存放系统管理员使用的系统管理程序
- usr - 是 user shared resource 的缩写，即共享资源，是一个非常重要的目录，用户的很多应用程序和文件都放在这个目录下，类似于 windows 的 program files 目录

### 虚拟文件系统

- 对应用层提供一个标准的文件操作接口
- 对文件系统提供一个标准的文件引入接口
  ![](https://github.com/1665800095fghk/images/blob/main/blog/%E9%9D%92%E8%AE%AD-Linux-02.png?raw=true)

一个系统可以存在多个分区，每个分区可以是不同的文件系统，但是用户不可能对每个分区使用不同的操作方法，所以就有了 VFS，用户直接操作 VFS，VFS 操作各个文件系统

### 查看文件系统类型

```bash
# 报告文件系统磁盘空间利用率
df -T
# 挂载磁盘，当不带任何参数运行，会输出包含文件系统类型在内的磁盘分区信息
mount
```

### 文件基本操作

```bash
# 查看当前文件夹下内容
ls
# 创建文件夹
mkdir demo
# 移动 demo 文件夹到 /home
mv demo /home
# 删除 demo 文件夹
rm -r demo
# 创建空文件
touch file.txt
# 复制文件
cp file.txt file_bak.txt
```

### 用户权限

- 用户账户
  - 普通用户账户：在系统中进行普通作业
  - 超级用户账户：在系统中对普通用户和整个系统进行管理
- 用户组
  - 标准组：容纳多个用户
  - 私有组：只有用户自己

### 文件权限

- 所有者：文件的所有者
- 所在组：文件所有者所在组
- 其他人：除文件所有者以及所在组外的其他人  
  每个用户对于文件都有不同的权限，如读(R)，写(W)，执行(X)

如 drwxr-xr-x，d 为文件类型，rwx 为所有者权限，第一个 r-x 为所在组成员权限，第二个 r-x 为其他人权限

### 查看用户信息

```bash
# 查看当前登录用户信息
w
# 查看当前用户所属组
groups
# 查看用户 uid 信息
id xxx
```

### 用户权限操作

```bash
# 在根目录下创建一个文件夹，并查看当前用户拥有文件夹的权限
cd / && mkdir demo && ls -ld demo
sudo useradd fghk # 创建用户
sudo passwd fghk # 设置用户密码
su fghk # 切换 fghk 登录
cd demo # 进入文件夹
touch index.js # 创建文件，但是用户没有权限

# 设置文件夹写入权限给其他人
sudo chmod o+r ./demo
su fghk
cd demo
touch index.js # 这次给了用户权限，文件创建成功
```

## 软件包管理

- 软件包：软件包通常是指一个应用程序，它可以是一个 GUI 程序、命令行程序或软件库  
- 软件包管理
  - 底层工具：主要用于软件安装删除，dpkg，rpm
  - 上层工具：主要用于数据的搜索任务和依赖解析任务，apt，yum，dnf

### apt

```bash
apt update # 列出所有可更新软件
apt install <package_name> # 安装软件包
apt install <pkg_1> <pkg_2> ... # 安装多个软件包
apt update <package_name> # 更新指定软件包
apt remove <package_name> # 删除软件包
apt search <keyword> # 查找软件包
apt list --installed # 列出已安装软件包
```
