# CI/CD

文档地址： https://www.jenkins.io/doc/book/installing/docker/

## 搭建

### 启动 docker 容器(windows)

```bash
docker run ^
  --rm ^ # 退出时删除容器
  -u root ^  # 以 root 用户启动
  -p 8080:8080 ^
  -v jenkins-data:/var/jenkins_home ^ # 挂载数据卷
  -v /var/run/docker.sock:/var/run/docker.sock ^
  -v "%HOMEPATH%":/home ^
  jenkins/jenkins:lts-jdk17 # 镜像
```

**踩坑:**

官网中文文档中使用的是 `jenkinsci/blueocean` 镜像，但是该镜像已很久未更新，目前最新的长期支持（LST）镜像是 `jenkins/jenkins:lts`。
