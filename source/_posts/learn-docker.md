---
layout: post
title: learn-docker
date: 2026-07-11 18:22:55
tags:
---
本文记录了`docker`入门笔记
本机为`mac air m1`

## 1. 安装docker desktop(mac)
`macos`本身不能运行`docker`容器，`desktop`用于提供`linux运行环境+管理界面`,后续实验需保持`desktop`运行
个人学习用途无需登录`docker`账号
`ubuntu`则无需`desktop`，直接装`docker engine`
注意芯片版本选择
安装后验证
```bash
docker version
docker run hello-world
```

预期输出
```bash
(base) mac@MacBookAir ~ % docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
58dee6a49ef1: Pull complete 
c3bdf82c34d1: Download complete 
Digest: sha256:96498ffd522e70807ab6384a5c0485a79b9c7c08ca79ba08623edcad1054e62d
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (arm64v8)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```
验证成功，docker会自动拉取镜像，识别架构



查看正在运行容器
```bash
docker ps
# docker ps -a # 所有容器
```
尝试跑一个ubuntu容器
```bash
docker run -it ubuntu bash
ls /
exit
```
查看本地镜像
```bash
docker images
```
清理实验痕迹
```bash
docker rm $(docker ps -aq)
docker rmi hello-world ubuntu
```
删除容器以及镜像

## 2. dockerfile & 镜像构建
dockerfile -> 镜像 -> 容器 可以理解为 菜谱的菜谱->菜谱->菜
构建目录
```bash
mkdir -p ~/Developer/docker-trt-demo
cd ~/Developer/docker-trt-demo
touch Dockerfile
code .
```
编写`dockerfile`
```dockerfile
# 模拟边缘盒子 Ubuntu 版本
FROM ubuntu:20.04

# 避免 tzdata 卡住
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Shanghai

# 安装 C++ 编译 & 常用工具（TensorRT 环境基础）
RUN apt-get update && \
    apt-get install -y \
        build-essential \
        cmake \
        git \
        wget \
        vim \
        && rm -rf /var/lib/apt/lists/*

# 工作目录（你之后放 .cpp / .onnx 的地方）
WORKDIR /app

# 默认启动 bash
CMD ["bash"]
```
构建镜像
```bash
docker build -t trt-env:ubuntu20.04 .
```
此处相当于老中医根据药方抓药，把dockerfile打包成镜像
trt-env:ubuntu20.04
镜像名:标签
需要连带标签一起，省略默认补上`:latest`

注意：此处拉取镜像可能超时
配置源 docker desktop->settings -> docker engine 修改配置,新增字段
```json
{
  "registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```
重新构建
预期输出
```text
naming to docker.io/library/trt-env:ubuntu20.04
```
至此镜像已生成
进入镜像
```bash
docker run --rm -it trt-env:ubuntu20.04 bash
gcc --version
cmake --version
lsb_release -a
exit
```
`--rm`为退出后销毁容器



## 3. 挂载目录

把本地目录挂载进容器，而不是复制一份
```bash
docker run -it --rm \
  -v ~/models:/app/models \
  trt-env:ubuntu20.04
```
启动一个临时容器，把 Mac 上的 ~/models目录，映射到容器里的 /app/models，挂载当前目录` -v $(pwd):/app \`只读挂载`-v ~/models:/app/models:ro`
应使用挂载的场景，模型，太大，源码，频繁改，配置文件，容易调参数
第三方库因固定，又不大，可以选择copy

## 4. conda环境与docker的对比
与`conda`相比`docker`的意义在于交付的稳定性
可将`conda`环境打包为`requirements.txt`
在`dockerfile`中
```dockerfile
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r /app/requirements.txt
```


## 5. ubuntu生产环境差异
ubuntu上安装docker
```bash
sudo apt update
sudo apt install docker.io -y
sudo systemctl enable docker
sudo usermod -aG docker $USER
# 重新登录终端
```

## 6. 加cpp hello world 进dockerfile并编译运行

