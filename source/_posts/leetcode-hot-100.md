---
layout: post
title: leetcode hot 100
date: 2026-09-03 14:22:21
tags:
---
本文用python解答，旨在记录解题思路

## 哈希（5）

### 1. 两数之和（简单）

双for循环遍历，若两数和等于target分别返回下标

字典建立哈希表，第一次遍历nums建表，再次遍历并查表是否存在所需数字，并排除自身，若存在则返回i以及表中下标

```python
cache={}
for i,item in enumerate(nums):
    cache[item] = i
for i,item in enumerate(nums):
    other = target - item
    if other in cache and cache[other]!=i:
        return [i,cache[other]]
```

### 49. 字母异位词分组（中等）

用defaultdict可以自动建字典，把排序后的异位词无缝拼接当作key，按key把s加入value，最后转成list返回

```python
groups= defaultdict(list)
for s in strs:
    key= "".join(sorted(s))
    groups[key].append(s)
return list(groups.values())
```

### 128. 最长连续序列（中等）

先去重，然后找顺子的开头，即找x-1在不在，对着找表里是否存在x+1，更新计数器

```python
num_set= set(nums)
longest=0
for x in num_set:
    if x-1 in num_set:
        continue

    current=x
    length=1
    while current+1 in num_set:
        current+=1
        length+=1
    longest=max(longest,length)

return longest
```

### 242. 有效的字母异位词（简单）

判断长度，s串以字符为key取value计数，t串对应减，如果小于0则不对

```python
if len(s)!=len(t):
    return False

counter = {}

for ch in s:
    counter[ch]=counter.get(ch,0)+1

for ch in t:
    counter[ch]=counter.get(ch,0)-1
    if counter[ch]<0:
        return False

return True
```

### 349. 两个数组的交集（简单）

先为第一个nums建表，对于第二个nums，如果查表有对话加进集合，删掉表里数字，返回列表化集合,直接集合取交也行

```python
table={}
for num in nums1:
    table[num]=table.get(num,0)+1
res= set()
for num in nums2:
    if num in table:
        res.add(num)
        del table[num]
return list(res)
```

## 双指针（5）

### 283. 移动零（简单）

slow从头开始，fast非0则与slow交换，slow+=1，slow非零的话会和自己换，不破坏相对性

```python
slow=0
for fast in range(len(nums)):
    if nums[fast]!=0:
        nums[fast],nums[slow]=nums[slow],nums[fast]
        slow+=1
```

### 27. 移除元素

同283

### 11. 盛最多水的容器（中等）

左右指针，动矮的那根

### 15. 三数之和（中等）


### 42. 接雨水（困难）






## 滑动窗口（5）

### 3. 无重复字符的最长子串（中等）

### 438. 找到字符串中所有字母异位词（中等）

### 560. 和为 K 的子数组（中等）

### 239. 滑动窗口最大值（困难）

### 76. 最小覆盖子串（困难）

## 普通数组（5）

### 53. 最大子数组和（中等）

### 56. 合并区间（中等）

### 189. 轮转数组（中等）

### 238. 除自身以外数组的乘积（中等）

### 41. 缺失的第一个正数（困难）

## 矩阵（4）

### 73. 矩阵置零（中等）

### 54. 螺旋矩阵（中等）

### 48. 旋转图像（中等）

### 240. 搜索二维矩阵 II（中等）

## 链表（14）

### 160. 相交链表（简单）

### 206. 反转链表（简单）

### 234. 回文链表（简单）

### 141. 环形链表（简单）

### 142. 环形链表 II（中等）

### 21. 合并两个有序链表（简单）

### 2. 两数相加（中等）

### 19. 删除链表的倒数第 N 个结点（中等）

### 24. 两两交换链表中的节点（中等）

### 25. K 个一组翻转链表（困难）

### 138. 随机链表的复制（中等）

### 148. 排序链表（中等）

### 23. 合并 K 个升序链表（困难）

### 146. LRU 缓存（中等）

## 二叉树（15）

### 94. 二叉树的中序遍历（简单）

### 104. 二叉树的最大深度（简单）

### 226. 翻转二叉树（简单）

### 101. 对称二叉树（简单）

### 543. 二叉树的直径（简单）

### 102. 二叉树的层序遍历（中等）

