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
 }
];
