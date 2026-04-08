---
layout: post
title: learn-git-branching
date: 2026-04-06 12:53:46
tags: 
    - git
---
this article records the answers ref to this site:
https://learngitbranching.js.org/

## 1: Introduction to Git Commits
```
# use "undo" to undo ur work
1.1
$ git commit
$ git commit
1.2
$ git branch bugFix
$ git checkout bugFix
1.3
$ git branch bugFix
$ git checkout bugFix
$ git commit
$ git checkout main
$ git commit
$ git merge bugFix
1.4
$ git branch bugFix
$ git checkout bugFix
$ git commit
$ git checkout main
$ git commit
$ git checkout bugFix
$ git rebase main
```

## 2: Detach yo' HEAD
```
2.1

$ git checkout c4
2.2
$ git checkout HEAD^
2.3
$ git branch -f main c6
$ git checkout HEAD^
$ git branch -f bugFix c0
2.4
$ git reset c1
$ git checkout pushed
$ git revert c2
```
## 3: Cherry-pick Intro

```
3.1
$ git cherry-pick c3 c4 c7
3.2
# grab/cancel after this command
$ git rebase overHere -i
3.3
$ git checkout main
$ git cherry-pick c4
```
## 4: Grabbing Just 1 Commit
```
4.1
$ git checkout main
$ git cherry-pick c4
4.2
$ git rebase -i HEAD~2
$ git commit --amend
$ git rebase -i HEAD~2
$ git branch -f main c3''
4.3
$ git rebase -i HEAD~2
$ git checkout main
$ git cherry-pick c2' c3
4.4
$ git tag v0 c1
$ git tag v1 c2
$ git checkout v1
4.5
$ git commit
```
## 5: Rebasing over 9000 times
```
5.1
$ git checkout bugFix
$ git rebase c2
$ git checkout side
$ git rebase c3'
$ git checkout another
$ git rebase c6'
$ git branch -f main c7'
5.2
$ git branch -f bugWork HEAD^^2^
5.3
$ git checkout one
$ git cherry-pick c4 c3 c2
$ git checkout two
$ git cherry-pick c5 c4 c3' c2'
$ git branch -f three c2
```
## 6:push$pull
```
6.1
$ git clone
6.2
$ git commit
$ git checkout o/main
$ git commit
6.3
$ git fetch
6.4
$ git pull
6.5
$ git clone
$ git fakeTeamwork 2
$ git fetch
$ git commit
$ git pull
6.6
$ git commit
$ git commit
$ git push
6.7
git clone
git fakeTeamwork
git commit
git pull --rebase
git push
6.8
$ git branch feature
$ git push origin feature
local branch "feature" set to track remote branch "o/feature"
$ git branch -f main HEAD^
$ git checkout feature




```
## 7:关于 origin 和它的周边
```
7.1
$ git fetch

$ git rebase o/main side1

$ git rebase side1 side2

$ git rebase side2 side3

$ git rebase side3 main

快速前进...

$ git push
7.2

7.3

7.4

7.5

7.6

7.7

7.8


```