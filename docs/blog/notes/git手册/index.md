# git 使用手册

## 1. git 基本概念

### 1.1 仓库

仓库（Repository）是 Git 用来保存项目的地方。每个仓库都包含了项目的完整历史记录，以及可以用来回滚项目的所有更改。

### 1.2 工作区

工作区（Working Directory）就是你在电脑里能看到的目录。比如，我的电脑里有一个目录叫做 my-project，这个目录就是一个工作区。

### 1.3 暂存区

暂存区（Stage/Index）是一个临时的缓存区域，用来存放你的改动。每次你提交更新的时候，实际上 Git 只是把暂存区的内容提交了。

### 1.4 分支

分支（Branch）是用来将特性开发绝缘开来的。在你创建仓库的时候，master 分支是“默认的”。在其他分支上进行开发，完成后再将它们合并到主分支上。

### 1.5 提交

提交（Commit）就是你在仓库中保存你的项目的当前快照的操作。每次提交，Git 都会把它们串成一条时间线，这条时间线就是一个分支。

### 1.6 远程仓库

远程仓库（Remote Repository）就是托管在互联网上的你的仓库。它可以是 GitHub、GitLab、Bitbucket 等等。

## 2. git 基本操作

### 2.1 git clone

克隆（Clone）是指在本地创建一个和远程仓库一模一样的仓库。它的命令格式是：

```bash
git clone [url]
```

### 2.2 git add

添加（Add）是指将工作区的文件添加到暂存区。它的命令格式是：

```bash
git add [file1] [file2] ...
```

### 2.3 git commit

提交（Commit）是指将暂存区的文件提交到仓库。它的命令格式是：

```bash
git commit -m [message]
```

修改提交信息

```bash
# 打开 vim 编辑器
git commit --amend
# 直接替换消息
git commit --amend -m '<new-message>'
```

### 2.4 git push

推送（Push）是指将本地仓库的文件推送到远程仓库。它的命令格式是：

```bash
git push [remote] [branch]

# 将本地分支推送到远程仓库
git push [remote] [localBranch]:[remoteBranch]
# 例如
# 将本地分支gaojl推送到远程仓库的gaojl分支
git push origin gaojl:gaojl

# 将本地分支推送到远程仓库的同名分支
git push [remote] [branch]
# 例如
# 将本地分支gaojl推送到远程仓库的gaojl分支
git push origin gaojl

# 删除远程分支
git push origin --delete gaojl
# 或者
git push origin :gaojl

# 强制推送
git push --force # 可用来覆盖远程分支，删除敏感信息
```

### 2.5 git pull

拉取（Pull）是指将远程仓库的文件拉取到本地仓库。它的命令格式是：

```bash
git pull [remote] [branch]

# 例如
# 将远程仓库的master分支拉取到本地仓库的master分支
git pull origin master

# 将远程仓库的master分支拉取到本地仓库的gaojl分支
git pull origin master:gaojl

# rebase 作用
git pull --rebase origin master
```

### 2.6 git rebase

```bash
git pull --rebase origin master
```

### 2.6 git status

状态（Status）是指查看当前仓库的状态。它的命令格式是：

```bash
git status
```

### 2.7 git diff

比较（Diff）是指查看工作区和暂存区的差异。它的命令格式是：

```bash
# 查看工作区和暂存区的差异
git diff
# 查看工作区文件与指定快照之间的差异
git diff [hash] [file]
```

### 2.8 git log

日志（Log）是指查看提交历史。它的命令格式是：

```bash
# 查看所有提交历史
git log
# 查看提交历史图
git log --graph
```

### 2.9 git branch

分支（Branch）是指查看分支列表。它的命令格式是：

```bash
git branch
```

### 2.10 git checkout

检出（Checkout），用于切换分支、恢复文件、查看历史版本等操作。
切换分支

```bash
# 切换到指定分支
git checkout <branch>
# 创建并切换到指定分支
git checkout -b <branch>
```

恢复文件

```bash
# 从最近的提交中恢复该文件内容（撤销缓冲区），file_path可以是正则表达式
git checkout <file_path>
```

查看历史版本

```bash
# 切换到历史版本，并查看该版本的代码状态，会进入分离 HEAD 模式（detached）
git checkout <commit_hash>
# 分离模式（detached）下不会在任何分支工作，而是在特定提交上工作，
# 任何修改都将导致一个新的分离的提交，不会影响任何分支。
```