### 108. 将有序数组转换为二叉搜索树（简单）

### 98. 验证二叉搜索树（中等）

### 230. 二叉搜索树中第 K 小的元素（中等）

### 199. 二叉树的右视图（中等）

### 114. 二叉树展开为链表（中等）

### 105. 从前序与中序遍历序列构造二叉树（中等）

### 437. 路径总和 III（中等）

### 236. 二叉树的最近公共祖先（中等）

### 124. 二叉树中的最大路径和（困难）

## 图论（4）

### 200. 岛屿数量（中等）

### 994. 腐烂的橘子（中等）

### 207. 课程表（中等）

### 208. 实现 Trie（前缀树）（中等）

## 回溯（8）

### 46. 全排列（中等）

### 78. 子集（中等）

### 17. 电话号码的字母组合（中等）

### 39. 组合总和（中等）

### 22. 括号生成（中等）

### 79. 单词搜索（中等）

### 131. 分割回文串（中等）

### 51. N 皇后（困难）

## 二分查找（6）

### 35. 搜索插入位置（简单）

### 74. 搜索二维矩阵（中等）

### 34. 在排序数组中查找元素的第一个和最后一个位置（中等）

### 33. 搜索旋转排序数组（中等）

### 153. 寻找旋转排序数组中的最小值（中等）

### 4. 寻找两个正序数组的中位数（困难）

## 栈（5）

### 20. 有效的括号（简单）

### 155. 最小栈（中等）

### 394. 字符串解码（中等）

### 739. 每日温度（中等）

### 84. 柱状图中最大的矩形（困难）

## 堆（3）

### 215. 数组中的第 K 个最大元素（中等）

### 347. 前 K 个高频元素（中等）

### 295. 数据流的中位数（困难）

## 贪心（4）

### 121. 买卖股票的最佳时机（简单）
遍历所有价格，更新最低价，利润就是当前价格-最低价格，维护最大利润
```python
class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        min_price = prices[0]
        max_profit = 0
        for price in prices[1:]:
            max_profit = max(max_profit,price-min_price)
            min_price = min(min_price,price)
        return max_profit
```

### 55. 跳跃游戏（中等）
如果i>max_reach返回false ，维护一个max_reach ，(max_reach,i+num[i])

```python
class Solution:
    def canJump(self, nums: List[int]) -> bool:       
        n = len(nums)
        max_reach= 0
        for i in range(n):
            if i>max_reach :
                return False
            max_reach = max(max_reach,i+nums[i])
            if max_reach>n-1:
                return True
        return True
```


### 45. 跳跃游戏 II（中等）
边走边看，走到这跳的尽头就跳一次，跳完把边界扩大到之前看到的最远地方
```python
class Solution:
    def jump(self, nums: List[int]) -> int:
        n=len(nums)
        jump=0
        current_end=0
        farthest=0
        for i in range(n-1):
            farthest=max(farthest,i+nums[i])
            if i==current_end:
                jump+=1
                current_end=farthest
        return jump

```
### 763. 划分字母区间（中等）
扫两遍，第一遍扫最后一次出现位置，第二次合并片段
```python

class Solution:
    def partitionLabels(self, s: str) -> List[int]:
        last={}
        for i,c in enumerate(s):
            last[c]=i
        
        ans=[]
        start=end=0

        for i,c in enumerate(s):
            end=max(end,last[c])
            if i == end:
                ans.append(end-start+1)
                start=end+1

        return ans
```

## 动态规划（10）

### 70. 爬楼梯（简单）

### 118. 杨辉三角（简单）

### 198. 打家劫舍（中等）

### 279. 完全平方数（中等）

### 322. 零钱兑换（中等）

### 139. 单词拆分（中等）

### 300. 最长递增子序列（中等）

### 152. 乘积最大子数组（中等）

### 416. 分割等和子集（中等）

### 32. 最长有效括号（困难）

## 多维动态规划（5）

### 62. 不同路径（中等）

### 64. 最小路径和（中等）

### 5. 最长回文子串（中等）

### 1143. 最长公共子序列（中等）

### 72. 编辑距离（中等）

## 技巧（5）

### 136. 只出现一次的数字（简单）

### 169. 多数元素（简单）

### 75. 颜色分类（中等）

### 31. 下一个排列（中等）

### 287. 寻找重复数（中等）
