---
layout: post
title: learn-docker-2
date: 2026-07-11 21:26:08
tags:
---
本文记录了`docker + TensorRT`场景下应用入门 
以`yolov26n-pose.pt`为例，从`pt`到`onnx`到`tensorrt`做推理
本机为`mac air m1`
## 需要用到的cpp知识
- 读推理代码 class,#include,namespace std
- 改参数 int,float,vector
- 编译 g++ xxx.cpp -o xxx
- 调试 std::cout
- 内存 new/delete

## 修改main.cpp以复习语法
```cpp
#include <iostream>
#include <vector>

int add(int a,int b){
    return a+b;
}

class Demo{
public:
    void sayHello(){
        std::cout<<"cpp class in docker"<<std::endl;
    }
};

int main(){
    std::cout<<"hello docker"<<std::endl;s
    int sum=add(3,5)

    std::vector<int> v = {1,2,3};
    for (int x:v){
        std::cout<<x<<" ";

    }
    std::cout<<std::endl;
    Demo d;
    d.sayHello();
    return 0；
}
```
## 切换至win本继续实验
由于mac没有gpu无法做推理，故切换win本做测试
安装desktop出现更新wsl2无法与服务器建立连接
解决方案
```bash
wsl --update --web-download
```
注意可以开/关代理尝试，代理模式可以切换全局尝试
创建前文的文件结构
```text
yolov26-trt-deploy
|- models
|- src
|- Dockerfile
```