### 2.11 git merge

合并（Merge）是指将分支合并到当前分支。它的命令格式是：

```bash
# 将分支合并到当前分支
git merge [branch]
```

### 2.12 git reset

重置（Reset）是指将暂存区的文件重置到工作区。它的命令格式是：

```bash
# 将暂存区的文件重置到工作区
git reset [file]
# 将暂存区的文件重置到工作区，并且将工作区的文件重置到指定快照
git reset [hash] [file]
# 放弃所有本地修改，将工作区的文件重置到指定快照
git reset --hard [hash] [file]
# 例如
# 放弃所有本地修改，将工作区的文件重置到最新的快照（默认重置到 HEAD）
git reset --hard
# 将工作区的文件重置到指定快照
git reset --hard [hash] [file]
```

### git revert \<hash\>

用于撤销已经提交的一个或多个提交（commits），并创建一个新的提交记录来表示撤销的更改，不会删除提交。

### git restore

用于还原工作目录或者取消暂存的更改。git 2.23 版本引入

```bash
# 还原文件到最新提交的状态（取消工作目录中的更改）
git restore <file_path>
# 取消暂存文件（从暂存区移除文件）
git restore --staged <file_path>
```

### git reflog

用于查看本地仓库中的引用日志（reference log），记录了仓库中引用的变动历史。
恢复分支

```bash
# 查找日志，找到恢复目标的 hash
git reflog
# 使用 hash 创建新的分支
git checkout -b <branch_name> <commit_hash>
# 删除本地历史记录
git reflog delete <index|commit_hash>
```

### 2.13 git stash

用于临时保存当前工作现场。它是在不提交代码的情况下将当前的修改和未完成的工作隐藏起来的一种方法。

例如，假设你正在工作，但是想要切换到另一个分支进行一些操作，但是不想提交当前的修改。此时，可以使用 git stash 命令将当前的修改和工作隐藏起来。在完成另一个分支的操作后，再回到当前分支，并使用 git stash apply

```bash
# 将当前工作现场保存到栈中
git stash
# 将栈顶的工作现场恢复到工作区
git stash apply
# 将栈顶的工作现场恢复到工作区，并且删除栈顶的工作现场
git stash pop
# 查看工作现场列表
git stash list
# 删除栈顶的工作现场
git stash drop
# 删除指定的工作现场 index 为工作现场的索引
git stash drop stash@{index}
# 删除所有工作现场
git stash clear
```

### 2.14 git remote

远程（Remote）是指查看远程仓库列表。它的命令格式是：

```bash
# 查看远程仓库列表
git remote
# 查看远程仓库详细信息
git remote -v
```

## 实用命令

### 部分拉取

```bash
git pull --depth 5 # 只拉取最近 5 次提交的内容 可以缩减 git 文件的大小，加快拉取
#同理
git fetch --depth 5 # 效果相似
```

当我们需要还原到完整拉取时使用如下命令

```bash
git pull --unshallow # 完全拉取（非浅拉取）
```

### 简化合并

```bash
git pull # 可以拆解为
git fetch # 拉取远端代码，但不会合并到本地 可以通过 git branch -r 查看远端分支
git merge origin/master # 合并远端分支的代码到当前分支
```

通常合并分支我们需要以下步骤

1. 先切换到目标分支
2. git pull 拉取远端代码
3. 回到当前分支
4. git merge 合并最新拉取的分支代码

拆解了 git pull 后我们只需两步即可完成合并

1. git fetch 拉取远端仓库
2. git merge origin/master 合并远端 master 到当前分支

### 统计代码量

```bash
# 统计项目成员
git log --pretty='%aN' | sort -u | wc -l

# 项目总提交
git log --pretty='%aN' | wc -l

# 项目个人提交
git log --author="xxx" --pretty='%aN' | wc -l

# 项目个人提交前五
git log --pretty='%aN' | sort | uniq -c | sort -k1 -n -r | head -n 5

# 提交总行数
git log --pretty=tformat: --numstat | \
awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "%15s %15s %15s \n", loc, add, subs }'

# 项目个人提交行数
git log --format='%aN' | sort -u -r | while read name; do printf "%25s" "$name"; \
git log --author="$name" --pretty=tformat: --numstat | \
awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "%15s %15s %15s \n", loc, add, subs }' \
-; done

```
