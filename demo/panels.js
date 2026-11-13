// 由 build_web.js 產生，請勿手改
window.DEMO_PANELS = {
 "db": {
  "file": "kh_traffic.db",
  "hash": "a9835b4e21ea",
  "size": 45793280
 },
 "queries": {
  "src_count": {
   "sql": "SELECT 資料來源,\n       COUNT(*) AS 件數,\n       MIN(發生日期) AS 最早,\n       MAX(發生日期) AS 最晚\nFROM accidents\nGROUP BY 資料來源\nORDER BY 最早;",
   "expect": {
    "cols": [
     "資料來源",
     "件數",
     "最早",
     "最晚"
    ],
    "rows": [
     [
      "交通局A2A3",
      46213,
      "2019-01-01",
      "2019-07-31"
     ],
     [
      "警察局月報",
      270344,
      "2019-08-01",
      "2023-01-31"
     ]
    ]
   }
  },
  "src_districts": {
   "sql": "SELECT COUNT(*) AS 區數,\n       SUM(人口) AS 人口合計\nFROM districts;",
   "expect": {
    "cols": [
     "區數",
     "人口合計"
    ],
    "rows": [
     [
      38,
      2714509
     ]
    ]
   }
  },
  "ov_total": {
   "sql": "SELECT COUNT(*) AS 件數,\n       COUNT(DISTINCT 發生日期) AS 天數,\n       MIN(發生日期) AS 最早,\n       MAX(發生日期) AS 最晚\nFROM accidents;",
   "expect": {
    "cols": [
     "件數",
     "天數",
     "最早",
     "最晚"
    ],
    "rows": [
     [
      316557,
      1461,
      "2019-01-01",
      "2023-01-31"
     ]
    ]
   }
  },
  "src_sample": {
   "sql": "SELECT *\nFROM accidents\nWHERE 發生日期 = '2023-01-16' AND 事故類別 = 'A2' AND 行政區 = '三民區' AND 小時 = 17 AND 交岔路 IS NOT NULL AND 天候 IS NOT NULL\nORDER BY 事故編號\nLIMIT 1;",
   "expect": {
    "cols": [
     "事故編號",
     "發生日期",
     "發生時間",
     "年",
     "月",
     "小時",
     "星期",
     "事故類別",
     "行政區",
     "道路",
     "交岔路",
     "死亡人數",
     "受傷人數",
     "天候",
     "光線",
     "道路類別",
     "速限",
     "道路型態",
     "事故位置",
     "號誌種類",
     "事故類型",
     "資料來源"
    ],
    "rows": [
     [
      312382,
      "2023-01-16",
      "17:54",
      2023,
      1,
      17,
      "一",
      "A2",
      "三民區",
      "博愛一路",
      "博仁街",
      0,
      1,
      "晴",
      "夜間(或隧道、地下道、涵洞)有照明",
      "市區道路",
      50,
      "四岔路",
      "交岔路口內",
      "行車管制號誌",
      "追撞",
      "警察局月報"
     ]
    ]
   }
  },
  "src_district_sample": {
   "sql": "SELECT *\nFROM districts\nWHERE 行政區 IN ('三民區', '鳳山區', '鳥松區')\nORDER BY 人口 DESC;",
   "expect": {
    "cols": [
     "行政區",
     "分區",
     "人口"
    ],
    "rows": [
     [
      "鳳山區",
      "原高雄縣",
      352579
     ],
     [
      "三民區",
      "原高雄市",
      328444
     ],
     [
      "鳥松區",
      "原高雄縣",
      43535
     ]
    ]
   }
  },
  "ov_death": {
   "sql": "SELECT SUM(死亡人數) AS 死亡,\n       SUM(受傷人數) AS 受傷\nFROM accidents\nWHERE 資料來源 = '警察局月報';",
   "expect": {
    "cols": [
     "死亡",
     "受傷"
    ],
    "rows": [
     [
      632,
      190038
     ]
    ]
   }
  },
  "ov_year": {
   "sql": "SELECT 年,\n       COUNT(*) AS 件數,\n       COUNT(DISTINCT 月) AS 月數,\n       ROUND(COUNT(*) * 1.0 / COUNT(DISTINCT 月)) AS 月平均\nFROM accidents\nGROUP BY 年\nORDER BY 年;",
   "expect": {
    "cols": [
     "年",
     "件數",
     "月數",
     "月平均"
    ],
    "rows": [
     [
      2019,
      79897,
      12,
      6658
     ],
     [
      2020,
      72016,
      11,
      6547
     ],
     [
      2021,
      77455,
      12,
      6455
     ],
     [
      2022,
      79288,
      12,
      6607
     ],
     [
      2023,
      7901,
      1,
      7901
     ]
    ]
   }
  },
  "ov_cat": {
   "sql": "SELECT 事故類別,\n       COUNT(*) AS 件數\nFROM accidents\nGROUP BY 事故類別\nORDER BY 事故類別;",
   "expect": {
    "cols": [
     "事故類別",
     "件數"
    ],
    "rows": [
     [
      "A1",
      622
     ],
     [
      "A2",
      159391
     ],
     [
      "A3",
      156544
     ]
    ]
   }
  },
  "t3_monthly": {
   "sql": "SELECT 年,\n       月,\n       COUNT(*) AS 件數\nFROM accidents\nGROUP BY 年, 月\nORDER BY 年, 月;",
   "expect": {
    "cols": [
     "年",
     "月",
     "件數"
    ],
    "rows": [
     [
      2019,
      1,
      7605
     ],
     [
      2019,
      2,
      6099
     ],
     [
      2019,
      3,
      6814
     ],
     [
      2019,
      4,
      6568
     ],
     [
      2019,
      5,
      6275
     ],
     [
      2019,
      6,
      6462
     ],
     [
      2019,
      7,
      6390
     ],
     [
      2019,
      8,
      6230
     ],
     [
      2019,
      9,
      6013
     ],
     [
      2019,
      10,
      6545
     ],
     [
      2019,
      11,
      6950
     ],
     [
      2019,
      12,
      7946
     ],
     [
      2020,
      1,
      7680
     ],
     [
      2020,
      2,
      5912
     ],
     [
      2020,
      3,
      6087
     ],
     [
      2020,
      4,
      5901
     ],
     [
      2020,
      5,
      6815
     ],
     [
      2020,
      6,
      7057
     ],
     [
      2020,
      7,
      6860
     ],
     [
      2020,
      8,
      6683
     ],
     [
      2020,
      9,
      6133
     ],
     [
      2020,
      10,
      6340
     ],
     [
      2020,
      11,
      6548
     ],
     [
      2021,
      1,
      8107
     ],
     [
      2021,
      2,
      6314
     ],
     [
      2021,
      3,
      6223
     ],
     [
      2021,
      4,
      6110
     ],
     [
      2021,
      5,
      6356
     ],
     [
      2021,
      6,
      5210
     ],
     [
      2021,
      7,
      5769
     ],
     [
      2021,
      8,
      6533
     ],
     [
      2021,
      9,
      6327
     ],
     [
      2021,
      10,
      6373
     ],
     [
      2021,
      11,
      6626
     ],
     [
      2021,
      12,
      7507
     ],
     [
      2022,
      1,
      7729
     ],
     [
      2022,
      2,
      5601
     ],
     [
      2022,
      3,
      6407
     ],
     [
      2022,
      4,
      6190
     ],
     [
      2022,
      5,
      6181
     ],
     [
      2022,
      6,
      5208
     ],
     [
      2022,
      7,
      6991
     ],
     [
      2022,
      8,
      6917
     ],
     [
      2022,
      9,
      6590
     ],
     [
      2022,
      10,
      6502
     ],
     [
      2022,
      11,
      6838
     ],
     [
      2022,
      12,
      8134
     ],
     [
      2023,
      1,
      7901
     ]
    ]
   }
  },
  "ov_null": {
   "sql": "SELECT 資料來源,\n       事故類別,\n       COUNT(*) AS 件數,\n       SUM(天候 IS NULL) AS 天候空白\nFROM accidents\nGROUP BY 資料來源, 事故類別\nORDER BY 1, 2;",
   "expect": {
    "cols": [
     "資料來源",
     "事故類別",
     "件數",
     "天候空白"
    ],
    "rows": [
     [
      "交通局A2A3",
      "A2",
      24696,
      0
     ],
     [
      "交通局A2A3",
      "A3",
      21517,
      3008
     ],
     [
      "警察局月報",
      "A1",
      622,
      0
     ],
     [
      "警察局月報",
      "A2",
      134695,
      0
     ],
     [
      "警察局月報",
      "A3",
      135027,
      134180
     ]
    ]
   }
  },
  "t6_cross_null": {
   "sql": "SELECT COUNT(*) AS 全部,\n       SUM(交岔路 IS NULL) AS 沒填交岔路,\n       ROUND(SUM(交岔路 IS NULL) * 100.0 / COUNT(*), 1) AS 沒填占比\nFROM accidents;",
   "expect": {
    "cols": [
     "全部",
     "沒填交岔路",
     "沒填占比"
    ],
    "rows": [
     [
      316557,
      141762,
      44.8
     ]
    ]
   }
  },
  "t1_hour": {
   "sql": "SELECT 小時,\n       COUNT(*) AS 件數\nFROM accidents\nGROUP BY 小時\nORDER BY 小時;",
   "expect": {
    "cols": [
     "小時",
     "件數"
    ],
    "rows": [
     [
      0,
      2863
     ],
     [
      1,
      1640
     ],
     [
      2,
      1188
     ],
     [
      3,
      961
     ],
     [
      4,
      1067
     ],
     [
      5,
      1727
     ],
     [
      6,
      5296
     ],
     [
      7,
      22622
     ],
     [
      8,
      21464
     ],
     [
      9,
      18236
     ],
     [
      10,
      19400
     ],
     [
      11,
      21786
     ],
     [
      12,
      19695
     ],
     [
      13,
      16640
     ],
     [
      14,
      18048
     ],
     [
      15,
      20069
     ],
     [
      16,
      22585
     ],
     [
      17,
      28172
     ],
     [
      18,
      22775
     ],
     [
      19,
      16126
     ],
     [
      20,
      11807
     ],
     [
      21,
      10140
     ],
     [
      22,
      7674
     ],
     [
      23,
      4576
     ]
    ]
   }
  },
  "t1_slot_rate": {
   "sql": "SELECT CASE WHEN 小時 < 6 THEN '深夜' WHEN 小時 IN (7,8,17,18) THEN '上下班' ELSE '其他' END AS 時段,\n       COUNT(*) AS 傷亡事故,\n       SUM(死亡人數) AS 死亡,\n       ROUND(SUM(死亡人數) * 1000.0 / COUNT(*), 1) AS 每千件死亡\nFROM accidents\nWHERE 資料來源 = '警察局月報' AND 事故類別 <> 'A3'\nGROUP BY 時段;",
   "expect": {
    "cols": [
     "時段",
     "傷亡事故",
     "死亡",
     "每千件死亡"
    ],
    "rows": [
     [
      "上下班",
      43071,
      159,
      3.7
     ],
     [
      "其他",
      87772,
      393,
      4.5
     ],
     [
      "深夜",
      4474,
      80,
      17.9
     ]
    ]
   }
  },
  "t1_type_share": {
   "sql": "SELECT CASE WHEN 小時 < 6 THEN '深夜' WHEN 小時 IN (7,8,17,18) THEN '上下班' ELSE '其他' END AS 時段,\n       ROUND(SUM(事故類型 = '路上翻車、摔倒') * 100.0 / COUNT(*), 1) AS 翻車摔倒,\n       ROUND(SUM(事故類型 = '撞動物') * 100.0 / COUNT(*), 1) AS 撞動物,\n       ROUND(SUM(事故類型 = '撞路樹、電桿') * 100.0 / COUNT(*), 1) AS 撞路樹電桿\nFROM accidents\nWHERE 資料來源 = '警察局月報' AND 事故類別 <> 'A3' AND 事故類型 IS NOT NULL\nGROUP BY 時段;",
   "expect": {
    "cols": [
     "時段",
     "翻車摔倒",
     "撞動物",
     "撞路樹電桿"
    ],
    "rows": [
     [
      "上下班",
      5.9,
      1,
      0.3
     ],
     [
      "其他",
      6.8,
      0.9,
      0.5
     ],
     [
      "深夜",
      13.3,
      3,
      2.7
     ]
    ]
   }
  },
  "t1_night_weekday": {
   "sql": "SELECT 星期,\n       COUNT(*) AS 件數\nFROM accidents\nWHERE 資料來源 = '警察局月報' AND 事故類別 <> 'A3' AND 小時 < 6\nGROUP BY 星期;",
   "expect": {
    "cols": [
     "星期",
     "件數"
    ],
    "rows": [
     [
      "一",
      562
     ],
     [
      "三",
      600
     ],
     [
      "二",
      516
     ],
     [
      "五",
      642
     ],
     [
      "六",
      756
     ],
     [
      "四",
      582
     ],
     [
      "日",
      816
     ]
    ]
   }
  },
  "t1_self_rate": {
   "sql": "SELECT CASE WHEN 小時 < 6 THEN '深夜' ELSE '其他時段' END AS 時段,\n       CASE WHEN 事故類型 IN ('路上翻車、摔倒','撞路樹、電桿','撞護欄(樁)','撞交通島','撞號誌、標誌桿','撞橋樑、建築物','撞非固定設施','撞工程施工','撞動物') THEN '自撞' ELSE '與他車或行人' END AS 型態,\n       COUNT(*) AS 傷亡事故,\n       SUM(死亡人數) AS 死亡,\n       ROUND(SUM(死亡人數) * 1000.0 / COUNT(*), 1) AS 每千件死亡\nFROM accidents\nWHERE 資料來源 = '警察局月報' AND 事故類別 <> 'A3' AND 事故類型 IS NOT NULL\nGROUP BY 時段, 型態;",
   "expect": {
    "cols": [
     "時段",
     "型態",
     "傷亡事故",
     "死亡",
     "每千件死亡"
    ],
    "rows": [
     [
      "其他時段",
      "自撞",
      11782,
      97,
      8.2
     ],
     [
      "其他時段",
      "與他車或行人",
      119061,
      455,
      3.8
     ],
     [
      "深夜",
      "自撞",
      1110,
      36,
      32.4
     ],
     [
      "深夜",
      "與他車或行人",
      3363,
      44,
      13.1
     ]
    ]
   }
  },
  "t1_night_area": {
   "sql": "SELECT d.分區,\n       COUNT(*) AS 傷亡事故,\n       SUM(a.死亡人數) AS 死亡,\n       ROUND(SUM(a.死亡人數) * 1000.0 / COUNT(*), 1) AS 每千件死亡\nFROM accidents AS a\nINNER JOIN districts AS d ON a.行政區 = d.行政區\nWHERE a.資料來源 = '警察局月報' AND a.事故類別 <> 'A3' AND a.小時 < 6\nGROUP BY d.分區;",
   "expect": {
    "cols": [
     "分區",
     "傷亡事故",
     "死亡",
     "每千件死亡"
    ],
    "rows": [
     [
      "原高雄市",
      2419,
      24,
      9.9
     ],
     [
      "原高雄縣",
      2055,
      56,
      27.3
     ]
    ]
   }
  },
  "t2_hour_daytype": {
   "sql": "SELECT 小時,\n       ROUND(SUM(星期 NOT IN ('六','日')) * 1.0 / (\n         SELECT COUNT(DISTINCT 發生日期)\n         FROM accidents\n         WHERE 星期 NOT IN ('六','日')\n       ), 1) AS 平日每天,\n       ROUND(SUM(星期 IN ('六','日')) * 1.0 / (\n         SELECT COUNT(DISTINCT 發生日期)\n         FROM accidents\n         WHERE 星期 IN ('六','日')\n       ), 1) AS 假日每天\nFROM accidents\nGROUP BY 小時\nORDER BY 小時;",
   "expect": {
    "cols": [
     "小時",
     "平日每天",
     "假日每天"
    ],
    "rows": [
     [
      0,
      1.8,
      2.5
     ],
     [
      1,
      1,
      1.5
     ],
     [
      2,
      0.7,
      1.1
     ],
     [
      3,
      0.6,
      0.8
     ],
     [
      4,
      0.6,
      1
     ],
     [
      5,
      1.1,
      1.3
     ],
     [
      6,
      4,
      2.7
     ],
     [
      7,
      19.4,
      5.7
     ],
     [
      8,
      17.3,
      8.2
     ],
     [
      9,
      13.2,
      10.7
     ],
     [
      10,
      13.6,
      12.4
     ],
     [
      11,
      15,
      14.7
     ],
     [
      12,
      13.6,
      13.3
     ],
     [
      13,
      11.3,
      11.7
     ],
     [
      14,
      12.4,
      12.2
     ],
     [
      15,
      14.1,
      12.8
     ],
     [
      16,
      16.4,
      13.1
     ],
     [
      17,
      21.5,
      13.7
     ],
     [
      18,
      17,
      12.1
     ],
     [
      19,
      11.5,
      10
     ],
     [
      20,
      8.1,
      8
     ],
     [
      21,
      6.9,
      7
     ],
     [
      22,
      5.1,
      5.6
     ],
     [
      23,
      3,
      3.6
     ]
    ]
   }
  },
  "t2_17_month": {
   "sql": "SELECT 月,\n       ROUND(SUM(小時 = 17) * 1.0 / COUNT(DISTINCT 發生日期), 1) AS 每天17點件數\nFROM accidents\nGROUP BY 月\nORDER BY 月;",
   "expect": {
    "cols": [
     "月",
     "每天17點件數"
    ],
    "rows": [
     [
      1,
      20.4
     ],
     [
      2,
      16.8
     ],
     [
      3,
      17.3
     ],
     [
      4,
      18.4
     ],
     [
      5,
      19.7
     ],
     [
      6,
      18.8
     ],
     [
      7,
      19.5
     ],
     [
      8,
      19.4
     ],
     [
      9,
      18.3
     ],
     [
      10,
      17.9
     ],
     [
      11,
      21.7
     ],
     [
      12,
      23.9
     ]
    ]
   }
  },
  "t2_17_dark": {
   "sql": "SELECT 月,\n       COUNT(*) AS 件數,\n       ROUND(SUM(光線 <> '日間自然光線') * 100.0 / COUNT(*), 1) AS 天暗占比\nFROM accidents\nWHERE 資料來源 = '警察局月報' AND 事故類別 <> 'A3' AND 小時 = 17\nGROUP BY 月\nORDER BY 月;",
   "expect": {
    "cols": [
     "月",
     "件數",
     "天暗占比"
    ],
    "rows": [
     [
      1,
      1208,
      47.4
     ],
     [
      2,
      719,
      22.4
     ],
     [
      3,
      770,
      16.6
     ],
     [
      4,
      797,
      11.9
     ],
     [
      5,
      951,
      10.4
     ],
     [
      6,
      837,
      6.1
     ],
     [
      7,
      929,
      8.7
     ],
     [
      8,
      1109,
      14.2
     ],
     [
      9,
      991,
      20.6
     ],
     [
      10,
      1066,
      52.5
     ],
     [
      11,
      1287,
      68.9
     ],
     [
      12,
      1034,
      69.1
     ]
    ]
   }
  },
  "t2_dark_ped": {
   "sql": "SELECT CASE WHEN 光線 = '日間自然光線' THEN '天亮' ELSE '天暗' END AS 天色,\n       COUNT(*) AS 傷亡事故,\n       ROUND(SUM(事故類型 IN ('穿越道路中','同向通行中','對向通行中','在路上作業中','接近路中','停立路邊(外)','在路上嬉戲','從停車後(或中)穿出')) * 100.0 / COUNT(*), 1) AS 行人事故占比,\n       ROUND(SUM(死亡人數) * 1000.0 / COUNT(*), 1) AS 每千件死亡\nFROM accidents\nWHERE 資料來源 = '警察局月報' AND 事故類別 <> 'A3' AND 小時 IN (17, 18)\nGROUP BY 天色;",
   "expect": {
    "cols": [
     "天色",
     "傷亡事故",
     "行人事故占比",
     "每千件死亡"
    ],
    "rows": [
     [
      "天亮",
      9934,
      2.8,
      3
     ],
     [
      "天暗",
      10701,
      4.4,
      4.1
     ]
    ]
   }
  },
  "t3_june": {
   "sql": "SELECT 年,\n       COUNT(*) AS 件數,\n       SUM(事故類別 = 'A3') AS 只有財損,\n       SUM(事故類別 <> 'A3') AS 有人傷亡\nFROM accidents\nWHERE 月 = 6\nGROUP BY 年\nORDER BY 年;",
   "expect": {
    "cols": [
     "年",
     "件數",
     "只有財損",
     "有人傷亡"
    ],
    "rows": [
     [
      2019,
      6462,
      3294,
      3168
     ],
     [
      2020,
      7057,
      3468,
      3589
     ],
     [
      2021,
      5210,
      2295,
      2915
     ],
     [
      2022,
      5208,
      2845,
      2363
     ]
    ]
   }
  },
  "t3_daytype": {
   "sql": "SELECT CASE WHEN 星期 IN ('六','日') THEN '假日' ELSE '平日' END AS 日別,\n       SUM(年 = 2020) AS 件數2020,\n       SUM(年 = 2021) AS 件數2021,\n       ROUND((SUM(年 = 2021) - SUM(年 = 2020)) * 100.0 / SUM(年 = 2020), 1) AS 變化百分比\nFROM accidents\nWHERE 月 = 6 AND 年 IN (2020, 2021)\nGROUP BY 日別;",
   "expect": {
    "cols": [
     "日別",
     "件數2020",
     "件數2021",
     "變化百分比"
    ],
    "rows": [
     [
      "假日",
      1695,
      994,
      -41.4
     ],
     [
      "平日",
      5362,
      4216,
      -21.4
     ]
    ]
   }
  },
  "t3_slot": {
   "sql": "SELECT CASE WHEN 小時 < 6 THEN '深夜 0–5' WHEN 小時 IN (7,8,17,18) THEN '上下班' WHEN 小時 >= 19 THEN '晚上 19–23' ELSE '白天其他' END AS 時段,\n       SUM(年 = 2020) AS 件數2020,\n       SUM(年 = 2021) AS 件數2021,\n       ROUND((SUM(年 = 2021) - SUM(年 = 2020)) * 100.0 / SUM(年 = 2020), 1) AS 變化百分比\nFROM accidents\nWHERE 月 = 6 AND 年 IN (2020, 2021)\nGROUP BY 時段;",
   "expect": {
    "cols": [
     "時段",
     "件數2020",
     "件數2021",
     "變化百分比"
    ],
    "rows": [
     [
      "上下班",
      2114,
      1576,
      -25.4
     ],
     [
      "晚上 19–23",
      1069,
      672,
      -37.1
     ],
     [
      "深夜 0–5",
      189,
      114,
      -39.7
     ],
     [
      "白天其他",
      3685,
      2848,
      -22.7
     ]
    ]
   }
  },
  "t4_area": {
   "sql": "SELECT d.分區,\n       COUNT(*) AS 件數,\n       SUM(a.死亡人數) AS 死亡,\n       ROUND(SUM(a.死亡人數) * 1000.0 / COUNT(*), 2) AS 每千件死亡\nFROM accidents AS a\nINNER JOIN districts AS d ON a.行政區 = d.行政區\nWHERE a.資料來源 = '警察局月報'\nGROUP BY d.分區;",
   "expect": {
    "cols": [
     "分區",
     "件數",
     "死亡",
     "每千件死亡"
    ],
    "rows": [
     [
      "原高雄市",
      152237,
      211,
      1.39
     ],
     [
      "原高雄縣",
      118107,
      421,
      3.56
     ]
    ]
   }
  },
  "t4_speed_rate": {
   "sql": "SELECT CASE WHEN 速限 <= 40 THEN '40 以下' WHEN 速限 = 50 THEN '50' ELSE '60 以上' END AS 速限,\n       COUNT(*) AS 傷亡事故,\n       SUM(死亡人數) AS 死亡,\n       ROUND(SUM(死亡人數) * 1000.0 / COUNT(*), 1) AS 每千件死亡\nFROM accidents\nWHERE 資料來源 = '警察局月報' AND 事故類別 <> 'A3' AND 速限 IS NOT NULL\nGROUP BY 1;",
   "expect": {
    "cols": [
     "速限",
     "傷亡事故",
     "死亡",
     "每千件死亡"
    ],
    "rows": [
     [
      "40 以下",
      61369,
      218,
      3.6
     ],
     [
      "50",
      65658,
      320,
      4.9
     ],
     [
      "60 以上",
      7104,
      94,
      13.2
     ]
    ]
   }
  },
  "t4_speed_share": {
   "sql": "SELECT d.分區,\n       COUNT(*) AS 傷亡事故,\n       ROUND(SUM(a.速限 >= 60) * 100.0 / COUNT(*), 1) AS 速限60以上占比\nFROM accidents AS a\nINNER JOIN districts AS d ON a.行政區 = d.行政區\nWHERE a.資料來源 = '警察局月報' AND a.事故類別 <> 'A3' AND a.速限 IS NOT NULL\nGROUP BY d.分區;",
   "expect": {
    "cols": [
     "分區",
     "傷亡事故",
     "速限60以上占比"
    ],
    "rows": [
     [
      "原高雄市",
      69735,
      1.7
     ],
     [
      "原高雄縣",
      64396,
      9.1
     ]
    ]
   }
  },
  "t4_speed_area": {
   "sql": "SELECT CASE WHEN a.速限 <= 40 THEN '40 以下' WHEN a.速限 = 50 THEN '50' ELSE '60 以上' END AS 速限,\n       d.分區,\n       COUNT(*) AS 傷亡事故,\n       SUM(a.死亡人數) AS 死亡,\n       ROUND(SUM(a.死亡人數) * 1000.0 / COUNT(*), 1) AS 每千件死亡\nFROM accidents AS a\nINNER JOIN districts AS d ON a.行政區 = d.行政區\nWHERE a.資料來源 = '警察局月報' AND a.事故類別 <> 'A3' AND a.速限 IS NOT NULL\nGROUP BY 1, d.分區;",
   "expect": {
    "cols": [
     "速限",
     "分區",
     "傷亡事故",
     "死亡",
     "每千件死亡"
    ],
    "rows": [
     [
      "40 以下",
      "原高雄市",
      36772,
      83,
      2.3
     ],
     [
      "40 以下",
      "原高雄縣",
      24597,
      135,
      5.5
     ],
     [
      "50",
      "原高雄市",
      31746,
      116,
      3.7
     ],
     [
      "50",
      "原高雄縣",
      33912,
      204,
      6
     ],
     [
      "60 以上",
      "原高雄市",
      1217,
      12,
      9.9
     ],
     [
      "60 以上",
      "原高雄縣",
      5887,
      82,
      13.9
     ]
    ]
   }
  },
  "t5_top": {
   "sql": "SELECT 行政區,\n       COUNT(*) AS 件數,\n       ROUND(COUNT(*) * 100.0 / (\n         SELECT COUNT(*)\n         FROM accidents\n       ), 1) AS 占比\nFROM accidents\nGROUP BY 行政區\nORDER BY 件數 DESC\nLIMIT 10;",
   "expect": {
    "cols": [
     "行政區",
     "件數",
     "占比"
    ],
    "rows": [
     [
      "三民區",
      41624,
      13.1
     ],
     [
      "鳳山區",
      39072,
      12.3
     ],
     [
      "左營區",
      25838,
      8.2
     ],
     [
      "苓雅區",
      22545,
      7.1
     ],
     [
      "前鎮區",
      22310,
      7
     ],
     [
      "楠梓區",
      19223,
      6.1
     ],
     [
      "大寮區",
      17123,
      5.4
     ],
     [
      "仁武區",
      15293,
      4.8
     ],
     [
      "小港區",
      14359,
      4.5
     ],
     [
      "鼓山區",
      13687,
      4.3
     ]
    ]
   }
  },
  "t5_percap": {
   "sql": "SELECT a.行政區,\n       d.人口,\n       COUNT(*) AS 件數,\n       ROUND(COUNT(*) * 10000.0 / d.人口) AS 每萬人件數\nFROM accidents AS a\nINNER JOIN districts AS d ON a.行政區 = d.行政區\nGROUP BY a.行政區\nORDER BY 每萬人件數 DESC;",
   "expect": {
    "cols": [
     "行政區",
     "人口",
     "件數",
     "每萬人件數"
    ],
    "rows": [
     [
      "鳥松區",
      43535,
      8939,
      2053
     ],
     [
      "前金區",
      27637,
      5647,
      2043
     ],
     [
      "新興區",
      49404,
      9547,
      1932
     ],
     [
      "大寮區",
      112078,
      17123,
      1528
     ],
     [
      "仁武區",
      100482,
      15293,
      1522
     ],
     [
      "燕巢區",
      28304,
      4161,
      1470
     ],
     [
      "苓雅區",
      160785,
      22545,
      1402
     ],
     [
      "大社區",
      33630,
      4711,
      1401
     ],
     [
      "岡山區",
      94452,
      12645,
      1339
     ],
     [
      "左營區",
      197730,
      25838,
      1307
     ],
     [
      "三民區",
      328444,
      41624,
      1267
     ],
     [
      "前鎮區",
      176394,
      22310,
      1265
     ],
     [
      "鹽埕區",
      21814,
      2607,
      1195
     ],
     [
      "橋頭區",
      43386,
      5138,
      1184
     ],
     [
      "鳳山區",
      352579,
      39072,
      1108
     ],
     [
      "旗山區",
      33281,
      3560,
      1070
     ],
     [
      "路竹區",
      48767,
      5076,
      1041
     ],
     [
      "楠梓區",
      195637,
      19223,
      983
     ],
     [
      "鼓山區",
      140534,
      13687,
      974
     ],
     [
      "湖內區",
      29236,
      2788,
      954
     ],
     [
      "小港區",
      153161,
      14359,
      938
     ],
     [
      "大樹區",
      39715,
      3055,
      769
     ],
     [
      "阿蓮區",
      26674,
      1999,
      749
     ],
     [
      "六龜區",
      11193,
      774,
      692
     ],
     [
      "桃源區",
      4185,
      285,
      681
     ],
     [
      "永安區",
      13431,
      900,
      670
     ],
     [
      "梓官區",
      34578,
      2268,
      656
     ],
     [
      "林園區",
      67199,
      4343,
      646
     ],
     [
      "美濃區",
      35965,
      2025,
      563
     ],
     [
      "彌陀區",
      17687,
      925,
      523
     ],
     [
      "茄萣區",
      28617,
      1462,
      511
     ],
     [
      "旗津區",
      24729,
      1260,
      510
     ],
     [
      "田寮區",
      6069,
      251,
      414
     ],
     [
      "內門區",
      12493,
      481,
      385
     ],
     [
      "甲仙區",
      5233,
      183,
      350
     ],
     [
      "杉林區",
      10503,
      356,
      339
     ],
     [
      "那瑪夏區",
      3103,
      65,
      209
     ],
     [
      "茂林區",
      1865,
      32,
      172
     ]
    ]
   }
  },
  "t5_city": {
   "sql": "SELECT ROUND(COUNT(*) * 10000.0 / (\n  SELECT SUM(人口)\n  FROM districts\n)) AS 全市每萬人件數\nFROM accidents;",
   "expect": {
    "cols": [
     "全市每萬人件數"
    ],
    "rows": [
     [
      1166
     ]
    ]
   }
  },
  "t6_road": {
   "sql": "SELECT 行政區,\n       道路,\n       COUNT(*) AS 件數\nFROM accidents\nWHERE 道路 IS NOT NULL\nGROUP BY 行政區, 道路\nORDER BY 件數 DESC\nLIMIT 10;",
   "expect": {
    "cols": [
     "行政區",
     "道路",
     "件數"
    ],
    "rows": [
     [
      "三民區",
      "民族一路",
      3776
     ],
     [
      "三民區",
      "九如一路",
      3643
     ],
     [
      "苓雅區",
      "中正一路",
      3072
     ],
     [
      "仁武區",
      "鳳仁路",
      2550
     ],
     [
      "前鎮區",
      "中山四路",
      2209
     ],
     [
      "左營區",
      "翠華路",
      2047
     ],
     [
      "苓雅區",
      "建國一路",
      1910
     ],
     [
      "鳳山區",
      "建國路",
      1882
     ],
     [
      "左營區",
      "民族一路",
      1854
     ],
     [
      "三民區",
      "大順二路",
      1814
     ]
    ]
   }
  },
  "t6_road_avg": {
   "sql": "SELECT COUNT(*) AS 道路數,\n       ROUND(AVG(件數), 1) AS 平均件數\nFROM (\n  SELECT 行政區,\n         道路,\n         COUNT(*) AS 件數\n  FROM accidents\n  WHERE 道路 IS NOT NULL\n  GROUP BY 行政區, 道路\n);",
   "expect": {
    "cols": [
     "道路數",
     "平均件數"
    ],
    "rows": [
     [
      5104,
      61.9
     ]
    ]
   }
  },
  "t6_commute": {
   "sql": "SELECT ROUND(SUM(小時 IN (7,8,17,18)) * 100.0 / COUNT(*), 1) AS 民族一路上下班占比,\n       (\n         SELECT ROUND(SUM(小時 IN (7,8,17,18)) * 100.0 / COUNT(*), 1)\n         FROM accidents\n       ) AS 全市上下班占比\nFROM accidents\nWHERE 行政區 = '三民區' AND 道路 = '民族一路';",
   "expect": {
    "cols": [
     "民族一路上下班占比",
     "全市上下班占比"
    ],
    "rows": [
     [
      29,
      30
     ]
    ]
   }
  },
  "t6_type_road": {
   "sql": "SELECT 事故類型,\n       COUNT(*) AS 件數,\n       ROUND(COUNT(*) * 100.0 / (\n         SELECT COUNT(*)\n         FROM accidents\n         WHERE 行政區 = '三民區' AND 道路 = '民族一路' AND 事故類型 IS NOT NULL\n       ), 1) AS 占比\nFROM accidents\nWHERE 行政區 = '三民區' AND 道路 = '民族一路' AND 事故類型 IS NOT NULL\nGROUP BY 事故類型\nORDER BY 件數 DESC\nLIMIT 5;",
   "expect": {
    "cols": [
     "事故類型",
     "件數",
     "占比"
    ],
    "rows": [
     [
      "其他",
      544,
      25.7
     ],
     [
      "追撞",
      480,
      22.7
     ],
     [
      "側撞",
      424,
      20
     ],
     [
      "同向擦撞",
      346,
      16.4
     ],
     [
      "路口交岔撞",
      114,
      5.4
     ]
    ]
   }
  },
  "t6_type_city": {
   "sql": "SELECT 事故類型,\n       ROUND(COUNT(*) * 100.0 / (\n         SELECT COUNT(*)\n         FROM accidents\n         WHERE 事故類型 IS NOT NULL\n       ), 1) AS 占比\nFROM accidents\nWHERE 事故類型 IS NOT NULL\nGROUP BY 事故類型\nORDER BY 占比 DESC\nLIMIT 6;",
   "expect": {
    "cols": [
     "事故類型",
     "占比"
    ],
    "rows": [
     [
      "側撞",
      30.4
     ],
     [
      "其他",
      22.1
     ],
     [
      "追撞",
      13.1
     ],
     [
      "同向擦撞",
      10.6
     ],
     [
      "路口交岔撞",
      8.4
     ],
     [
      "路上翻車、摔倒",
      6
     ]
    ]
   }
  },
  "t6_cross": {
   "sql": "SELECT 行政區,\n       道路,\n       交岔路,\n       COUNT(*) AS 件數,\n       ROUND(SUM(事故類別 = 'A3') * 100.0 / COUNT(*), 1) AS 只有財損占比\nFROM accidents\nWHERE 交岔路 IS NOT NULL AND 道路 <> 交岔路\nGROUP BY 行政區, 道路, 交岔路\nORDER BY 件數 DESC\nLIMIT 10;",
   "expect": {
    "cols": [
     "行政區",
     "道路",
     "交岔路",
     "件數",
     "只有財損占比"
    ],
    "rows": [
     [
      "苓雅區",
      "中正一路",
      "高速公路西側便道",
      523,
      80.5
     ],
     [
      "苓雅區",
      "中正一路",
      "高速公路東側便道",
      421,
      86.9
     ],
     [
      "前鎮區",
      "中山四路",
      "中安路",
      356,
      73
     ],
     [
      "三民區",
      "九如一路",
      "高速公路西側便道",
      287,
      82.6
     ],
     [
      "三民區",
      "大中一路",
      "鼎中路",
      270,
      84.1
     ],
     [
      "苓雅區",
      "中正一路",
      "輔仁路",
      268,
      76.1
     ],
     [
      "前鎮區",
      "中山四路",
      "鎮海路",
      251,
      53
     ],
     [
      "前鎮區",
      "中山四路",
      "五甲三路",
      249,
      71.5
     ],
     [
      "苓雅區",
      "三多一路",
      "武營路",
      248,
      79.4
     ],
     [
      "楠梓區",
      "鳳楠路",
      "興西路",
      238,
      87.4
     ]
    ]
   }
  },
  "t7_weather": {
   "sql": "SELECT 天候,\n       COUNT(*) AS 傷亡事故,\n       SUM(死亡人數) AS 死亡,\n       ROUND(SUM(死亡人數) * 1000.0 / COUNT(*), 1) AS 每千件死亡\nFROM accidents\nWHERE 資料來源 = '警察局月報' AND 事故類別 <> 'A3' AND 天候 IN ('晴','陰','雨')\nGROUP BY 天候\nORDER BY 傷亡事故 DESC;",
   "expect": {
    "cols": [
     "天候",
     "傷亡事故",
     "死亡",
     "每千件死亡"
    ],
    "rows": [
     [
      "晴",
      119882,
      569,
      4.7
     ],
     [
      "雨",
      8017,
      35,
      4.4
     ],
     [
      "陰",
      7349,
      27,
      3.7
     ]
    ]
   }
  },
  "t7_rainday": {
   "sql": "SELECT CASE WHEN 雨占比 >= 0.5 THEN '雨天日' WHEN 雨占比 = 0 THEN '無雨日' ELSE '部分有雨' END AS 日別,\n       COUNT(*) AS 天數,\n       ROUND(AVG(傷亡事故), 1) AS 每天傷亡事故,\n       ROUND(SUM(死亡) * 1.0 / COUNT(*), 2) AS 每天死亡\nFROM (\n  SELECT 發生日期,\n         SUM(天候 IN ('雨','暴雨')) * 1.0 / COUNT(*) AS 雨占比,\n         COUNT(*) AS 傷亡事故,\n         SUM(死亡人數) AS 死亡\n  FROM accidents\n  WHERE 資料來源 = '警察局月報' AND 事故類別 <> 'A3'\n  GROUP BY 發生日期\n)\nGROUP BY 日別;",
   "expect": {
    "cols": [
     "日別",
     "天數",
     "每天傷亡事故",
     "每天死亡"
    ],
    "rows": [
     [
      "無雨日",
      796,
      111.1,
      0.51
     ],
     [
      "部分有雨",
      410,
      104.4,
      0.51
     ],
     [
      "雨天日",
      43,
      94.1,
      0.33
     ]
    ]
   }
  },
  "t7_fall": {
   "sql": "SELECT 天候,\n       ROUND(SUM(事故類型 = '路上翻車、摔倒') * 100.0 / COUNT(*), 1) AS 翻車摔倒占比\nFROM accidents\nWHERE 資料來源 = '警察局月報' AND 事故類別 <> 'A3' AND 天候 IN ('晴','雨') AND 事故類型 IS NOT NULL\nGROUP BY 天候;",
   "expect": {
    "cols": [
     "天候",
     "翻車摔倒占比"
    ],
    "rows": [
     [
      "晴",
      6.1
     ],
     [
      "雨",
      13.8
     ]
    ]
   }
  }
 }
};
// 儀表板的分頁與面板定義（單一內容來源）
// build_web.js 用它決定要放哪些查詢；網頁用它畫面板。數字一律由 build(R) 從即時查詢結果算出。
//
// 面板欄位：
//   type     stat | bar | groupbar | line | heat | table | ask | close | cards | record | schema | note | steps | mindmap
//   title    面板標題；sub 標題下的小字
//   q        可在 SQL 編輯區修改的查詢鍵（字串或陣列）；use 只讀取、不能編輯的查詢鍵
//   w        桌機時占 12 欄中的幾欄；tall 圖表加高
//   build(R) R(鍵) 回傳 { cols, rows }；回傳畫圖用的資料，形狀不符時丟錯（bad）
//   highlight 強調規則：[{ label | rank: 'min'|'max' | index | test(item), color }] 或 function(item) → 顏色名
//   annot    圖上標註：同樣的比對規則，加 { text(v, item), sub(item), color, size, dec, suffix, ds }
//   horizontal 橫條；valueLabels 每點都標數字；dec 小數位數；suffix 數字後綴
(function (root, factory) {
  var D = factory();
  if (typeof module === 'object' && module.exports) module.exports = D;
  else root.DEMO_DEF = D;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // ===== 小工具 =====
  function bad(msg) { var e = new Error(msg || '結果形狀不符'); e.shape = true; throw e; }
  // 千分位；dec 省略時四捨五入到整數；負號用 U+2212
  function fmt(n, dec) {
    if (typeof n !== 'number' || !isFinite(n)) return String(n);
    var s = dec == null ? String(Math.round(n)) : n.toFixed(dec);
    var neg = s.charAt(0) === '-';
    if (neg) s = s.slice(1);
    if (/^0(\.0+)?$/.test(s)) neg = false;
    var p = s.split('.');
    p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return (neg ? '−' : '') + p.join('.');
  }
  function chg(before, after) { return (after - before) / before * 100; }
  function ym(s) { return String(s).slice(0, 7); }
  function objs(res) {
    if (!res || !res.cols || !res.rows) bad('沒有結果');
    return res.rows.map(function (r) {
      var o = {};
      res.cols.forEach(function (c, i) { o[c] = r[i]; });
      return o;
    });
  }
  function has(res, c) { return res.cols.indexOf(c) >= 0; }
  function isNum(v) { return typeof v === 'number' && isFinite(v); }
  function num(v) { if (!isNum(v)) bad('不是數字'); return v; }
  // 欄名找不到時退回第 i 欄
  function colOf(res, name, i) {
    if (has(res, name)) return name;
    if (i != null && i < res.cols.length) return res.cols[i];
    return bad('缺少欄位 ' + name);
  }
  // 數值欄：都是數字（或 NULL）且至少一個數字
  function numCols(res, exclude) {
    var os = objs(res);
    return res.cols.filter(function (c) {
      if ((exclude || []).indexOf(c) >= 0) return false;
      var any = false;
      for (var k = 0; k < os.length; k++) {
        if (os[k][c] === null) continue;
        if (!isNum(os[k][c])) return false;
        any = true;
      }
      return any;
    });
  }
  // 數值欄名找不到時退回第一個數值欄
  function vcolOf(res, name, exclude) {
    if (has(res, name)) return name;
    var c = numCols(res, exclude)[0];
    return c || bad('沒有數值欄');
  }
  function find(res, col, val) {
    var r = objs(res).filter(function (o) { return String(o[col]) === String(val); })[0];
    return r || bad('找不到 ' + val);
  }
  // 標籤欄 + 數值欄 → { keys, labels, values, objs }
  function series(res, x, y, labelFn) {
    var xc = colOf(res, x, 0), yc = vcolOf(res, y, [xc]);
    var os = objs(res);
    if (!os.length) bad('沒有資料列');
    return {
      keys: os.map(function (o) { return o[xc]; }),
      labels: os.map(function (o) { return labelFn ? labelFn(o, xc) : String(o[xc]); }),
      values: os.map(function (o) { return num(o[yc]); }),
      objs: os,
    };
  }
  function sortBy(list, pref, keyFn) {
    function rank(v) { var i = pref.indexOf(String(keyFn(v))); return i < 0 ? 999 : i; }
    return list.slice().sort(function (a, b) { return rank(a) - rank(b); });
  }
  function pick(s, idx) {
    return { keys: idx.map(function (i) { return s.keys[i]; }), labels: idx.map(function (i) { return s.labels[i]; }), values: idx.map(function (i) { return s.values[i]; }), objs: idx.map(function (i) { return s.objs[i]; }) };
  }
  // 兩個數字對比（STAT 成對）
  function pair(res, keyCol, valCol, a, b, o) {
    o = o || {};
    var kc = colOf(res, keyCol, 0), vc = vcolOf(res, valCol, [kc]);
    var va = num(find(res, kc, a.key)[vc]), vb = num(find(res, kc, b.key)[vc]);
    var f = o.f || function (v) { return fmt(v, o.dec) + (o.suffix || ''); };
    return {
      pair: true,
      a: { v: f(va), label: a.label || a.key, color: a.color || 'soft' },
      b: { v: f(vb), label: b.label || b.key, color: b.color || 'soft' },
      ratio: o.ratio === false ? null : [va, vb],
      notes: o.notes || null,
    };
  }
  // 年、月、件數 → 連續月份（缺的月份為 null）
  function months(res) {
    var yc = colOf(res, '年', 0), mc = colOf(res, '月', 1), vc = vcolOf(res, '件數', [yc, mc]);
    var map = {}, lo = Infinity, hi = -Infinity;
    objs(res).forEach(function (o) {
      var k = num(o[yc]) * 12 + num(o[mc]) - 1;
      map[k] = num(o[vc]);
      lo = Math.min(lo, k); hi = Math.max(hi, k);
    });
    if (!isFinite(lo) || hi - lo > 600) bad('月份範圍不合理');
    var labels = [], values = [], missing = [];
    for (var k = lo; k <= hi; k++) {
      var l = Math.floor(k / 12) + '-' + String(k % 12 + 1).padStart(2, '0');
      labels.push(l);
      values.push(map[k] == null ? null : map[k]);
      if (map[k] == null) missing.push(l);
    }
    return { labels: labels, keys: labels, values: values, missing: missing };
  }

  var H = { bad: bad, fmt: fmt, chg: chg, ym: ym, objs: objs, has: has, isNum: isNum, num: num, colOf: colOf, numCols: numCols, vcolOf: vcolOf, find: find, series: series, sortBy: sortBy, pair: pair, months: months };

  var WEEK = ['一', '二', '三', '四', '五', '六', '日'];
  var SPEED = ['40 以下', '50', '60 以上'];
  var hourSub = function (it) { return it.label + ' 點'; };

  // accidents 22 欄分組（資料表結構示意）
  var GROUPS = [
    ['何時', ['發生日期', '發生時間', '年', '月', '小時', '星期']],
    ['何地', ['行政區', '道路', '交岔路']],
    ['多嚴重', ['事故類別', '死亡人數', '受傷人數']],
    ['當時環境', ['天候', '光線', '道路類別', '速限', '道路型態', '事故位置', '號誌種類']],
    ['怎麼撞', ['事故類型']],
    ['其他', ['事故編號', '資料來源']],
  ];

  var tabs = [
    // ==================== 總覽 ====================
    { id: 'ov', name: '總覽', sections: [
      { title: '資料從哪裡來', panels: [
        { type: 'cards', w: 12, use: ['src_count', 'src_districts'], build: function (R) {
          var sc = R('src_count'), kc = colOf(sc, '資料來源', 0);
          var a = find(sc, kc, '交通局A2A3'), b = find(sc, kc, '警察局月報');
          var d = objs(R('src_districts'))[0] || bad();
          function line(o) { return ym(o['最早']) + ' ～ ' + ym(o['最晚']) + '　' + fmt(num(o['件數'])) + ' 筆'; }
          return { cards: [
            { top: '高雄市政府交通局', name: 'A2A3 事故（新）', big: '1', unit: '個檔', lines: [line(a)], color: 'orange' },
            { top: '高雄市政府警察局', name: '各月交通事故統計', big: '41', unit: '個檔', lines: [line(b)], color: 'orange' },
            { top: '高雄市政府民政局', name: '各區戶口數月統計', big: fmt(num(d['區數'])), unit: '區', lines: ['人口 ' + fmt(num(d['人口合計'])) + '（2026-03）'], color: 'blue' },
          ] };
        } },
        { type: 'note', w: 12, codes: [['data.kcg.gov.tw', 'orange'], ['cabu.kcg.gov.tw', 'blue']], text: '找資料時先確認：是一筆一筆的記錄，不是已經加總好的統計表。' },
      ] },
      { title: '資料表', panels: [
        { type: 'schema', w: 8, title: '資料表結構', use: ['ov_total', 'src_sample', 'src_districts', 'src_district_sample'], build: function (R) {
          var t = objs(R('ov_total'))[0] || bad(), sd = objs(R('src_districts'))[0] || bad();
          var ds = R('src_district_sample');
          return {
            acc: { name: 'accidents', meta: fmt(num(t['件數'])) + ' 列 · ' + R('src_sample').cols.length + ' 欄', groups: GROUPS, key: '行政區' },
            dist: { name: 'districts', meta: fmt(num(sd['區數'])) + ' 列 · ' + ds.cols.length + ' 欄', cols: ds.cols, rows: ds.rows, key: '行政區' },
          };
        } },
        { type: 'record', w: 4, title: '一列 = 一件事故', q: 'src_sample', build: function (R) {
          var res = R('src_sample'), o = objs(res)[0] || bad('沒有資料列');
          var want = ['發生日期', '發生時間', '星期', '事故類別', '行政區', '道路', '交岔路', '事故類型'].filter(function (c) { return has(res, c); });
          if (!want.length) want = res.cols;
          return { pairs: want.map(function (c) { return [c, o[c]]; }) };
        } },
      ] },
      { title: '總覽', panels: [
        { type: 'stat', w: 3, q: 'ov_total', build: function (R) {
          var o = objs(R('ov_total'))[0] || bad();
          return { items: [{ v: fmt(num(o[vcolOf(R('ov_total'), '件數')])), unit: '件', color: 'orange' }] };
        } },
        { type: 'stat', w: 3, q: 'ov_total', build: function (R) {
          var res = R('ov_total'), o = objs(res)[0] || bad();
          return { items: [{ v: fmt(num(o[colOf(res, '天數', 1)])), unit: '天', color: 'ink' }] };
        } },
        { type: 'stat', w: 3, q: 'ov_death', use: ['src_count'], build: function (R) {
          var res = R('ov_death'), o = objs(res)[0] || bad();
          var b = find(R('src_count'), '資料來源', '警察局月報');
          return { items: [{ v: fmt(num(o[vcolOf(res, '死亡')])), unit: '人死亡', color: 'red', note: ym(b['最早']) + ' 起' }] };
        } },
        { type: 'stat', w: 3, q: 'ov_total', build: function (R) {
          var res = R('ov_total'), o = objs(res)[0] || bad();
          return { items: [{ pre: '每天約', v: fmt(num(o[colOf(res, '件數', 0)]) / num(o[colOf(res, '天數', 1)])), unit: '件', color: 'ink' }] };
        } },
        { type: 'bar', w: 7, title: '每月平均件數', q: 'ov_year', valueLabels: true, build: function (R) {
          var res = R('ov_year'), s = series(res, '年', '月平均');
          if (!has(res, '月數')) return s;
          var idx = s.objs.map(function (o, i) { return o['月數'] > 1 ? i : -1; }).filter(function (i) { return i >= 0; });
          return pick(s, idx);
        } },
        { type: 'stat', w: 5, title: '事故類別', q: 'ov_cat', build: function (R) {
          var NOTE = { A1: '有人死亡', A2: '有人受傷', A3: '只有財損' };
          var s = series(R('ov_cat'), '事故類別', '件數');
          return { items: s.keys.map(function (k, i) { return { pre: String(k), v: fmt(s.values[i]), color: 'ink', note: NOTE[k] || '', small: true }; }) };
        } },
        { type: 'ask', text: '四年幾乎一樣多。那差別在哪裡？' },
      ] },
      { title: '用這份資料之前要知道的事', panels: [
        { type: 'cards', w: 12, use: ['t3_monthly', 'src_count', 'ov_null', 't6_cross_null'], build: function (R) {
          var m = months(R('t3_monthly'));
          var b = find(R('src_count'), '資料來源', '警察局月報');
          var n = objs(R('ov_null')).filter(function (o) { return o['資料來源'] === '警察局月報' && o['事故類別'] === 'A3'; })[0] || bad();
          var x = objs(R('t6_cross_null'))[0] || bad();
          return { small: true, cards: [
            { big: String(m.missing.length), unit: '個月', lines: ['缺 ' + (m.missing.join('、') || '—')], color: 'orange' },
            { big: ym(b['最早']), unit: '起', lines: ['才有死亡事故的記錄'], color: 'orange' },
            { big: fmt(num(n['天候空白']) / num(n['件數']) * 100), unit: '%', lines: ['只有財損的事故沒填天候'], color: 'orange' },
            { big: fmt(num(x['沒填占比'])), unit: '%', lines: ['事故沒填交岔路'], color: 'orange' },
          ] };
        } },
      ] },
    ] },

    // ==================== 01 小時 ====================
    { id: 't1', name: '01 小時', sections: [
      { panels: [
        { type: 'bar', w: 12, tall: true, title: '各小時的事故件數', q: 't1_hour',
          build: function (R) { return series(R('t1_hour'), '小時', '件數'); },
          highlight: [{ rank: 'min', color: 'orange' }],
          annot: [{ rank: 'min', color: 'orange', size: 24, sub: hourSub }, { rank: 'max', color: 'soft', size: 14, sub: hourSub }] },
        { type: 'ask', text: '最少，就最安全嗎？' },
      ] },
      { title: '深夜為什麼致命', panels: [
        { type: 'stat', w: 4, title: '每千件傷亡事故的死亡人數', q: 't1_slot_rate', build: function (R) {
          return pair(R('t1_slot_rate'), '時段', '每千件死亡', { key: '深夜', label: '深夜 0–5 點', color: 'red' }, { key: '上下班', label: '上下班' }, { dec: 1 });
        } },
        { type: 'groupbar', w: 4, title: '事故類型占比（%）', q: 't1_type_share', horizontal: true, valueLabels: true, dec: 1, build: function (R) {
          var res = R('t1_type_share'), k = colOf(res, '時段', 0), cats = numCols(res, [k]);
          if (!cats.length) bad();
          var NAMES = { 翻車摔倒: '自己翻車、摔倒', 撞動物: '撞動物', 撞路樹電桿: '撞路樹、電桿' };
          return { labels: cats.map(function (c) { return NAMES[c] || c; }), series: [['深夜', 'orange'], ['上下班', 'dim']].map(function (s) {
            var o = find(res, k, s[0]);
            return { name: s[0], color: s[1], values: cats.map(function (c) { return o[c]; }) };
          }) };
        } },
        { type: 'bar', w: 4, title: '深夜傷亡事故（依星期）', q: 't1_night_weekday', build: function (R) {
          var s = series(R('t1_night_weekday'), '星期', '件數');
          var idx = sortBy(s.keys.map(function (k, i) { return i; }), WEEK, function (i) { return s.keys[i]; });
          return pick(s, idx);
        }, highlight: [{ label: ['六', '日'], color: 'red' }] },
        { type: 'ask', text: '是「深夜」危險，還是「自己撞」危險？' },
      ] },
      { title: '最致命的組合', panels: [
        { type: 'heat', w: 7, title: '每千件傷亡事故的死亡人數', q: 't1_self_rate', build: function (R) {
          var res = R('t1_self_rate'), rc = colOf(res, '時段', 0), cc = colOf(res, '型態', 1), vc = vcolOf(res, '每千件死亡', [rc, cc]);
          var os = objs(res);
          function uniq(c, pref) { var u = []; os.forEach(function (o) { if (u.indexOf(o[c]) < 0) u.push(o[c]); }); return sortBy(u, pref, String); }
          var rows = uniq(rc, ['深夜', '其他時段']), cols = uniq(cc, ['自撞', '與他車或行人']);
          if (rows.length > 6 || cols.length > 6) bad('格子太多');
          return { rows: rows, cols: cols, dec: 1, cells: rows.map(function (r) { return cols.map(function (c) {
            var o = os.filter(function (x) { return x[rc] === r && x[cc] === c; })[0];
            return o ? num(o[vc]) : null;
          }); }) };
        } },
        { type: 'stat', w: 5, title: '深夜傷亡事故的每千件死亡', q: 't1_night_area', build: function (R) {
          return pair(R('t1_night_area'), '分區', '每千件死亡', { key: '原高雄縣', label: '郊區（原高雄縣）', color: 'red' }, { key: '原高雄市', label: '市區（原高雄市）' }, { dec: 1 });
        } },
        { type: 'close', words: ['深夜', '郊區', '自撞'] },
      ] },
    ] },

    // ==================== 02 上下班 ====================
    { id: 't2', name: '02 上下班', sections: [
      { panels: [
        { type: 'line', w: 12, tall: true, title: '每天各小時的事故件數', q: 't2_hour_daytype', build: function (R) {
          var res = R('t2_hour_daytype'), x = colOf(res, '小時', 0), ys = numCols(res, [x]).slice(0, 2), os = objs(res);
          if (!ys.length || !os.length) bad();
          var NAMES = { 平日每天: '平日每天', 假日每天: '假日每天' };
          return { labels: os.map(function (o) { return String(o[x]); }), keys: os.map(function (o) { return o[x]; }), series: ys.map(function (c, k) {
            return { name: NAMES[c] || c, values: os.map(function (o) { return o[c]; }), color: k ? 'dim' : 'orange', width: k ? 2 : 3 };
          }) };
        }, annot: [{ ds: 0, label: [17, 8], color: 'orange', dec: 1, size: 18, sub: hourSub }] },
        { type: 'ask', text: '同樣是通勤，為什麼下班比上班多？' },
      ] },
      { title: '冬天的 17 點', panels: [
        { type: 'bar', w: 6, title: '每天 17 點的事故件數', q: 't2_17_month',
          build: function (R) { return series(R('t2_17_month'), '月', '每天17點件數', function (o, c) { return o[c] + ' 月'; }); },
          highlight: [{ label: [11, 12, 1], color: 'orange' }],
          annot: [{ label: 12, color: 'orange', dec: 1, size: 18 }, { label: 6, color: 'soft', dec: 1, size: 14 }] },
        { type: 'bar', w: 6, title: '17 點的事故，有幾 % 發生在天色已暗', q: 't2_17_dark',
          build: function (R) { return series(R('t2_17_dark'), '月', '天暗占比', function (o, c) { return o[c] + ' 月'; }); },
          highlight: [{ label: [10, 11, 12, 1], color: 'orange' }],
          annot: [{ label: 12, color: 'orange', suffix: '%', size: 18 }, { label: 6, color: 'soft', suffix: '%', size: 14 }] },
        { type: 'ask', text: '天黑以後，受害的是誰？' },
      ] },
      { title: '天黑後的行人', panels: [
        { type: 'stat', w: 6, title: '行人事故占比', sub: '同樣是 17–18 點', q: 't2_dark_ped', build: function (R) {
          return pair(R('t2_dark_ped'), '天色', '行人事故占比', { key: '天暗', color: 'red' }, { key: '天亮' }, { dec: 1, suffix: '%' });
        } },
        { type: 'stat', w: 6, title: '每千件傷亡事故的死亡人數', sub: '同樣是 17–18 點', q: 't2_dark_ped', build: function (R) {
          return pair(R('t2_dark_ped'), '天色', '每千件死亡', { key: '天暗', color: 'red' }, { key: '天亮' }, { dec: 1 });
        } },
        { type: 'close', text: '下班 ＋ 天黑 ＝ 看不見行人' },
      ] },
    ] },

    // ==================== 03 疫情 ====================
    { id: 't3', name: '03 疫情', sections: [
      { panels: [
        { type: 'line', w: 9, tall: true, title: '每月事故件數', q: 't3_monthly', build: function (R) {
          var m = months(R('t3_monthly'));
          return { labels: m.labels, keys: m.keys, series: [{ name: '件數', values: m.values, color: 'dim', width: 2 }],
            tick: function (l) { return l.slice(5) === '01' ? l.slice(0, 4) : ''; },
            note: m.missing.length ? m.missing.join('、') + ' 無資料' : '' };
        }, highlight: [{ label: '2021-06', color: 'orange' }], annot: [{ label: '2021-06', color: 'orange', size: 18 }] },
        { type: 'stat', w: 3, q: 't3_june', build: function (R) {
          var res = R('t3_june'), y = colOf(res, '年', 0), v = vcolOf(res, '件數', [y]);
          var a = num(find(res, y, 2020)[v]), b = num(find(res, y, 2021)[v]);
          return { items: [{ v: fmt(chg(a, b)) + '%', color: 'orange', note: '2021-06 對 2020-06' }] };
        } },
        { type: 'ask', text: '少掉的，是哪一種出門？' },
      ] },
      { title: '少的是休閒，不是通勤', panels: [
        { type: 'bar', w: 12, tall: true, horizontal: true, title: '2021-06 對 2020-06 的變化', q: ['t3_daytype', 't3_slot'], dec: 1, suffix: '%', valueLabels: true, build: function (R) {
          var a = series(R('t3_daytype'), '日別', '變化百分比'), b = series(R('t3_slot'), '時段', '變化百分比');
          var all = { keys: a.keys.concat(b.keys), labels: a.labels.concat(b.labels), values: a.values.concat(b.values), objs: a.objs.concat(b.objs) };
          var idx = all.values.map(function (v, i) { return i; }).sort(function (i, j) { return all.values[i] - all.values[j]; });
          return pick(all, idx);
        }, highlight: [{ test: function (it) { return it.value <= -35; }, color: 'orange' }] },
        { type: 'ask', text: '事故變少了，那受傷的人也少一樣多嗎？' },
      ] },
      { title: '少的是小擦撞', panels: [
        { type: 'stat', w: 5, title: '2021-06 對 2020-06', q: 't3_june', build: function (R) {
          var res = R('t3_june'), y = colOf(res, '年', 0);
          var r0 = find(res, y, 2020), r1 = find(res, y, 2021);
          var a = chg(num(r0[colOf(res, '只有財損', 2)]), num(r1[colOf(res, '只有財損', 2)]));
          var b = chg(num(r0[colOf(res, '有人傷亡', 3)]), num(r1[colOf(res, '有人傷亡', 3)]));
          return { pair: true, a: { v: fmt(a) + '%', label: '只有財損', color: 'orange' }, b: { v: fmt(b) + '%', label: '有人傷亡', color: 'soft' }, ratio: [a, b] };
        } },
        { type: 'groupbar', w: 7, title: '6 月的事故件數', q: 't3_june', valueLabels: true, build: function (R) {
          var res = R('t3_june'), y = colOf(res, '年', 0);
          var cats = ['只有財損', '有人傷亡'].filter(function (c) { return has(res, c); });
          if (!cats.length) bad();
          return { labels: cats, series: [[2020, 'dim'], [2021, 'orange']].map(function (s) {
            var o = find(res, y, s[0]);
            return { name: s[0] + '-06', color: s[1], values: cats.map(function (c) { return num(o[c]); }) };
          }) };
        } },
        { type: 'close', text: '車少了，擦撞少很多；會傷人的事故沒有少那麼多' },
      ] },
    ] },

    // ==================== 04 市區與郊區 ====================
    { id: 't4', name: '04 市區與郊區', sections: [
      { panels: [
        { type: 'bar', w: 5, title: '事故件數', q: 't4_area', valueLabels: true,
          build: function (R) { return series(R('t4_area'), '分區', '件數'); } },
        { type: 'stat', w: 7, title: '每千件事故的死亡人數', q: 't4_area', build: function (R) {
          return pair(R('t4_area'), '分區', '每千件死亡', { key: '原高雄縣', color: 'red' }, { key: '原高雄市' }, { dec: 2 });
        } },
        { type: 'ask', text: '事故比較少的地方，為什麼比較致命？' },
      ] },
      { title: '路越快越嚴重', panels: [
        { type: 'bar', w: 7, title: '每千件傷亡事故的死亡人數（依速限）', q: 't4_speed_rate', valueLabels: true, dec: 1,
          build: function (R) {
            var s = series(R('t4_speed_rate'), '速限', '每千件死亡');
            return pick(s, sortBy(s.keys.map(function (k, i) { return i; }), SPEED, function (i) { return s.keys[i]; }));
          }, highlight: [{ label: '60 以上', color: 'red' }] },
        { type: 'stat', w: 5, title: '速限 60 以上的事故占比', q: 't4_speed_share', build: function (R) {
          return pair(R('t4_speed_share'), '分區', '速限60以上占比', { key: '原高雄縣', color: 'red' }, { key: '原高雄市' }, { dec: 1, suffix: '%' });
        } },
        { type: 'ask', text: '那速限一樣的路，郊區就和市區一樣安全嗎？' },
      ] },
      { title: '速限不是全部', panels: [
        { type: 'groupbar', w: 12, tall: true, title: '每千件傷亡事故的死亡人數', q: 't4_speed_area', valueLabels: true, dec: 1, build: function (R) {
          var res = R('t4_speed_area'), sc = colOf(res, '速限', 0), ac = colOf(res, '分區', 1), vc = vcolOf(res, '每千件死亡', [sc, ac]);
          var os = objs(res), cats = [];
          os.forEach(function (o) { if (cats.indexOf(o[sc]) < 0) cats.push(o[sc]); });
          cats = sortBy(cats, SPEED, String);
          return { labels: cats.map(String), series: [['原高雄縣', 'red'], ['原高雄市', 'dim']].map(function (s) {
            return { name: s[0], color: s[1], values: cats.map(function (c) {
              var o = os.filter(function (x) { return x[sc] === c && x[ac] === s[0]; })[0];
              return o ? num(o[vc]) : null;
            }) };
          }) };
        } },
        { type: 'close', text: '速限相同，郊區還是比較高　→　還缺什麼資料？', sub: '例如：到醫院的距離、實際車速' },
      ] },
    ] },

    // ==================== 05 行政區 ====================
    { id: 't5', name: '05 行政區', sections: [
      { panels: [
        { type: 'bar', w: 12, tall: true, horizontal: true, title: '事故件數前 10 名的行政區', q: 't5_top',
          build: function (R) { return series(R('t5_top'), '行政區', '件數'); },
          highlight: [{ rank: 'max', color: 'orange' }], annot: [{ rank: 'max', color: 'orange', size: 18 }] },
        { type: 'ask', text: '是因為三民區人多嗎？' },
      ] },
      { title: '換一個分母', panels: [
        { type: 'bar', w: 8, tall: true, horizontal: true, title: '每萬人的事故件數', q: ['t5_percap', 't5_city'], build: function (R) {
          var s = series(R('t5_percap'), '行政區', '每萬人件數');
          var idx = s.values.map(function (v, i) { return i; }).sort(function (i, j) { return s.values[j] - s.values[i]; }).slice(0, 12);
          var m = pick(s, idx);
          var c = R('t5_city'), cv = objs(c)[0];
          if (cv) { var v = cv[vcolOf(c, '全市每萬人件數')]; if (isNum(v)) m.refLine = { value: v, text: '全市 ' + fmt(v) }; }
          return m;
        }, highlight: [{ label: '三民區', color: 'orange' }], annot: [{ label: '三民區', color: 'orange', size: 16 }] },
        { type: 'stat', w: 4, title: '每萬人的事故件數', sub: '人口：高雄市民政局，2026-03', q: ['t5_percap', 't5_city'], build: function (R) {
          var res = R('t5_percap'), a = num(find(res, colOf(res, '行政區', 0), '三民區')[vcolOf(res, '每萬人件數')]);
          var c = R('t5_city'), b = num((objs(c)[0] || bad())[vcolOf(c, '全市每萬人件數')]);
          return { pair: true, a: { v: fmt(a), label: '三民區', color: 'orange' }, b: { v: fmt(b), label: '全市', color: 'soft' }, ratio: [a, b] };
        } },
        { type: 'ask', text: '那前三名是誰？為什麼是它們？' },
      ] },
      { title: '住的人少，經過的人多', panels: [
        { type: 'cards', w: 12, title: '每萬人的事故件數', q: 't5_percap', build: function (R) {
          var res = R('t5_percap'), k = colOf(res, '行政區', 0), v = vcolOf(res, '每萬人件數', [k]);
          var os = objs(res).slice().sort(function (a, b) { return num(b[v]) - num(a[v]); }).slice(0, 3);
          if (!os.length) bad();
          return { cards: os.map(function (o) {
            var lines = [];
            if (isNum(o['人口'])) lines.push('人口 ' + fmt(o['人口']));
            if (isNum(o['件數'])) lines.push('事故 ' + fmt(o['件數']));
            return { name: String(o[k]), big: fmt(num(o[v])), unit: '件／萬人', lines: lines, color: 'red' };
          }) };
        } },
        { type: 'close', text: '「人口」不是好的分母　→　需要車流量' },
      ] },
    ] },

    // ==================== 06 道路 ====================
    { id: 't6', name: '06 道路', sections: [
      { panels: [
        { type: 'bar', w: 9, tall: true, horizontal: true, title: '事故最多的 10 條路', q: 't6_road',
          build: function (R) {
            var res = R('t6_road'), a = colOf(res, '行政區', 0), b = colOf(res, '道路', 1);
            return series(res, b, '件數', function (o) { return o[a] + ' ' + o[b]; });
          }, highlight: [{ index: 0, color: 'orange' }], annot: [{ index: 0, color: 'orange', size: 18 }] },
        { type: 'stat', w: 3, q: 't6_road_avg', build: function (R) {
          var res = R('t6_road_avg'), o = objs(res)[0] || bad();
          return { items: [{ pre: '全市平均每條路', v: fmt(num(o[vcolOf(res, '平均件數')])), unit: '件', color: 'soft' }] };
        } },
        { type: 'ask', text: '是上下班的車潮造成的嗎？' },
      ] },
      { title: '不是通勤，是撞法不一樣', panels: [
        { type: 'stat', w: 4, title: '上下班四小時的占比', q: 't6_commute', build: function (R) {
          var res = R('t6_commute'), o = objs(res)[0] || bad();
          var a = num(o[colOf(res, '民族一路上下班占比', 0)]), b = num(o[colOf(res, '全市上下班占比', 1)]);
          return { pair: true, a: { v: fmt(a) + '%', label: '民族一路', color: 'soft' }, b: { v: fmt(b) + '%', label: '全市', color: 'soft' }, ratio: [a, b] };
        } },
        { type: 'groupbar', w: 8, horizontal: true, title: '事故類型占比（%）', q: ['t6_type_road', 't6_type_city'], valueLabels: true, dec: 1, build: function (R) {
          var cats = ['追撞', '同向擦撞', '側撞'];
          function vals(res) {
            var k = colOf(res, '事故類型', 0), v = vcolOf(res, '占比', [k]);
            return cats.map(function (c) { var o = objs(res).filter(function (x) { return x[k] === c; })[0]; return o ? num(o[v]) : null; });
          }
          return { labels: cats, series: [
            { name: '民族一路', color: 'orange', values: vals(R('t6_type_road')) },
            { name: '全市', color: 'dim', values: vals(R('t6_type_city')) },
          ] };
        } },
        { type: 'ask', text: '同方向的車在互相干擾。發生在哪裡？' },
      ] },
      { title: '熱點在交流道旁', panels: [
        { type: 'bar', w: 8, tall: true, horizontal: true, title: '事故最多的 10 個路口', q: 't6_cross',
          build: function (R) {
            var res = R('t6_cross'), a = colOf(res, '道路', 1), b = colOf(res, '交岔路', 2);
            return series(res, b, '件數', function (o) { return o[a] + ' × ' + o[b]; });
          }, highlight: [{ test: function (it) { return it.label.indexOf('高速公路') >= 0; }, color: 'orange' }] },
        { type: 'stat', w: 4, q: ['t6_cross', 't6_cross_null'], build: function (R) {
          var res = R('t6_cross'), os = objs(res).slice(0, 2);
          var n = colOf(res, '件數', 3), p = colOf(res, '只有財損占比', 4);
          if (os.length < 2) bad();
          var tot = 0, a3 = 0;
          os.forEach(function (o) { tot += num(o[n]); a3 += num(o[n]) * num(o[p]) / 100; });
          var x = objs(R('t6_cross_null'))[0] || bad();
          return { items: [{ v: fmt(a3 / tot * 100) + '%', color: 'orange', note: '中正一路便道路口，只有財損的比例' }],
            foot: fmt(num(x['沒填占比'])) + '% 的事故沒有填交岔路，排名只代表有填的部分' };
        } },
        { type: 'close', text: '假設：車道匯入匯出造成　→　待街景確認' },
      ] },
    ] },

    // ==================== 07 雨天 ====================
    { id: 't7', name: '07 雨天', sections: [
      { panels: [
        { type: 'bar', w: 7, title: '每千件傷亡事故的死亡人數', q: 't7_weather', valueLabels: true, dec: 1,
          build: function (R) { return series(R('t7_weather'), '天候', '每千件死亡'); },
          highlight: [{ label: '雨', color: 'orange' }], annot: [{ label: '雨', color: 'orange', dec: 1, size: 20 }] },
        { type: 'ask', text: '雨天沒有比較致命？和直覺相反。' },
      ] },
      { title: '換一個比法：比一整天', panels: [
        { type: 'stat', w: 8, title: '每天的傷亡事故件數', sub: '雨天日：當天過半的傷亡事故記錄為雨', q: 't7_rainday', build: function (R) {
          var res = R('t7_rainday'), k = colOf(res, '日別', 0);
          var m = pair(res, k, '每天傷亡事故', { key: '雨天日', color: 'orange' }, { key: '無雨日' });
          if (has(res, '天數')) m.notes = ['雨天日 ' + fmt(num(find(res, k, '雨天日')['天數'])) + ' 天', '無雨日 ' + fmt(num(find(res, k, '無雨日')['天數'])) + ' 天'];
          return m;
        } },
        { type: 'ask', text: '總數變少了，那撞法呢？' },
      ] },
      { title: '少出門，但摔車加倍', panels: [
        { type: 'stat', w: 8, title: '「自己翻車、摔倒」的占比', q: 't7_fall', build: function (R) {
          return pair(R('t7_fall'), '天候', '翻車摔倒占比', { key: '雨', color: 'red' }, { key: '晴' }, { dec: 1, suffix: '%' });
        } },
        { type: 'close', text: '雨天出門的人少，事故總數少；騎車的人更容易自己摔', sub: '要證明「出門的人少」，還需要車流量資料' },
      ] },
    ] },

    // ==================== 方法 ====================
    { id: 'method', name: '方法', sections: [
      { title: '看到數字之後', panels: [
        { type: 'steps', w: 12, use: ['t1_slot_rate', 't1_self_rate'], build: function (R) {
          var s = R('t1_slot_rate'), k = colOf(s, '時段', 0), v = vcolOf(s, '每千件死亡', [k]);
          var r = R('t1_self_rate'), c = objs(r).filter(function (o) { return o['時段'] === '深夜' && o['型態'] === '自撞'; })[0] || bad();
          return { steps: [
            { q: '和什麼比？', ex: fmt(num(find(s, k, '深夜')[v]), 1) + ' 對 ' + fmt(num(find(s, k, '上下班')[v]), 1) },
            { q: '為什麼？', ex: '深夜都是自己撞' },
            { q: '再查什麼能證明？', ex: '自撞 × 深夜 = ' + fmt(num(c['每千件死亡']), 1) },
            { q: '這份資料答不了什麼？', ex: '需要車流量' },
          ] };
        } },
        { type: 'close', text: '一個數字，要追問三次才有意義' },
      ] },
      { title: '分析的心智圖', panels: [
        { type: 'mindmap', w: 12, center: '一份資料', foot: '換一份資料，分支可以照用', branches: [
          { name: '時間', color: 'orange', leaves: ['小時', '星期', '月份', '年'], ex: '3 點最少卻最致命' },
          { name: '地點', color: 'blue', leaves: ['行政區', '道路', '路口'], ex: '熱點在交流道旁' },
          { name: '對象', color: 'green', leaves: ['事故類型', '行人', '自撞'], ex: '天黑後的行人' },
          { name: '嚴重程度', color: 'red', leaves: ['件數', '每千件死亡', '只有財損'], ex: '市區多、郊區重' },
        ] },
      ] },
    ] },
  ];

  // 所有用到的查詢鍵（依出現順序、不重複）
  function keys() {
    var out = [];
    tabs.forEach(function (t) { t.sections.forEach(function (s) { s.panels.forEach(function (p) {
      [].concat(p.q || [], p.use || []).forEach(function (k) { if (out.indexOf(k) < 0) out.push(k); });
    }); }); });
    return out;
  }

  return { tabs: tabs, H: H, keys: keys };
});

window.DEMO_PANELS.tabs = window.DEMO_DEF.tabs;
window.DEMO_PANELS.H = window.DEMO_DEF.H;
