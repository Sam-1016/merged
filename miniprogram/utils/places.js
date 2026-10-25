/**
 * ============================================================
 * 漫途 · AI 文旅攻略共创社区
 * 文件：utils/places.js
 * 静态目的地数据源：
 *   - 内置 17 个目的地示例数据，含区域分组、最佳季节、交通与吃喝信息。
 * ============================================================
 */
module.exports = [
  {
    id: 'dali',
    name: '大理',
    area: '云南',
    group: '西南',
    slogan: '把洱海走成一条很慢的线',
    temp: '19°',
    season: '春秋最舒服',
    daysText: '3天',
    budgetText: '¥1800',
    cover: '/images/cover-lake.jpg',
    intro: '大理不适合被一天打完。古城留一个早晨就够，真正值得的是环海西路的风、喜洲的天井，以及双廊把晚饭推迟到日落之后。',
    best: ['三月', '四月', '十月', '十一月'],
    highlights: [
      { name: '才村码头', desc: '傍晚水面很平，适合把第一天停在这里。', image: '/images/cover-lake.jpg' },
      { name: '喜洲古镇', desc: '白族院落把光留在天井里，巷子比古城安静。', image: '/images/cover-alley.jpg' },
      { name: '双廊', desc: '玉几岛看海，日落值得把行程收在这里。', image: '/images/cover-road.jpg' }
    ],
    plays: [
      { title: '第一天只逛古城', desc: '从南门进人民路，咖啡可以喝，纪念品先别买。傍晚去才村，不要再折返古城吃晚饭。' },
      { title: '第二天交给喜洲', desc: '严家民居看完就进小巷。破酥粑粑趁热吃，下午把时间浪费在田埂上。' },
      { title: '第三天沿西路北上', desc: '海舌可停留，但别在中午暴晒时拍照。双廊的傍晚比任何景点都值。' }
    ],
    foods: [
      { name: '饵丝', desc: '早餐选本地人排队的那家，酸辣口比重口鲜。' },
      { name: '破酥粑粑', desc: '喜洲现场烙的最好，凉了就失去意义。' },
      { name: '乳扇', desc: '烤着吃即可，买礼盒不如当场吃一份。' }
    ],
    stay: '想睡好就别住古城中心。才村靠海，喜洲更安静，双廊适合最后一晚看日落。'
  },
  {
    id: 'kyoto',
    name: '京都',
    area: '日本',
    group: '海外',
    slogan: '把一天过成一首短诗',
    temp: '16°',
    season: '三月樱，十一月枫',
    daysText: '2天',
    budgetText: '¥2600',
    cover: '/images/cover-kyoto.jpg',
    intro: '京都的好不在打卡数量。清晨进寺院，午后钻町屋，傍晚沿鸭川走。红叶季和樱花季要提前想好路线，因为所有人都在同一条路上。',
    best: ['三月', '四月', '十一月'],
    highlights: [
      { name: '伏见稻荷', desc: '开门就去，千本鸟居在上午九点后会失去层次。', image: '/images/cover-kyoto.jpg' },
      { name: '岚山', desc: '竹林很短，把时间留给河边和寺院。', image: '/images/cover-forest.jpg' },
      { name: '鸭川', desc: '日落前后坐在岸边，比再赶一个景点值。', image: '/images/cover-fuji.jpg' }
    ],
    plays: [
      { title: '清晨给寺院', desc: '伏见稻荷或清水寺二选一。想走路就选稻荷，想看街道就选清水坂，但清水坂中午后人最多。' },
      { title: '午后留给町屋', desc: '锦市场只取三样：豆腐、腌菜、当季甜品。买完就走，不要在市场里解决正餐。' },
      { title: '晚上沿河慢慢走', desc: '先看祗园的石板路，再去鸭川坐一会儿。居酒屋不必追网红，车站附近的小店更稳。' }
    ],
    foods: [
      { name: '汤豆腐', desc: '岚山和南禅寺一带都有，适合作为安静的午饭。' },
      { name: '抹茶甜品', desc: '宇治或祗园都可以，选能看到茶的那一杯。' },
      { name: '居酒屋小菜', desc: '烤鱼、冷豆腐、季节野菜，比套餐更像本地晚饭。' }
    ],
    stay: '住四条或河原町，晚上走路就能回到鸭川。岚山适合白天去，不适合当作唯一住宿地。'
  },
  {
    id: 'iceland',
    name: '冰岛',
    area: '北欧',
    group: '海外',
    slogan: '环岛要留出看天的时间',
    temp: '7°',
    season: '九月可看极光',
    daysText: '7天',
    budgetText: '¥18000',
    cover: '/images/cover-iceland.jpg',
    intro: '冰岛的花费和风力都比照片诚实。九月环岛，白天看瀑布和黑沙滩，夜里等极光。不要把每天的驾驶排满五个小时以上。',
    best: ['六月', '九月', '十月'],
    highlights: [
      { name: '塞里雅兰瀑布', desc: '可以走到瀑布后面，风大会把雨衣变成必需品。', image: '/images/cover-iceland.jpg' },
      { name: '黑沙滩', desc: '浪很危险，站在湿沙之外拍照。', image: '/images/cover-peak.jpg' },
      { name: '冰川潟湖', desc: '蓝冰在阴天更明显，留足停留时间。', image: '/images/cover-road.jpg' }
    ],
    plays: [
      { title: '南岸不要赶', desc: '瀑布、黑沙滩、冰川潟湖是同一条线，但每处都值得停下走路。' },
      { title: '东岸看天气', desc: '风力过大就改室内或缩短车程。冰岛的计划必须允许被天气改写。' },
      { title: '极光当礼物', desc: '九月有机会，但不是每天有。把住宿选在光污染少的小镇，而不是把行程全押在一次追光上。' }
    ],
    foods: [
      { name: '羊肉汤', desc: '长途驾驶之后，热汤比猎奇菜品更有用。' },
      { name: '超市三明治', desc: '白天补给靠超市，餐厅价格会把预算抬高。' },
      { name: '热狗', desc: '雷克雅未克的街头热狗适合当第一顿，不适合当代表作。' }
    ],
    stay: '按环岛方向一晚换一个落点。南岸、东岸、北部、斯奈山至少各住一晚，少走回头路。'
  },
  {
    id: 'chengdu',
    name: '成都',
    area: '四川',
    group: '西南',
    slogan: '把胃口和脚步都放慢',
    temp: '21°',
    season: '春秋晴日多',
    daysText: '2天',
    budgetText: '¥900',
    cover: '/images/cover-food.jpg',
    intro: '成都的精华在茶馆、巷子和晚饭，不在把宽窄巷子走成购物街。两天足够吃明白，也足够在人民公园坐到不想动。',
    best: ['三月', '四月', '十月', '十一月'],
    highlights: [
      { name: '人民公园', desc: '鹤鸣茶社点一碗茶，看本地人怎么把下午过完。', image: '/images/cover-cafe.jpg' },
      { name: '玉林', desc: '小酒馆和晚饭比宽窄更有生活气。', image: '/images/cover-alley.jpg' },
      { name: '火锅', desc: '选牛油还是清油，比选择哪家网红更重要。', image: '/images/cover-food.jpg' }
    ],
    plays: [
      { title: '白天坐茶馆', desc: '人民公园或望平街都可以。点盖碗茶，把手机放下半小时。' },
      { title: '傍晚去吃，不赶景点', desc: '火锅安排在第一晚。第二天换小馆，点钟水饺、甜水面或一份兔头。' },
      { title: '熊猫不是必选项', desc: '想去就早上去基地。若只有两天，把名额让给饭桌也不会后悔。' }
    ],
    foods: [
      { name: '火锅', desc: '不能吃辣就点清油或鸳鸯，红锅不必硬撑。' },
      { name: '甜水面', desc: '甜辣咸一起出现，适合当午后小食。' },
      { name: '盖碗茶', desc: '茶本身便宜，贵的是那个坐一下午的位置。' }
    ],
    stay: '住春熙路或太古里附近方便晚饭，想安静就住玉林。宽窄巷子里的客栈适合看热闹，不适合睡觉。'
  },
  {
    id: 'sanya',
    name: '三亚',
    area: '海南',
    group: '海岛',
    slogan: '冬天来，是为了把日程泡软',
    temp: '27°',
    season: '十一月到二月',
    daysText: '4天',
    budgetText: '¥3200',
    cover: '/images/cover-island.jpg',
    intro: '三亚的坑是把四天都交给酒店。海边要去，但亚龙湾、海棠湾和市区的晚饭不该是同一种节奏。避开周末涨价，体验会差一截。',
    best: ['十一月', '十二月', '一月', '二月'],
    highlights: [
      { name: '亚龙湾', desc: '沙细、水清，早上九点前最适合下水。', image: '/images/cover-island.jpg' },
      { name: '海棠湾', desc: '酒店密，公共沙滩仍能走到安静的一段。', image: '/images/cover-beach.jpg' },
      { name: '西岛', desc: '想看更干净的水，就安排半天，不必住下。', image: '/images/cover-bali.jpg' }
    ],
    plays: [
      { title: '前两天只负责晒和游', desc: '选一个湾住下，不要每天换酒店。防晒比行程单重要。' },
      { title: '留一天给海上项目', desc: '西岛或出海二选一。晕船的人不要把深潜排在早饭之后。' },
      { title: '最后一天回市区吃', desc: '第一市场适合看，吃则选有人排队的小店。椰子鸡可以留在这一顿。' }
    ],
    foods: [
      { name: '椰子鸡', desc: '清淡，适合海鲜吃腻的那一餐。' },
      { name: '海鲜', desc: '问清计价方式再下锅，照片菜单和实际价可能不是一回事。' },
      { name: '清补凉', desc: '下午从沙滩回来，比再点一杯甜品合适。' }
    ],
    stay: '带孩子或想省心住亚龙湾；想安静、酒店新，住海棠湾。三亚湾方便看落日，水的颜色普通一些。'
  },
  {
    id: 'beijing',
    name: '北京',
    area: '北京',
    group: '华北',
    slogan: '城廓、胡同，和必须提前约的故宫',
    temp: '17°',
    season: '四月与十月',
    daysText: '3天',
    budgetText: '¥1500',
    cover: '/images/cover-wall.jpg',
    intro: '北京周末最容易失败的原因只有一个：没预约。故宫、国博都要提前，胡同留到傍晚，长城单独放一天，不要和市区景点挤在一起。',
    best: ['四月', '五月', '十月'],
    highlights: [
      { name: '故宫', desc: '中轴线走一遍就够，角楼留给结束时。', image: '/images/cover-wall.jpg' },
      { name: '景山', desc: '用很短的时间看整座城的轮廓。', image: '/images/cover-peak.jpg' },
      { name: '胡同', desc: '南锣人多，国子监和五道营更适合走路。', image: '/images/cover-alley.jpg' }
    ],
    plays: [
      { title: '故宫单独一个上午', desc: '提前预约，从午门进、神武门出，出来直接上景山。' },
      { title: '长城单独一天', desc: '慕田峪或八达岭按体力选。市区景点不要再往这一天塞。' },
      { title: '傍晚只走路', desc: '什刹海可以看，饭最好吃在胡同小馆，而不是景区主街。' }
    ],
    foods: [
      { name: '炸酱面', desc: '卤要自己拌开，配菜按能吃完的量夹。' },
      { name: '铜锅涮肉', desc: '适合晚上，麻酱调料比肉的名气更关键。' },
      { name: '豆汁儿', desc: '可以尝一口，不必为了打卡喝完。' }
    ],
    stay: '住东城或前门附近，去故宫和胡同都方便。长城当天往返，不必为了早上出发住郊区。'
  },
  {
    id: 'xiamen',
    name: '厦门',
    area: '福建',
    group: '华东',
    slogan: '鼓浪屿不必赶，八市值得早起',
    temp: '24°',
    season: '十月到十二月',
    daysText: '3天',
    budgetText: '¥1600',
    cover: '/images/cover-coast.jpg',
    intro: '厦门的节奏在轮渡和海风里。鼓浪屿中午最挤，早上或傍晚更合适。沙坡尾适合散步，八市适合早餐，环岛路适合把一天收掉。',
    best: ['十月', '十一月', '十二月'],
    highlights: [
      { name: '鼓浪屿', desc: '避开团体到达的中午，巷子比码头好看。', image: '/images/cover-coast.jpg' },
      { name: '八市', desc: '早点来，沙茶面和海鲜都还新鲜。', image: '/images/cover-food.jpg' },
      { name: '环岛路', desc: '下午骑行或走路，看海看到天色变暖。', image: '/images/cover-beach.jpg' }
    ],
    plays: [
      { title: '第一早去八市', desc: '吃完再决定今天要不要上岛。饿着排队上轮渡，体验会差很多。' },
      { title: '鼓浪屿留半天', desc: '日光岩可去可不去。龙头路商业很重，往内街走才安静。' },
      { title: '环岛路收尾', desc: '黄厝沙滩看海，晚饭回到市区。曾厝垵适合路过，不适合久留。' }
    ],
    foods: [
      { name: '沙茶面', desc: '汤和面分开更好吃，配菜自己加。' },
      { name: '土笋冻', desc: '先看自己能不能接受口感，再决定要不要推荐给同行的人。' },
      { name: '海蛎煎', desc: '晚饭小食，趁热，蘸酱不要盖住海蛎的味道。' }
    ],
    stay: '住本岛轮渡码头附近最省事。鼓浪屿上住宿贵且搬运麻烦，除非明确想在岛上过一夜。'
  },
  {
    id: 'bali',
    name: '巴厘岛',
    area: '印尼',
    group: '海岛',
    slogan: '梯田、海边，中间留白',
    temp: '29°',
    season: '五月到九月',
    daysText: '5天',
    budgetText: '¥4500',
    cover: '/images/cover-bali.jpg',
    intro: '巴厘岛不必从库塔玩到乌鲁瓦图再折返乌布。五天可以分成内陆两天、海边两天，中间留一天什么都不安排。',
    best: ['五月', '六月', '九月'],
    highlights: [
      { name: '德格拉朗梯田', desc: '早上去，中午的光会把绿意照平。', image: '/images/cover-bali.jpg' },
      { name: '海神庙', desc: '退潮才能走近，先查潮汐再出发。', image: '/images/cover-island.jpg' },
      { name: '乌布', desc: '市场看一眼就好，真正的时间在周边的小路和咖啡馆。', image: '/images/cover-forest.jpg' }
    ],
    plays: [
      { title: '先住乌布', desc: '适应时差，看梯田和寺庙。库塔的热闹留到后半程，否则会一直想换地方。' },
      { title: '海边只选一处', desc: '水明漾、仓古或乌鲁瓦图按预算选，不要三处都住一晚。' },
      { title: '留一天空白', desc: '浮潜、SPA 或发呆三选一。空白不是浪费，是这趟行程的一部分。' }
    ],
    foods: [
      { name: '炒饭', desc: 'Nasi Goreng 是最稳的一餐，辣度可以先要一半。' },
      { name: '脏鸭餐', desc: '适合午饭，份量大，下午可以不再加餐。' },
      { name: '热带水果', desc: '山竹和芒果看季节，市场比餐厅实在。' }
    ],
    stay: '乌布适合前两晚，海边适合后两晚。交通时间比地图上看起来长，换住宿不要超过一次。'
  },
  {
    id: 'shanghai',
    name: '上海',
    area: '上海',
    group: '华东',
    slogan: '武康路、梧桐和傍晚的外滩',
    temp: '20°',
    season: '四月、十月',
    daysText: '2天',
    budgetText: '¥1400',
    cover: '/images/cover-night.jpg',
    intro: '上海适合用走路认识。武康路到安福路是一条线，外滩留在日落，苏州河的夜比很多人想象中安静。商场可以去，但不要占掉白天。',
    best: ['四月', '五月', '十月'],
    highlights: [
      { name: '武康路', desc: '梧桐和拐角咖啡馆，适合没有目的地的两小时。', image: '/images/cover-alley.jpg' },
      { name: '外滩', desc: '日落时到，天完全黑后再离开。', image: '/images/cover-night.jpg' },
      { name: '苏州河', desc: '从邮政博物馆走到昌平路，夜风很舒服。', image: '/images/cover-hongkong.jpg' }
    ],
    plays: [
      { title: '白天只走衡复', desc: '武康大楼看完就进小街。安福路可以喝一杯，不必家家都进。' },
      { title: '日落交给外滩', desc: '从外白渡桥走过去。陈毅广场人多，往北或往南几十米就松一些。' },
      { title: '第二天换浦东或换美术馆', desc: '想看天际线就过江，想看展就留在浦西。两件事塞进一个上午会两边都赶。' }
    ],
    foods: [
      { name: '生煎', desc: '小笼和生煎不要在同一餐解决，皮的焦香需要单独被吃到。' },
      { name: '本帮菜', desc: '红烧和糖色是主线，选有本地人的小馆。' },
      { name: '咖啡馆', desc: '衡复一带很多，选能坐下来的，不选只为拍照的。' }
    ],
    stay: '住衡复或静安，晚上走路回酒店是这趟行程的隐藏景点。陆家嘴适合看，不适合作为唯一落脚点。'
  },
  {
    id: 'guilin',
    name: '桂林',
    area: '广西',
    group: '西南',
    slogan: '山在两岸，人在船上',
    temp: '23°',
    season: '四月到十月',
    daysText: '4天',
    budgetText: '¥2200',
    cover: '/images/cover-peak.jpg',
    intro: '桂林市区看山，阳朔才把山走成路。西街人多，遇龙河和十里画廊更值得把时间花掉。兴坪的清晨通常比下午好。',
    best: ['四月', '五月', '九月', '十月'],
    highlights: [
      { name: '漓江', desc: '兴坪这一段最有层次，早上的雾是加分项。', image: '/images/cover-peak.jpg' },
      { name: '遇龙河', desc: '竹筏或骑行都可以，岸边的田比码头好看。', image: '/images/cover-lake.jpg' },
      { name: '十里画廊', desc: '租一辆车慢慢骑，不要跟团赶点。', image: '/images/cover-forest.jpg' }
    ],
    plays: [
      { title: '市区只留半天', desc: '象鼻山和两江四湖看过即可。把住宿尽早挪到阳朔。' },
      { title: '遇龙河给一整天', desc: '上午骑行，下午坐筏。同一条河用两种速度看，不会重复。' },
      { title: '兴坪单独一个清晨', desc: '看 20 元背景的那个角度可以去，但不要只为那一个点停留五分钟就走。' }
    ],
    foods: [
      { name: '啤酒鱼', desc: '阳朔的招牌，选活鱼现做，辣度先问。' },
      { name: '桂林米粉', desc: '卤水和汤是两套系统，早餐各试一次就懂。' },
      { name: '田螺酿', desc: '适合当小食，不要指望它成为正餐。' }
    ],
    stay: '阳朔住在西街边缘，走路能到又不会吵一整夜。兴坪适合为了清晨多住一晚。'
  },
  {
    id: 'qinhuangdao',
    name: '秦皇岛',
    area: '河北',
    group: '华北',
    slogan: '海边的两天，不必排满',
    temp: '18°',
    season: '九月最合适',
    daysText: '2天',
    budgetText: '¥1100',
    cover: '/images/cover-beach.jpg',
    intro: '秦皇岛适合从北京或天津过来换一口气。老龙头看长城入海，鸽子窝看日出，海鲜市场把计价问清楚。阿那亚可以远眺，不必为了打卡买票进园。',
    best: ['六月', '九月', '十月'],
    highlights: [
      { name: '老龙头', desc: '长城碰到海的地方，晴天最清楚。', image: '/images/cover-wall.jpg' },
      { name: '鸽子窝', desc: '日出比白天值得，风大就加一件外套。', image: '/images/cover-beach.jpg' },
      { name: '北戴河', desc: '沿着海岸走一段，比赶多个公园从容。', image: '/images/cover-coast.jpg' }
    ],
    plays: [
      { title: '第一天看海', desc: '鸽子窝或北戴河选一段海岸走完。中午回市区吃饭，不要在景区解决。' },
      { title: '第二天看老龙头', desc: '上午参观，下午返程。夏天把防晒和饮水放在包的最外层。' }
    ],
    foods: [
      { name: '海鲜', desc: '市场先问清是称重还是按份，加工费单独算。' },
      { name: '饺子', desc: '靠海的城市也有很好的饺子，适合吃腻海鲜的那一餐。' },
      { name: '花生与时令水果', desc: '昌黎一带的水果看季节，适合带回程的车上。' }
    ],
    stay: '住北戴河方便看海，住市区方便吃饭和返程。只有两天的话，少换一次酒店更重要。'
  },
  {
    id: 'xian',
    name: '西安',
    area: '陕西',
    group: '西北',
    slogan: '城墙根下，历史是可以走进去的',
    temp: '18°',
    season: '四月、十月最舒服',
    daysText: '3天',
    budgetText: '¥1300',
    cover: '/images/cover-wall.jpg',
    intro: '西安的硬核景点都要预约：兵马俑（120 元）在官方公众号提前买，陕西历史博物馆免费但要抢预约。城里留一天给城墙和钟鼓楼，晚上大唐不夜城免费看演出。',
    best: ['四月', '五月', '十月'],
    highlights: [
      { name: '兵马俑', desc: '120 元门票，一号坑清晨人最少。请个讲解或租讲解器，否则只是看土俑。', image: '/images/cover-wall.jpg' },
      { name: '西安城墙', desc: '54 元，永宁门上，租自行车骑一圈约 14 公里，日落前上去最好。', image: '/images/cover-road.jpg' },
      { name: '大唐不夜城', desc: '免费步行街，晚上有不倒翁和唐风演出，人多但气氛足。', image: '/images/cover-night.jpg' }
    ],
    plays: [
      { title: '第一天城里慢走', desc: '钟鼓楼看外观不必登楼，回民街只走主街之外的小巷：大皮院、洒金桥的吃的更本地。' },
      { title: '第二天留给兵马俑', desc: '地铁 9 号线到华清池再打车。上午看俑，下午顺路华清宫或直接回城休息，晚上再去不夜城。' },
      { title: '第三天陕历博加大雁塔', desc: '陕历博免费但要提前几天在公众号抢预约。大雁塔北广场看音乐喷泉，不必进寺。' }
    ],
    foods: [
      { name: '肉夹馍', desc: '选腊汁肉的，樊记、秦豫这类老店比景区门口的稳。' },
      { name: '羊肉泡馍', desc: '馍要自己掰，掰得越细越入味，留足半小时。' },
      { name: '凉皮与冰峰', desc: '三秦套餐：凉皮、肉夹馍、冰峰汽水，人均二十多吃好。' }
    ],
    stay: '住钟楼或大雁塔附近都方便。钟楼地铁交汇，大雁塔离不夜城近，看演出后走路回酒店。'
  },
  {
    id: 'chongqing',
    name: '重庆',
    area: '重庆',
    group: '西南',
    slogan: '8D 山城，导航会失灵的那种',
    temp: '20°',
    season: '春秋，夏天是火炉',
    daysText: '2天',
    budgetText: '¥800',
    cover: '/images/cover-night.jpg',
    intro: '重庆的核心体验大多免费：洪崖洞亮灯、李子坝轻轨穿楼、解放碑。花钱的只有长江索道（单程 20 元）和火锅。穿运动鞋，这里的台阶比景点多。',
    best: ['三月', '四月', '十月', '十一月'],
    highlights: [
      { name: '洪崖洞', desc: '免费，晚上 7 点后亮灯，从千厮门大桥上拍全景比挤进楼里好。', image: '/images/cover-night.jpg' },
      { name: '长江索道', desc: '单程 20 元，新华路站上新街站下，傍晚过江看两岸亮灯。', image: '/images/cover-road.jpg' },
      { name: '李子坝', desc: '2 号线穿楼，楼下观景平台免费，拍完坐车去鹅岭二厂。', image: '/images/cover-alley.jpg' }
    ],
    plays: [
      { title: '第一天走渝中半岛', desc: '解放碑—八一好吃街—长江索道过江—南滨路看对岸夜景，晚上回洪崖洞外拍全景。' },
      { title: '第二天轻轨游', desc: '2 号线李子坝看穿楼，鹅岭二厂文创园逛半天，磁器口可去可不去，晚上火锅收尾。' }
    ],
    foods: [
      { name: '火锅', desc: '居民楼老火锅比商场里的正宗，微辣对外地人已经是中辣。' },
      { name: '小面', desc: '早餐吃豌杂面，巷子里的摊比连锁店好吃。' },
      { name: '酸辣粉', desc: '八一好吃街尝一碗即可，留肚子给火锅。' }
    ],
    stay: '住解放碑或观音桥。解放碑离所有打卡点近，观音桥本地人夜生活多、酒店便宜些。'
  },
  {
    id: 'dunhuang',
    name: '敦煌',
    area: '甘肃',
    group: '西北',
    slogan: '莫高窟的票，比机票更先要订',
    temp: '15°',
    season: '五月、九月、十月',
    daysText: '3天',
    budgetText: '¥2800',
    cover: '/images/cover-road.jpg',
    intro: '敦煌最重要的事实：莫高窟旺季 A 类票 238 元，含数字电影和 8 个洞窟讲解，必须在"莫高窟参观预约网"提前订，旺季经常提前一周售罄。鸣沙山月牙泉 110 元，三天内可多次进入。',
    best: ['五月', '九月', '十月'],
    highlights: [
      { name: '莫高窟', desc: 'A 类票 238 元，先看两场数字电影再进窟区，讲解包含在票内。', image: '/images/cover-peak.jpg' },
      { name: '鸣沙山月牙泉', desc: '110 元，傍晚进：爬沙山看日落，月牙泉亮灯后拍倒影。', image: '/images/cover-road.jpg' },
      { name: '沙洲夜市', desc: '市区免费夜市，驴肉黄面和杏皮水是标配。', image: '/images/cover-food.jpg' }
    ],
    plays: [
      { title: '第一天下午鸣沙山', desc: '中午太热不进沙漠。下午 5 点后进去，骑骆驼或爬沙山，看完日落再出来。' },
      { title: '第二天上午莫高窟', desc: '预约几点的场就几点到，迟到票会作废。下午回市区休整，晚上沙洲夜市。' },
      { title: '第三天西线包车', desc: '玉门关、雅丹魔鬼城一条线，包车一天往返，夏天雅丹日落很晚，做好晚归准备。' }
    ],
    foods: [
      { name: '驴肉黄面', desc: '敦煌招牌，沙洲夜市和市区老店都有。' },
      { name: '杏皮水', desc: '本地解暑饮料，李广杏熬制，配烤肉正好。' },
      { name: '胡羊焖饼', desc: '羊肉和面皮一起焖，份量大，两人一份就够。' }
    ],
    stay: '住市区（沙洲镇）即可，去鸣沙山打车 10 分钟，去莫高窟有直达公交。西线那天不用换住宿。'
  },
  {
    id: 'qingdao',
    name: '青岛',
    area: '山东',
    group: '华北',
    slogan: '红瓦绿树，啤酒要喝当天的原浆',
    temp: '17°',
    season: '五月到十月',
    daysText: '2天',
    budgetText: '¥1000',
    cover: '/images/cover-coast.jpg',
    intro: '青岛的精华大多免费：栈桥、八大关、小鱼山、小麦岛。花钱的主要是啤酒博物馆（60 元，含一杯原浆一杯纯生）。夏天的海水浴场人多，九月水还温、人少了大半。',
    best: ['五月', '六月', '九月', '十月'],
    highlights: [
      { name: '栈桥', desc: '免费地标，清晨或傍晚去，冬天有海鸥。', image: '/images/cover-coast.jpg' },
      { name: '八大关', desc: '免费街区，梧桐和银杏季节最美，花石楼几块钱可进。', image: '/images/cover-alley.jpg' },
      { name: '啤酒博物馆', desc: '60 元含两杯鲜啤，原浆只有当天的好喝，瓶装带走没意义。', image: '/images/cover-food.jpg' }
    ],
    plays: [
      { title: '第一天沿海走', desc: '栈桥—小青岛—小鱼山俯瞰红瓦绿树，傍晚去小麦岛看日落，晚饭台东夜市。' },
      { title: '第二天八大关加啤酒', desc: '上午八大关慢走，第二海水浴场踩水，下午啤酒博物馆，喝完整好去车站。' }
    ],
    foods: [
      { name: '海鲜', desc: '营口路市场买海鲜找店加工，先问清加工费，比景区餐厅省一半。' },
      { name: '袋装鲜啤', desc: '街边塑料袋打散啤是本地日常，配蛤蜊（当地叫 ga la）正好。' },
      { name: '鲅鱼水饺', desc: '船歌鱼这类连锁品质稳定，市场边小店更便宜。' }
    ],
    stay: '住市南老城区（栈桥或五四广场附近），景点都能走到。想安静看海选石老人或小麦岛附近民宿。'
  },
  {
    id: 'changsha',
    name: '长沙',
    area: '湖南',
    group: '华中',
    slogan: '白天岳麓山，夜里不睡的城',
    temp: '19°',
    season: '十月、十一月',
    daysText: '2天',
    budgetText: '¥800',
    cover: '/images/cover-food.jpg',
    intro: '长沙的核心景点几乎免费：橘子洲（观光小火车 20 元）、岳麓山免费、岳麓书院 40 元。花钱全在吃：文和友拍照免费、吃饭取号排队，茶颜悦色走两步就有一家。',
    best: ['三月', '四月', '十月', '十一月'],
    highlights: [
      { name: '橘子洲', desc: '免费，毛主席青年雕塑在洲头，走路往返两小时，小火车 20 元省力。', image: '/images/cover-lake.jpg' },
      { name: '岳麓山', desc: '免费，东门进南门出正好下山到湖南大学，爱晚亭秋天红叶最出名。', image: '/images/cover-forest.jpg' },
      { name: '超级文和友', desc: '海信广场店还原老长沙市井，不吃饭也能进去逛拍。', image: '/images/cover-night.jpg' }
    ],
    plays: [
      { title: '第一天河西线', desc: '上午岳麓山（爱晚亭、岳麓书院 40 元），下山逛湖大小吃街，傍晚橘子洲看江景。' },
      { title: '第二天河东吃线', desc: '上午湖南省博物馆（免费，马王堆汉墓要预约），下午文和友逛拍，晚上坡子街加解放西夜生活。' }
    ],
    foods: [
      { name: '茶颜悦色', desc: '幽兰拿铁是招牌，市中心密度极高，不必在景区排长队那家。' },
      { name: '口味虾', desc: '夏天最应季，文和友排队久，巷子里老店味道不差。' },
      { name: '臭豆腐', desc: '黑色经典这类摊点现炸的最香，闻着臭吃着香不是传说。' }
    ],
    stay: '住五一广场附近，地铁 2 号线串起橘子洲、岳麓山和火车站，夜生活步行可达。'
  },
  {
    id: 'hangzhou',
    name: '杭州',
    area: '浙江',
    group: '华东',
    slogan: '西湖免费，但要看对时辰',
    temp: '18°',
    season: '三四月桃柳，九十月桂花',
    daysText: '2天',
    budgetText: '¥1200',
    cover: '/images/cover-lake.jpg',
    intro: '西湖本身免费，一圈 15 公里可骑车可步行。收费的是灵隐寺（飞来峰 45 元 + 灵隐寺香花券 30 元）。避开周末的断桥和雷峰塔，清晨的苏堤和浴鹄湾才是本地人的西湖。',
    best: ['三月', '四月', '九月', '十月'],
    highlights: [
      { name: '苏堤', desc: '免费，清晨 7 点前只有晨练的人，春天桃柳相间。', image: '/images/cover-lake.jpg' },
      { name: '灵隐寺', desc: '飞来峰 45 元 + 香花券 30 元，工作日早晨去，法喜寺在更里面更安静。', image: '/images/cover-forest.jpg' },
      { name: '九溪烟树', desc: '免费，从九溪走到龙井村，溪水茶园一路，秋天最佳。', image: '/images/cover-alley.jpg' }
    ],
    plays: [
      { title: '第一天环西湖', desc: '断桥—白堤—苏堤走一段，下午花港观鱼或浴鹄湾，傍晚雷峰塔对面长桥公园看日落。' },
      { title: '第二天灵隐加龙井', desc: '上午灵隐寺，中午天竺路吃素面，下午九溪走到龙井村喝茶，明前龙井按克买先尝后买。' }
    ],
    foods: [
      { name: '片儿川', desc: '杭州人的雪菜笋片肉丝面，菊英面馆这类老店最稳。' },
      { name: '西湖醋鱼', desc: '楼外楼名气大价格高，吃醋鱼前先确认草鱼的土腥味你能接受。' },
      { name: '定胜糕', desc: '河坊街现蒸的趁热吃，桂花糖藕同理。' }
    ],
    stay: '住龙翔桥或凤起路地铁站附近，步行到西湖 10 分钟。想清静住满陇桂雨或四眼井的青旅民宿。'
  }
]
