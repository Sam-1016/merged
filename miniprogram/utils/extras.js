/**
 * 补充素材库：景点票价/开放时间/建议时长 + 博主推荐笔记
 *            + 交通站点 + 景点附近美食（配图）。
 * 票价与时间为公开信息整理，仅作行程参考，出行前以官方为准。
 */
function foodImg(prompt) {
  return 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=' +
    encodeURIComponent(prompt + '，美食摄影，特写，暖色，写实') + '&image_size=square'
}

module.exports = {
  dali: {
    spotMeta: {
      '才村码头': { ticket: '免费', openTime: '全天开放', suggest: '1–2小时' },
      '喜洲古镇': { ticket: '免费（严家民居 ¥25）', openTime: '全天，民居 8:30–17:30', suggest: '半天' },
      '双廊': { ticket: '免费', openTime: '全天开放', suggest: '半天，日落前后最佳' }
    },
    stations: [
      { name: '大理站', kind: '动车', desc: '昆明方向动车约 2 小时，出站打车进古城约 30 分钟' },
      { name: '大理机场', kind: '机场', desc: '直飞航班少，多在昆明中转；机场大巴到古城约 1 小时' }
    ],
    spotFoods: {
      '才村码头': [{ name: '洱海砂锅鱼', desc: '码头边的白族馆子，鱼现点现杀，汤先喝两碗。', image: foodImg('云南白族砂锅鱼，砂锅里奶白鱼汤和整条鱼') }],
      '喜洲古镇': [{ name: '喜洲破酥粑粑', desc: '现场炭火烙的咸口最香，配一杯普洱茶刚好。', image: foodImg('喜洲破酥粑粑，炭火烤制的金黄酥饼') }],
      '双廊': [{ name: '白族酸辣鱼', desc: '洱海酸辣口，配一份水性杨花汤就是完整的一餐。', image: foodImg('云南酸辣鱼，红汤鱼配香菜') }]
    },
    xhsNotes: [
      { author: '一颗洱海边的菜', tag: '避雷', title: '环海西路骑行说几句实话', text: '电动车环湖很晒，帽子墨镜防晒三件套缺一不可。才村到喜洲段风大，下午三四点的光是全天最好拍的。' },
      { author: '慢游阿澤', tag: '出片', title: '双廊日落机位整理', text: '玉几岛入口处人最多，往珊瑚礁方向再走十分钟人少很多。日落前四十分钟到位就够，不用去太早。' }
    ]
  },
  kyoto: {
    spotMeta: {
      '伏见稻荷': { ticket: '免费', openTime: '全天开放', suggest: '2–3小时，越早越好' },
      '岚山': { ticket: '竹林免费（天龙寺 ¥500）', openTime: '全天，寺院 8:30–17:00', suggest: '半天' },
      '鸭川': { ticket: '免费', openTime: '全天开放', suggest: '1–2小时，傍晚最佳' }
    },
    stations: [
      { name: 'JR 京都站', kind: '高铁站', desc: '新干线直达，站内就是美食街，进出市区都从这里转' },
      { name: '关西国际机场', kind: '机场', desc: 'Haruka 特急约 75 分钟直达京都站' },
      { name: '四条河原町站', kind: '地铁站', desc: '阪急与地下铁交汇，住宿选这附近最方便' }
    ],
    spotFoods: {
      '伏见稻荷': [{ name: '稻荷寿司', desc: '参道小店的甜豆皮寿司，爬山前垫一口正好。', image: foodImg('稻荷寿司，日式甜豆皮寿司') }],
      '岚山': [{ name: '汤豆腐料理', desc: '寺院边的汤豆腐套餐，清淡但很有京都味道。', image: foodImg('京都汤豆腐，日式砂锅豆腐定食') }],
      '鸭川': [{ name: '川床料理', desc: '夏季限定的纳凉床晚餐，记得提前订位。', image: foodImg('京都川床料理，河边纳凉床上的怀石晚餐') }]
    },
    xhsNotes: [
      { author: '京都在住小王', tag: '省时', title: '伏见稻荷不排队走法', text: '七点前到千本鸟居基本没人。爬到半山就回头，山顶风景和半山差别不大，省下的时间给锦市场。' },
      { author: '抹茶脑袋', tag: '美食', title: '锦市场只买这三样', text: '豆腐、腌菜、当季和果子。正餐千万别在市场里解决，出来走两条街便宜一半。' }
    ]
  },
  iceland: {
    spotMeta: {
      '塞里雅兰瀑布': { ticket: '免费（停车约 ¥50）', openTime: '全天开放', suggest: '1–1.5小时' },
      '黑沙滩': { ticket: '免费', openTime: '全天开放', suggest: '1小时，远离浪线' },
      '冰川潟湖': { ticket: '免费（游船约 ¥300 起）', openTime: '全天开放', suggest: '2–3小时' }
    },
    stations: [
      { name: '凯夫拉维克机场（KEF）', kind: '机场', desc: '国际航班都到这里，Flybus 到雷克雅未克约 45 分钟' },
      { name: '雷克雅未克', kind: '环岛起点', desc: '从这里取车出发，南岸第一天的驾驶约 3 小时' }
    ],
    spotFoods: {
      '塞里雅兰瀑布': [{ name: '冰岛羊肉汤', desc: 'Selfoss 镇上的热汤，正好驱走瀑布水汽的寒。', image: foodImg('冰岛羊肉汤，蔬菜羊肉热汤') }],
      '黑沙滩': [{ name: '维克镇海鲜汤', desc: 'Vik 镇小馆用面包碗装汤，边看海边喝完。', image: foodImg('冰岛海鲜汤，面包碗装奶油海鲜汤') }],
      '冰川潟湖': [{ name: '赫本龙虾餐', desc: 'Höfn 是龙虾小镇，环岛路上最值得停的一餐。', image: foodImg('冰岛龙虾餐，黄油烤龙虾尾') }]
    },
    xhsNotes: [
      { author: '北欧老白', tag: '安全', title: '黑沙滩真的不是开玩笑', text: '每年都有人被浪卷倒。站在完全干燥的区域拍，浪速比看起来快得多，别背对海。' },
      { author: '环岛七日的桃', tag: '省钱', title: '冰岛吃饭怎么不破产', text: 'Bonus 超市买三明治当午饭，晚饭再吃餐厅。加油站热狗是环岛路上最便宜的热食。' }
    ]
  },
  chengdu: {
    spotMeta: {
      '人民公园': { ticket: '免费（茶位 ¥15 起）', openTime: '6:00–22:00', suggest: '2–3小时' },
      '玉林': { ticket: '免费', openTime: '全天开放', suggest: '半天，傍晚更有味道' },
      '火锅': { ticket: '人均 ¥80–120', openTime: '多为 11:00–次日 2:00', suggest: '1.5–2小时' }
    },
    stations: [
      { name: '成都东站', kind: '高铁站', desc: '高铁主站，地铁 2/7 号线进城约 20 分钟' },
      { name: '双流 / 天府机场', kind: '机场', desc: '双流离市区近（地铁 10 号线）；天府航班多但远' },
      { name: '天府广场站', kind: '地铁站', desc: '1/2 号线换乘点，住这附近去哪都顺' }
    ],
    spotFoods: {
      '人民公园': [{ name: '钟水饺', desc: '公园出来步行可达，红油的甜辣比例刚好。', image: foodImg('成都钟水饺，红油拌水饺') }],
      '玉林': [{ name: '冷锅串串', desc: '玉林小巷里数签签结账，鸭肠和土豆片必拿。', image: foodImg('成都冷锅串串，红油里的竹签串') }],
      '火锅': [{ name: '牛油火锅', desc: '毛肚鸭肠先下锅，香油碟加蒜泥是本地吃法。', image: foodImg('成都牛油火锅，翻滚红油锅底和毛肚') }]
    },
    xhsNotes: [
      { author: '成都胃小圆', tag: '美食', title: '火锅点菜避雷清单', text: '脑花、兔腰先问同桌接不接受再点。微辣对外地人已经很够，鸳鸯锅不丢人。' },
      { author: '巷子里晒太阳', tag: '慢游', title: '人民公园的正确打开方式', text: '鹤鸣茶社上午十点后一座难求，想坐树荫位九点前到。掏耳朵可以体验，记得先问价。' }
    ]
  },
  sanya: {
    spotMeta: {
      '亚龙湾': { ticket: '免费', openTime: '全天开放', suggest: '半天，九点前下水' },
      '海棠湾': { ticket: '免费', openTime: '全天开放', suggest: '半天' },
      '西岛': { ticket: '门票+船票约 ¥95', openTime: '8:00–17:30', suggest: '半天' }
    },
    stations: [
      { name: '三亚站', kind: '高铁站', desc: '环岛高铁从海口过来约 2 小时，去亚龙湾有支线' },
      { name: '凤凰机场', kind: '机场', desc: '到市区打车约 30 分钟，旺季建议提前约车' }
    ],
    spotFoods: {
      '亚龙湾': [{ name: '椰子鸡', desc: '三个椰子一只鸡，海鲜吃腻了就来这顿清淡的。', image: foodImg('海南椰子鸡火锅，椰子和砂锅鸡肉') }],
      '海棠湾': [{ name: '疍家渔排海鲜', desc: '渔排现捞现做，坐下前先把计价问清楚。', image: foodImg('海南渔排海鲜，清蒸石斑鱼') }],
      '西岛': [{ name: '渔家海边烧烤', desc: '下岛前的一顿烧烤，烤鱿鱼和生蚝是招牌。', image: foodImg('海边烧烤，炭火烤鱿鱼') }]
    },
    xhsNotes: [
      { author: '岛民小林', tag: '避雷', title: '三亚海鲜防坑三句', text: '先问称重还是按份、加工费多少、有没有最低消费。问完这三句再坐下，能省一半。' },
      { author: '椰子不加冰', tag: '亲子', title: '带娃别硬排海上项目', text: '亚龙湾沙滩挖沙游泳娃就能玩一天。出海项目风浪大随时取消，别把它排在最后一天。' }
    ]
  },
  beijing: {
    spotMeta: {
      '故宫': { ticket: '¥60（旺季）', openTime: '8:30–17:00，周一闭馆', suggest: '3–4小时，需提前预约' },
      '景山': { ticket: '¥2', openTime: '6:30–21:00', suggest: '40分钟–1小时' },
      '胡同': { ticket: '免费', openTime: '全天开放', suggest: '2–3小时' }
    },
    stations: [
      { name: '北京南站', kind: '高铁站', desc: '京沪/京津高铁主站，地铁 4/14 号线进城' },
      { name: '首都 / 大兴机场', kind: '机场', desc: '首都机场快轨到东直门；大兴机场线到草桥换乘' },
      { name: '前门站', kind: '地铁站', desc: '2 号线，看升旗、进故宫都从这里走' }
    ],
    spotFoods: {
      '故宫': [{ name: '四季民福烤鸭（故宫店）', desc: '景观位正看角楼，饭点必排队，先取号再逛。', image: foodImg('北京烤鸭，片皮鸭配薄饼葱丝') }],
      '景山': [{ name: '护国寺小吃', desc: '豌豆黄、面茶、驴打滚一次尝全。', image: foodImg('北京小吃拼盘，豌豆黄驴打滚') }],
      '胡同': [{ name: '铜锅涮肉', desc: '胡同里的炭火铜锅，麻酱调料是灵魂。', image: foodImg('老北京铜锅涮肉，炭火铜锅和羊肉片') }]
    },
    xhsNotes: [
      { author: '胡同串子大伟', tag: '预约', title: '故宫抢票全流程', text: '提前 7 天晚 8 点放票，定闹钟卡点进。没抢到就刷退票，出发前一天晚上成功率最高。' },
      { author: '北平秋日', tag: '出片', title: '景山万春亭机位', text: '神武门出来直接上万春亭，拍故宫全景要站南侧栏杆。下午顺光，上午拍的是剪影。' }
    ]
  },
  xiamen: {
    spotMeta: {
      '鼓浪屿': { ticket: '上岛免费（船票 ¥35 往返）', openTime: '轮渡 7:10–17:30', suggest: '半天' },
      '八市': { ticket: '免费', openTime: '约 6:00–20:00', suggest: '1–2小时，早上最鲜活' },
      '环岛路': { ticket: '免费', openTime: '全天开放', suggest: '2–3小时，适合骑行' }
    },
    stations: [
      { name: '厦门站', kind: '火车站', desc: '在岛内，离轮渡码头最近，到达首选' },
      { name: '厦门北站', kind: '高铁站', desc: '在岛外，地铁 1 号线进岛约 40 分钟' },
      { name: '高崎机场', kind: '机场', desc: '岛内机场，打车到轮渡码头约 25 分钟' }
    ],
    spotFoods: {
      '鼓浪屿': [{ name: '叶氏麻糍', desc: '龙头路的小摊，现包现卖，排队很快。', image: foodImg('厦门麻糍，花生芝麻糯米糍') }],
      '八市': [{ name: '沙茶面', desc: '汤头浓，配料自选，本地人的早餐主场。', image: foodImg('厦门沙茶面，浓汤面配海鲜配料') }],
      '环岛路': [{ name: '海蛎煎', desc: '黄厝村口的老摊，趁热吃，蘸酱别盖过海蛎味。', image: foodImg('厦门海蛎煎，鸡蛋煎海蛎') }]
    },
    xhsNotes: [
      { author: '阿吉仔在厦门', tag: '避雷', title: '鼓浪屿别踩的三个坑', text: '船票买邮轮中心厦鼓码头，别买错码头。岛上网红奶茶又贵又普通，龙头路看看就好别久留。' },
      { author: '早起吃八市', tag: '美食', title: '八市早餐动线', text: '局口街进去先吃沙茶面，再买份满煎糕带走。海鲜加工店中午才去，早上先吃小吃。' }
    ]
  },
  bali: {
    spotMeta: {
      '德格拉朗梯田': { ticket: '约 ¥25', openTime: '6:00–18:00', suggest: '2小时，清晨最佳' },
      '海神庙': { ticket: '约 ¥30', openTime: '7:00–19:00', suggest: '1–2小时，先查潮汐' },
      '乌布': { ticket: '皇宫免费（区域小）', openTime: '8:00–19:00', suggest: '半天' }
    },
    stations: [
      { name: '登巴萨机场（DPS）', kind: '机场', desc: '南部入境，库塔最近；去乌布车程约 1.5 小时' },
      { name: '岛上交通', kind: '包车', desc: '没有轨道交通，按天包车或 Grab 打车，先谈好总价' }
    ],
    spotFoods: {
      '德格拉朗梯田': [{ name: '脏鸭餐', desc: '梯田景观位餐厅，半只鸭够两个人分。', image: foodImg('巴厘岛脏鸭餐，香酥炸鸭配米饭') }],
      '海神庙': [{ name: '烤乳猪饭', desc: 'Babi Guling，皮脆肉嫩，配一勺辣参巴。', image: foodImg('印尼烤乳猪饭，babi guling') }],
      '乌布': [{ name: '印尼炒饭', desc: 'Nasi Goreng 加个煎蛋，是最稳的一餐。', image: foodImg('印尼炒饭，配煎蛋和虾片') }]
    },
    xhsNotes: [
      { author: '巴厘妮可', tag: '交通', title: '包车防坑指南', text: '按天包车先谈好总价含不含油费停车费，超时一小时多少钱写清楚。临时加景点最容易起争执。' },
      { author: '梯田咖啡馆老板', tag: '出片', title: '德格拉朗几点去', text: '八点前到，光线斜、旅行团没到。秋千拍照要排队，想拍就第一批进。' }
    ]
  },
  shanghai: {
    spotMeta: {
      '武康路': { ticket: '免费', openTime: '全天开放', suggest: '2小时' },
      '外滩': { ticket: '免费', openTime: '全天开放', suggest: '1–2小时，日落最佳' },
      '苏州河': { ticket: '免费', openTime: '全天开放', suggest: '1–2小时，夜晚更舒服' }
    },
    stations: [
      { name: '虹桥站', kind: '高铁站', desc: '高铁与机场一体，地铁 2/10 号线进市区' },
      { name: '浦东机场', kind: '机场', desc: '国际航班为主，磁悬浮或 2 号线进城' },
      { name: '南京东路站', kind: '地铁站', desc: '2/10 号线，去外滩最近的一站' }
    ],
    spotFoods: {
      '武康路': [{ name: '老吉士本帮菜', desc: '红烧肉和草头圈子是招牌，务必先订位。', image: foodImg('上海本帮红烧肉，浓油赤酱') }],
      '外滩': [{ name: '蟹粉小笼', desc: '蟹粉季限定，先开窗、后喝汤。', image: foodImg('蟹粉小笼包，薄皮汤汁') }],
      '苏州河': [{ name: '河边早午餐', desc: '昌平路一带咖啡馆密集，适合行程收尾。', image: foodImg('早午餐brunch，咖啡牛油果吐司') }]
    },
    xhsNotes: [
      { author: '梧桐区住户', tag: '出片', title: '武康大楼拍照别站路口', text: '最佳机位在对面余庆路口，早上九点前人少。拍完往里走，安福路的咖啡馆比武康路好坐。' },
      { author: '夜走苏州河', tag: '小众', title: '外滩人挤人时的平替', text: '从邮政博物馆沿苏州河走到昌平路，夜景不差外滩，人只有十分之一。' }
    ]
  },
  guilin: {
    spotMeta: {
      '漓江': { ticket: '兴坪段免费（游船另计）', openTime: '全天开放', suggest: '半天，清晨有雾最佳' },
      '遇龙河': { ticket: '竹筏约 ¥160/人', openTime: '8:00–17:00', suggest: '半天–1天' },
      '十里画廊': { ticket: '免费（内部景点单独收费）', openTime: '全天开放', suggest: '半天，骑行' }
    },
    stations: [
      { name: '桂林北站', kind: '高铁站', desc: '高铁主站，公交 100 路到市区约 40 分钟' },
      { name: '两江机场', kind: '机场', desc: '机场大巴到民航大厦约 50 分钟' },
      { name: '阳朔站', kind: '高铁站', desc: '在兴坪方向，下车转中巴到阳朔县城约 40 分钟' }
    ],
    spotFoods: {
      '漓江': [{ name: '阳朔啤酒鱼', desc: '活鱼现做，番茄辣汤特别下饭，辣度先问。', image: foodImg('阳朔啤酒鱼，番茄青椒炖鱼') }],
      '遇龙河': [{ name: '竹筒饭', desc: '码头边的竹筒饭，腊肉香混着竹子香。', image: foodImg('广西竹筒饭，竹筒里的腊肉米饭') }],
      '十里画廊': [{ name: '田螺酿', desc: '螺肉混猪肉回酿，配冰啤酒刚好。', image: foodImg('广西田螺酿，酿螺肉') }]
    },
    xhsNotes: [
      { author: '阳朔骑车侠', tag: '路线', title: '遇龙河骑行+竹筏一天安排', text: '上午租车骑行十里画廊，下午金龙桥码头坐竹筏。顺序别反，竹筏下午四点后可能停航。' },
      { author: '桂林米粉研究员', tag: '美食', title: '本地人吃粉的门道', text: '先干拌后加汤，卤水自己加。景区门口的店比县城里的贵一倍，味道还打折。' }
    ]
  },
  qinhuangdao: {
    spotMeta: {
      '老龙头': { ticket: '¥50', openTime: '7:30–17:30', suggest: '2–3小时' },
      '鸽子窝': { ticket: '¥25', openTime: '4:30–18:00', suggest: '2小时，日出最佳' },
      '北戴河': { ticket: '免费（部分浴场收费）', openTime: '全天开放', suggest: '半天' }
    },
    stations: [
      { name: '北戴河站', kind: '高铁站', desc: '北京方向动车约 2 小时，离鸽子窝、北戴河最近' },
      { name: '秦皇岛站', kind: '火车站', desc: '市区主站，去老龙头打车约 25 分钟' }
    ],
    spotFoods: {
      '老龙头': [{ name: '山海关浑锅', desc: '酸菜白肉加海鲜一锅端，分量很扎实。', image: foodImg('山海关浑锅，酸菜白肉铜锅') }],
      '鸽子窝': [{ name: '鲅鱼饺子', desc: '看日出前的早餐，皮薄馅大，趁热吃。', image: foodImg('鲅鱼水饺，北方海鲜饺子') }],
      '北戴河': [{ name: '炭烤生蚝', desc: '夜市按打卖，蒜蓉味最稳，先问单价。', image: foodImg('炭烤生蚝，蒜蓉烤生蚝') }]
    },
    xhsNotes: [
      { author: '海边长大的团子', tag: '避雷', title: '秦皇岛吃海鲜别去景区', text: '鸽子窝门口的大排档价格翻倍。回市区找本地人排队的店，先问称重还是按份。' },
      { author: '周末看海计划', tag: '日出', title: '鸽子窝日出全攻略', text: '提前查日出时间，早到二十分钟占位置。九月海边清晨风大，带件外套比带三脚架重要。' }
    ]
  }
}
