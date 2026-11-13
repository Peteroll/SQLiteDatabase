/* 自動產生，請勿手動修改 */
window.PRACTICE_PACKS = [
 {
  "id": "week10",
  "week": 10,
  "date": "11/09",
  "title": "統計函數：COUNT、SUM、AVG、MIN、MAX",
  "db": {
   "name": "chain_store_1000.db",
   "url": "../chain_store_1000.db"
  },
  "fingerprint": [
   [
    "SELECT COUNT(*) FROM orders",
    1000
   ],
   [
    "SELECT COUNT(*) FROM customers",
    100
   ],
   [
    "SELECT COUNT(*) FROM products",
    20
   ],
   [
    "SELECT TOTAL(price) FROM products",
    1850
   ],
   [
    "SELECT TOTAL(amount) FROM orders",
    195270
   ]
  ],
  "cards": [
   {
    "id": "count",
    "week": "W10",
    "title": "COUNT 數列數",
    "desc": "COUNT(*) 數列數；COUNT(欄位) 只數該欄位不是 NULL 的列。",
    "sql": "SELECT COUNT(*) AS 門市數\nFROM stores;"
   },
   {
    "id": "sumavg",
    "week": "W10",
    "title": "SUM 加總・AVG 平均",
    "desc": "只能用在數字欄位；會把多列壓成一列。",
    "sql": "SELECT SUM(price) AS 定價合計,\n       AVG(price) AS 平均定價\nFROM products;"
   },
   {
    "id": "minmax",
    "week": "W10",
    "title": "MIN 最小・MAX 最大",
    "desc": "數字、日期、文字都能比大小。",
    "sql": "SELECT MIN(order_date) AS 第一天,\n       MAX(order_date) AS 最後一天\nFROM orders;"
   },
   {
    "id": "round",
    "week": "W10",
    "title": "ROUND 四捨五入",
    "desc": "ROUND(數字, 小數位數)；省略位數就取到整數。",
    "sql": "SELECT ROUND(AVG(age), 1) AS 平均年齡\nFROM customers;"
   },
   {
    "id": "countdistinct",
    "week": "W10",
    "title": "COUNT(DISTINCT 欄位)",
    "desc": "先去掉重複，再數有幾個不同的值。",
    "sql": "SELECT COUNT(DISTINCT city) AS 城市數\nFROM customers;"
   },
   {
    "id": "caseagg",
    "week": "W10",
    "title": "CASE 放進統計函數",
    "desc": "在 SUM／COUNT／AVG 裡面用 CASE，就能「有條件地統計」。",
    "sql": "SELECT SUM(CASE WHEN gender = '女' THEN 1 ELSE 0 END) AS 女性會員數\nFROM customers;"
   },
   {
    "id": "null",
    "week": "W10",
    "title": "NULL 與統計函數",
    "desc": "SUM、AVG、MIN、MAX、COUNT(欄位) 都會跳過 NULL；只有 COUNT(*) 會數到。",
    "sql": "SELECT COUNT(*) AS 全部,\n       COUNT(CASE WHEN age >= 40 THEN 1 END) AS 四十歲以上\nFROM customers;"
   },
   {
    "id": "where",
    "week": "W3–4",
    "title": "WHERE 篩選",
    "desc": "先篩選、再統計。",
    "sql": "SELECT COUNT(*)\nFROM orders\nWHERE payment_method = 'LINE Pay';"
   },
   {
    "id": "join",
    "week": "W6",
    "title": "INNER JOIN 後再統計",
    "desc": "先接表、再篩選、最後統計。",
    "sql": "SELECT COUNT(*)\nFROM orders AS o\nINNER JOIN stores AS s ON o.store_id = s.store_id\nWHERE s.region = '南部';"
   },
   {
    "id": "orderby",
    "week": "W5",
    "title": "ORDER BY + LIMIT",
    "desc": "排序後取前幾筆。",
    "sql": "SELECT order_id, amount\nFROM orders\nORDER BY amount DESC\nLIMIT 5;"
   }
  ],
  "questions": [
   {
    "id": "Q1",
    "level": "基礎",
    "title": "總共有幾筆訂單？",
    "task": "算出 orders 資料表的訂單總筆數。結果只要一個數字。",
    "cards": [
     "count"
    ],
    "hints": [
     "COUNT(*) 會數出「列數」。",
     "SELECT COUNT(*)\nFROM ___;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIXZr5Xkz4Xh0UE4Qk8HTBwHBBBWUzg+X11BHS0vHE9WGwYDTFdTfjU+JCAgSSAqOyMlBVpbQSInSYvN7Ijng5bn2T8aLzEqI00eXxQXExBPS09HCxUBQREbD0FOMkEmITg/eVhYSEOS/NuC9OmXtd+X6fSS/NuK0uGVlf2Vz8KSxeeB0+CXsfmU0/GS9eqA7tGSrfJQTUGR48OB1udRbCNShOzbjdjAhsPiysXih/3oj8/hitD8y+z7hdvZj/Xii/38ytjDjt/4jOvBi+X3ycj/hv//j8/hitD8yOD/hsvFiuPnTDBdDx8ABQYGDAdHVAsQQQMXHA=="
   },
   {
    "id": "Q2",
    "level": "基礎",
    "title": "總營收是多少？",
    "task": "把所有訂單的 amount 加總，算出全部營收。",
    "cards": [
     "sumavg"
    ],
    "hints": [
     "SUM(欄位) 會把欄位的值全部加起來。",
     "SELECT SUM(___)\nFROM orders;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIrJkJf1/oXg30E4Qk8HTBwHBBBWUzg+X1REH0dCPD4JRUEXCwtTF1IhJC8xKjdFPTg8BREfDhYaHUpFLz5RysjPhuTrj/fTMgM3fz8/QQwGDQYXHVZTAVIXGRMYCAoLTFcqDyMnLEOR5smN7dCWudiX/cuS/NuAw/qXgfSW3O6X6eFHQk+WmMGayeuR7t6D+9WXsfOU6+mR1+uAyveUpeeR4e+RyvCG7uCXpeCW2eOR4fSC2/2Xs+yR4eFWNE9HAR8VSAIXBUFODwIJHQgM"
   },
   {
    "id": "Q3",
    "level": "基礎",
    "title": "平均客單價",
    "task": "算出每筆訂單的平均金額，四捨五入到小數第 1 位。",
    "cards": [
     "sumavg",
     "round"
    ],
    "hints": [
     "AVG(欄位) 算平均；ROUND(數字, 位數) 四捨五入。",
     "SELECT ROUND(AVG(___), 1)\nFROM orders;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIjInpXv5obay4bzwIjylFIvTUECCA8QCx5TFyspUFpBR1A4MxBdDwIXB0FOSzAgIigyeVAgLjY6LUskOCpZTB0dFA0AQE9FX0RRbCNShNrHjP7ii8PTyObchODNNQ0jPCI8DR8ABQYGGlhHQk8UVQAeAAoaS1k+TIj2kJbn2Yb7xofey4nJrZXDxYb47Ifd7ojAiZ/O+4bx4UMkOCpRyPb/QTE7PC0hje3zD1xQMywhJydNFkFRHFlShOzijOvVi93+y+XKhs/YSVJFitD8wszpMywhJydNFkRRyP/khOvEj/bRiPjJzvDwQz5YSwwXCggDSBRQWwUVBRAAEw=="
   },
   {
    "id": "Q4",
    "level": "基礎",
    "title": "最高與最低的單筆金額",
    "task": "用一句 SQL 同時查出單筆訂單的最高金額與最低金額（兩個欄位）。",
    "cards": [
     "minmax"
    ],
    "hints": [
     "MAX 找最大、MIN 找最小，可以放在同一個 SELECT 裡，用逗號隔開。",
     "SELECT MAX(___), MIN(___)\nFROM orders;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIvtrZnZ+Yrz+IrE409dD5bu4YfJ54ri/4TQoFIvTUECCA8QCx5TFyspVlZERVBQMzAMAVIABAVWU0E2KyE0biRSLCIsQQIIARgfWVlSIDBUj//lh8bpxPfjiML5RT8LTk1RDVBSQS49J0sEAwIEQwRbQSInSYX57onMo5n18IrV5D8LKD8+YFAdEwcRGxBeTEFTSAgCDQIdB0FfNU+UvfyW2eOR6ehFPSg9aDMmQYb7xofey4vlk5XX3IbN14bl5YrEnJja6Ybz1IXw1oLNoZfH8YXq9Yrn6ovpgpTK4Yb8/oDl7E9dD5TJxIb95ITxxk0+fzQ3M0M2MENLQENRYTk/KDdUWEOD59OXsfCXxcSR6d+K0uGWos6X/ctUJCI9TonJrZX9xIbE2IbA047xr1IvTUEbGwcAHAgVD0oUAA8HDB4="
   },
   {
    "id": "Q5",
    "level": "進階",
    "title": "台北市有幾位會員？",
    "task": "算出 customers 中居住在「台北市」的會員人數。",
    "cards": [
     "count",
     "where"
    ],
    "hints": [
     "先用 WHERE 篩選，再用 COUNT 數。",
     "SELECT COUNT(*)\nFROM customers\nWHERE city = '___';"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIj+nZX+9obM64X57YjijJbn2UEpRUETDwEESANQWzgvWFQ4MxBdDwIXB0FOSzAgIigyeVAxLjY6PUtPR00wflCX7tOR5fSA1u+XsfOX8sKS/Ns5ACsjYj1SAhYHHQwICx8CcR4lKSYmLEMGBxkIDU1SRob72Ybp+YjJr1dJQ09WDBsVAgwYQ1JIOkGR9tSNz+GYjfaX2+yb1fkjPCI8DZL080MjISY3K02UqPiVzsqd6NtFjOvjDZbu4YbK5YXs400yYiU8NYD060FJTIjuo5XK44Tu7Ybl0ovpgpPy7Yb72Ybp+YjJr5Py7IzI4Yfd44vpgpPy7Yvz04bp+YjJr5Py7IzI4IDl7E8sAVIdEwcRGwYBTFcXTBwBBB4="
   },
   {
    "id": "Q6",
    "level": "進階",
    "title": "下雨天的生意",
    "task": "查出天氣為「下雨」的訂單有幾筆、總營收多少（兩個欄位）。",
    "cards": [
     "count",
     "sumavg",
     "where"
    ],
    "hints": [
     "COUNT 和 SUM 可以放在同一個 SELECT，共用同一個 WHERE。",
     "SELECT COUNT(*), SUM(amount)\nFROM orders\nWHERE weather = '___';"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIrcq5bn2UFYS4Ti8Yvlm1IvTUECCA8QCx5TFyspUFZCRVFTXlVEcC0PTUEGDAVHVE8iaDw3IjdUKiwwIDlZB1lSIDBUjs7jiPjJASwcQUNUSUNFTj4kYFgTDAwBBxdMTiwiDZf1/oXg3z8LKD8+YFAdEwcRGxA5ADo5aCI3QRQRCBcNCx9REFBVhdv/gPjNSVZTAVIXGRMYCAoLTFcqDyc6JDExSYbg5ov7p5TK6orvwYT/6oXZr5Xkz4X4+Ibi1InPq5/O7YbxwIbl5YrEnJja6Ybz1IXw1oTykJX9y4Ta/orl94nLtpX69oD060E4Qk8eXxQXEwYQS1kDDwECSA0="
   },
   {
    "id": "Q7",
    "level": "進階",
    "title": "下雨天有幾位不同的顧客？",
    "task": "下雨天下單的顧客中，總共有幾位「不同」的顧客？同一位顧客買很多次只算一次。",
    "cards": [
     "countdistinct"
    ],
    "hints": [
     "COUNT(*) 會把同一位顧客重複算；要先去重複再數。",
     "SELECT COUNT(DISTINCT ___)\nFROM orders\nWHERE weather = '下雨';"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TITQipXcw4Xh0UE4Qk8HTBwHBBBWUzg+WVoscA1eQxERD0FfTD40YTUxNUM3JjYrOkU1ZCMmKC03PUMGGx4FQh0XEzwdDUpFLz5RxNHVhM3Wj/bdMgM3fz8/QQwGDQYXHTEfejg3MyZUHgYEGgUUX1BPQUSQ0eiM9cVWFlJeQwYMGQ8EBwNTFytQIiwhJzdNKiQieTk8IjdUj8/hitD8BFBPQYbx4UMhJz4lZD4xNUOR59iM6eCZifed3e+R7+6D+9WXsfmX2N2R6eiG7u9TAVKUzvec1eCC8uaWsfud3fk3JjYrOkVbBFCU+cyQ0eiM9cWUidmV++ecweGA+MOXuMid3e+S9eCDwfmYjNeXz8GS/NuAysqSrfJQPE9WBhEBCx8USVJIBwIYGgYY"
   },
   {
    "id": "Q8",
    "level": "進階",
    "title": "咖啡類賣了多少錢？",
    "task": "算出「咖啡」類商品的訂單總營收。類別在 products、金額在 orders。",
    "cards": [
     "join",
     "sumavg"
    ],
    "hints": [
     "先用 INNER JOIN 把 orders 和 products 接起來，再用 WHERE 篩咖啡類，最後 SUM。",
     "SELECT SUM(o.amount)\nFROM orders AS o\nINNER JOIN products AS p ON o.product_id = p.product_id\nWHERE p.category = '___';"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIjju5XnwITz9oXx2E8sAVIEAA8BDBBHVDYqHkFCU1MpNB5JTB8US1JIQzAxJSYmOk0ieD1aDk0VBAwQABlYDTEhQYbm/4bwz4r2spbm1z8aLzEqI00eXxQXExBUKDBFATEfZD48JDFUIywsIE0BXx8WFAAAGkMkPU0BDT88QQxaGREKChgSWS8bBUNJSRNLHh8eSQURFTwdDT8LOSU0fzVSEU0XCBcACQIDVFBPQUSR+/WA+8xWFlJeQwYMGQ8EBwNTFytQhtbFgcvti+rMy+XKhOzbjdjAiOPUyOzaQSk7IC1Fi9P9xO3Qjt/ujObtiOPUxdHaguP1jOXoicLYxPHKguP1j//li9P9ysXDicv8iuPnTEFTyuTaQRMGBgcQDRkCAwAACAARSYbvzorJkJbqzor4xoT/6oLNt5nwwoXsxoDl4ojkq5Xh4Iba84bm147xoJ/O7YfM5IX9wY7xoZjBwobz04T/6oT2vJnT7ID05IDl7E8sAVIdEwcRGwYBTFcXTBwBBB4="
   },
   {
    "id": "Q9",
    "level": "挑戰",
    "title": "大單占多少比例？",
    "task": "單筆金額 500 元以上算「大單」。算出大單占全部訂單的百分比，取到小數第 1 位（例如 12.3）。",
    "cards": [
     "caseagg",
     "round"
    ],
    "hints": [
     "把大單標成 1、其他標成 0，加總就是大單數；再除以總筆數 × 100。",
     "SELECT ROUND(\n  SUM(CASE WHEN amount >= 500 THEN 1 ELSE 0 END) * 100.0 / COUNT(*)\n, 1)\nFROM orders;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIjVipXkz4b5yYXK+k8sAVIEAA8BDBBHVDYqGF5FPD4JRUEXCwtTF1IhJC8xKjdFPCIkYzRaPQ1USUNFTk1RDVAhNC5cKiI2K00mZTU8QQIZBhYLGk1PEFBHUVNUPSsgIE1ADTU+MiZUWUMgIClYDVpSUFNER1NFQU0yYiU8NUteQD8LTk1RDVBSQU9UWEpFLz5RyNTVhPXajO7FiMLlcR40Myw5SQwXCggDXktQTUERERMJDwQfD0opQyA1OiZFiPnPxPDAQTAhJEONzcyekfyX0dKc6t6G7uGXsfmUw/6Q0tWA8t2XuMiR4e6X6eFHQk+VlfCXz/mcz+KB1/VRHEBCT1Ob1euD8uSUnf+U9Nud0v2K0uSekeqU9NeS/NuM98mVltWU9NeS/NuA8sVRfiE+CBcRSYX57YXfp5b68YXh3YXw1oToiZbB9IzI5YTQ/ovvsZbu4oXsxkNVje3zDy1eQwwGDQYXCwlTFxYTDRARFA=="
   },
   {
    "id": "Q10",
    "level": "挑戰",
    "title": "晴天和下雨天，誰的客單價高？",
    "task": "用「一句」SQL 同時算出晴天的平均客單價與下雨天的平均客單價（兩個欄位，都取整數）。",
    "cards": [
     "caseagg",
     "null"
    ],
    "hints": [
     "AVG 會忽略 NULL。讓 CASE 只在晴天時回傳金額、其他情況不寫 ELSE（變成 NULL）。",
     "SELECT ROUND(AVG(CASE WHEN weather = '晴天' THEN amount END)),\n       ROUND(AVG(CASE WHEN weather = '下雨' THEN amount END))\nFROM orders;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIvomZXWyIbay4bzwIjylFJeQ4fM4or+xojfj5Xkz4b30EE4Qk8HTBwHBBBWUzg+XF1CAUFEVj4pFE9HHAgXD0pQMiY4LCAxTj8+eD42SSIiLksmLz40DSc6JC1UHgYEGgUUX1BPQUSS8NeAysRWDSQ6JC1UCA4KGwMFDTU8JUpdSSI2TovomZXWyIbay4bzwIjylFwuD0NUSUNFTk0jYiU8JUs1PyRNLSwiaFAlKSY6SRQADxkZSAJSXENTjdvuh/bZClAmKSY6SQIIARgfWVA3LyddQEMkPU2Vlfub+suRx8GA+MOUrskuDyUmJi5FAR8VSAIBWkFYSwYdHgEQRB5QWzhWKiI2K02Xn+KU/epULC82K02XtPKd3e+Q0e6CwsuUvfiV++eR4fSD8u6Uk+eX6dNUJzYpIoLNtjEkJoD06DAwI47xrDM9NC0gQYXJ6onMoFlSiODJj//mhtrCxPH8QS0hJS+G7u9TAVKb+NSd8dKK0veUgtuU6fNULC82K01BDZfo5Yvd2IzZ4oTss5br1YbQwIT/6oXZr5Xkz4Xo6ovHxYrkm5b68UNESYbg7YnJrZjH1obN2ob46YLNoZbr1YbQwIbLzIjng5Xx2IXo6obb8E1DHUNSh+39jOvVTlxAGpPy40EpRUEKHAkUXxUWQ1kSCA8WCxA="
   }
  ]
 },
 {
  "id": "week11",
  "week": 11,
  "date": "11/16",
  "title": "GROUP BY 與 HAVING",
  "opensAt": "2026-11-16T18:00:00+08:00",
  "db": {
   "name": "chain_store_1000.db",
   "url": "../chain_store_1000.db"
  },
  "fingerprint": [
   [
    "SELECT COUNT(*) FROM orders",
    1000
   ],
   [
    "SELECT COUNT(*) FROM customers",
    100
   ],
   [
    "SELECT COUNT(*) FROM products",
    20
   ],
   [
    "SELECT TOTAL(price) FROM products",
    1850
   ],
   [
    "SELECT TOTAL(amount) FROM orders",
    195270
   ]
  ],
  "cards": [
   {
    "id": "groupby",
    "week": "W11",
    "title": "GROUP BY 分組統計",
    "desc": "把欄位值相同的列分成一組，每組各算一次統計函數。SELECT 只放分組欄位與統計函數。",
    "sql": "SELECT city, COUNT(*) AS 會員數\nFROM customers\nGROUP BY city;"
   },
   {
    "id": "groupjoin",
    "week": "W11",
    "title": "JOIN 之後再分組",
    "desc": "先接表，再用接進來的欄位分組。",
    "sql": "SELECT s.region, SUM(o.amount) AS 營收\nFROM orders AS o\nINNER JOIN stores AS s ON o.store_id = s.store_id\nGROUP BY s.region;"
   },
   {
    "id": "groupmulti",
    "week": "W11",
    "title": "GROUP BY 多個欄位",
    "desc": "欄位用逗號隔開；所有欄位的值都相同，才算同一組。",
    "sql": "SELECT gender, city, COUNT(*) AS 人數\nFROM customers\nGROUP BY gender, city;"
   },
   {
    "id": "having",
    "week": "W11",
    "title": "HAVING 篩選分組結果",
    "desc": "WHERE 在分組前篩選每一列，HAVING 在分組後篩選整組的統計結果；統計函數只能放在 HAVING，不能放在 WHERE。",
    "sql": "SELECT category, COUNT(*) AS 商品數\nFROM products\nWHERE price >= 50\nGROUP BY category\nHAVING COUNT(*) >= 2;"
   },
   {
    "id": "month",
    "week": "W11",
    "title": "substr 取出年-月",
    "desc": "substr(文字, 起點, 長度)：order_date 前 7 個字元就是「年-月」，可拿來依月份分組。",
    "sql": "SELECT substr(order_date, 1, 7) AS 月份,\n       COUNT(*) AS 訂單數\nFROM orders\nGROUP BY substr(order_date, 1, 7);"
   },
   {
    "id": "grouporder",
    "week": "W11",
    "title": "排序分組後的統計結果",
    "desc": "ORDER BY 可以用統計函數或它的別名；搭配 LIMIT 就能取排行榜前幾名。",
    "sql": "SELECT payment_method, COUNT(*) AS 筆數\nFROM orders\nGROUP BY payment_method\nORDER BY 筆數 DESC\nLIMIT 2;"
   },
   {
    "id": "count",
    "week": "W10",
    "title": "COUNT 數列數",
    "desc": "COUNT(*) 數列數；COUNT(欄位) 只數該欄位不是 NULL 的列。",
    "sql": "SELECT COUNT(*) AS 門市數\nFROM stores;"
   },
   {
    "id": "sumavg",
    "week": "W10",
    "title": "SUM 加總・AVG 平均",
    "desc": "只能用在數字欄位；會把多列壓成一列。",
    "sql": "SELECT SUM(price) AS 定價合計,\n       AVG(price) AS 平均定價\nFROM products;"
   },
   {
    "id": "round",
    "week": "W10",
    "title": "ROUND 四捨五入",
    "desc": "ROUND(數字, 小數位數)；省略位數就取到整數。",
    "sql": "SELECT ROUND(AVG(age), 1) AS 平均年齡\nFROM customers;"
   },
   {
    "id": "countdistinct",
    "week": "W10",
    "title": "COUNT(DISTINCT 欄位)",
    "desc": "先去掉重複，再數有幾個不同的值。",
    "sql": "SELECT COUNT(DISTINCT city) AS 城市數\nFROM customers;"
   },
   {
    "id": "join",
    "week": "W6",
    "title": "INNER JOIN 後再統計",
    "desc": "先接表、再篩選、最後統計。",
    "sql": "SELECT COUNT(*)\nFROM orders AS o\nINNER JOIN stores AS s ON o.store_id = s.store_id\nWHERE s.region = '南部';"
   },
   {
    "id": "where",
    "week": "W3–4",
    "title": "WHERE 篩選",
    "desc": "先篩選、再統計。",
    "sql": "SELECT COUNT(*)\nFROM orders\nWHERE payment_method = 'LINE Pay';"
   },
   {
    "id": "orderby",
    "week": "W5",
    "title": "ORDER BY + LIMIT",
    "desc": "排序後取前幾筆。",
    "sql": "SELECT order_id, amount\nFROM orders\nORDER BY amount DESC\nLIMIT 5;"
   }
  ],
  "questions": [
   {
    "id": "Q1",
    "level": "基礎",
    "title": "各種天氣各有幾筆訂單？",
    "task": "算出每一種天氣（weather 欄位）各有幾筆訂單。每種天氣一列。",
    "cards": [
     "groupby",
     "count"
    ],
    "hints": [
     "GROUP BY 欄位 會把同值的列分成一組，再對每一組各算一次 COUNT。",
     "SELECT weather, COUNT(*)\nFROM orders\nGROUP BY ___;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TBoUTAQaBBFWRUGNxu+Uu96U9NtWNE9HGAwdWBUBQ1kvMkGB1uaYtthQTVJBXz5JNU+XtMSXxcpWRVZSWTBddlKb+NORzcpHQl9HGi0vHE9WGwYDTFdTfjU+JCAgSRQADxkZSAJeQSA7PC0xRkdYDTEhQYvc64bzwIvklSwcJzE7JEMKHAkUXwMuDyQmJjY1Ti8oDQcXABccDBFeTEFTSAgCDQIdB0FfNU82fz8nMUM2MEMSCwwFRRUAQYX+44bBx4vBjpfp2Ybk5YT/6oXZr5Xkz4b874Xt/onJrZfH5YzI4Yfd5YTqhZPy4IXt3YbBx47xrJnr0YbQwIb16onJrZfH5YzI4IzZ4i4+eD4mSUldSYbV44veopTK4YTB7Yb16orfupTK4YXYyIDl7E9dDyM3LSY3PUOA4ceXuc6X5MqTwc2D89yZiM+d3fmR4eWC2+mWt/SUzeeQ1O6K0uUGSBEGCQYGht/si//9ysXDicv8jOTYiPjJwsz6IiwhJzeK0uSSrfJQPE9WBhEBCx8USVJIBwIYGgYY"
   },
   {
    "id": "Q2",
    "level": "基礎",
    "title": "每家門市的營收",
    "task": "算出每家門市（store_id）的總營收，也就是 amount 加總。每家門市一列。",
    "cards": [
     "groupby",
     "sumavg"
    ],
    "hints": [
     "想要「每家門市」就用 store_id 分組，再對每一組做 SUM。",
     "SELECT store_id, SUM(amount)\nFROM orders\nGROUP BY ___;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TB4FQgIXPgoQS09Hieruy+TEQz5YSxUEAhgUXlJIOjhWOlNVX09dHEhKVlYpRThHPV1BH1JeUFpAXlM4QjZTfkBCUkFYW1BTV10sAStQMlNEXUFJX1pDHkAvTThWOlNVW09dHElLUVYpRThHPV1BG1JeU1NNWVM4QjZTfkBCVkFYW1FWW1gsAStQMlNEUUFJX1VAFEAvTThWOlNVV09dHEREVFYpRThHPV1AHVJeU1NEWVM4MxBdDwIXB0FOSzAgIigyeVABFQwGDDwMCkFRfiU/SQIZBhYLGkRRbCNShuTrj/fTMgM3fz8/QQwGDQYXHTEfaiI9NDNUKzpFHRkeXxUtCAdPS09HCxUBQREbD0FOMkEyCwgaDUFCQYTu7UM2OyBZTB0dFA0AQEOD9sKXp/qX5Mud6suNxu+Uu96X68OS4fOB1u2UrfuU9NuRxPSK0vaUp9CW2elULjEqOz1RbylShNPFgc3viOXhzvD+h8z7jdvlidj1yOD2hOnUjdvliMHQzvD/guP2S09Hh8z9yuvcicDVjOTfieLPzvD+h8z7jdvli+36z/DUguP5iuPpi/31z/DUguP5ht/ph+3ryMjKhNPFj/vKTiojYiUiQSEtSYT/6ov+vZfW24D060E4Qk8eXxQXEwYQS1kDDwECSA0="
   },
   {
    "id": "Q3",
    "level": "基礎",
    "title": "各付款方式的平均客單價",
    "task": "算出每一種付款方式（payment_method）的平均訂單金額，四捨五入到小數第 1 位。",
    "cards": [
     "groupby",
     "sumavg",
     "round"
    ],
    "hints": [
     "用 payment_method 分組，再對每一組算 AVG(amount)，外面包 ROUND(…, 1)。",
     "SELECT payment_method, ROUND(AVG(amount), 1)\nFROM orders\nGROUP BY ___;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TB0QVB0XDxcrBAYRBgIVD1xQhNrHjP7ii8PTyObchODNSz5JTBsQQQUXEkFOMjhHIiQ/aFAiABpWRVJcXENFcFwpQ4fLyITxxoj8jFJeUFpGR1s4QjZTyv/MiOTlS09XXlVfGS1eOkGcyPSA4c6Xud+W2vtWRVJdWUNHcC0PTUEGDAVHVE8iaDw3IjdUGQIcAwgfWS8fBBccBgdJTj8+eD42SSIiLksEAwIEQwRbTUNFQEMkPU2UlMOX/OSRx8GA+MOUrskuDyUmJi5FAR8VSAIBPQ0zOywwPk0zdFACABoZDA0RMQAUWRgdBVhWRUEAFh0dTBkcQ1kvS4TQ34XZpZX13IXh0YbqwYnKiJTK4YbFzYbp64nJrZXDxYzI5Ybt6IrEqZTL6obK5YXK4YnJrZfH5Ybk7YvixIrfulAzNySX6eKA/umZqtpSMywhJyeG7u9TAVKX6eWT3OeDwumVkP2d3esECBoICwMFch0XFQsbDYzZ54nJrZXc+4vS6Ib14ovor5bm34bowUM2KyE0biRShPH4SSQ3ITghDTIrjt/4jPPDi+T2yuz5hdv5jOTfi/7byPD5hNrHjP7ii+3NyMHeh/XIjPDPitXxysX2guP2Sz5JTAIDSRUABAdWUwUEAh4UUA=="
   },
   {
    "id": "Q4",
    "level": "基礎",
    "title": "營收前三名的門市",
    "task": "找出營收最高的前三家門市，列出門市代號與營收，營收由高到低排列。",
    "cards": [
     "groupby",
     "grouporder",
     "orderby"
    ],
    "hints": [
     "先 GROUP BY 算出每家門市的營收，再用 ORDER BY 依「統計結果」由大到小排，最後 LIMIT 3。",
     "SELECT store_id, SUM(amount) AS 營收\nFROM orders\nGROUP BY store_id\nORDER BY ___ DESC\nLIMIT 3;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TB4FQgIXPgoQS09Hieruy+TEQz5YSxUEAhgUXlJIOjhWOlNVXU9dH0NEWFMpRThHPV1BGlJeU1FHXFY4QjZTfkBCV0FYW1NcXl0scA1eQxERD0FfTD40YTUxNUMHHQwXCzIYSVxSMjY5QQIIARgfWVlSIDBUjuT6iPnHcR40Myw5SQwXCggDXiwcJjE7PDNFLDRRXgQdEwYrAAc5ACIjaTUgQSEtSYTi8Yvlm1A2JDA3NQ0pJyA4eVBBWkFYSwYdHgEQRB5QWzhWjPzShsz9xND0hNn7ht//KT8+eCBSIzpUjOvjidj1ycjUhtbFgcvtTo/3v1A9MycxO0MnN02Unf2V1NKcweuC2/2Xs+yU7/GR0+xFjOvjDTw7LCogSYbq+Ij4oJXL34b8/oDl7E9dDz8gJSYmSSE8Toj+gpTJxITv3YXry4nMkpfmyUMnLC8gLTlRxdPThOzijvnhi+XUyOD/jt/8juT6iPnHwsz7jt/4jdr6i+LeycvXhMzfSSw3KigjDTIrQTAhJEsEAwIEQwRbQScxOiCG7u9TAVKb4fqdyO+NyOyWsfuX8e6SxcKK0uGXpPCW2saR4ceA5uuXsfOUy8GS9saMzuuUl/+U/eqS2/GD8uSXo+KX0e6X6eFHM0FTQgIWBBERDUFfGh8ESA0="
   },
   {
    "id": "Q5",
    "level": "進階",
    "title": "各商品類別賣了幾筆、營收多少",
    "task": "算出每一種商品類別（category）的訂單筆數與總營收（兩個統計欄位）。類別在 products、金額在 orders。",
    "cards": [
     "groupjoin",
     "join",
     "sumavg"
    ],
    "hints": [
     "先 INNER JOIN 把 orders 和 products 接起來，再用 p.category 分組。",
     "SELECT p.category, COUNT(*), SUM(o.amount)\nFROM orders AS o\nINNER JOIN products AS p ON o.product_id = p.product_id\nGROUP BY ___;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TA4QWRUVDhENS09HicD3y+XKQ09WjuT6iPnHDy1eQxUVBRYAHU9LditQhPHijPbETEFAFEFeUlJEW1M4QjZTxczniMDrS09XX1VdGUNDVFMpRThHh/bZyPXFToblwYrn5E9dH0JBTVRAXFpVM0EqD5nR04bn6EFJXVtJAUREVFJEND4YQk8DSBZQW0EnLC8gLTlRXV4RABcRDgwXF0FRbj8nLzdcQ0pFLz5Ryt30h/bMRUM2OyBZQl4TDAwBBxdMTiwiDZf1/oXg3z8LKD8+YFAdEwcRGxBFLz5RQiwcKC06LDFFJCI4Y1ACEwwQHAARHU0wflACQSw6SQxLHh8eSQURFTwdDUNYTh1fXQIdBRYXHTwMCjEfaiI9NDNUKzpFHkMSTAQXBgwGEFhHQk8UVQAeAAoaS1k+TIjumpjT7YrU74bf4YLNtzYgLi6b1ewvISQ/DZX36YX6zIvExk2Tq+JSJjE7PDNFLDRRyPj0htbwSYHj/E2Xgv+V1OeR+eeCwPpRbj8nLzdUgeviTj4kYJPy40FYS4b14onJrZXy6kMnLC8gLTlRyP/dhdjRj/fbi8jMyMnMhOP/jtbUhsX5yPfPh/bMht/piML+ycjyhtbwgODYiPHyyOD2hs3jjdvliMHQzvDwQz5YSwwXCggDSBRQWwUVBRAAEw=="
   },
   {
    "id": "Q6",
    "level": "進階",
    "title": "會員數 15 人以上的城市",
    "task": "算出每個城市（city）的會員人數，只列出會員數在 15 人以上的城市。",
    "cards": [
     "having",
     "groupby",
     "count"
    ],
    "hints": [
     "先用 GROUP BY city 算出每個城市的人數，再用 HAVING 篩選「統計結果」。",
     "SELECT city, COUNT(*)\nFROM customers\nGROUP BY city\nHAVING COUNT(*) >= ___;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TA4YWQlQTUGS9eCA/cyXuMhQPE9WHwIJGwgCD0opOkGR5tOA4vqUlfJQTVJDNE8+TIvnnZX+9obM60FJXF0sAStQiMjsgPjhi9XzD1xDVD4pFE9HHAgXD0pQMiY4LCAxTg4YWQleQSA7PC0xRkdYDTEhQYXo6ob2z4vklSwcJzE7JEMGGx4FQh0XExAoByQ3ITghDTIrQQAdHRo5ACUwezk8JkM3JjYrOkVbBFBMXENFXFhHQk8UVQAeAAoaS1k+TCUwezk8JkOR9cuA5uuWmPSR4e+Q0OiA0OGSrf2Vzsqd6NuD+9mWmPSV++eT3NKNxuWWmOCU//+b1fgyJigjaFCX/cuR4eWC2+mSrfyW2OiR4O6G7uCWgtmb4NuR5/yAyeaWt/SUzuyQ0eOA5vqSrfJQTUGRxsiD5v1Rejg3MyZUKiwwIDlZB1lSX15UWFZFiPHyyPfIiO/bht//OSU0fzVShPzDgcLpiPTzxPL2h9Hmj//si+X3ysX2jt/4jdr6i93Ay8Lgh//9SSAqOyMlDZX9zofPzITxxo7xr1IvTUEbGwcAHAgVD0oUAA8HDB4="
   },
   {
    "id": "Q7",
    "level": "進階",
    "title": "每個月的訂單數與營收",
    "task": "算出每個月（例如 2026-01）的訂單筆數與總營收。order_date 是文字，格式像 2026-01-15。",
    "cards": [
     "month",
     "groupby",
     "sumavg"
    ],
    "hints": [
     "substr(order_date, 1, 7) 會取出前 7 個字元，也就是「年-月」；用它來分組。",
     "SELECT substr(order_date, 1, 7), COUNT(*), SUM(amount)\nFROM orders\nGROUP BY ___;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIvtpZTJ3EFYS4vN7Ijng5bn2UFYS4Ti8Yvlm1IvTUECCA8QCx5TFyspQ1FEW1VIXlxTAUREVk9NXFtRWzBddlJAUVFCRFNXTEFCFUheVlJMUFY4QjZTH0BAV05EWkFJX1lEAUJFVFBEND4YQk8DSBZQW0EnLC8gLTlRXgUQEhcGQQwXCggDchQTFQZYSVJJTlpYDTEhQYXo4Yfe00FRbj8nLzdcQ0pFLz5RxdjwhPXaj/bdQk0ieD1aAA4bHA0RR00wflCV5vyS/dU5ACsjYj1SDhEQDBEWMgM2fz8nMUM2MEMWGw8CWQJaDhEQDBE6CgwFSFxSUE9UXkpeTEFTSAgCDQIdB0FfNU8CWBIBFRFcj/Xii8DmAVCa1NSd0v1JToTkmpXIx0qb1fmA0POWgdxSUEOR6eiAw/qUqPOb9+iRzuiA4ftRGlCX4eiRxPSA6+6ekfyR4e9GWVFTQ11AAEFHguP5jNPUhsP7y/jiguP4W1NXWEBBHJPy7ID060FJTCojYiUiQSEtSYbb4oTsj5TL/ob7xofey4vlk5nz6oTa/obZ4YLNoZTK7IXsxobqxIXykJbm34XY7YfY44jhoJfa0IzI8ob14onJrZXy6oXo4YT/6oXZr5Xkz4Xo6ovHxYj5q5X60Ybk5Yfd7orEqZPy40EpRUEKHAkUXxUWQ1kSCA8WCxA="
   },
   {
    "id": "Q8",
    "level": "進階",
    "title": "每家門市有幾位不同的顧客",
    "task": "算出每家門市（用門市名稱 store_name 顯示）有幾位「不同」的顧客來消費。同一位顧客買很多次只算一次。",
    "cards": [
     "groupjoin",
     "countdistinct",
     "join"
    ],
    "hints": [
     "門市名稱在 stores，要先 JOIN；分組後用 COUNT(DISTINCT 欄位) 數不重複的顧客。",
     "SELECT s.store_name, COUNT(DISTINCT o.___)\nFROM orders AS o\nINNER JOIN stores AS s ON o.store_id = s.store_id\nGROUP BY s.store_name;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TB4FQgIXPg0VBAZHQk+YjNeXz8GS/NtHM0FTWxEeFAYHS1k+NU+UosCW2c6R7M+C9eeUl+dQTVVDNE8+TIj+nZTKzIr0y4Tx3IjLulJeV1opRThHi+LByPzlhdzVjt3MiPrmxfnUhNnjS09TXTBddlKX7tOR5fSCxfSUpP2X2/RWRVVTM0EqD5X90Yb5/oXt/ojVipXI9kFYXlE4QjZTy+bChsjNjsT0i8DJyOzghO70jNnyTEFEFC1eOkGS9NyDx+aUl+yW2c6R0/RHQltGcFwpQ4XV6ob5/InJgJXRw4bO/kFJW14sAStQiMjsgPjhitX4yNTohNnjS09TVjBddlKbyvud8ueA2cWZtvuX2/RWRVZdMzAMAVIABAVWU0E2KyE0biRSEk0HHQwXCzIfTB0XTUM3JjYrOkU1ZCMmKC03PUMKQA4EXgQdDAYGNgoBR00wflCbwMSRx8GD+9UtQzYgLi5UBhEBCx8CDTEhQQwoByorICgjDTo9KC1UGhcKHAgCDTEhQRBUJi1FAUMCWR8ABDwdDUNYTh5fXgQdEwYrAAc5ACojYiUiQSEtSRBLHRkeXxUtDwIZDFhHQk8UVQAeAAoaS1k+TC4+eD4mSSc9OjcsIC4lDRMHEhcbBAYXMQQVBFCX/cuSxuyB1u2WmPSawsKR+eeN6ceUo8ub5u6czeSA6OCXuMid3fg3JjYrOkVbBFCU9NuT8+eA5+qXtd+ayeGR/82D+9WekfyU/eCSxveMz8qUg9KU9NuRzcSG7u9TAVI1MywhOUMnN02Uot+W2saT/ctFJCI4Y1Cb4dGQ1+WC9OmXgfSW3O6b1esWQB4FQgIXPg0VBAaK0uSUpfaV1OeX6eFHM0FTQgIWBBERDUFfCAwdXhUP"
   },
   {
    "id": "Q9",
    "level": "挑戰",
    "title": "各區域在各種天氣的營收",
    "task": "算出每個區域（stores.region）在每一種天氣下的總營收。每一種「區域 + 天氣」的組合一列。",
    "cards": [
     "groupmulti",
     "groupjoin",
     "join"
    ],
    "hints": [
     "GROUP BY 可以放兩個欄位，用逗號隔開；「區域 + 天氣」都相同的列才會分在同一組。",
     "SELECT s.region, o.weather, SUM(o.amount)\nFROM orders AS o\nINNER JOIN stores AS s ON o.store_id = s.store_id\nGROUP BY s.region, ___;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TB8UShkdD0FYSxQADxkZSAJQTUGT7vyD+ttTcFxQFwIYHAYWTFcqdlKW2c6d6stHQk+Vlfub+stWRVVUWl0sAStQhdvZgODNTEFTy+nGhMfdS09XXVxFGC1eOkGQ0c6M7cVTAVKb+NORzcpHQlxAGEJCPE8vS4bp+YTyhVJeQ4fM4or+xk9dHEJDUFMpRThHi+HmxPPaQ09Wj/rRi8nYD1xHVlJDXD5JNU+Uoeeb4stWRUGM992UidlQTVFAX1BQM0EqD5X/9or3wUFJTInJppnpyUFYXltWWzBddlKX7PSd6stHQk+XtMSXxcpWRVBTWF9EcFwpQ4b5/ormxk9dD5nr0YbQwEFJX1tBFUUvPB5YSxEACE9LDyM3LSY3PUMWQB8UShkdD09UBk0SCwwFRRUATUMnPC5NAUMQQB8HDxddSSI2Tor2spbm1z8aLzEqI00eXxQXExBUKDBFATEfZD48JDFUIywsIE0CWR8ABBBUKDBFHU0+Y1AdTxAABhEAMQQVDU1SEk0HHQwXCzIYSSwcJjE7PDNFLDRRXl4ABAQdBg1JTgJfWhUTFQsRG1hHQk8UVQAeAAoaS1k+TCojYiUiQSEtSYXx0IjVt5Xy6oXY7YfY44vor5/O7YXsxoDl4ov4rZbu6IXY7YfY44rrqZXy3Yr31IT+1ojhoZPy7IX95ITL+YjhoZTK4YTB7YzZ9F5RyPD5hO70jPz6Tq7mDUNShsvajMfMiN3SDU1Sh//0jMf/TlRRysX2guP2S09HPSg9aDMmQYvXyIT/6oTss5fH0Ivc4YXJ6onMoJ/O6RERDgoKAI7xrAcXABccDBGK0uSYrs2X3uadyeuA6deWos6X/ctULjEqOz1RbymR4eFWNE9HAR8VSAIXBUFODwIJHQgM"
   },
   {
    "id": "Q10",
    "level": "挑戰",
    "title": "下雨天下單 4 次以上的會員",
    "task": "找出「下雨」天氣的訂單中，下單次數達 4 次以上的會員，列出會員編號、姓名、下雨天下單次數。次數多的在前，次數相同時依會員編號由小到大排列。",
    "cards": [
     "having",
     "where",
     "join",
     "orderby"
    ],
    "hints": [
     "先 WHERE 挑出下雨的訂單，再 GROUP BY 會員統計次數，最後 HAVING 篩次數；排序要寫兩個條件。",
     "SELECT c.customer_id, c.name, COUNT(*)\nFROM orders AS o\nINNER JOIN customers AS c ON o.customer_id = c.customer_id\nWHERE o.weather = '下雨'\nGROUP BY c.customer_id, c.name\nHAVING COUNT(*) >= ___\nORDER BY COUNT(*) DESC, c.customer_id;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIvtrpXhwITDwYv88U9dD5XV8obk5EFJTIvdjJbn2UEpRUETDwEESANQWzgvSyBVWVRTAVKazf6cwMqD2NhTAUYvTThWKlNXXU9dD5nJ4ofJwIb19U9dGC1eOkE3WVFdTEFTxPTfh8/XjMXBTEFFcFwpQyBEWlJHQk+Yqd2V3+2T59FHQlksAStQIlNAUEFJTIXljJjbyIXC3EFJWjBddlIxUVpNS09HhvnQyMvIhM37S09RMzAMAVIABAVWU0E2KyE0biRSAk0XHBARAQAUXy8bBUM1OkOD8u6UvtGV1suc8PxJTg5fQxEfBEM1OkOAyf6Uvf1eQSA7PC0xRkdYDTEhQYXYyIXw1jEfayI9LEMbGwcAHB5RbCNSDj8aIC0rKz9RZz87L0MXHBARAQAUXwNSIDBUCkMqIE0eAxMHEhcbBAYXMQQVDU1SAk0XHBARAQAUXy8bBT8aPisgPChRQl4FBAIAAQYXTlBRCpTK6orvwUQ5ACojYiUiQSEtSQBLDRgCWR8fBBErAAdJTg5fQxEfBD8aISIzJyM2DTM9NC0gQUlMTlNMDUQuDywmLSY3Ti8oDZbewIXh0UMhKz4yAVARTwABGhcKAwgDchkWWkFYSwYdHgEQRB5QWzhWPisgPChRyPX6h+/ljOTfje39ycj5iPjciuPoiff1xdjwhPXaht/ti+X3ysX2hOr5ht/sgdH9aiI9NDNUKzpFi+v8y/r4iOPtjdn+hsXzyObchd3pj//mi/7QyPj0htbwht/pJiwnZD41QYXo6Ybb4ov9vJX124XYyIXw1k1PEFBGQYTu7YTQ6oj5iJ/O6Yb874TQ6ojPoZ/O6ID060FJTIj0hJfaz4TbwIrk1ojhqZfcwIfM6YXL24LNt5XWyIXEyoX9wY7xoZbd7ofM6Ybt+Y7xoJfo5YXW9Ife2ILNoZfmyUMjISY3K4LNtpbewIXh0YX9wY7xoZbd7ofM6YTQ6o7xoJfo5YXW9Ife2ILNoZfmyUM8KDUsICqSrfJQTUGS5/GA1OKXsfmX5MqR2MeK0veUqPiW3/6SxcKD+9WWucGXxcSR4dOA3uKekfyUzcKS/NuC9dWUvfyX5+6Q1/6D8u6UvtGV1suc8PyK0uGXpPCW2saT3POD8PGYjfaX2+yS8cyA9deUg+qV++eX6eFHM0FTQgIWBBERDUFfGh8ESA0="
   }
  ]
 },
 {
  "id": "week12",
  "week": 12,
  "date": "11/23",
  "title": "子查詢",
  "opensAt": "2026-11-23T18:00:00+08:00",
  "db": {
   "name": "chain_store_1000.db",
   "url": "../chain_store_1000.db"
  },
  "fingerprint": [
   [
    "SELECT COUNT(*) FROM orders",
    1000
   ],
   [
    "SELECT COUNT(*) FROM customers",
    100
   ],
   [
    "SELECT COUNT(*) FROM products",
    20
   ],
   [
    "SELECT TOTAL(price) FROM products",
    1850
   ],
   [
    "SELECT TOTAL(amount) FROM orders",
    195270
   ]
  ],
  "cards": [
   {
    "id": "subscalar",
    "week": "W12",
    "title": "純量子查詢（回傳一個值）",
    "desc": "括號裡的 SELECT 會先執行，只回傳一個值，外層就拿它來比較。",
    "sql": "SELECT product_name, price\nFROM products\nWHERE price > (SELECT AVG(price) FROM products);"
   },
   {
    "id": "subin",
    "week": "W12",
    "title": "IN（子查詢回傳一欄多列）",
    "desc": "子查詢回傳一份名單（一欄、多列），IN 判斷值在不在名單裡。",
    "sql": "SELECT name\nFROM customers\nWHERE customer_id IN (\n  SELECT customer_id\n  FROM orders\n  WHERE amount >= 700\n);"
   },
   {
    "id": "subnotin",
    "week": "W12",
    "title": "NOT IN（排除名單）",
    "desc": "留下「不在名單裡」的列。名單裡若有 NULL，NOT IN 會查不到任何列。",
    "sql": "SELECT product_name\nFROM products\nWHERE product_id NOT IN (\n  SELECT product_id\n  FROM orders\n  WHERE weather = '下雨'\n);"
   },
   {
    "id": "subselect",
    "week": "W12",
    "title": "SELECT 裡的子查詢（算占比）",
    "desc": "子查詢放在 SELECT 裡，當成固定的數字拿來運算，例如算占整體的百分比。",
    "sql": "SELECT order_id, amount,\n       ROUND(amount * 100.0 / (SELECT SUM(amount) FROM orders), 2) AS 占總營收百分比\nFROM orders\nLIMIT 5;"
   },
   {
    "id": "subfrom",
    "week": "W12",
    "title": "FROM 裡的子查詢（暫時的表）",
    "desc": "先做出一張暫時的表，外層再對它查詢；適合「先統計、再對統計結果做統計」。",
    "sql": "SELECT AVG(n) AS 平均每人訂單數\nFROM (\n  SELECT customer_id, COUNT(*) AS n\n  FROM orders\n  GROUP BY customer_id\n);"
   },
   {
    "id": "subhaving",
    "week": "W12",
    "title": "HAVING 裡的子查詢",
    "desc": "拿「每一組的統計結果」和「整體的某個值」比較。",
    "sql": "SELECT payment_method, COUNT(*) AS 筆數\nFROM orders\nGROUP BY payment_method\nHAVING COUNT(*) > (SELECT COUNT(*) / 4.0 FROM orders);"
   },
   {
    "id": "groupby",
    "week": "W11",
    "title": "GROUP BY 分組統計",
    "desc": "把欄位值相同的列分成一組，每組各算一次統計函數。SELECT 只放分組欄位與統計函數。",
    "sql": "SELECT city, COUNT(*) AS 會員數\nFROM customers\nGROUP BY city;"
   },
   {
    "id": "groupjoin",
    "week": "W11",
    "title": "JOIN 之後再分組",
    "desc": "先接表，再用接進來的欄位分組。",
    "sql": "SELECT s.region, SUM(o.amount) AS 營收\nFROM orders AS o\nINNER JOIN stores AS s ON o.store_id = s.store_id\nGROUP BY s.region;"
   },
   {
    "id": "having",
    "week": "W11",
    "title": "HAVING 篩選分組結果",
    "desc": "WHERE 在分組前篩選每一列，HAVING 在分組後篩選整組的統計結果；統計函數只能放在 HAVING，不能放在 WHERE。",
    "sql": "SELECT category, COUNT(*) AS 商品數\nFROM products\nWHERE price >= 50\nGROUP BY category\nHAVING COUNT(*) >= 2;"
   },
   {
    "id": "count",
    "week": "W10",
    "title": "COUNT 數列數",
    "desc": "COUNT(*) 數列數；COUNT(欄位) 只數該欄位不是 NULL 的列。",
    "sql": "SELECT COUNT(*) AS 門市數\nFROM stores;"
   },
   {
    "id": "sumavg",
    "week": "W10",
    "title": "SUM 加總・AVG 平均",
    "desc": "只能用在數字欄位；會把多列壓成一列。",
    "sql": "SELECT SUM(price) AS 定價合計,\n       AVG(price) AS 平均定價\nFROM products;"
   },
   {
    "id": "minmax",
    "week": "W10",
    "title": "MIN 最小・MAX 最大",
    "desc": "數字、日期、文字都能比大小。",
    "sql": "SELECT MIN(order_date) AS 第一天,\n       MAX(order_date) AS 最後一天\nFROM orders;"
   },
   {
    "id": "round",
    "week": "W10",
    "title": "ROUND 四捨五入",
    "desc": "ROUND(數字, 小數位數)；省略位數就取到整數。",
    "sql": "SELECT ROUND(AVG(age), 1) AS 平均年齡\nFROM customers;"
   },
   {
    "id": "caseagg",
    "week": "W10",
    "title": "CASE 放進統計函數",
    "desc": "在 SUM／COUNT／AVG 裡面用 CASE，就能「有條件地統計」。",
    "sql": "SELECT SUM(CASE WHEN gender = '女' THEN 1 ELSE 0 END) AS 女性會員數\nFROM customers;"
   },
   {
    "id": "join",
    "week": "W6",
    "title": "INNER JOIN 後再統計",
    "desc": "先接表、再篩選、最後統計。",
    "sql": "SELECT COUNT(*)\nFROM orders AS o\nINNER JOIN stores AS s ON o.store_id = s.store_id\nWHERE s.region = '南部';"
   },
   {
    "id": "where",
    "week": "W3–4",
    "title": "WHERE 篩選",
    "desc": "先篩選、再統計。",
    "sql": "SELECT COUNT(*)\nFROM orders\nWHERE payment_method = 'LINE Pay';"
   }
  ],
  "questions": [
   {
    "id": "Q1",
    "level": "基礎",
    "title": "金額高於平均客單價的訂單有幾筆？",
    "task": "算出 orders 中，金額（amount）高於「全部訂單平均金額」的訂單有幾筆。平均值請用子查詢算，不要自己手動填數字。",
    "cards": [
     "subscalar",
     "count",
     "sumavg"
    ],
    "hints": [
     "先寫一個子查詢算出平均金額，再放進 WHERE 當比較的對象。",
     "SELECT COUNT(*)\nFROM orders\nWHERE amount > (SELECT AVG(___) FROM orders);"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIrcq5bn2UEpRUETDwEESANQWzgvWlVXMzAMAVIABAVWU0E2KyE0biRSIiwhJzdNRERRbCNShs7yj/bdMgM3fz8/QQwGDQYXHTEfejg3MyZUCA4KGwMFDU5SSTAxJSYmOk0wezdaAA4bHA0RR003fz8/QQwGDQYXHURKD1xQBBsEBQIMAE9LdlKXzPOS9saNx8+XsfOX5OuR9tSNz+GekfyVz/SR7tmB1u2UrfuU9NuRxPSK0uWUlMOX/OSRx8GA+MOUrsmd3eqb1e+A6OCXp/qb4fqR6eiD+9WUgOeW28eT3MWAyvuUnNSV++dUPisgPChRyP7Jh8zggd/mje3zD1xQiOPtjsvLi+LbyOvshOHHiuPpitXxyPD5hOPIiuPoiff1yN3ih/zRgcrHi+LaysTmiOT7jM71iPLUxdnQjt/4jOzKitbUyuvGh+3Rj/fbi/HZDU5SguP1VUOG7uxMDZfo5Yb72orn5I7xr1JeQ4fM5ITxxojcvZbtxIvdy4bV34jPupX36YXrzIbi1IjInpXv5ob01YDl74j3oJb76ob//IXv6oTxn5X82ozI8ovW6YvntJTK4Yva44bV34vtrpn+zoD060E4Qk8eXxQXEwYQS1kDDwECSA0="
   },
   {
    "id": "Q2",
    "level": "基礎",
    "title": "金額最高的訂單有哪些？",
    "task": "列出金額等於「全部訂單中最高金額」的訂單，顯示訂單編號與金額。最高金額可能有好幾筆並列，請全部列出，不要只取一筆。",
    "cards": [
     "subscalar",
     "minmax"
    ],
    "hints": [
     "用 MAX(amount) 當子查詢，找出所有金額剛好等於它的訂單。",
     "SELECT order_id, amount\nFROM orders\nWHERE amount = (SELECT MAX(___) FROM orders);"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIXZr5Xkz4TDwYv88U9dD5n18IrV5EE4Qk8HTBwHBBBWUzg+TCJBHUREQ09DXFM4QjZTYkBCVFJWRVRQXjBddlI9UVNBXkFJWVhBcFwpQyxEWVVXTEFGGEAvTThWJlNUWVtTAUdHUT5YMkEqXl9DHVJeVlZENE8+TCJBHkNAQ09DXFM4QjZTYkBBWFJWRVRQXjBddlI9UVdHUEFJWVhBcFwpQyxEXFdXTEFGGEAvTThWJlNQVlxTAUdHUT5YMkEqXlhJGlJeVlZENE8+TCJBGElEQ09DXFM4QjZTYkBEUVRWRVRQXjBddlI9UVVHUUFJWVhBcFwpQyxEXlpcTEFGGEAvTThWJlNdX1lTAUdHUT5YMkEqXlVHFFJeVlZEND4YQk8DSBZQW0EnLC8gLTlRQgIWBBErAAdFLz5RxdjwhPXajtTNhvTuAVATDAwBBxdFLz5RxPfjiML5NQ0jPCI8DR8ABQYGGj8LOSU0fzVSAA4bHA0RTlBRBSM3LSY3PUMoLzVZTB0dFA0AQEMjPCI8DR8ABQYGGkpeTEFTSAgCDQIdB0FfNU+UgOCU/sacwMGA6+WWg+eX5tmS9eOMxfWYquGbwO6b1etSW12ekfmd3e+RzfWA38mUq/2U6N2R7tmD5+2XsfmVzOqS/99FWVhBDZfo5Yvc64bzwI7xr1JeQzQRDAhFX11Ryuz5iOL6ht//WVhBDZX34oTu7YvN7Ijng5bu6ENFUUOCw+uVldaX6fSX6eGC+sVRYiI2JDFUKzpFDwAeWB4GQScxOiBFIiQ8ZCRSUEOR5smD8u6Xps+X6dOR7NWB1sCVlfCVzOWb1e+Aw/2XstWayMGS4O6N7dCUqNib4suR4fSA6deSrfJQPE9WBhEBCx8USVJIBwIYGgYY"
   },
   {
    "id": "Q3",
    "level": "基礎",
    "title": "年齡高於會員平均年齡的會員有幾位？",
    "task": "算出 customers 中，年齡（age）高於「全部會員平均年齡」的會員有幾位。",
    "cards": [
     "subscalar",
     "count",
     "sumavg"
    ],
    "hints": [
     "和第 1 題同樣的想法，只是換成 customers 資料表與 age 欄位。",
     "SELECT COUNT(*)\nFROM customers\nWHERE age > (SELECT AVG(___) FROM customers);"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TInLl5bn2UEpRUETDwEESANQWzgvXVc4MxBdDwIXB0FOSzAgIigyeVAxLjY6PUtPR00wflCW29mS/Ns5ACsjYj1SAhYHHQwICx8CcR4lKSYmLEMECQhRE1BaMiY4LCAxTiwnalgTBgZdSSU3ISBRTgUBFQwZDBEWR1ZTAVIXGRMYCAoLTFcqD5Xf8YXrzIvMzIjjoZXW94bFzYX6y4XYj5X9zofPzIX6y4nJoJXi7YTu7YvW6YvntJjTyYzI5Yfc8Yj+gpTJxIb35orl94TQoZTK4YXcyoX6y4jhoZTK4YbI3IvExo7xr1JeQ4bN2ob46YjxkZTK7IXsxoXw2ovklZTL/oXG+4ry8onOr5/O7YXb/YvZ7Yvor5bu4oTv3YXry4rlhZX8/oXoxYT/6ojBopbn2YD060E4Qk8eXxQXEwYQS1kDDwECSA0="
   },
   {
    "id": "Q4",
    "level": "基礎",
    "title": "定價高於平均定價的商品",
    "task": "列出 products 中，定價（price）高於「全部商品平均定價」的商品，顯示商品名稱與定價。",
    "cards": [
     "subscalar",
     "where"
    ],
    "hints": [
     "子查詢算平均定價，外層 WHERE 挑出比它高的商品。",
     "SELECT product_name, price\nFROM products\nWHERE price > (SELECT AVG(___) FROM products);"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIjkq5Xh4Ibk5ITN309dD5Xc+4b30EE4Qk8HTBwHBBBWUzg+TIr2uJnIxIbR34Xu0YThmFJeWFYpRThHidvtyOD6hMPxj/35iObNyuvWQ09FWFM4QjZTyvnpieH9jNvwi93NyMDOQ09FW1M4QjZTy+nwhNPujvHVitLsy+3dQ09GXFM4QjZTxffYhOjhj+n9ifv7xOvahOHsS09UVl0sAStQid/hgOTqitPOy+TuiPjcgcLGTEFAH0AvTThWjPDkieT9yMj0hNv3gcHuTEFAGEAvPB5YSxEACE9LDyM3LSY3PUMVHAIVWBMGPg0VBAZFLz5RyOX0hPD1jPPoicXAAVACEwoXDEMkPU2Ug+qX4tooByU3ISBRXQIdBRYXHRA5ADo5aCI3QRMGAAAATlNRBSM3LSY3PUMkOCpZXQIbAgZdSSU3ISBRXQIdBRYXHRBMVU9dDxUKEQ8VAA1HVDZTyNTkhNLQjdvoiPXeysXDicv8ht/phu39y+jdguP4jOvyi+rLytzUhPP8j8H4itbHyur2hOvjiuPogdH9yN3ih/zRgcrHi+LbxcLSidHYj+z1itPqy9/mid/3jvnhi/LLy8rkhOPIiuPnTEFTyOD+hdv0jOPuiMH1yc3/jt/8GREMDQiekfmX7syQ0saA/uGXtPKX5tmT5t2A8sWUieaX0MdUOiYpKy4lDZj65obZ+YX6y4XYj5fo5UM1PyRFhs7Qwsz+hObdgOHvitfjycj/hN7FgPzaje3zDy1eQwwGDQYXCwlTFxYTDRARFA=="
   },
   {
    "id": "Q5",
    "level": "進階",
    "title": "買過咖啡類商品的會員有幾位？",
    "task": "算出有買過「咖啡」類商品的會員人數。類別在 products、購買紀錄在 orders、會員在 customers。",
    "cards": [
     "subin",
     "join",
     "where"
    ],
    "hints": [
     "子查詢先找出「買過咖啡的會員編號」（一欄、很多列），外層用 IN 判斷會員在不在這份名單裡。",
     "SELECT COUNT(*)\nFROM customers\nWHERE customer_id IN (\n  SELECT o.customer_id\n  FROM orders AS o\n  INNER JOIN products AS p ON o.product_id = p.product_id\n  WHERE p.category = '___'\n);"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIvtrpXhwIXh0UE4Qk8HTBwHBBBWUzg+VlUscA1eQxERD0FfTD40YTUxNUM3JjYrOkVbBFAzMkOS9eCA/cyXuMguDyUmJi5FDRgCWR8fBBEHNQ0yJigjaFARFBAABg4AHDIYSVA7L0NcNQ1FTj40YTUxNUMbRwAQHRkeQBUAPgoQNQ1FTisjYj1SDhEQDBEWTiwiDR8uD0NUIC0rKz9RZz87L0MEGwwBGw4FXlAzMkMESSwrTgJfXQIdBRYXHTwMCk1MDQBcEREbDRYGGjIYSSwcQUMjISY3K00BAxMTFQYTBhEcTlBRCpXg94bhyEQ5AERKD1xQBBsEBQIMAE9LdlI7L0OR1++M88+Xo9WV++eRxPOD8ciZhNKX7syQ0saA9fOUr8OR4e+Q0eODwumSrfGXxfmR4fSG7uCekfyX4uyQ0eOB1dCUvf2X982b1fiAyvuUnNSX7smT/PqB1uaUsdiX8e6R/82NzcyWt/SU/eCR+sKG7u9TAVKX8e+Q0eOB0+CXsfOX8sKR5syN7dCZn8eW2+WR1+uAyveXgdGX8/WR/MKK0uGUvf2X982cysKD8u6Yqv2axeSb1e+B0+tRZD5ShOzejOvBiPvGzvD+hP/cjdvoi/HZzvD/jt/4jdvoiPHyyOvSh87Qjs3yh+r8xdT1guP2S09Hi8vzy+7uhvjAj+3ATic+ZD5ShOX5SSAqOyMlBVpbjt/4j//miOf7xcPOidHDj8/EiPjJxPPPhs3jgOPXi+PKwszpicX1j/bdje39ycrIguP5jNPUi9PmyP7JiOT5gcfigdH9yuTaQSo6SYX+2orqmZb8xID060E4Qk8eXxQXEwYQS1kDDwECSA0="
   },
   {
    "id": "Q6",
    "level": "進階",
    "title": "從沒在下雨天下過單的會員",
    "task": "列出從來沒有在「下雨」天氣下過單的會員，顯示會員編號與姓名。",
    "cards": [
     "subnotin",
     "subin"
    ],
    "hints": [
     "先用子查詢找出「下雨天下過單的會員編號」，外層用 NOT IN 排除他們。",
     "SELECT customer_id, name\nFROM customers\nWHERE customer_id NOT IN (\n  SELECT customer_id\n  FROM orders\n  WHERE weather = '___'\n);"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIvtrpXhwITDwYv88U9dD5XV8obk5EE4Qk8HTBwHBBBWUzg+TC5BHUhQTUGS9/SA1deUsftQPE8vSyBVXlRTAVKb2uCT1+2C4N9TcFwpQyBEWFNHQk+YtMOX3vSS8e1HM0EqDzNCUFBWRUGD2seXmNmV5dVWNE8+TC5BHERQTUGcxf6AwNuZnNpQPE8vSyBVX1RTAVKU//SR+tGC/+ZTcFwpQyBEW1VHQk+UvcOW3MqR+fhHM0EqDzNCU1RWRUGDy+eVkvqX4/JWNE8+TC5BHkhQTUGS9/SD59KWksBQPE8vSyBVWl1TAVKb2uCcwMqD2NhTcFwpQyBEXVBHQk+Up/mXz9Wc2MlHM0EqDzNCVFFWRUGD8PqWivCa6tJWNE8+TC5BGEVQTUGR4+qM9eiUhMdQPE8vSyBVW1tTAVKU+t2d0/SN4cJTcFwpQyBEX1FHQk+ZudGU1MqT7dVHM0EqDzNCV1BWRUGD8+OUg+eV3tNWNE8+TC5BGkRQTUGR1daNx82XtMRQPE8vSyBVVl1TAVKazf6S6cKA/vZTcFwpQyBEUVJHQk+ZudGayMqS39ZHM0EqDzNCWVZWRUGA/t6UvsKV8OhWNE8+TC5BFUdQTUGR1daD7syUvetQPE8vSyBVV15TAVKb+NCcwMOD99lTcFwpQyBEUFtHQk+UvcOW3MqR+fhHMzAMAVIABAVWU0E2KyE0biRSAhYHHQwICx8uRBRSIDBUj//mi/7QysfaifrrRUMLDwAUDTEhQYbT+ob14zEfayI9LEMXHBARAQAUXwMuDzQ8LDEgTg4EXgQdDAYGNgoBTiM+eVA7L0NcNQ1FTj40YTUxNUMXHBARAQAUXy8bBT8aSUMjPCI8DR8ABQYGGj8LTk0mZTUgJEMDDAIRBggDDU1SRofM4or+xkotQ1lJQ09WDBsVAgwYQ1JIOkE6JjdFJyNRy+jdQSo6SYT/6orqlZX97IzI84b144jng5jRwID05YXX/IvtpJPy7ITu7YXs44rktJTK6oD060FJTDoUSBtSVkORxNuM7+OUotaW2eOTwc2AwcaXnuWd3fkXHBARAQAUXwNSLSYyPUMvISQ/DR8ABQYGGkOB1+aUk/yV9ctUIDBFIDg9YVCU6N2R7tmD3P+YqP2X0e6R4dOC9OmUpeeR4eGR7MqCxsOUgtuU0vaT3POD8PGWtsiX8e+b1fkpKyslDTo9KC1Uj8zxhtHyxO36h9fPht/pICIlDTk8QYva6YvQ2YnPq5bd9YvI6oT+2oXXl5Py40FYS4XWxov1op/O+4bS64X78ojcvZbtxIvdy4T/6ojhoJXkz4vXyIX5500/eDw+jt/4JywxTiQ/DZbu4oXh3Ybl5YjVnJbn6YzI4Yfd7oj5upnx3IXrzIfd44j5nZ/O6ID064rl94TQoZfo5UMXHBARAQAUXy8bBUOS2/GD8uRRYyU+LYzI5YXs7onKiJX9zofPzIXx0IjOrpfmyYD060E4Qk8eXxQXEwYQS1kDDwECSA0="
   },
   {
    "id": "Q7",
    "level": "進階",
    "title": "每家門市的營收占總營收幾 %",
    "task": "列出每家門市的門市代號、營收，以及該門市營收占全部營收的百分比（取到小數第 1 位，例如 12.1）。",
    "cards": [
     "subselect",
     "groupby",
     "round"
    ],
    "hints": [
     "百分比 = 門市營收 × 100.0 ÷ 全部營收。「全部營收」用子查詢放在 SELECT 裡算。",
     "SELECT store_id, SUM(amount),\n       ROUND(SUM(amount) * 100.0 / (SELECT SUM(amount) FROM ___), 1)\nFROM orders\nGROUP BY store_id;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TB4FQgIXPgoQS09Hieruy+TEQ09WjO7FiMLlDy1eQxUVBRYAHU9LditQMlNEWEFJX1VJGkVeWE1DNE8+TD5BHUJQTVJNXVRVQlxBcFwpQzBEWVBHQl9CG0lCTVJGR1I4QjZTfkBCVUFYWFRXXV1dFV5KPE8vSzBVXlhTAUFLWFNBRVJVQF8sAStQMlNEX0FJXF1IHUBeUFNaXj5JNU8iHUBFQ09GW1BQW0FAHF5GPE8vSzBVXlVTAUFKUFpERVpLXTBddlIhUVNNS09UWltEGFxFT1YpRThHPV1AHVJeU1NEWVNJX11fHy0vHE9WGwYDTFdTfjU+JCAgSRARAR8UchkWTT8aSUNFTk1RDSMnLEsVBAwQABlYDTEhQYTz9oXx2EEtQ1BSQUNUSUM3ITg/aVghNC5cCA4KGwMFBFBYQVJEWU1VTkJRBSM3LSY3PUM2OyBZTB0dFA0AQEMjPCI8DR8ABQYGGkpJTlxYDTEhQYb5yYXK+jEfayI9LEMbGwcAHB4tQzcgLjYkSSE8Th4FQgIXPgoQUkFJTAgJXRwTCA1WUzhHi8Dhy+/XicrWjdr6i+LeycvXh/fKjP/NTj40YTUxNUOcysKK0uGWuMaU6fOQ0eOA7uaSrfyX+tmRx/mC9OmXuMiXzPSX6e6D5dKVk/ab4OiTx/SK0vaXgv+W2eOR4fSC8uaUpcCV++ed6t6D9sKUvfyW2eOR6eiC1tCWqu+U9dWX6eFHQk+UgOCU/sacwMFFRj40YTUxNUMnPC5NDwAeWB4GSEMyOywoTgIDSRUAEkpUj9H3iPH4DTcgLjYkSSE8gdH9yt7lhvnwj/vKi+jZxPPaicv2jPXLgdHqyNTkhNLQjvnhTj4kYFgTDAwBBxdMTovtpFA1MywhOUMnN4LNoZfc9oTu7YX9wYveopXc14ri6Ybd7I7xr1JeQ4fN8UNUXl1fHZ/O6YXo4IbV4YvklZnJ/4zI4IbqwYnKiJnz3obx5IXw2ovklZnrxYXH/IT/6oTompnq0ID060E4Qk8eXxQXEwYQS1kDDwECSA0="
   },
   {
    "id": "Q8",
    "level": "進階",
    "title": "平均每位會員消費多少？",
    "task": "先算出每位會員的消費總額，再算這些總額的平均值，四捨五入到整數。結果只要一個數字。",
    "cards": [
     "subfrom",
     "groupby",
     "round"
    ],
    "hints": [
     "先在 FROM 裡用子查詢做出「每位會員的消費總額」這張暫時的表，外層再對它做 AVG。",
     "SELECT ROUND(AVG(總額))\nFROM (\n  SELECT customer_id, SUM(amount) AS 總額\n  FROM orders\n  GROUP BY ___\n);"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIjInpXv5oXC4YvX1U8sAVIEAA8BDBBHVDYqHElHUj4pFE9HHAgXD0pQMiY4LCAxTj8+eD42SSIiLkuC1tCYjP1bSEM1OkOA196UsPeU1+uc29g5ACsjYj1SST8aSUM2KyE0biRSAhYHHQwICx8uRBReQTAhJEsEAwIEQwRbQSInSYTd04TQoCwcQUMyOywoTgIDSRUAEj8aSUMiPCIkfVAwOEMXHBARAQAUXy8bBT8aQFhHQk8UVQAeAAoaS1k+TCsjYj1ShN34gP7Hiff1yN3ih/zRgcrHgdH9y+jdguP4jObti+zryPfIhdv0jN/QiPfay+nwhvnwgcLNgdH9yPb/hNP5jM3miPLUxdnQguP5iuPnTEFTzvD+hOb8jOvjidj1ysXDicv8iuPki+v8yMD/htbFgcvtidjhy+7uhOLujtbUhsX5zvD/hdv0jOzATj4gYVCX4PmQ0e6A5t2ekeozNyRcOjYoRgwcQgUcFUpdSYX9wYnJoJXi6YXH/IT/6oLNoZb74YfPzIvD74v6q5b68YbxwIbUyo7xr1JeQ4bQ/4bUyovuiJjbw4b7xofey4rqmZb8xIfJ1oTxxojcvZbtxIvdy4vGz4j+u5fo5Yb8zIb144LNpZfK3IrV5IzZ547xr1IvTUEbGwcAHAgVD0oUAA8HDB4="
   },
   {
    "id": "Q9",
    "level": "挑戰",
    "title": "營收高於門市平均營收的門市",
    "task": "列出總營收高於「各門市營收平均值」的門市，顯示門市名稱與營收。",
    "cards": [
     "subhaving",
     "subfrom",
     "groupjoin",
     "having"
    ],
    "hints": [
     "HAVING 後面也能接子查詢。「各門市營收的平均」要先用 FROM 子查詢算出每家門市營收，再取 AVG。",
     "SELECT s.store_name, SUM(o.amount)\nFROM orders AS o\nINNER JOIN stores AS s ON o.store_id = s.store_id\nGROUP BY s.store_name\nHAVING SUM(o.amount) > (\n  SELECT AVG(t)\n  FROM (SELECT SUM(amount) AS t FROM orders GROUP BY ___)\n);"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TITnrZXK44bk5ITN309dD5f1/oXg30E4Qk8HTBwHBBBWUzg+TIj+nZTKzIbxxYT+5IjLulJeUFpNWVY4QjZTyP/ChdvZgOPHifnDyMrlQ09GWVpVXjBddlKX7tOR5PSD5v2UideX2/RWRVFVXl1BcFwpQ4Xp1oXM5YjLsZTKzIbO/kFJXF5HFEAvTThWgMj9h/b1ycj7hMfujNnyTEFDH0NHVD4pFE9HHAgXD0pQMiY4LCAxTh5fXgQdEwYrBwIIC00wflCb9+OR0eGA/uCWhcFeQTAhJEsKQAwcQgUcFUpUKDBFieruy+TEPQ0yOywoTgIDSRUAEkM1OkMKMgM4Yz43M0M+JiorTh4FQgIXEkM1OkMWTiI/DR9cEhcbGwY6BwlREFABTxAABhEAMQQVcR41MywhOUMnN00CAwMGDhERNg0EAwgtQzgzNyo6LkM2OyBZQl4TDAwBBxdMTlNRBSwcQUMnLC8gLTlRbCY1SRddNQ1FTisjYj1SSTAxJSYmOk0ieD1aAA4bHA0RR00wflAGQSUmJi5FAR8VSAIBQSQmJjY1Ti8oDQMGDhERNgoBRzEfBEtQTUERERMJDwQfD0opQ4Tg2IbgyYjPrZXW94va6YzZ9IvtrZX3xobFzYTL+Yj2l5bd7oba34rz7ojJr5fo5YTz9oXx2E2Tq+JShdvZgPX2i9zVyP/kiOPtjdn+ieruy+TEhvnwjNrWi/D2DZL080OS9eOAyvuUnNSV9ctUISIzJyM2DZfn+IfM4orO9ovnkZXL0obp7oT/6oTnrZXK44D060FJTInIspX9zofPzIbKxYv5vVA6IDU9JyRFPTg8BR9cAA4bHA0RR01PDVghJC8xKjdFPTg8BREfDhYaHUpFQU1AHV5CQSUmJi5FAR8VSAIBSIzI5YTQ/ovvsZfp2Ybk5YzZ9YnMq5Py7Yri6Ybd7IvklVBPQVJEiuPoiPXeyN/Zh87PjvnhgdH9ycn5hN34j/XVi8/vxObyhNv2jNPUiPHyyt7liO/bht/pitX8y+jdhMbJjMzOiN7kzvDwQ09WISIzJyM2DZbqzoTbwIrk1o7xoZbd7ofM6YTQ6o7xoJ/O7YX96Yfey4j+gpTJxIXg14bI/ovuiJjbw4bm5YXw2oTauZfo5Yb01YXK+oXNrp/O+jQ8LDEgTorehJfo5YXsxobr8YjWppfo5YXb5ofd7oj5up/O7YfM5Ivm04rqmZb8xIXg10M2OyCSrfJQPE9WBhEBCx8USVJIBwIYGgYY"
   },
   {
    "id": "Q10",
    "level": "挑戰",
    "title": "會員依消費總額分級，各級幾人",
    "task": "依每位會員的消費總額分級：2500 元以上為「高」、1500 元以上為「中」、其他為「低」。算出每個等級各有幾位會員（兩個欄位：等級、人數）。",
    "cards": [
     "subfrom",
     "caseagg",
     "groupby"
    ],
    "hints": [
     "先在 FROM 裡用子查詢算出每位會員的消費總額；外層用 CASE 把總額換成等級，再依等級 GROUP BY。",
     "SELECT CASE WHEN 總額 >= 2500 THEN '高'\n            WHEN 總額 >= 1500 THEN '中'\n            ELSE '低' END AS 等級,\n       COUNT(*)\nFROM (\n  SELECT customer_id, SUM(amount) AS 總額\n  FROM orders\n  GROUP BY customer_id\n)\nGROUP BY ___;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIrcpJfG+0FYS4ff1IvklVIvTUECCA8QCx5TFyspQ4fMxEFJWl8sAStQhd76S09WWDBddlKbyvtWRVFXMzAMAVIABAVWU0E2KyE0biRSIiInLEMyJig/DZfK3IrV5ENbU01DGEBCQTc8LC1FSYTatVcuD0NUSUNFTk1RDVBSQTQ8LC1FidXMxNH/QV1JSVJQXl1ReTg3L0NTjdvISTEfDVBSQUNUSUNFTk1RaDwhJENTjd7rSU00YzRSIDBUjs7sidnrASwcQUNUSUNFTi4+eD4mSUldSSI2TonLl5bn2T8aLzEqI01ZcR5SQTAxJSYmOk0SWAMGDg4RGzwMCkFRfiU/SQIZBhYLGkRRbCNShtvJgMLoMgNRDTYgLi5UBhEBCx8CcR5SQSQmJjY1Ti8oDRMHEhcbBAYXMQQVcR5bPQ0zOywwPk0zdFCVzOqT3fleTEFTSAgCDQIdB0FfNU+UqNeX0Meb1esjPCI8DZXf8YXrzIvMzILNpJX36Yb184bi1I7xoZbd7ofJ5IX57YjijJTK4Yb8/oDl44rrqZbE6YvG0oTd04TQoJjTyYzI8obB+IjAiZX07IbE5Irl94jNmJjTyYb874TR9I7xrJja6YXh0YDl7E9dDzMzMiZUjd34i9f+yPjWh/XDht/picHdycjyhOP/j+v1icb6yur2hNPFj//miOPQyuTajt/4j+rlitbUyPX6hMzfSV1YTl9EHUCR4eKR7+6AwcZRE01SUFZEWYzZ4oTRq5XI7ofM5Ivm04TQtpXy84D060FJTCojYiUiQSEtSYbqwYnKiJfp1YX6zIfY0YrlhVAhJC8xKjdFhs7QyP/khvnwjOvAi/38wsz6hs79jtf/gdH4zvDwQz5YSwwXCggDSBRQWwUVBRAAEw=="
   }
  ]
 },
 {
  "id": "week13",
  "week": 13,
  "date": "11/30",
  "title": "資料分析實務：替老闆寫分析報告",
  "opensAt": "2026-11-30T18:00:00+08:00",
  "db": {
   "name": "chain_store_1000.db",
   "url": "../chain_store_1000.db"
  },
  "fingerprint": [
   [
    "SELECT COUNT(*) FROM orders",
    1000
   ],
   [
    "SELECT COUNT(*) FROM customers",
    100
   ],
   [
    "SELECT COUNT(*) FROM products",
    20
   ],
   [
    "SELECT TOTAL(price) FROM products",
    1850
   ],
   [
    "SELECT TOTAL(amount) FROM orders",
    195270
   ]
  ],
  "cards": [
   {
    "id": "groupby",
    "week": "W11",
    "title": "GROUP BY 分組統計",
    "desc": "把欄位值相同的列分成一組，每組各算一次統計函數。SELECT 只放分組欄位與統計函數。",
    "sql": "SELECT city, COUNT(*) AS 會員數\nFROM customers\nGROUP BY city;"
   },
   {
    "id": "groupjoin",
    "week": "W11",
    "title": "JOIN 之後再分組",
    "desc": "先接表，再用接進來的欄位分組。",
    "sql": "SELECT s.region, SUM(o.amount) AS 營收\nFROM orders AS o\nINNER JOIN stores AS s ON o.store_id = s.store_id\nGROUP BY s.region;"
   },
   {
    "id": "groupmulti",
    "week": "W11",
    "title": "GROUP BY 多個欄位",
    "desc": "欄位用逗號隔開；所有欄位的值都相同，才算同一組。",
    "sql": "SELECT gender, city, COUNT(*) AS 人數\nFROM customers\nGROUP BY gender, city;"
   },
   {
    "id": "having",
    "week": "W11",
    "title": "HAVING 篩選分組結果",
    "desc": "WHERE 在分組前篩選每一列，HAVING 在分組後篩選整組的統計結果；統計函數只能放在 HAVING，不能放在 WHERE。",
    "sql": "SELECT category, COUNT(*) AS 商品數\nFROM products\nWHERE price >= 50\nGROUP BY category\nHAVING COUNT(*) >= 2;"
   },
   {
    "id": "grouporder",
    "week": "W11",
    "title": "排序分組後的統計結果",
    "desc": "ORDER BY 可以用統計函數或它的別名；搭配 LIMIT 就能取排行榜前幾名。",
    "sql": "SELECT payment_method, COUNT(*) AS 筆數\nFROM orders\nGROUP BY payment_method\nORDER BY 筆數 DESC\nLIMIT 2;"
   },
   {
    "id": "month",
    "week": "W11",
    "title": "substr 取出年-月",
    "desc": "substr(文字, 起點, 長度)：order_date 前 7 個字元就是「年-月」，可拿來依月份分組。",
    "sql": "SELECT substr(order_date, 1, 7) AS 月份,\n       COUNT(*) AS 訂單數\nFROM orders\nGROUP BY substr(order_date, 1, 7);"
   },
   {
    "id": "count",
    "week": "W10",
    "title": "COUNT 數列數",
    "desc": "COUNT(*) 數列數；COUNT(欄位) 只數該欄位不是 NULL 的列。",
    "sql": "SELECT COUNT(*) AS 門市數\nFROM stores;"
   },
   {
    "id": "sumavg",
    "week": "W10",
    "title": "SUM 加總・AVG 平均",
    "desc": "只能用在數字欄位；會把多列壓成一列。",
    "sql": "SELECT SUM(price) AS 定價合計,\n       AVG(price) AS 平均定價\nFROM products;"
   },
   {
    "id": "round",
    "week": "W10",
    "title": "ROUND 四捨五入",
    "desc": "ROUND(數字, 小數位數)；省略位數就取到整數。",
    "sql": "SELECT ROUND(AVG(age), 1) AS 平均年齡\nFROM customers;"
   },
   {
    "id": "countdistinct",
    "week": "W10",
    "title": "COUNT(DISTINCT 欄位)",
    "desc": "先去掉重複，再數有幾個不同的值。",
    "sql": "SELECT COUNT(DISTINCT city) AS 城市數\nFROM customers;"
   },
   {
    "id": "caseagg",
    "week": "W10",
    "title": "CASE 放進統計函數",
    "desc": "在 SUM／COUNT／AVG 裡面用 CASE，就能「有條件地統計」。",
    "sql": "SELECT SUM(CASE WHEN gender = '女' THEN 1 ELSE 0 END) AS 女性會員數\nFROM customers;"
   },
   {
    "id": "orderby",
    "week": "W5",
    "title": "ORDER BY + LIMIT",
    "desc": "排序後取前幾筆。",
    "sql": "SELECT order_id, amount\nFROM orders\nORDER BY amount DESC\nLIMIT 5;"
   },
   {
    "id": "subselect",
    "week": "W12",
    "title": "SELECT 裡的子查詢（算占比）",
    "desc": "子查詢放在 SELECT 裡，當成固定的數字拿來運算，例如算占整體的百分比。",
    "sql": "SELECT order_id, amount,\n       ROUND(amount * 100.0 / (SELECT SUM(amount) FROM orders), 2) AS 占總營收百分比\nFROM orders\nLIMIT 5;"
   },
   {
    "id": "subfrom",
    "week": "W12",
    "title": "FROM 裡的子查詢（暫時的表）",
    "desc": "先做出一張暫時的表，外層再對它查詢；適合「先統計、再對統計結果做統計」。",
    "sql": "SELECT AVG(n) AS 平均每人訂單數\nFROM (\n  SELECT customer_id, COUNT(*) AS n\n  FROM orders\n  GROUP BY customer_id\n);"
   },
   {
    "id": "subhaving",
    "week": "W12",
    "title": "HAVING 裡的子查詢",
    "desc": "拿「每一組的統計結果」和「整體的某個值」比較。",
    "sql": "SELECT payment_method, COUNT(*) AS 筆數\nFROM orders\nGROUP BY payment_method\nHAVING COUNT(*) > (SELECT COUNT(*) / 4.0 FROM orders);"
   }
  ],
  "questions": [
   {
    "id": "Q1",
    "level": "基礎",
    "title": "時段：哪個時段最會賺？",
    "task": "老闆問：「一天裡哪個時段最會賺錢？」請依時段（time_slot）列出三個欄位：時段、訂單數、營收（amount 加總），依營收由高到低排序。",
    "cards": [
     "groupby",
     "grouporder",
     "count",
     "sumavg"
    ],
    "hints": [
     "依 time_slot 分組，同時算 COUNT(*) 與 SUM(amount)，最後依營收排序。",
     "SELECT time_slot AS 時段,\n       COUNT(*) AS 訂單數,\n       SUM(amount) AS 營收\nFROM orders\nGROUP BY ___\nORDER BY 營收 ___;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIvor5bc1EFYS4vN7Ijng5bn2UFYS4Ti8Yvlm1IvTUECCA8QCx5TFyspQ4Xt84rz/U9dH0FLTVdFWlpQM0EqD5bF0IbQ9UFJX1RCAURDUFZENE8+TIvmhJbryUFYWFpQQl5IHUdCPE8vS4fd5Yj8pZj+10FYW1FXQl5GGkRHPE8vS4bo5oTVvVJeUFRFRVBQV1xBcC0PTUEGDAVHVE8iaDw3IjdUHQoICzICQR8GQSInSYX87IvfmFwuD0NUSUNFTk0yYiU8NUteQEMkPU2ZhfKX982S/NtJMgNRDVBSQUNUOjYoRgwcQgUcFUpUKDBFieruy+TEPQ0yOywoTgIDSRUAEj8aLjEqOz1RbylSFQoZDDwWAgIFcR49MycxO0MnN02Wqu+U9dVULSY2LVZTAVIXGRMYCAoLTFcqD5TK4YXYyEMiPCIkfVAwOEOR5syB1ciUvfyU+OGTx/SAy9CUlM6X4eiT3NKNxuWUrcyd3e+cweGA+MOXuMiX8++T7vyD+tuXuc6X/cuQ0eON29qWsfud3e+S4O6C8uaUk+eX5tmR3s2A5siSrfJQTUGT3MWN7uyYuvaV++eT3PONxfuekeqU+Pmd//CC6fKXucaU/eOdwvuK0uVFHFxBWFZUjObmgdH4wsz+hd7ygcvni/vfy+XKh//0jMf/iff1y+jdhdv/jO7thuHHwsz6U1FGSYTI6ILNpJ/O7YTz9oXx2Ij8lpb884b0+4Xw1ordgZTI7YzI5YfezYXQhZTK6ob54Yvp2Ijfj5Xkz4b15ofY4I7xr1IvTUEbGwcAHAgVD0oUAA8HDB4="
   },
   {
    "id": "Q2",
    "level": "基礎",
    "title": "付款方式：誰用得多、誰買得多？",
    "task": "老闆問：「客人都用什麼付錢？哪種付款方式買得比較多？」請依付款方式（payment_method）列出：付款方式、訂單數、平均客單（AVG(amount) 取到小數第 1 位），依訂單數由高到低排序。",
    "cards": [
     "groupby",
     "grouporder",
     "sumavg",
     "round"
    ],
    "hints": [
     "依 payment_method 分組；平均客單用 ROUND(AVG(amount), 1)。",
     "SELECT payment_method AS 付款方式,\n       COUNT(*) AS 訂單數,\n       ROUND(AVG(amount), ___) AS 平均客單\nFROM orders\nGROUP BY payment_method\nORDER BY ___ DESC;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TInKtZbe34Xi0IbZ4U9dD5ja44bix4Xw1k9dD5XL0obp7obLzIjng1IvTUECCA8QCx5TFyspQ4vV/obqzYvlgpTJ+UFYW1ZWQlxJGl5EPE8vSy8sIChRfRELQ09GXFFJX1RDA0QvTThWjuzbh+rgD1xAVVpYW1NdQFksAStQhdzVjvfNi+DQD1xAVVVYWFpXQFUscA1eQxERD0FfTD40YTUxNUMECBoICwMFch0XFQsbDUMkPU2VluiUzd2S/9qA0uJdcR5SQUNUSUNFLSIkYyRaS0pUKDBFhsXzyObch/bMRT8LTk1RDVBSQTE7PC0hRiwnalgTDAwBBxdMQk1ABFAzMkOR0NCA8+qUg9KX980oByU3ISBRQgIWBBEHNQ0iPCIkfVAwOEMECBoICwMFch0XFQsbDT8LIT81aCJSIzpUgcvni/vfy+XKQScxOiBeTEFTSAgCDQIdB0FfNU+SrfyV9cuR1/SAyveSrf2V/eicweGA+MOXuMid3e+X6e+N3NqUk+eXxfmX6e6C8uaUlMOX/OSRx8GA+MOekfyX5MqR6eiA++KYjPyax+KT/cuA68SUrfuU9NuRxPSA9fOWgOSR4eFWRUGC28uZrfGb9uWT8+eC2/2Zhuad3fmR8viCxsOVluiUzd2S/9qA0uKWt/SayeGR/82D+9WUmt6W2e6RzfmK0uVDGUad3P1GXFBFicD3wsz7jt/4jd7jieLPxPfjhvnwjNrWi/D2yN7QhPXaj//lh8bpwsz6U1NMR1dFi+jywsz7jt/4gcLyi+LSy+Tdhdjsgcvni/vfy+XKh//0jMf/je3wyMnBhP7zjM3Hi/vfyP3Jh//0jd7rgdH5HEhFT1VUjObmgdH4zvDwQz5YSwwXCggDSBRQWwUVBRAAEw=="
   },
   {
    "id": "Q3",
    "level": "基礎",
    "title": "客群：男女會員誰消費多？",
    "task": "老闆問：「男生和女生，誰比較常來、誰花得多？」請依會員性別（customers.gender）列出：性別、訂單數、消費總額（amount 加總）。本題不限排序。",
    "cards": [
     "groupjoin",
     "count",
     "sumavg"
    ],
    "hints": [
     "性別在 customers、金額在 orders，先用 customer_id 接起來，再依 c.gender 分組。",
     "SELECT c.gender AS 性別,\n       COUNT(*) AS 訂單數,\n       SUM(o.amount) AS 消費總額\nFROM orders AS o\nINNER JOIN customers AS c ON o.customer_id = c.___\nGROUP BY ___;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIvxipX6xEFYS4vN7Ijng5bn2UFYS4XT5oXDlpfK3IrV5EE4Qk8HTBwHBBBWUzg+TIjUnlJeVVpNRVpXXF5BcFwpQ4Tg3kFJW11AAUFCUlNAWT44E0FTXxUUQ1lWOiYpKy4lDRNcBgYaDQYXTiwiDZbyxob8zE85AE1RDVBSQUM3JjYrOkVbBFAzMkOcweGA+MOXuMhePQ1USUNFTk1RfiU/SQxaCA4KGwMFBFAzMkOS3+uN3NaWlc2bwO4oByU3ISBRQgIWBBEHSSI2TgItQzk8LyYmSSkqJyNRTgUBFQwZDBEWTiwiDRNSLi1UBk0GGx4FQh0XEzwdDUNYTg5fTgUBFQwZDBE6BwktQzcgLjYkSSE8Tg5fShUcBQYGUkFJTAgJXRwTCA1WUzhHhsvwyuTahOvEjObMi9HExdHahvnwj8/hitD8wsz+hNPFjObtTic+ZD5ShOX5SSQ3ITghDTIrjt/vIywsIE2VlPuX3++SxuyB1u2UpeeW2u6S8cyB1u2WgPaayeGR/82K0uGXpPCW2sZUKiwwIDlZB1lSh/bMjvnhiPXexdjwhPXaj/bdje3zD1xQhtbSgePkh/r3yur2htbkgcjzgdHryuTFhMbHjvnhhsXzyObch/bMjNrbitT/ycjyh8vXht/tW11ADZXC7ENAUFpFicD3wsz7jt/4jd7jifnGy/DVh9X8gdHeidXMxNH/id/3gMj9gdH5HEBBTVNAWUOA3uBRFEJeU1BESYbg7YLNpJ/O7YbDx4b5xoveopbewIvG3obb+YveuZjO4obQ84zZ4onJoJbqzoXb/YvZ7YjJlZTM54D060E4Qk8eXxQXEwYQS1kDDwECSA0="
   },
   {
    "id": "Q4",
    "level": "基礎",
    "title": "排行榜：營收前 5 名商品",
    "task": "老闆問：「哪些商品最會賺？」請列出營收前 5 名的商品：商品名稱、銷量（quantity 加總）、營收（amount 加總）。依營收由高到低排序，營收相同時依商品名稱排序，只取 5 筆。",
    "cards": [
     "groupjoin",
     "grouporder",
     "orderby"
    ],
    "hints": [
     "商品名稱在 products，先 JOIN 再依商品名稱分組；排序寫兩層，最後 LIMIT 5。",
     "SELECT p.product_name AS 商品名稱,\n       SUM(o.quantity) AS 銷量,\n       SUM(o.amount) AS 營收\nFROM orders AS o\nINNER JOIN products AS p ON o.product_id = p.product_id\nGROUP BY p.product_name\nORDER BY 營收 DESC, ___\nLIMIT ___;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIjkq5Xh4Ibk5ITN309dD5n41orz5kFJTIr2spbm10EpRUETDwEESANQWzgvS4X87IjBt5fg0YfL9IX4wU9dHEJDTVBEW1ZVM0EqD5j1y4b//IXv9ornp5npyYb28UFJX11HAUFLUVtENE8+TIrHsZXi6YbU7IX78ov6kZfpxUFYWFZWQlxHFUNCPE8vS4Ts9YXzpJXK9IbE1YbV0k9dHENETVJCWlFVM0EqD5jO9Irz5ofb0YvlsZnpyYvVykFJX19CAUFGVlVEND4YQk8DSBZQW0EnLC8gLTlRXV4CEwwQHAARMQMQQBVSIDBUjPbji/7wyOD/hsvFRT8LTk1RDVBSQTAhJEsKQBwETB4GCBcNQEMkPU2Yp8eb5uxYNQ1FTk1RDVBSMjY5QQxLDwAeWB4GSEM1OkOC6fKXucYuDyUmJi5FAR8VSAIBQSInSQw5ACQ/YzUgQSk7IC1FHh8eSQURFRBUKDBFHk0+Y1AdTxMGBgcQDRkuRBRSXEMERxMXAQkETgQtCAcoByQ3ITghDTIrQRNaGREKChgSWS8cAA4RNQ0qPCk0f1AwOEOT7vyD+ttRaTUhIk9UjPbji/7wyOD/hsvFNQ0pJyA4eVBHWkFYSwYdHgEQRB5QWzhWj+33hsz9y9buhdv0jM3/hsvwyN/Zh9vxj8b/je39yc7vhdj0gNnZiOPjzvD/jt/ujuT6iPnHy/7gicL4jPHph+fGxPf9h+3mgcLpiff1yt3mh8L8jdvoitXxy9jRguP2S09HicHdycr+hNLQj+33i9f+wsz6hPbyjPDki/38ytjDjt/9j/vKie/Lycr0iOLzjOvVi/39yPj0h/r2ht/pidjhy+7uiMPyjNnqi/bLyN7oguP2S09HidjXxfDziPTyjvnhidjhxdvkjt/uj/rni93ryuLChdzpj/7Kieruy+TEQVBERVFQXk2UqPOb4Pqd6PqMzvWUqPid3fiT3/+A/uWUjfWU//+S4t+C9cmZntOX5tlUWFZWTonKkJPy4IXsxobs401EDZXi7IvXyIrv2YT2opbu4YbQ84T/6oLNoZTP54bix4bm14nMo5/O7YTz9oXx2Ij+h5b884TYxYfd547xr1IvTUEbGwcAHAgVD0oUAA8HDB4="
   },
   {
    "id": "Q5",
    "level": "進階",
    "title": "占比：各區域營收占幾 %",
    "task": "老闆問：「北、中、南各占多少生意？」請依門市區域（stores.region）列出：區域、營收（amount 加總）、占比（占全部營收的百分比，取到小數第 1 位，例如 48.1），依營收由高到低排序。",
    "cards": [
     "subselect",
     "groupjoin",
     "round"
    ],
    "hints": [
     "區域在 stores。占比 = 區域營收 × 100.0 ÷ 全部營收，「全部營收」用子查詢算。",
     "SELECT s.region AS 區域,\n       SUM(o.amount) AS 營收,\n       ROUND(SUM(o.amount) * 100.0 / (SELECT SUM(amount) FROM ___), 1) AS 占比\nFROM orders AS o\nINNER JOIN stores AS s ON o.store_id = s.store_id\nGROUP BY s.region\nORDER BY 營收 DESC;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIj8rZXt/kFYS4Ti8Yvlm1JeQ4b5yYXK+k8sAVIEAA8BDBBHVDYqD5X+9or3wUFJV15IH0BeVVtaWD5JNU+UoOeb4stWRVVVW1lEAUNDPE8vS4fdw4TyhVJeVVNMWVZJXF1fFC0vHE9WGwYDTFdTfjU+JCAgSRBLHAgWRB8cQSInSYbo7ojuslwuD0NUSUNFTk0ieD1aDk0VBAwQABlYDTEhQYTz9oXx2EEtQ1BSQUNUSUM3ITg/aVghNC5cBk0EAwIEQwRbQUlUWFNVQF1RAlBaMiY4LCAxTj4kYFgTDAwBBxdMTisjYj1SDhEQDBEWR0FRHFlSIDBUjO7FiMLlcR40Myw5SQwXCggDXlAzMkMbNQ0sICM0f1A4Lio6SRARAR8UXlAzMkMHSSwrTgJfXgQdEwYrAAdFU00CAwMGDhERNgoBMgM2fz8nMUM2MEMWQB8UShkdDz8aJjEhKz9RbylShuTrj/fTTik0fjNJQ09WDBsVAgwYQ1JIOkGc6eKM+euYreqX2duS8teA8sWXqf+R4e+R5MOAyveUneGR4e6c6e+B1uCXtd+R4e+RzfmA3vyYodKR4e6b1fmA482XguSU6+mQ0e6A/uGUideX0eyT8+eD+9WUgOeU9d2R4dOA/uGVlfCU6+mR2dmB1ueXguSa3eCX6eFHQk+UpfaUzu6T/cuAw/2XstWayMGTx/SK0uGZnveU9/qS8teD+N2XtPKX7MOSxveB1/KXsfOa1vyc+PSDw86Wj8qR4eFWRUGC28uZrfGb9uWT8+eC2/2Zhuad3fmR5fSM7cWWqu+U9dVUUFBJV19BDZX34ozI5Ybozoj0hZnxyYTu7UNRVkNACJ/O7YbE7ova/4nJrZX/64zI8ofdw4TyhZX9y4b5yUNXXkNICJPy40EpRUEKHAkUXxUWQ1kSCA8WCxA="
   },
   {
    "id": "Q6",
    "level": "進階",
    "title": "客群：哪種職業的會員最會花？",
    "task": "老闆問：「哪一種客人最值得經營？」請依會員職業（customers.occupation）列出：職業、會員數（不重複的會員）、消費總額、人均消費（消費總額 ÷ 會員數，四捨五入到整數），依人均消費由高到低排序。",
    "cards": [
     "groupjoin",
     "countdistinct",
     "round"
    ],
    "hints": [
     "JOIN 之後每位會員會出現很多列，會員數要用 COUNT(DISTINCT c.customer_id)；人均 = SUM ÷ 會員數，乘 1.0 避免整數除法。",
     "SELECT c.occupation AS 職業,\n       COUNT(DISTINCT c.customer_id) AS 會員數,\n       SUM(o.amount) AS 消費總額,\n       ROUND(SUM(o.amount) * 1.0 / COUNT(DISTINCT ___)) AS 人均消費\nFROM orders AS o\nINNER JOIN customers AS c ON o.customer_id = c.customer_id\nGROUP BY c.occupation\nORDER BY ___ DESC;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIXwmpbXzEFYS4X57YjijJbn2UFYS4XT5oXDlpfK3IrV5EFJTInLl5Xv5oXC4YvX1U8sAVIEAA8BDBBHVDYqD5f0/orJyIXy4U9dHkFeV1dNUFZJXF1IGi1eOkGRxNuC+vJTAUJHTVdNWlVVQlxIGkQvTThWjdvvieLcy+f9Q09GXU9RWlRGGFxDWVRANE8+TIX2h5fm0IXRxEFJXF1dHkVLVVNYWFRcWTAsUFxQEwYSS1lHPSg9aDMmQQBaBgAGGx0QWRkdD0M1OkON79qXiN1ePQ1USUNFTk1Rbj8nLzdcLSo2OiQ/biRSAk0XHBARAQAUXy8bBUpUKDBFiPHyyOPTh/bMRT8LTk1RDVBSQTAhJEsKQAwcQgUcFUpUKDBFiNv5xcLJhtvJgMLoQjEfDVBSQUNUSTEqOyM1BSMnLEsbRwIIARgfWVlSS0NFR1NFQU0yYiU8NUswIDAxJyMyeVARTwABGhcKAwgDchkWSEpUKDBFitfLyO31h9X8gdHeMgM3fz8/QQwGDQYXHU0wflAdPQ09Jy0gPE07Yjk8QQABGhcKAwgDXlAzMkMXSSwrTgJfTgUBFQwZDBE6BwlREFARTwABGhcKAwgDchkWPQ0zOywwPk0zdFARTwwXChYVDxkYQh4uDywmLSY3Ti8oDZTI24bp7oXT5oXDllA2JDA3UkFJTAgJXRwTCA1WUzhHitfLy+XKhdv5jPPpiff1ys7WhtbwjvjRiOPUy9/mhtvJgMLoitX8yPXehNrHht/phsvwy//ph+vkiuPpitfLyO31guP5j+rohu7My9/mid/3iuPnTEFTZz87L0OQ0OiA0OGWudhSIiwhJzdNRERRy+XKhOvEjvnhiPXexdjwhPXaj/bdgdHqxdbzh/bMjdnfitXxyN7oicX1SSAqOyMlBTQ7Mjc9JyAxR47xr1JeQ4TBz4vl74Tmq5fo5YTB+YvO+ILNt5f0/orJyIXy4YnLl5Xv5oXC4YvX1U1DAUBLVkOR7OCD8u2Yhuid3e+S9eCA/cyXuMiW2PyS9eOAyveekfhBUEOQ1O6K0uSekfyU+cyS9eOA7tGUk+eV1/CT7vyC9OmUg9KV38eX6eFHM0FTQgIWBBERDUFfCAwdXhUP"
   },
   {
    "id": "Q7",
    "level": "進階",
    "title": "天氣：哪家門市最吃雨天生意？",
    "task": "老闆問：「下雨天時，哪家門市的生意最依賴雨天？」請依門市名稱列出：門市名稱、訂單數、雨天訂單（weather 為「下雨」的訂單數）、雨天占比（雨天訂單 ÷ 訂單數 × 100，取到小數第 1 位）。依雨天占比由高到低排序，占比相同時依門市名稱排序。",
    "cards": [
     "caseagg",
     "groupjoin",
     "round"
    ],
    "hints": [
     "雨天訂單用 SUM(CASE WHEN o.weather = '下雨' THEN 1 ELSE 0 END)；占比再除以 COUNT(*)。",
     "SELECT s.store_name AS 門市名稱,\n       COUNT(*) AS 訂單數,\n       SUM(CASE WHEN o.weather = '___' THEN 1 ELSE 0 END) AS 雨天訂單,\n       ROUND(SUM(CASE WHEN o.weather = '___' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) AS 雨天占比\nFROM orders AS o\nINNER JOIN stores AS s ON o.store_id = s.store_id\nGROUP BY s.store_name\nORDER BY 雨天占比 DESC, ___;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TITnrZXK44bk5ITN309dD5ja44bix4Xw1k9dD5npyYbQwIvN7Ijng1JeQ4rvwYbBx4j8jZbd9UEpRUETDwEESANQWzgvS4bq3oj9upTNwITKwIXy+YX4i5XI9kFYUFZJXF9dH0NcUz5YMkGD89KXhPuX2/+Q0c6A1PpTAUFDUE9FUE9UWUNAcFwpQ4rf8Yr+6ojGhZjp6obO/kFJV1hdHEZeUFVaUT5JNU+UosCW2c6R7M+C9eeUl+dQTVJEXU9UWEFAGF5GPE8vS4Xz3oralJfV8IbZ0Yb5/Ij8rZXI9kFYUFBJX1ldHEVcUD5YMkGA4d2Vld2b4cGT/dGA1PpTAUFDUU9FX09UWkNEcFwpQ4b72Ybo+Yv5vZXWxobO/kFJX1xBAUFETVJAR1Y4QjZTxNvqiPjwjdvsi8nryMrlQ09FWVdJX1hdHERcVT5YMkGDz+6UseKW2c6RysGA1PpTAUhCTVJFRVJWQFUsAStQhOzEjO/yicboyPn/hNnjS09cVkFAHFxDUE1GND4YQk8DSBZQW0EnLC8gLTlRXl4BFQwGDDwLDwAUDTEhQYri6Ybd7IjhoJfa0E8oB0NFTk1RDVAxLjY6PUtPR00wflCayeGR/82D+9VdcR5SQUNUSUNFPTg8BTMzMiZUPisgIE0eAwcXABccDBFFU01Wycj5iPjcTkMxJig/DUFSJC8nLENVTig/aVlSIDBUgPjNi8nYxdjwhPXaRT8LTk1RDVBSQTE7PC0hRj4kYFgxIDAxSTQtKyNRQl4FBAIAAQYXTlBRCpTK6orvwURFOiU0Y1BDQSY4OiZFXk00YzRbQUlUWFNVQF1RAlAxLjY6PUtPR0FRHFlSIDBUgPjNi8nYyP3Sh8zgNQ0jPCI8DR8ABQYGGkMkPU0ecR47Ly0xO0MvISQ/DQMGDhERGkMkPU0CDT88QQxaGhcKHAguRBRSXEMHRxARAR8UchkWPQ0zOywwPk0zdFABTxAABhEAMQMQQBUuDywmLSY3Ti8oDZnpyYbQwIbozoveuVA2JDA3RUOM+O2UlfKX8e6TwdJeTEFTSAgCDQIdB0FfNU8ybCM3QYXg14rl3E0ieD2d3e+R2dKN7dCUsdiX8e+Q0eOA4chRfiE+QYvXyIb14ovor5fc9oD05YbgxoTyhZPy7Ibm5YDl4ordi5Xi6YXW9Ife2IrrqZPy7IzI5Ybj44rqlZnrxYbK/obt3oj8jZbd9YD060FJTIj+nZTKzIr0y4Tx3IjLupXg7Yb72Ybo+Yv5vZXWxobO/oT/6oj8jZbd9Ybk5YTn1E1AGV5HRIzI5YXs7onKiJnu4YvS6ITJwonLoZXDxYX6+4bf4YXfvpnS54bO5ob+1Ijft5Py40FYS4TQyIXxrJnl54Tu7YTQ/oXau5/O+4b72Ybp+YnOjJfMyIXj/ovsyIjLupfo5YrvwYbBx4j8jZbd9UNGWk1XS02XsfCbyvub1e+A/uGUsdiX7tOR5fSA1u+Wt/SX7tOR5fSCxfSUpP2X2/SR5smD8uRRHEFcU0ab1e+M9cWUidmX4/qc28uB1uCZrs2X5Mud6suM+O2UlfKW2eOdwveM78SWudiR4eFWNE9HAR8VSAIXBUFODwIJHQgM"
   },
   {
    "id": "Q8",
    "level": "進階",
    "title": "時段 × 類別：哪些組合撐起營收？",
    "task": "老闆問：「什麼時段賣什麼最好？」請依「時段＋商品類別」分組，列出營收（amount 加總）達 10000 以上的組合：時段、類別、營收，依營收由高到低排序。",
    "cards": [
     "groupmulti",
     "having",
     "groupjoin"
    ],
    "hints": [
     "GROUP BY 放兩個欄位（o.time_slot, p.category）；「營收達 10000」是分組後的條件，用 HAVING。",
     "SELECT o.time_slot AS 時段,\n       p.category AS 類別,\n       SUM(o.amount) AS 營收\nFROM orders AS o\nINNER JOIN products AS p ON o.product_id = p.product_id\nGROUP BY o.time_slot, ___\nHAVING SUM(o.amount) >= ___\nORDER BY 營收 DESC;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIvor5bc1EFYS4rE8Ij5iFJeQ4Tz9oXx2E8sAVIEAA8BDBBHVDYqD5bF0IbQ9UFJTITqhZX31kyR+MuM7OdTAUFFV1ZENE8+TIvmhJbryUFYS4r+xoj0ml+X8Mud6+lHQlxEGkhCPE8vS4X89ITnvlJeQ4rvwYbg2UKUvNib4+lWRVJRV1pBcFwpQ4b54YrB/k9dD5npyYbx3kyA/8WYr/pQTVJAUVtVM0EqD5TK6ob54Yvp2E9dD5npyYbx3kyA/8WYr/pQTVJFWlJVM0EqD5br+4ri+kFJTITSn5Xh4EFYWFNSVl0sAStQh/Tdj/rNTEFTxNPAhPD1S09UXlxGHS0vHE9WGwYDTFdTfjU+JCAgSQxLGgQcSC8BDQwASSI2Tovor5bc1E8oB0NFTk1RDVACTwAVHQYCAR8IDTEhQYrV94bty0EtQ1BSQUNUSUM2OyBZQl4TDAwBBxdMTiwiDZf1/oXg3z8LKD8+YFAdEwcRGxBFLz5RQiwcKC06LDFFJCI4Y1ACEwwQHAARHU0wflACQSw6SQxLHh8eSQURFTwdDUNYTh1fXQIdBRYXHTwMCjEfaiI9NDNUKzpFAUMFRB0XPhAYBhdJTh1fThEGBAQbGxo5ACUwezk8JkMnPC5NAUMQQB8HDxddSV1YTlxBHUBCPQ07OycgPE0zdFCV5vyS/dVFKigibktQTUERERMJDwQfD0opQ1ZUjOPuiPTzy97HQaDjSVdFi+36xNHshOvRjObUiPH4DUJCQYTcx4TQ6ojhpZ/O7YbxwYrmxoj5upX124v06Iry6IrtppTK7Iba5YzZ9YrlhVA6IDU9JyRFi+LbyuXrhdv/gOTohsvwyur2htbwjPPtje3zD1xQhtbSgePkh/r3yur2htbkgcjzgdHryvfth/fCjOroitflyOD/hvnwjtbhi/35yPXah/vbgPjNi+jGApXjyYr244zZ4ovGnJXW/YTu7UNUWUFHGEBShOb3j//lh8bpwszpiMDGjPDki+Lby+z7h/rugPX2i//9y+fbh/rcjObMi+36y+nwh83BjdvviMvtzvDwQz5YSwwXCggDSBRQWwUVBRAAEw=="
   },
   {
    "id": "Q9",
    "level": "挑戰",
    "title": "排行榜＋占比：高於平均的門市",
    "task": "老闆問：「哪些門市的表現在平均以上？各占多少生意？」請列出營收高於「各門市營收平均值」的門市：門市名稱、營收、占比（占全部營收的百分比，取到小數第 1 位），依營收由高到低排序。",
    "cards": [
     "subhaving",
     "subfrom",
     "subselect",
     "groupjoin"
    ],
    "hints": [
     "占比的分母用 SELECT 裡的子查詢；「各門市營收的平均」放在 HAVING，用 FROM 子查詢先算出每家門市營收再取 AVG。",
     "SELECT s.store_name AS 門市名稱,\n       SUM(o.amount) AS 營收,\n       ROUND(SUM(o.amount) * 100.0 / (SELECT SUM(amount) FROM orders), 1) AS 占比\nFROM orders AS o\nINNER JOIN stores AS s ON o.store_id = s.store_id\nGROUP BY s.store_name\nHAVING SUM(o.amount) > (\n  SELECT AVG(t)\n  FROM (SELECT SUM(amount) AS t FROM orders GROUP BY ___)\n)\nORDER BY ___ DESC;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TITnrZXK44bk5ITN309dD5f1/oXg30FJTIj8jZbd9UEpRUETDwEESANQWzgvS4X40YvYppXI/YfMxIbf+U9dH0NEWFNYWFFLXzBddlKbyvud8ueB1uSUieqX2/RWRVFXXVhEAUFDT1cpRThHi+LBycjfiOPWjvfXi9fmD1xAUVpEWU9UXkNGcFwpQ4b72Ybo+Yv5vZXWxobO/kFJXF1BHUBeUFNaWz5JNU+UosCW2c6R7M+C9eeUl+dQTVJNUFNQQlxBA0IvPB5YSxEACE9LDyM3LSY3PUMWQB4FQgIXPg0VBAZFLz5RxObyhNv2jPPoicXAASwcQUNUSUNFTj4kYFgdTwIZBhYLGkRRbCNShuTrj/fTQjEfDVBSQUNUSTEqOyM1BSMnLEsbRwIIARgfWVlSS0NFWVNLXk1eDVghJC8xKjdFPTg8BREfDhYaHUpFKD8+YFAdEwcRGxBMQk1ABFAzMkOR5MODwfktQzYgLi5UBhEBCx8CDTEhQQwoByorICgjDTo9KC1UGhcKHAgCDTEhQRBUJi1FAUMCWR8ABDwdDUNYTh5fXgQdEwYrAAc5ACojYiUiQSEtSRBLHRkeXxUtDwIZDD8LJiwnZD41QTAhJEsKQAwcQgUcFUpUV0NNMgNRDSM3LSY3PUMkOCpZWVkuD0NULzEqI01ZfjU+JCAgSTAwI0UQQB8HDxddSSI2ThlRayI9LEMbGwcAHB5RaiI9NDNUKzpFHRkeXxUtCAddNQ1MMgM+fzQ3M0M2MEOC6fKXucZSJSYnKlhHQk8UVQAeAAoaS1k+TIjhoZTK4Yb7zEM2PyFRyuTahdnyjObMi+36yN3ih/zRgcrHgdHrfjU+JCAgSYvGz4rrqZfc9ob874XK44LNoTgzNyo6LkONzcyWt/SVz/SR0NCA8+qXhemU2/Wb1e+A/umWg9GX8eeT8+eG7u9TAVKV1MWc6eKM+euWt/SV1POcwvWK0vdAHVCXz9Wd/+OA1u+Vld2U/epUXEOAwNuYhuiU99+R0NCA8+qekfyU/NySwOiA1PGVld2X2/ST7vyD+ttRH0NeV1pESYbg7Y7xrJX/wUNFW01US02UnPWX58OX6eFHM0FTQgIWBBERDUFfCAwdXhUP"
   },
   {
    "id": "Q10",
    "level": "挑戰",
    "title": "客群：常客到底多會花？",
    "task": "老闆問：「常來的客人到底比偶爾來的多花多少？」請先算出每位會員的下單次數與消費總額，再分級：12 次以上為「常客」、8 次以上為「一般」、其他為「偶爾」。列出：等級、人數、平均消費（各級會員消費總額的平均，四捨五入到整數），依平均消費由高到低排序。",
    "cards": [
     "subfrom",
     "caseagg",
     "groupby",
     "round"
    ],
    "hints": [
     "內層 FROM 子查詢依 customer_id 算出次數與總額；外層用 CASE 把次數換成等級，再依等級分組。",
     "SELECT CASE WHEN 次數 >= 12 THEN '常客'\n            WHEN 次數 >= 8 THEN '一般'\n            ELSE '偶爾' END AS 等級,\n       COUNT(*) AS 人數,\n       ROUND(AVG(___)) AS 平均消費\nFROM (\n  SELECT customer_id, COUNT(*) AS 次數, SUM(amount) AS 總額\n  FROM orders\n  GROUP BY ___\n)\nGROUP BY 等級\nORDER BY 平均消費 DESC;"
    ],
    "secret": "FU8UVQAXAhcRDUFfFU8SQhwHDA0HS1k+TIrcpJfG+0FYS4ff1IvklVJeQ4bN2ob46YvHpZjA2kEpRUETDwEESANQWzgvS4bd1ojfj1JeU1pYW1tUXTBddlKW2eOc4c9HQllHAUFKWVUpRThHi+zHyvjMQ09GXE9UXlpJcC0PTUEGDAVHVE8iaDw3IjdUKiI2K00mZTU8QYXYyIXw1k1PEFBDU0MgISYrTkqUlciXz8FTNQ1FTk1RDVBSQUNUSUMyJig/DZbewIXh0UNbU01JDSQ6JC1UTofd7oX5gVcuD0NUSUNFTk1RDVBSQSY4OiZFSYjwm5f630RULC0hTiwiDZff6ITA8085AE1RDVBSQUM3JjYrOkVbBFAzMkOQ09mD+9VdcR5SQUNUSUNFPCIkYzRaIDUzQYTd04TQoFlbQSInSYbc3YjsqpbE6YvG0j8LKD8+YFBaPQ1USTAgIigyeVARFBAABg4AHDIYSVxSIiwhJzdNRERRbCNSh8/Vj/bdQk0ieD1aAA4bHA0RR00wflCV2d6dyO45AE1RayI9LEMbGwcAHB4tQ1BSJjE7PDNFLDRRTgUBFQwZDBE6BwktQ1kuDyQmJjY1Ti8oDZff6ITA8z8LIT81aCJSIzpUjNrWi/D2y8b6idHPSScgPS5KD1xQBBsEBQIMAE9LdlKX5MSR2MeA6+WUrOqX5tmX6e+DweKVkP2U/eCR+sKB1u2UpeeR4e6T8+eNz8WekfyXxfWR2MeA6OCUpfaV1fmT3NKNxuWekeqb4fqS8cxFOQgURlBDU0MyOywoTojcvZbtxIvdy4X57ojei5fmyYTu7YTxxovCuJPy40FYSyAkPShRyc7vhNn7jOvBiPvGwsz+icX1jObti8LaDU5PQVJGiuPki+v8yN/ZQV1JSVuG7u9TAVKV1MWc6eKM+euWt/SV1POcwvWK0veUlciXz8FUW1pFitD8zvDzhNrHjP7iiNv5xcLJQVFYUVJWToj0rp/O7Yb134Tt0InPq5fo5UNGXEOB0+CUlMOX/OSR5smD8uRRHFxCVltUjObmgdH9yP/dhdjRgePmiOjfyuTahPjqj9bki+nby/PSic3njOLTieXPyc70hvnwjM3HitfLyNTohd3yjNrbiMHQzvDwQz5YSwwXCggDSBRQWwUVBRAAEw=="
   }
  ]
 }
];
