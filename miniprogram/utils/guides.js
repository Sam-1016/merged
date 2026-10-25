/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：utils/guides.js
 * 静态攻略数据源：
 *   - 内置 17 条攻略示例数据，含行程、预算、季节与贴士字段。
 * ============================================================
 */
module.exports = [
  {
    id: 'dali-3d',
    destId: 'dali',
    title: '大理三日：把洱海走成一条很慢的线',
    excerpt: '古城只留一个早晨，剩下的时间交给风和水面。',
    cover: '/images/cover-lake.jpg',
    category: '自然风光',
    city: '大理',
    days: 3,
    budgetText: '¥1800',
    season: '3–5月，9–11月',
    reads: '2.4万',
    likes: '1862',
    author: '林夏',
    authorTitle: '常写西南的慢路线',
    avatar: '/images/avatar-1.jpg',
    updated: '2026.10',
    tags: ['慢旅行', '洱海', '环海西路'],
    route: '大理古城 → 才村 → 喜洲 → 双廊',
    rhythm: '慢',
    people: '情侣 / 独行',
    paragraphs: [
      '大理适合被拆开，而不是被打卡。第一天把古城的人声走完，第二天去喜洲看白族院落如何把天井留给光，第三天沿着环海西路到双廊，坐到天色自己变暖。',
      '不必租最贵的车，也不必把苍山索道当成必选项。真正会留下来的，是某一段没有名字的堤岸，和一碗刚出锅的饵丝。'
    ],
    daysPlan: [
      { day: '01', title: '古城，只走不赶', time: '上午 — 傍晚', desc: '从南门进城，人民路走到头就离开。傍晚去才村看第一场海，晚饭不要再折回古城。', places: ['人民路', '大理古城', '才村码头'] },
      { day: '02', title: '喜洲与喜洲的慢', time: '全天', desc: '严家民居看完，钻进旁边的小巷。破酥粑粑趁热吃，下午把时间浪费在田埂上。', places: ['严家民居', '喜洲古镇', '海舌公园'] },
      { day: '03', title: '双廊，把行程收成一条线', time: '午后 — 日落', desc: '沿环海西路北上。玉几岛看海，珊瑚礁一带的日落值得把晚饭推迟。', places: ['环海西路', '玉几岛', '双廊'] }
    ],
    spots: [
      { name: '才村码头', desc: '第一天的句号。水面平的时候，什么都不用做。', image: '/images/cover-lake.jpg' },
      { name: '喜洲巷子', desc: '比古城安静，院门和天井比店铺值得看。', image: '/images/cover-alley.jpg' },
      { name: '双廊日落', desc: '把返程方向留给有光的那一侧。', image: '/images/cover-road.jpg' }
    ],
    costs: [
      { name: '交通', value: '¥500', percent: 28 },
      { name: '住宿', value: '¥760', percent: 42 },
      { name: '餐饮', value: '¥400', percent: 22 },
      { name: '杂项', value: '¥140', percent: 8 }
    ],
    tips: [
      '环海西路日落在海的一侧，返程尽量顺着光线走。',
      '三月和十月风大，堤岸边一件薄外套比墨镜重要。',
      '古城客栈隔音一般，想睡好就住到才村或喜洲。'
    ],
    notes: [
      { name: '阿禾', avatar: '/images/avatar-2.jpg', text: '喜洲的粑粑真的要趁热。我们在田埂上坐了太久，回程刚好赶上双廊的光。' },
      { name: '小满', avatar: '/images/avatar-3.jpg', text: '没有租车，西路分段坐班车也走得完，只是日落那程要早一点出发。' }
    ]
  },
  {
    id: 'kyoto-day',
    destId: 'kyoto',
    title: '京都：把一天过成一首短诗',
    excerpt: '清晨寺院，午后町屋，夜里只沿鸭川走。',
    cover: '/images/cover-kyoto.jpg',
    category: '文化',
    city: '京都',
    days: 2,
    budgetText: '¥2600',
    season: '3–4月，11月',
    reads: '3.1万',
    likes: '2408',
    author: '周晚',
    authorTitle: '写城市怎么走路',
    avatar: '/images/avatar-2.jpg',
    updated: '2026.09',
    tags: ['寺院', '红叶', '町屋'],
    route: '伏见稻荷 → 锦市场 → 祗园 → 鸭川',
    rhythm: '适中',
    people: '情侣 / 朋友',
    paragraphs: [
      '京都最容易把一天走废：每个寺院都想进，每条坡都想拍照。留下两个锚点就够，一个在清晨，一个在河边。',
      '红叶和樱花会把同一条路变成队伍。能早出门就早出门，下午用来喝一杯，而不是再买一张门票。'
    ],
    daysPlan: [
      { day: '01', title: '稻荷与市场', time: '清晨 — 下午', desc: '开门就上山。回到市区后只在锦市场买三样，正餐换到市场外面。', places: ['伏见稻荷', '锦市场', '三条'] },
      { day: '02', title: '祗园到鸭川', time: '午后 — 夜晚', desc: '石板路看到就停。天色一下来，就去鸭川坐着，不再加新的寺院。', places: ['祗园', '鸭川', '四条'] }
    ],
    spots: [
      { name: '千本鸟居', desc: '九点之后队伍会把红色走成一条缝。', image: '/images/cover-kyoto.jpg' },
      { name: '岚山备选', desc: '如果第二天不想进城，就把这一天换成河边。', image: '/images/cover-forest.jpg' },
      { name: '远处的山', desc: '天气好时，城市边缘能看见更安静的轮廓。', image: '/images/cover-fuji.jpg' }
    ],
    costs: [
      { name: '交通', value: '¥700', percent: 27 },
      { name: '住宿', value: '¥1100', percent: 42 },
      { name: '餐饮', value: '¥600', percent: 23 },
      { name: '门票', value: '¥200', percent: 8 }
    ],
    tips: [
      'IC 卡提前准备好，京都的公交比地铁更常用。',
      '寺院常常下午四点就停止售票，不要把大景点留到最后。',
      '十一月温差大，早上的山风和中午的队伍不是同一种天气。'
    ],
    notes: [
      { name: '周予', avatar: '/images/avatar-4.jpg', text: '我们把岚山从清单里删掉之后，反而在鸭川坐到了很晚。' },
      { name: '南风', avatar: '/images/avatar-1.jpg', text: '锦市场的豆腐很好，但位置太挤，买了去河边吃更对。' }
    ]
  },
  {
    id: 'iceland-7',
    destId: 'iceland',
    title: '冰岛环岛七日：把极光当成额外的礼物',
    excerpt: '白天看瀑布和黑沙滩，九月的夜里有机会等来极光。',
    cover: '/images/cover-iceland.jpg',
    category: '自然风光',
    city: '冰岛',
    days: 7,
    budgetText: '¥18000',
    season: '6–8月，9–10月',
    reads: '1.8万',
    likes: '1630',
    author: '陈北',
    authorTitle: '写山和长途',
    avatar: '/images/avatar-4.jpg',
    updated: '2026.08',
    tags: ['环岛', '极光', '自驾'],
    route: '雷克雅未克 → 南岸 → 冰川潟湖 → 东岸 → 北部',
    rhythm: '紧凑',
    people: '朋友 / 自驾',
    paragraphs: [
      '冰岛环岛不是风景密度的比赛。每天超过五个小时的驾驶，会把瀑布看成服务区。九月能同时碰到不太拥挤的路和极光的可能。',
      '预算要按北欧价格来，而不是按照片的浪漫程度来。超市解决午饭，晚饭再进餐厅，整趟行程会松一截。'
    ],
    daysPlan: [
      { day: '01', title: '进城，只补觉', time: '下午', desc: '取车后不要立刻上南岸。在雷克雅未克走一走，把第二天的油和下一天的天气看完。', places: ['雷克雅未克', '哈尔格林姆斯教堂'] },
      { day: '02', title: '瀑布与黑沙滩', time: '全天', desc: '塞里雅兰和斯科加瀑布都走下来。黑沙滩只在湿沙之外停留。', places: ['塞里雅兰瀑布', '斯科加瀑布', '雷尼斯黑沙滩'] },
      { day: '03', title: '冰川潟湖', time: '上午 — 午后', desc: '蓝冰在阴天更清楚。看完就住下，不要再连夜开往东岸。', places: ['杰古沙龙', '钻石沙滩'] },
      { day: '04', title: '东岸留给天气', time: '全天', desc: '风力正常就沿海岸走；风太大就缩短车程，把晚上留给休息。', places: ['东岸'] },
      { day: '05', title: '往北，少赶路', time: '上午 — 下午', desc: '这一天以抵达为目的。途中只停一处，不要把五个观景点塞进同一段路。', places: ['北部'] },
      { day: '06', title: '斯奈山折返', time: '全天', desc: '如果体力还在，绕去半岛看悬崖和小镇。否则就在北部多留一晚。', places: ['斯奈山'] },
      { day: '07', title: '回到雷克雅未克', time: '上午 — 晚上', desc: '还车前把油加满。城里只留一顿晚饭，极光有就当礼物，没有也不改行程。', places: ['雷克雅未克'] }
    ],
    spots: [
      { name: '瀑布后面', desc: '雨衣比相机重要，风会把水打回来。', image: '/images/cover-iceland.jpg' },
      { name: '黑沙滩', desc: '浪的速度比看起来快，退到干燥的地方。', image: '/images/cover-peak.jpg' },
      { name: '空路', desc: '东岸有很长的路什么都没有，这正是行程的一部分。', image: '/images/cover-road.jpg' }
    ],
    costs: [
      { name: '租车油费', value: '¥7000', percent: 39 },
      { name: '住宿', value: '¥6300', percent: 35 },
      { name: '餐饮', value: '¥3600', percent: 20 },
      { name: '门票', value: '¥1100', percent: 6 }
    ],
    tips: [
      '租车时确认风挡和砂石险，南岸的风会把车门吹开。',
      '黑沙滩不要下到浪线里，再好的角度也不值得。',
      '极光预报当参考，住宿选暗处，比连夜追光更稳。'
    ],
    notes: [
      { name: '老裴', avatar: '/images/avatar-2.jpg', text: '第三天我们原计划赶到东岸，风大就停了。第二天看潟湖反而更清楚。' },
      { name: '小林', avatar: '/images/avatar-3.jpg', text: '午饭全部在超市解决，预算才没有在第四天爆炸。' }
    ]
  },
  {
    id: 'chengdu-48h',
    destId: 'chengdu',
    title: '成都四十八小时：茶馆、巷子和一顿火锅',
    excerpt: '宽窄巷子走到头就离开，把晚上留给火锅。',
    cover: '/images/cover-food.jpg',
    category: '美食',
    city: '成都',
    days: 2,
    budgetText: '¥900',
    season: '3–4月，10–11月',
    reads: '4.6万',
    likes: '3910',
    author: '何慢',
    authorTitle: '写吃与街巷',
    avatar: '/images/avatar-3.jpg',
    updated: '2026.10',
    tags: ['火锅', '茶馆', '玉林'],
    route: '人民公园 → 宽窄巷子 → 玉林 → 火锅',
    rhythm: '慢',
    people: '朋友 / 独行',
    paragraphs: [
      '成都两天最怕排三家网红。一家茶馆、一条真正会走路的街、一顿把辣度选对的火锅，这三件事做完，城市的脾气就摸到了。',
      '熊猫基地值得去，但要占掉一个清晨。如果航班不允许早起，就把名额让给饭桌，也不会遗憾。'
    ],
    daysPlan: [
      { day: '01', title: '茶与第一条街', time: '下午 — 夜晚', desc: '人民公园坐下，直到不想说话。宽窄巷子只取一段，晚饭进火锅。', places: ['人民公园', '宽窄巷子', '火锅'] },
      { day: '02', title: '玉林慢慢吃', time: '上午 — 晚上', desc: '白天看小店和旧楼，中午换小馆。晚上如果还吃得下，就点一份不那么辣的。', places: ['玉林', '小馆', '春熙路'] }
    ],
    spots: [
      { name: '盖碗茶', desc: '座位比茶重要，选树荫，不选门口。', image: '/images/cover-cafe.jpg' },
      { name: '巷口', desc: '玉林的生活气在主街后面的那几条。', image: '/images/cover-alley.jpg' },
      { name: '火锅', desc: '牛油或清油先想清楚，再决定和谁一起吃。', image: '/images/cover-food.jpg' }
    ],
    costs: [
      { name: '餐饮', value: '¥420', percent: 46 },
      { name: '住宿', value: '¥360', percent: 40 },
      { name: '交通', value: '¥80', percent: 9 },
      { name: '茶与杂项', value: '¥40', percent: 5 }
    ],
    tips: [
      '不能吃辣就直说，鸳鸯锅是正常选择，不是妥协。',
      '宽窄巷子的小吃适合看，正餐换到外面会更好吃。',
      '茶馆可以坐很久，出发前把后半天留空。'
    ],
    notes: [
      { name: '唐糖', avatar: '/images/avatar-1.jpg', text: '火锅我们选了清油，第二天还能继续走路。红锅不是每个人的第一顿。' },
      { name: '陈舟', avatar: '/images/avatar-4.jpg', text: '人民公园的下午比我预想的长，宽窄只是路过，这样刚好。' }
    ]
  },
  {
    id: 'sanya-winter',
    destId: 'sanya',
    title: '三亚入冬：把四天从酒店里救出来',
    excerpt: '晒是必须的，但市区的晚饭和清晨的海不该被取消。',
    cover: '/images/cover-island.jpg',
    category: '海岛',
    city: '三亚',
    days: 4,
    budgetText: '¥3200',
    season: '11月–次年2月',
    reads: '2.9万',
    likes: '2104',
    author: '林夏',
    authorTitle: '常写西南的慢路线',
    avatar: '/images/avatar-1.jpg',
    updated: '2026.01',
    tags: ['过冬', '亚龙湾', '海边'],
    route: '亚龙湾 → 西岛 → 海棠湾 → 市区',
    rhythm: '慢',
    people: '家庭 / 情侣',
    paragraphs: [
      '冬天来三亚，是为了把日程泡软，不是为了把海上项目排满。选一个湾住下来，比每天搬运行李更像度假。',
      '海鲜一定先问价。这一句比任何餐厅推荐都重要，能省下来的钱足够换一次真正舒服的晚饭。'
    ],
    daysPlan: [
      { day: '01', title: '下水之前先晒一会儿', time: '下午', desc: '入住后只去酒店附近的沙滩。第一天不安排跨区交通。', places: ['亚龙湾'] },
      { day: '02', title: '半天交给海', time: '上午', desc: '西岛或近海浮潜二选一。晕船的人不要把项目放在早饭后立刻出发。', places: ['西岛'] },
      { day: '03', title: '换一条更安静的岸', time: '全天', desc: '去海棠湾走公共沙滩，下午回酒店。晚上可以什么都不做。', places: ['海棠湾'] },
      { day: '04', title: '市区吃一顿明白的', time: '上午 — 下午', desc: '椰子鸡或问清价格的海鲜。赶航班就别再加景点。', places: ['市区', '第一市场'] }
    ],
    spots: [
      { name: '清晨的水', desc: '九点前下海，光和人都不挤。', image: '/images/cover-island.jpg' },
      { name: '另一段沙', desc: '海棠湾仍能找到没有遮阳伞的空档。', image: '/images/cover-beach.jpg' },
      { name: '远一点的岛', desc: '西岛半天足够，不必在岛上过夜。', image: '/images/cover-bali.jpg' }
    ],
    costs: [
      { name: '住宿', value: '¥1600', percent: 50 },
      { name: '餐饮', value: '¥800', percent: 25 },
      { name: '交通', value: '¥480', percent: 15 },
      { name: '玩海', value: '¥320', percent: 10 }
    ],
    tips: [
      '防晒、淡水和一双能进水的鞋，比任何备选景点重要。',
      '周末房价会跳，能错开就错开。',
      '海上项目看当天风浪，被取消不是行程失败。'
    ],
    notes: [
      { name: '宋小岛', avatar: '/images/avatar-3.jpg', text: '我们把出海改成了在亚龙湾游泳，小孩反而玩得更久。' },
      { name: '阿禾', avatar: '/images/avatar-2.jpg', text: '市场只看不吃，椰子鸡留到最后一天，这个顺序是对的。' }
    ]
  },
  {
    id: 'beijing-weekend',
    destId: 'beijing',
    title: '北京周末：故宫上午，胡同傍晚',
    excerpt: '预约是第一件事。长城不要和市区挤在同一天。',
    cover: '/images/cover-wall.jpg',
    category: '城市漫步',
    city: '北京',
    days: 3,
    budgetText: '¥1500',
    season: '4–5月，9–10月',
    reads: '3.8万',
    likes: '2755',
    author: '周晚',
    authorTitle: '写城市怎么走路',
    avatar: '/images/avatar-2.jpg',
    updated: '2026.04',
    tags: ['故宫', '长城', '周末'],
    route: '故宫 → 景山 → 胡同 → 长城',
    rhythm: '适中',
    people: '朋友 / 家庭',
    paragraphs: [
      '北京的周末输在两个地方：没约上故宫，以及非要把长城和烤鸭塞进同一个黄昏。拆开就顺了。',
      '城廓值得看。景山不用待久，但那个高度会让前面走的路突然有了形状。'
    ],
    daysPlan: [
      { day: '01', title: '中轴线', time: '上午 — 傍晚', desc: '午门进、神武门出，接着上景山。晚饭吃在胡同，不吃在景区门口。', places: ['故宫', '景山', '胡同'] },
      { day: '02', title: '长城单独出去', time: '全天', desc: '慕田峪或八达岭按体力选。回来只安排洗澡和早睡。', places: ['长城'] },
      { day: '03', title: '如果还想走路', time: '上午', desc: '国子监、雍和宫外围或一场展览。下午的火车不用再加新的城门。', places: ['国子监', '五道营'] }
    ],
    spots: [
      { name: '城墙与山', desc: '先看近处的门，再看远处的轮廓。', image: '/images/cover-wall.jpg' },
      { name: '高一点的地方', desc: '景山的风通常比故宫里大。', image: '/images/cover-peak.jpg' },
      { name: '晚上的街', desc: '主街拍照，小街吃饭。', image: '/images/cover-night.jpg' }
    ],
    costs: [
      { name: '住宿', value: '¥700', percent: 46 },
      { name: '餐饮', value: '¥450', percent: 30 },
      { name: '门票交通', value: '¥280', percent: 19 },
      { name: '杂项', value: '¥70', percent: 5 }
    ],
    tips: [
      '故宫门票按实名预约，临时改期往往没有余票。',
      '长城那天穿最舒服的鞋，市区的漂亮鞋子留在酒店。',
      '周一不少博物馆闭馆，周末行程先看开放日。'
    ],
    notes: [
      { name: '赵小北', avatar: '/images/avatar-4.jpg', text: '景山只花了四十分钟，但那是两天里我最记得的一段。' },
      { name: '周予', avatar: '/images/avatar-1.jpg', text: '长城我们选了慕田峪，人还是多，但比把八达岭和烤鸭塞一起强。' }
    ]
  },
  {
    id: 'xiamen-walk',
    destId: 'xiamen',
    title: '厦门：鼓浪屿不必赶，环岛路负责收尾',
    excerpt: '先去八市吃早饭，再决定今天上不上岛。',
    cover: '/images/cover-coast.jpg',
    category: '城市漫步',
    city: '厦门',
    days: 3,
    budgetText: '¥1600',
    season: '10–12月',
    reads: '2.2万',
    likes: '1477',
    author: '何慢',
    authorTitle: '写吃与街巷',
    avatar: '/images/avatar-3.jpg',
    updated: '2026.10',
    tags: ['鼓浪屿', '八市', '环岛路'],
    route: '八市 → 鼓浪屿 → 沙坡尾 → 环岛路',
    rhythm: '慢',
    people: '情侣 / 朋友',
    paragraphs: [
      '鼓浪屿的名声让人以为必须在岛上过完一整天。其实半天足够，剩下的时间属于本岛的海风和一碗沙茶面。',
      '曾厝垵可以路过。真要坐下来，沙坡尾和环岛路的选择更宽。'
    ],
    daysPlan: [
      { day: '01', title: '市场与码头', time: '清晨 — 下午', desc: '八市吃完再排队上轮渡。岛上往内街走，龙头路见好就收。', places: ['八市', '轮渡', '鼓浪屿'] },
      { day: '02', title: '本岛走路', time: '下午 — 傍晚', desc: '沙坡尾看船和旧屋，再沿环岛路到黄厝。晚饭回市区。', places: ['沙坡尾', '环岛路', '黄厝'] },
      { day: '03', title: '如果还不想走', time: '上午', desc: '再去一次八市，买能带走的，不买占行李的。', places: ['八市', '中山路'] }
    ],
    spots: [
      { name: '岛上的巷', desc: '离开码头十分钟，声音会小下来。', image: '/images/cover-coast.jpg' },
      { name: '一段海岸', desc: '下午的环岛路适合没有目的地。', image: '/images/cover-beach.jpg' },
      { name: '早餐', desc: '沙茶面把这一天的节奏定下来。', image: '/images/cover-cafe.jpg' }
    ],
    costs: [
      { name: '住宿', value: '¥780', percent: 49 },
      { name: '餐饮', value: '¥520', percent: 32 },
      { name: '轮渡交通', value: '¥180', percent: 11 },
      { name: '杂项', value: '¥120', percent: 8 }
    ],
    tips: [
      '鼓浪屿船票分时段，热门时段会在码头把时间耗掉。',
      '岛上拉杆箱很痛苦，能当天往返就不要搬上去住。',
      '环岛路骑行注意返程是逆风还是顺风。'
    ],
    notes: [
      { name: '吴岛', avatar: '/images/avatar-2.jpg', text: '我们上午上岛、下午就回来，晚上在沙坡尾坐到很晚，这个拆法舒服。' },
      { name: '小满', avatar: '/images/avatar-1.jpg', text: '八市的面比我在岛上吃的任何一顿都更像厦门。' }
    ]
  },
  {
    id: 'shanghai-night',
    destId: 'shanghai',
    title: '上海：武康路走到外滩天黑',
    excerpt: '白天把梧桐走透，日落再把外滩交给天色。',
    cover: '/images/cover-night.jpg',
    category: '城市漫步',
    city: '上海',
    days: 2,
    budgetText: '¥1400',
    season: '4–5月，10–11月',
    reads: '5.2万',
    likes: '4206',
    author: '周晚',
    authorTitle: '写城市怎么走路',
    avatar: '/images/avatar-2.jpg',
    updated: '2026.10',
    tags: ['武康路', '外滩', '衡复'],
    route: '武康路 → 安福路 → 外白渡桥 → 外滩',
    rhythm: '慢',
    people: '情侣 / 独行',
    paragraphs: [
      '上海不需要一张很长的景点清单。武康路到安福路本身就是节目，外滩则负责把一天的光收掉。',
      '过江看天际线可以放在第二天。如果两天都用来逛街，这条路线会变得和任何商场一样。'
    ],
    daysPlan: [
      { day: '01', title: '衡复到外滩', time: '下午 — 夜晚', desc: '武康大楼看完就进小街。日落前到外白渡桥，顺着外滩走到不想走。', places: ['武康路', '安福路', '外滩'] },
      { day: '02', title: '换岸，或看一场展', time: '上午 — 下午', desc: '浦东和美术馆二选一。晚饭可以很早，也可以沿着苏州河走完再吃。', places: ['陆家嘴', '苏州河'] }
    ],
    spots: [
      { name: '梧桐拐角', desc: '适合没有目的地的两小时。', image: '/images/cover-alley.jpg' },
      { name: '天黑之后', desc: '外滩的灯比白天的队伍诚实。', image: '/images/cover-night.jpg' },
      { name: '河的另一侧', desc: '苏州河的夜风比外滩轻。', image: '/images/cover-hongkong.jpg' }
    ],
    costs: [
      { name: '餐饮', value: '¥520', percent: 37 },
      { name: '住宿', value: '¥700', percent: 50 },
      { name: '交通', value: '¥120', percent: 9 },
      { name: '展览', value: '¥60', percent: 4 }
    ],
    tips: [
      '外滩边走路边看手机，很容易错过最好的那段天色。',
      '武康路周末人多，想拍照就早一点，想坐咖啡馆就换到侧街。',
      '过江的夜景风大，比白天多带一件薄外套。'
    ],
    notes: [
      { name: '林间', avatar: '/images/avatar-1.jpg', text: '安福路我们只进了一家店。剩下的时间都在走路，这是对的。' },
      { name: '南风', avatar: '/images/avatar-4.jpg', text: '从邮政博物馆走到昌平路，比我预想的更适合聊天。' }
    ]
  },
  {
    id: 'guilin-4',
    destId: 'guilin',
    title: '桂林四日：西街少待，遇龙河多留',
    excerpt: '市区看山，阳朔把山走成路。兴坪留给清晨。',
    cover: '/images/cover-forest.jpg',
    category: '自然风光',
    city: '桂林',
    days: 4,
    budgetText: '¥2200',
    season: '4–5月，9–10月',
    reads: '1.9万',
    likes: '1322',
    author: '陈北',
    authorTitle: '写山和长途',
    avatar: '/images/avatar-4.jpg',
    updated: '2026.05',
    tags: ['阳朔', '遇龙河', '漓江'],
    route: '桂林 → 阳朔西街 → 遇龙河 → 兴坪',
    rhythm: '适中',
    people: '朋友 / 家庭',
    paragraphs: [
      '桂林的山在市区就能看见，但路在阳朔。西街负责第一眼的热闹，遇龙河和十里画廊负责把这趟行程变成你自己的。',
      '兴坪值得一个清晨。雾不是每天有，没有雾的山也仍然站在那里。'
    ],
    daysPlan: [
      { day: '01', title: '进城，尽快去阳朔', time: '下午', desc: '象鼻山看过就可以走。把第一晚住进阳朔，而不是在市区多耗一天。', places: ['象鼻山', '阳朔'] },
      { day: '02', title: '遇龙河两种速度', time: '全天', desc: '上午骑行，下午坐竹筏。同一条河，不要用同一种方式看两次。', places: ['遇龙河', '十里画廊'] },
      { day: '03', title: '兴坪的早晨', time: '清晨 — 下午', desc: '看山、看渡口，午后返回。西街的晚饭点到为止。', places: ['兴坪', '漓江'] },
      { day: '04', title: '返程留白', time: '上午', desc: '米粉吃一碗就去车站。不要在最后半天再加一个溶洞。', places: ['阳朔', '桂林站'] }
    ],
    spots: [
      { name: '江上的山', desc: '层次比任何一张背景图都长。', image: '/images/cover-peak.jpg' },
      { name: '河边的田', desc: '骑行时真正好看的往往不在码头。', image: '/images/cover-lake.jpg' },
      { name: '绿', desc: '画廊那一段适合慢慢骑，不适合跟团。', image: '/images/cover-forest.jpg' }
    ],
    costs: [
      { name: '住宿', value: '¥880', percent: 40 },
      { name: '餐饮', value: '¥560', percent: 25 },
      { name: '竹筏骑行', value: '¥460', percent: 21 },
      { name: '交通', value: '¥300', percent: 14 }
    ],
    tips: [
      '竹筏看天气和水位，被改期时把骑行放前面。',
      '西街夜里很吵，住宿离开主街两条就好很多。',
      '溶洞灯光重，时间紧就删掉，把白天还给山。'
    ],
    notes: [
      { name: '老裴', avatar: '/images/avatar-2.jpg', text: '兴坪没有雾，但我们还是待到中午。不亏。' },
      { name: '唐糖', avatar: '/images/avatar-3.jpg', text: '啤酒鱼点了整条，四个人刚好，两个人会剩下。' }
    ]
  },
  {
    id: 'bali-5',
    destId: 'bali',
    title: '巴厘岛五日：梯田两天，海边两天',
    excerpt: '中间留一天什么都不安排，这趟才算度假。',
    cover: '/images/cover-bali.jpg',
    category: '海岛',
    city: '巴厘岛',
    days: 5,
    budgetText: '¥4500',
    season: '5–9月',
    reads: '2.7万',
    likes: '1988',
    author: '林夏',
    authorTitle: '常写西南的慢路线',
    avatar: '/images/avatar-1.jpg',
    updated: '2026.06',
    tags: ['乌布', '梯田', '海边'],
    route: '乌布 → 德格拉朗 → 海神庙 → 海边',
    rhythm: '慢',
    people: '情侣 / 朋友',
    paragraphs: [
      '巴厘岛的疲惫常常来自每天换一个网红点。先住进乌布，把山和田看完，再去海边，中间强制留白。',
      '海神庙要看潮汐。退潮才能走近，涨潮时的照片和你到的时候可能不是同一座庙。'
    ],
    daysPlan: [
      { day: '01', title: '落地，去乌布', time: '下午', desc: '不要在库塔停留过夜，除非航班太晚。第一晚只用来适应。', places: ['乌布'] },
      { day: '02', title: '梯田与小路', time: '清晨 — 下午', desc: '德格拉朗早去。市场看一眼，午饭后找一家能坐很久的咖啡馆。', places: ['德格拉朗梯田', '乌布市场'] },
      { day: '03', title: '空白的一天', time: '全天', desc: '浮潜、SPA 或发呆。不要因为旁边的人很忙就把空白填上。', places: ['乌布'] },
      { day: '04', title: '换到海边', time: '上午 — 日落', desc: '只选一处海岸。海神庙按潮汐决定是顺路还是专程。', places: ['海神庙', '海边'] },
      { day: '05', title: '返程', time: '上午', desc: '把去机场的时间估得比地图更长。最后一餐在住宿附近解决。', places: ['机场'] }
    ],
    spots: [
      { name: '梯田', desc: '上午的绿和中午的绿不是一种颜色。', image: '/images/cover-bali.jpg' },
      { name: '海上的庙', desc: '先查潮汐，再决定出发。', image: '/images/cover-island.jpg' },
      { name: '内陆的绿', desc: '乌布周边的路比市中心值得开。', image: '/images/cover-forest.jpg' }
    ],
    costs: [
      { name: '住宿', value: '¥1800', percent: 40 },
      { name: '餐饮', value: '¥1100', percent: 24 },
      { name: '交通', value: '¥1000', percent: 22 },
      { name: '活动', value: '¥600', percent: 14 }
    ],
    tips: [
      '包车按天算清楚超时和油费，临时加景点最容易起争执。',
      '寺庙着装准备一条纱笼，现场租也行，但门口会排队。',
      '雨季路滑，梯田的台阶比照片陡。'
    ],
    notes: [
      { name: '宋小岛', avatar: '/images/avatar-3.jpg', text: '空白的那一天我们什么都没做，回来反而最常提起。' },
      { name: '阿禾', avatar: '/images/avatar-4.jpg', text: '海神庙我们赶上涨潮，远远看了看就去海边，也不算扑空。' }
    ]
  },
  {
    id: 'xiamen-sea',
    destId: 'xiamen',
    title: '厦门怎么吃：八市早起，海鲜把价问清',
    excerpt: '沙茶面、海蛎煎、土笋冻，一趟够认识这座城的胃口。',
    cover: '/images/cover-cafe.jpg',
    category: '美食',
    city: '厦门',
    days: 2,
    budgetText: '¥700',
    season: '10–12月',
    reads: '1.6万',
    likes: '990',
    author: '何慢',
    authorTitle: '写吃与街巷',
    avatar: '/images/avatar-3.jpg',
    updated: '2026.09',
    tags: ['沙茶面', '八市', '海鲜'],
    route: '八市 → 局口街 → 沙坡尾',
    rhythm: '轻松',
    people: '朋友 / 家庭',
    paragraphs: [
      '厦门的吃不在一份很长的榜单里。早上去八市，中午吃一碗正经的沙茶面，晚上如果要海鲜，就把计价方式问到能复述为止。',
      '土笋冻不是每个人都能接受。可以点小份，不要为了完成清单硬吃。'
    ],
    daysPlan: [
      { day: '01', title: '市场的早晨', time: '清晨 — 下午', desc: '八市解决早餐和眼界。中午换一家只做面的小店，晚上吃海蛎煎。', places: ['八市', '沙茶面', '海蛎煎'] },
      { day: '02', title: '海鲜或收手', time: '晚上', desc: '想吃海鲜就选有本地人的店，先看价目再落座。不想冒险，花生汤和甜品也是完整的一晚。', places: ['海鲜', '沙坡尾'] }
    ],
    spots: [
      { name: '早餐摊', desc: '越早，选择越多，队伍越像本地人。', image: '/images/cover-food.jpg' },
      { name: '一碗面', desc: '汤和面分开，是为了面还能保持劲道。', image: '/images/cover-cafe.jpg' },
      { name: '岸边晚饭', desc: '吃完可以走路，比坐在商场里结束更好。', image: '/images/cover-coast.jpg' }
    ],
    costs: [
      { name: '餐饮', value: '¥460', percent: 66 },
      { name: '交通', value: '¥80', percent: 11 },
      { name: '零食', value: '¥60', percent: 9 },
      { name: '饮品', value: '¥100', percent: 14 }
    ],
    tips: [
      '海鲜加工费经常单独算，下单前问一句。',
      '网红甜品排队超过二十分钟，就换下一家，厦门不缺这一口。',
      '早餐不要吃太撑，中午的面才是正题。'
    ],
    notes: [
      { name: '吴岛', avatar: '/images/avatar-1.jpg', text: '土笋冻我只吃了一口，海蛎煎倒是又加了一份。' },
      { name: '陈舟', avatar: '/images/avatar-2.jpg', text: '问清价格之后，海鲜这顿比我们害怕的便宜。' }
    ]
  },
  {
    id: 'beijing-hutong',
    destId: 'beijing',
    title: '北京胡同半天：绕开南锣，去国子监',
    excerpt: '主街负责拥挤，小街负责这趟值得走。',
    cover: '/images/cover-alley.jpg',
    category: '文化',
    city: '北京',
    days: 1,
    budgetText: '¥300',
    season: '4–5月，9–10月',
    reads: '2.1万',
    likes: '1560',
    author: '周晚',
    authorTitle: '写城市怎么走路',
    avatar: '/images/avatar-2.jpg',
    updated: '2026.03',
    tags: ['胡同', '国子监', '五道营'],
    route: '国子监 → 五道营 → 雍和宫外围',
    rhythm: '轻松',
    people: '独行 / 朋友',
    paragraphs: [
      '南锣鼓巷已经是一条商业街。想看胡同，就把时间交给国子监、方家胡同和五道营，走到不想说话再找一家小馆坐下。',
      '半天足够。胡同不适合配一个从早到晚的景点表，适合配一双舒服的鞋。'
    ],
    daysPlan: [
      { day: '01', title: '只走，不赶', time: '下午 — 傍晚', desc: '从国子监街进去，五道营看到尽头，晚饭在巷子里解决，不回主街。', places: ['国子监', '五道营', '方家胡同'] }
    ],
    spots: [
      { name: '树荫下的门', desc: '好看的往往没有招牌。', image: '/images/cover-alley.jpg' },
      { name: '一座可以路过的庙', desc: '雍和宫外围适合结束，不必一定进门。', image: '/images/cover-wall.jpg' },
      { name: '坐下来', desc: '走累了就找有本地客人的店。', image: '/images/cover-cafe.jpg' }
    ],
    costs: [
      { name: '餐饮', value: '¥150', percent: 50 },
      { name: '交通', value: '¥40', percent: 13 },
      { name: '饮品', value: '¥70', percent: 23 },
      { name: '杂项', value: '¥40', percent: 14 }
    ],
    tips: [
      '胡同里骑车和行人混行，拍照时先看身后。',
      '居民门口不是景点，镜头抬起来之前先看一眼。',
      '冬天风硬，这条路线比故宫更需要帽子。'
    ],
    notes: [
      { name: '赵小北', avatar: '/images/avatar-4.jpg', text: '我们在五道营坐了两次。一次是咖啡，一次是因为不想走了。' },
      { name: '南风', avatar: '/images/avatar-3.jpg', text: '没进南锣，后来看朋友的照片，觉得自己的选择没错。' }
    ]
  },
  {
    id: 'qhd-2d',
    destId: 'qinhuangdao',
    title: '秦皇岛两日：看海，顺路看长城入海',
    excerpt: '鸽子窝或北戴河走一段海岸，老龙头单独一个上午。',
    cover: '/images/cover-beach.jpg',
    category: '城市漫步',
    city: '秦皇岛',
    days: 2,
    budgetText: '¥1100',
    season: '6月，9–10月',
    reads: '8600',
    likes: '640',
    author: '陈北',
    authorTitle: '写山和长途',
    avatar: '/images/avatar-4.jpg',
    updated: '2026.09',
    tags: ['海边', '老龙头', '周末'],
    route: '北戴河 → 鸽子窝 → 老龙头',
    rhythm: '轻松',
    people: '家庭 / 朋友',
    paragraphs: [
      '从北京或天津过来，秦皇岛适合两天，不适合被排成景区联票。一段海岸、一顿问清价格的海鲜、一个老龙头，就够换气。',
      '阿那亚的建筑远远看一眼即可。不必为了别人的照片买票走进去。'
    ],
    daysPlan: [
      { day: '01', title: '先把海走一遍', time: '下午 — 傍晚', desc: '鸽子窝或北戴河选一段。中午回市区吃饭，不在景区将就。', places: ['鸽子窝', '北戴河'] },
      { day: '02', title: '长城碰到海', time: '上午', desc: '老龙头参观完就返程。夏天把水和防晒放在最外面。', places: ['老龙头'] }
    ],
    spots: [
      { name: '海岸', desc: '风比想象中大，外套比墨镜有用。', image: '/images/cover-beach.jpg' },
      { name: '入海的城', desc: '晴天看得到长城怎样碰到水面。', image: '/images/cover-wall.jpg' },
      { name: '另一段岸', desc: '不想挤就换到人少的那一截。', image: '/images/cover-coast.jpg' }
    ],
    costs: [
      { name: '交通', value: '¥360', percent: 33 },
      { name: '住宿', value: '¥420', percent: 38 },
      { name: '餐饮', value: '¥260', percent: 24 },
      { name: '门票', value: '¥60', percent: 5 }
    ],
    tips: [
      '海鲜先问是称重还是按份，加工费另算。',
      '日出值得早起，但要看当天风力，不要硬扛。',
      '返程如果是周日下午，把路上的时间估得更长。'
    ],
    notes: [
      { name: '老裴', avatar: '/images/avatar-2.jpg', text: '老龙头我们只待了一个上午，海边反而走了很久。这样分配刚刚好。' },
      { name: '小林', avatar: '/images/avatar-1.jpg', text: '阿那亚我们在外面看了看就去吃饺子了，不后悔。' }
    ]
  },
  {
    id: 'xian-3d',
    destId: 'xian',
    title: '西安三日：兵马俑之外，城墙根下的慢',
    excerpt: '第一天给历史，第二天给城墙和巷子，晚上都留给不夜城。',
    cover: '/images/cover-wall.jpg',
    category: '文化',
    city: '西安',
    days: 3,
    budgetText: '¥1300',
    season: '4–5月，9–10月',
    reads: '1.8万',
    likes: '1420',
    author: '石头',
    authorTitle: '西北路线收集者',
    avatar: '/images/avatar-3.jpg',
    updated: '2026.10',
    tags: ['兵马俑', '城墙', '大唐不夜城'],
    route: '钟鼓楼 → 兵马俑 → 城墙 → 大雁塔',
    rhythm: '适中',
    people: '朋友 / 家庭',
    paragraphs: [
      '西安的门票都很实在：兵马俑 120 元、城墙 54 元、大唐不夜城免费。真正要花心思的是预约——陕历博免费但要在公众号提前几天抢，兵马俑也建议提前买好。',
      '别把回民街当成全部，主街是给游客的，往大皮院和洒金桥走，价格立刻回到本地水平。'
    ],
    daysPlan: [
      { day: '01', title: '城里的一天', time: '上午 — 晚上', desc: '钟鼓楼看外观，回民街钻小巷吃午饭，傍晚永宁门上城墙（54 元）骑车看日落，晚上大唐不夜城看免费演出。', places: ['钟鼓楼', '洒金桥', '西安城墙', '大唐不夜城'] },
      { day: '02', title: '兵马俑专线', time: '全天', desc: '地铁 9 号线到华清池再打车。兵马俑 120 元，一号坑清晨人最少，一定请讲解。下午回城休息。', places: ['兵马俑', '华清宫'] },
      { day: '03', title: '陕历博与大雁塔', time: '上午 — 下午', desc: '陕历博免费但要提前抢预约，何家村窖藏是精华。下午大雁塔北广场，看音乐喷泉后返程。', places: ['陕西历史博物馆', '大雁塔'] }
    ],
    spots: [
      { name: '兵马俑一号坑', desc: '清晨开门进，人少到能看清每一张脸。', image: '/images/cover-wall.jpg' },
      { name: '城墙日落', desc: '永宁门上，自行车一圈 14 公里，顺光骑。', image: '/images/cover-road.jpg' },
      { name: '洒金桥', desc: '本地人的晚饭街，价格比回民街主街便宜一半。', image: '/images/cover-food.jpg' }
    ],
    costs: [
      { name: '交通', value: '¥260', percent: 20 },
      { name: '住宿', value: '¥450', percent: 35 },
      { name: '餐饮', value: '¥360', percent: 28 },
      { name: '门票', value: '¥230', percent: 17 }
    ],
    tips: [
      '兵马俑和陕历博都建议提前在官方公众号买票或预约，现场很可能没票。',
      '城墙傍晚去，白天晒且光线硬，日落前一小时上去最好。',
      '不夜城演出时间表会调整，到了先看当晚节目单再安排晚饭。'
    ],
    notes: [
      { name: '阿离', avatar: '/images/avatar-4.jpg', text: '兵马俑一定要请讲解，不然真的只是看泥人。我们拼了个讲解团人均才 20。' },
      { name: '大熊', avatar: '/images/avatar-2.jpg', text: '洒金桥的马二酸汤水饺排队但值得，回民街主街只吃了一串镜糕意思了一下。' }
    ]
  },
  {
    id: 'chongqing-2d',
    destId: 'chongqing',
    title: '重庆 48 小时：山城步道与翻滚的红锅',
    excerpt: '免费打卡点走两天，钱花在小面和火锅上。',
    cover: '/images/cover-night.jpg',
    category: '美食',
    city: '重庆',
    days: 2,
    budgetText: '¥800',
    season: '3–5月，10–11月',
    reads: '2.9万',
    likes: '2105',
    author: '山城小面',
    authorTitle: '在重庆迷路的成都人',
    avatar: '/images/avatar-4.jpg',
    updated: '2026.09',
    tags: ['洪崖洞', '长江索道', '火锅'],
    route: '解放碑 → 索道 → 李子坝 → 洪崖洞',
    rhythm: '紧凑',
    people: '学生 / 朋友',
    paragraphs: [
      '重庆是对穷游最友好的大城市：洪崖洞免费、李子坝免费、解放碑免费，花门票的只有长江索道单程 20 元。预算大头全在吃上。',
      '不要相信导航的直线距离。地图上 500 米，中间可能隔着 20 层楼高的台阶，运动鞋是这座城市的门票。'
    ],
    daysPlan: [
      { day: '01', title: '渝中半岛环线', time: '上午 — 夜晚', desc: '解放碑—八一好吃街午饭—长江索道（20 元）过江—南滨路看夜景—千厮门大桥拍洪崖洞全景。', places: ['解放碑', '长江索道', '南滨路', '洪崖洞'] },
      { day: '02', title: '轻轨与火锅', time: '上午 — 晚上', desc: '2 号线李子坝站看穿楼，观景平台免费。鹅岭二厂逛半天，晚上居民楼老火锅收尾。', places: ['李子坝', '鹅岭二厂'] }
    ],
    spots: [
      { name: '千厮门大桥', desc: '拍洪崖洞的最佳机位在桥上，不是在楼下人堆里。', image: '/images/cover-night.jpg' },
      { name: '李子坝观景台', desc: '轻轨进站时拍照连拍，两分钟一班车不用急。', image: '/images/cover-alley.jpg' },
      { name: '山城步道', desc: '第三步道最有老重庆味道，全程下坡走法是坐地铁到顶往下走。', image: '/images/cover-road.jpg' }
    ],
    costs: [
      { name: '交通', value: '¥120', percent: 15 },
      { name: '住宿', value: '¥300', percent: 38 },
      { name: '餐饮', value: '¥320', percent: 40 },
      { name: '杂项', value: '¥60', percent: 7 }
    ],
    tips: [
      '洪崖洞别进楼里排队，里面是商场，拍照去千厮门大桥或对岸大剧院江边。',
      '长江索道买单程就够，从上新街回程方向排队人少一半。',
      '火锅点微辣，重庆的微微辣不存在，微辣就是底线。'
    ],
    notes: [
      { name: '辣子', avatar: '/images/avatar-1.jpg', text: '信了导航走 800 米去吃饭，结果爬了 40 分钟楼梯。但到顶看到江景那一刻值了。' },
      { name: '桃桃', avatar: '/images/avatar-3.jpg', text: '二厂的天台咖啡能看到两江，比洪崖洞里人挤人舒服多了。' }
    ]
  },
  {
    id: 'dunhuang-3d',
    destId: 'dunhuang',
    title: '敦煌三日：莫高窟的票要先于机票订',
    excerpt: '238 元的 A 类票是全程最值得花的钱，其次是鸣沙山的日落。',
    cover: '/images/cover-road.jpg',
    category: '文化',
    city: '敦煌',
    days: 3,
    budgetText: '¥2800',
    season: '5月，9–10月',
    reads: '1.5万',
    likes: '986',
    author: '漠上沙',
    authorTitle: '大西北自驾爱好者',
    avatar: '/images/avatar-1.jpg',
    updated: '2026.08',
    tags: ['莫高窟', '鸣沙山', '月牙泉'],
    route: '鸣沙山 → 莫高窟 → 西线雅丹',
    rhythm: '适中',
    people: '情侣 / 独行',
    paragraphs: [
      '敦煌最容易踩的坑是没订莫高窟的票。旺季 A 类票 238 元，含两场数字电影加 8 个洞窟的专业讲解，在"莫高窟参观预约网"提前订，旺季经常提前一周售罄，没预约只能看应急票的 4 个窟。',
      '鸣沙山月牙泉 110 元，门票三天有效。记住一条：中午的沙漠是烤箱，下午 5 点后再进去。'
    ],
    daysPlan: [
      { day: '01', title: '鸣沙山的日落', time: '下午 — 夜晚', desc: '下午休整，5 点后进鸣沙山，爬沙山或骑骆驼，日落时分月牙泉亮灯，拍倒影后出来逛沙洲夜市。', places: ['鸣沙山月牙泉', '沙洲夜市'] },
      { day: '02', title: '莫高窟上午场', time: '上午', desc: '按预约时间提前到数字中心，迟到票作废。两场电影加摆渡车进窟区，讲解员带着走 8 个窟。', places: ['莫高窟数字中心', '莫高窟'] },
      { day: '03', title: '西线一日', time: '全天', desc: '包车走玉门关—雅丹魔鬼城，夏天雅丹日落在晚上八九点，做好晚归准备，带足水和干粮。', places: ['玉门关', '雅丹魔鬼城'] }
    ],
    spots: [
      { name: '莫高窟洞窟', desc: '窟内禁拍照，把相机收起来，眼睛比镜头记得更牢。', image: '/images/cover-peak.jpg' },
      { name: '鸣沙山山顶', desc: '爬上去很累，但坐滑沙下来只要几秒，值得。', image: '/images/cover-road.jpg' },
      { name: '沙洲夜市', desc: '驴肉黄面加杏皮水，是莫高窟一天的完美句号。', image: '/images/cover-food.jpg' }
    ],
    costs: [
      { name: '交通', value: '¥700', percent: 25 },
      { name: '住宿', value: '¥600', percent: 21 },
      { name: '餐饮', value: '¥420', percent: 15 },
      { name: '门票', value: '¥1080', percent: 39 }
    ],
    tips: [
      '莫高窟 A 类票提前在官网预约，按场次时间到，迟到真的进不去。',
      '沙漠里手机相机都怕细沙，准备防水袋或保鲜膜包好。',
      '西线包车提前谈好价格和返程时间，夏天日落后天全黑得很快。'
    ],
    notes: [
      { name: '藏狐', avatar: '/images/avatar-2.jpg', text: '数字中心的球幕电影出乎意料地震撼，看完再进窟区感受完全不一样。' },
      { name: '七月', avatar: '/images/avatar-4.jpg', text: '鸣沙山我们连着两天傍晚都去了一次，反正门票三天有效，第二次专门去拍星空。' }
    ]
  },
  {
    id: 'changsha-2d',
    destId: 'changsha',
    title: '长沙两日：免费景点加不夜城',
    excerpt: '景点几乎不花钱，预算全部交给胃。',
    cover: '/images/cover-food.jpg',
    category: '美食',
    city: '长沙',
    days: 2,
    budgetText: '¥800',
    season: '10–11月最佳',
    reads: '2.2万',
    likes: '1678',
    author: '弗兰伢子',
    authorTitle: '长沙本地逛吃博主',
    avatar: '/images/avatar-3.jpg',
    updated: '2026.10',
    tags: ['橘子洲', '岳麓山', '文和友'],
    route: '岳麓山 → 橘子洲 → 五一广场',
    rhythm: '紧凑',
    people: '学生 / 朋友',
    paragraphs: [
      '长沙是性价比之王：橘子洲免费、岳麓山免费、省博物馆免费（要预约），收钱的只有岳麓书院 40 元和橘子洲小火车 20 元。',
      '这座城市的重点在夜里。解放西凌晨两点还堵车不是段子，所以白天别排太满，留体力给晚上。'
    ],
    daysPlan: [
      { day: '01', title: '河西文化线', time: '上午 — 傍晚', desc: '岳麓山东门进（免费），爱晚亭、岳麓书院（40 元），南门下山就是湖南大学小吃街，傍晚橘子洲看青年毛泽东雕塑。', places: ['岳麓山', '岳麓书院', '湖南大学', '橘子洲'] },
      { day: '02', title: '河东吃喝线', time: '上午 — 深夜', desc: '省博物馆看马王堆（免费需预约），下午超级文和友逛拍（进免费），晚饭坡子街，夜里解放西。', places: ['湖南省博物馆', '文和友', '坡子街'] }
    ],
    spots: [
      { name: '橘子洲头', desc: '雕塑在洲最南端，小火车 20 元直达，走路往返要两小时。', image: '/images/cover-lake.jpg' },
      { name: '爱晚亭', desc: '11 月底红叶最好，平日清晨没人。', image: '/images/cover-forest.jpg' },
      { name: '文和友老街', desc: '复刻的老长沙市井，不吃饭也能逛，饭点取号等位上百桌。', image: '/images/cover-night.jpg' }
    ],
    costs: [
      { name: '交通', value: '¥100', percent: 12 },
      { name: '住宿', value: '¥280', percent: 35 },
      { name: '餐饮', value: '¥360', percent: 45 },
      { name: '杂项', value: '¥60', percent: 8 }
    ],
    tips: [
      '省博物馆免费但要在公众号预约，周一闭馆，马王堆汉墓展是镇馆之宝。',
      '茶颜悦色市中心遍地都是，别在橘子洲景区门口那家排半小时。',
      '文和友只拍照不用排吃饭的号，从侧门进老街区域直接逛。'
    ],
    notes: [
      { name: '果果', avatar: '/images/avatar-4.jpg', text: '两天喝了四杯茶颜，岭南佳荔和幽兰拿铁都试了，败给体重秤。' },
      { name: '阿哲', avatar: '/images/avatar-2.jpg', text: '湖大南门外的糖油粑粑 3 块钱一串，比步行街任何网红店都让我记得住。' }
    ]
  }
]
