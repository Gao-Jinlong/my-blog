# TCP

![alt text](image.png)

网络包协议如下：

-- 以太网--
0 ～ 12 目的地 MAC
12 ～ 24 源地址 MAC
24 ～ 28 协议版本（ipv4）
-- IP 层
28 ～ 30 版本
30 ～ 32 DSCP
32 ～ 36 Length
36 ～ 40Identification
40 ～ 44 Flags 和 Fragment Offset
44 ～ 46 TTL
46 ～ 48 协议，TCP 则是 6
48 ～ 52 Header Checksum
52 ～ 60 源地址 IP
60 ～ 68 目的地 IP
-- TCP
