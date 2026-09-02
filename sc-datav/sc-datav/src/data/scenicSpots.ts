export interface ScenicSpot {
  id: string;
  city: string;
  name: string;
  longitude: number;
  latitude: number;
  summary: string;
  activities: string;
  images: string[];
}

export const scenicSpots: ScenicSpot[] = [
  {
    id: "cangyanshan",
    city: "石家庄市",
    name: "苍岩山风景区",
    longitude: 114.196,
    latitude: 37.804,
    summary: "太行山深处的历史文化名山，以桥楼殿、福庆寺和悬空山路为核心景观，古建与峡谷山势相映成趣，也是电影《卧虎藏龙》的取景地。",
    activities: "桥楼殿与福庆寺、悬空栈道、太行峡谷观景",
    images: [
      "/sc-datav/scenic/gallery/cangyanshan-1.png",
      "/sc-datav/scenic/gallery/cangyanshan-2.png",
    ],
  },
  {
    id: "baoduzhai",
    city: "石家庄市",
    name: "抱犊寨",
    longitude: 114.276964,
    latitude: 38.088451,
    summary: "鹿泉西部的山顶古寨，四周峭壁环抱，南天门、五百罗汉堂和山顶视野是主要看点，并承载韩信背水一战的历史传说。",
    activities: "南天门、五百罗汉堂、客运索道、山顶观景",
    images: [
      "/sc-datav/scenic/gallery/baoduzhai-1.png",
      "/sc-datav/scenic/gallery/baoduzhai-2.png",
    ],
  },
  {
    id: "nanhu-kailuan",
    city: "唐山市",
    name: "南湖·开滦旅游景区",
    longitude: 118.174,
    latitude: 39.636,
    summary: "由采煤沉陷区修复而成的城市生态空间，融合南湖湿地景观与开滦矿山工业遗产，既可环湖休闲，也能了解近代煤炭工业历史。",
    activities: "开滦博物馆、丹凤朝阳、南湖湿地、环湖慢行",
    images: [
      "/sc-datav/scenic/gallery/nanhu-kailuan-1.png",
      "/sc-datav/scenic/gallery/nanhu-kailuan-2.png",
    ],
  },
  {
    id: "nandaihe",
    city: "秦皇岛市",
    name: "南戴河旅游度假区",
    longitude: 119.067,
    latitude: 39.683,
    summary: "以滨海沙滩、木栈道和海洋休闲为特色，兼具荷花景观、滨海湿地与亲海度假体验，适合在平缓区域慢行观景。",
    activities: "滨海木栈道、沙滩观景、仙螺岛跨海索道、荷花景观",
    images: [
      "/sc-datav/scenic/gallery/nandaihe-1.png",
      "/sc-datav/scenic/gallery/nandaihe-2.png",
    ],
  },
  {
    id: "congtai",
    city: "邯郸市",
    name: "丛台公园",
    longitude: 114.484,
    latitude: 36.615,
    summary: "邯郸赵文化的重要地标，丛台、七贤祠和碑林共同构成城市公园的历史文化脉络，适合散步、赏景和了解赵国故事。",
    activities: "武灵丛台、七贤祠、碑林、园林慢行",
    images: [
      "/sc-datav/scenic/gallery/congtai-1.png",
      "/sc-datav/scenic/gallery/congtai-2.png",
    ],
  },
  {
    id: "zhili-zongdushu",
    city: "保定市",
    name: "直隶总督署",
    longitude: 115.491,
    latitude: 38.858,
    summary: "保存完整的清代直隶总督办公衙署，中轴院落、仪门、大堂和二堂展现清代省级衙署格局，是保定历史文化参观的代表性场所。",
    activities: "仪门与大堂、二堂院落、清代衙署陈列、历史文化参观",
    images: ["/sc-datav/scenic/gallery/zhili-zongdushu-1.png"],
  },
  {
    id: "dajingmen",
    city: "张家口市",
    name: "大境门",
    longitude: 114.887,
    latitude: 40.775,
    summary: "明长城重要关隘和张家口历史地标，关门、城墙与长城博物馆串联起边塞防御和茶马贸易记忆，兼具历史街区体验。",
    activities: "关城广场观景、长城博物馆、明德口街、关帝庙",
    images: [
      "/sc-datav/scenic/gallery/dajingmen-1.png",
      "/sc-datav/scenic/gallery/dajingmen-2.png",
    ],
  },
  {
    id: "bishu-shanzhuang",
    city: "承德市",
    name: "避暑山庄",
    longitude: 117.939,
    latitude: 40.991,
    summary: "清代皇家园林与世界文化遗产，宫殿区、湖区、平原区和山地共同形成“移天缩地在君怀”的园林格局，兼具皇家建筑、湖光和山林景观。",
    activities: "宫殿区参观、湖区游船、环湖观景、平原区慢行",
    images: [
      "/sc-datav/scenic/gallery/bishu-shanzhuang-1.png",
      "/sc-datav/scenic/gallery/bishu-shanzhuang-2.png",
    ],
  },
  {
    id: "cangzhou-tieshizi",
    city: "沧州市",
    name: "沧州铁狮子景区",
    longitude: 117.015,
    latitude: 38.298,
    summary: "沧州铁狮与旧城遗址公园的核心文物，千年铸铁铁狮以“镇海吼”闻名，周边遗址展示古沧州的历史与铸造技艺。",
    activities: "铁狮文物观赏、旧城遗址参观、铸造工艺与历史故事",
    images: [
      "/sc-datav/scenic/gallery/cangzhou-tieshizi-1.png",
      "/sc-datav/scenic/gallery/cangzhou-tieshizi-2.png",
    ],
  },
  {
    id: "tianxia-diyicheng",
    city: "廊坊市",
    name: "天下第一城",
    longitude: 116.902,
    latitude: 39.695,
    summary: "以明清北京城为蓝本建设的大型仿古文化旅游区，城门、街市、园林和演艺空间集中呈现传统建筑与节庆活动，适合家庭慢游。",
    activities: "仿古城门与街市、园林景观、开城仪式、文化演艺",
    images: [
      "/sc-datav/scenic/gallery/tianxia-diyicheng-1.png",
      "/sc-datav/scenic/gallery/tianxia-diyicheng-2.png",
    ],
  },
  {
    id: "hengshuihu",
    city: "衡水市",
    name: "衡水湖国家级自然保护区",
    longitude: 115.589,
    latitude: 37.588,
    summary: "华北重要淡水湿地和国家级自然保护区，湖泊、芦苇、水鸟与科普体验构成生态旅游特色，也融合游船观景、闾里古镇等文化体验。",
    activities: "湿地观鸟、乘船游湖、生态科普、闾里古镇",
    images: [
      "/sc-datav/scenic/gallery/hengshuihu-1.png",
      "/sc-datav/scenic/gallery/hengshuihu-2.png",
    ],
  },
  {
    id: "kongshan-baiyundong",
    city: "邢台市",
    name: "崆山白云洞",
    longitude: 114.615,
    latitude: 37.477,
    summary: "国家地质公园中的大型喀斯特溶洞，五大洞厅以钟乳石、石笋和地下空间景观为特色，洞内恒温约17℃，适合地质科普与自然观赏。",
    activities: "五大洞厅、钟乳石景观、地质科普、洞内观景",
    images: [
      "/sc-datav/scenic/gallery/kongshan-baiyundong-1.png",
      "/sc-datav/scenic/gallery/kongshan-baiyundong-2.png",
    ],
  },
  {
    id: "zhengding-gucheng",
    city: "石家庄市",
    name: "正定古城",
    longitude: 114.574037,
    latitude: 38.144749,
    summary: "国家历史文化名城，隆兴寺、荣国府和古城街巷串起正定千年文脉。",
    activities: "隆兴寺、荣国府、古城墙、街巷漫步",
    images: [
      "/sc-datav/scenic/gallery/zhengding-gucheng-1.jpeg",
      "/sc-datav/scenic/gallery/zhengding-gucheng-2.jpeg",
      "/sc-datav/scenic/gallery/zhengding-gucheng-3.jpeg",
    ]
  },
  {
    id: "bailu-wenquan",
    city: "石家庄市",
    name: "白鹿温泉",
    longitude: 113.981522,
    latitude: 38.250221,
    summary: "平山知名温泉康养地，泉水资源与山间度假环境兼具。",
    activities: "温泉泡池、康养休闲、山景度假",
    images: [
      "/sc-datav/scenic/gallery/bailu-wenquan-1.jpeg",
      "/sc-datav/scenic/gallery/bailu-wenquan-2.jpeg",
    ]
  },
  {
    id: "nanhu-gongyuan",
    city: "唐山市",
    name: "南湖公园",
    longitude: 118.160704,
    latitude: 39.599583,
    summary: "由采煤沉降区修复而成的城市生态公园，是唐山的休闲客厅。",
    activities: "环湖骑行、丹凤朝阳广场、湿地观景",
    images: [
      "/sc-datav/scenic/gallery/nanhu-gongyuan-1.jpeg",
      "/sc-datav/scenic/gallery/nanhu-gongyuan-2.jpeg",
      "/sc-datav/scenic/gallery/nanhu-gongyuan-3.jpeg",
      "/sc-datav/scenic/gallery/nanhu-gongyuan-4.jpeg",
      "/sc-datav/scenic/gallery/nanhu-gongyuan-5.jpeg",
    ]
  },
  {
    id: "hetou-laojie",
    city: "唐山市",
    name: "河头老街",
    longitude: 118.075413,
    latitude: 39.561789,
    summary: "唐山夜游新地标，唐风演艺与民俗美食融合的沉浸式街区。",
    activities: "夜游演艺、特色美食、民俗体验",
    images: [
      "/sc-datav/scenic/gallery/hetou-laojie-1.jpeg",
      "/sc-datav/scenic/gallery/hetou-laojie-2.jpeg",
      "/sc-datav/scenic/gallery/hetou-laojie-3.jpeg",
    ]
  },
  {
    id: "jingtianling-jingde-yanglaogongyu",
    city: "唐山市",
    name: "敬天岭敬德养老公寓",
    longitude: 117.716,
    latitude: 39.774,
    summary: "玉田的医养结合型康养场所，适合慢节奏疗愈休闲。",
    activities: "医养服务、康养住宿、山地休闲",
    images: [
      "/sc-datav/scenic/gallery/jingtianling-jingde-yanglaogongyu-1.jpeg",
      "/sc-datav/scenic/gallery/jingtianling-jingde-yanglaogongyu-2.jpeg",
      "/sc-datav/scenic/gallery/jingtianling-jingde-yanglaogongyu-3.jpeg",
    ]
  },
  {
    id: "shanhaiguan",
    city: "秦皇岛市",
    name: "山海关（天下第一关）",
    longitude: 119.754144,
    latitude: 40.009364,
    summary: "万里长城入海处的雄关要塞，是秦皇岛最具代表性的历史地标。",
    activities: "天下第一关、老龙头、城墙登高",
    images: [
      "/sc-datav/scenic/gallery/shanhaiguan-1.jpeg",
      "/sc-datav/scenic/gallery/shanhaiguan-2.jpeg",
      "/sc-datav/scenic/gallery/shanhaiguan-3.jpeg",
      "/sc-datav/scenic/gallery/shanhaiguan-4.jpeg",
    ]
  },
  {
    id: "xigang-huayuan",
    city: "秦皇岛市",
    name: "西港花园",
    longitude: 119.607,
    latitude: 39.943,
    summary: "由老港区更新而来的滨海文艺空间，工业遗存与海景相融合。",
    activities: "港区漫步、海边拍照、工业遗存参观",
    images: [
      "/sc-datav/scenic/gallery/xigang-huayuan-1.jpeg",
      "/sc-datav/scenic/gallery/xigang-huayuan-2.jpeg",
      "/sc-datav/scenic/gallery/xigang-huayuan-3.jpeg",
    ]
  },
  {
    id: "beidaihe-shengming-jiankang-shifanqu",
    city: "秦皇岛市",
    name: "北戴河生命健康产业创新示范区",
    longitude: 119.505,
    latitude: 39.815,
    summary: "以医疗、康养和旅居服务为核心的滨海健康示范片区。",
    activities: "康养体验、医疗服务、滨海休闲",
    images: [
      "/sc-datav/scenic/gallery/beidaihe-shengming-jiankang-shifanqu-1.jpeg",
      "/sc-datav/scenic/gallery/beidaihe-shengming-jiankang-shifanqu-2.jpeg",
      "/sc-datav/scenic/gallery/beidaihe-shengming-jiankang-shifanqu-3.jpeg",
    ]
  },
  {
    id: "yongnian-wa-shidi",
    city: "邯郸市",
    name: "永年洼湿地",
    longitude: 114.814,
    latitude: 36.78,
    summary: "广府城外的重要湿地生态区，荷塘、芦苇和候鸟资源丰富。",
    activities: "湿地观景、荷花赏游、观鸟",
    images: [
      "/sc-datav/scenic/gallery/yongnian-wa-shidi-1.jpeg",
      "/sc-datav/scenic/gallery/yongnian-wa-shidi-2.jpeg",
      "/sc-datav/scenic/gallery/yongnian-wa-shidi-3.jpeg",
    ]
  },
  {
    id: "guangfu-gucheng",
    city: "邯郸市",
    name: "广府古城",
    longitude: 114.784,
    latitude: 36.755,
    summary: "水城格局完整的北方古城，城墙、护城河与古街保存较好。",
    activities: "城墙漫步、护城河游览、古城骑行",
    images: [
      "/sc-datav/scenic/gallery/guangfu-gucheng-1.jpeg",
      "/sc-datav/scenic/gallery/guangfu-gucheng-2.jpeg",
      "/sc-datav/scenic/gallery/guangfu-gucheng-3.jpeg",
      "/sc-datav/scenic/gallery/guangfu-gucheng-4.jpeg",
    ]
  },
  {
    id: "taihang-yaowanggu",
    city: "邯郸市",
    name: "太行药王谷",
    longitude: 113.623,
    latitude: 36.585,
    summary: "太行山里的中医药文化景区，兼具山地生态与养生体验。",
    activities: "药文化参观、山地步道、康养体验",
    images: [
      "/sc-datav/scenic/gallery/taihang-yaowanggu-1.jpeg",
      "/sc-datav/scenic/gallery/taihang-yaowanggu-2.jpeg",
      "/sc-datav/scenic/gallery/taihang-yaowanggu-3.jpeg",
    ]
  },
  {
    id: "baoding-taihang-budao",
    city: "保定市",
    name: "保定太行步道",
    longitude: 115.165,
    latitude: 39.316,
    summary: "串联保西山区的长距离步道，适合徒步、观景和串联山村风光。",
    activities: "山地徒步、村落风景、观景休憩",
    images: [
      "/sc-datav/scenic/gallery/baoding-taihang-budao-1.jpeg",
      "/sc-datav/scenic/gallery/baoding-taihang-budao-2.jpeg",
      "/sc-datav/scenic/gallery/baoding-taihang-budao-3.jpeg",
    ]
  },
  {
    id: "baoding-xidajie",
    city: "保定市",
    name: "保定西大街",
    longitude: 115.492,
    latitude: 38.873,
    summary: "保定老城核心街区，民国风貌与城市烟火气相互交织。",
    activities: "老街漫步、非遗体验、城市打卡",
    images: [
      "/sc-datav/scenic/gallery/baoding-xidajie-1.jpeg",
      "/sc-datav/scenic/gallery/baoding-xidajie-2.jpeg",
      "/sc-datav/scenic/gallery/baoding-xidajie-3.jpeg",
    ]
  },
  {
    id: "lianxiang-taihang-shuizhen",
    city: "保定市",
    name: "恋乡·太行水镇",
    longitude: 115.311,
    latitude: 39.294,
    summary: "易县近郊的山水文旅小镇，集民俗、住宿和慢游体验于一体。",
    activities: "水镇漫游、民俗体验、餐饮住宿",
    images: [
      "/sc-datav/scenic/gallery/lianxiang-taihang-shuizhen-1.jpeg",
      "/sc-datav/scenic/gallery/lianxiang-taihang-shuizhen-2.jpeg",
      "/sc-datav/scenic/gallery/lianxiang-taihang-shuizhen-3.jpeg",
    ]
  },
  {
    id: "caoyuan-tianlu",
    city: "张家口市",
    name: "草原天路",
    longitude: 114.978611,
    latitude: 41.111944,
    summary: "张北经典自驾线路，草原、风车和丘陵公路景观连成一片。",
    activities: "自驾观景、草原拍照、风车路线",
    images: [
      "/sc-datav/scenic/gallery/caoyuan-tianlu-1.jpeg",
      "/sc-datav/scenic/gallery/caoyuan-tianlu-2.jpeg",
      "/sc-datav/scenic/gallery/caoyuan-tianlu-3.jpeg",
    ]
  },
  {
    id: "minghu-shuixiu-gongyuan",
    city: "张家口市",
    name: "明湖秀水主题公园",
    longitude: 114.830306,
    latitude: 40.681232,
    summary: "宣化城区的滨水公园，湖面开阔，适合散步和观鸟。",
    activities: "湖边慢行、观鸟、休闲散步",
    images: [
      "/sc-datav/scenic/gallery/minghu-shuixiu-gongyuan-1.jpeg",
      "/sc-datav/scenic/gallery/minghu-shuixiu-gongyuan-2.jpeg",
      "/sc-datav/scenic/gallery/minghu-shuixiu-gongyuan-3.jpeg",
    ]
  },
  {
    id: "chicheng-wenquan-dujiacun",
    city: "张家口市",
    name: "赤城温泉度假村",
    longitude: 115.835,
    latitude: 40.757,
    summary: "赤城著名温泉度假地，山地环境和温泉康养是主要特色。",
    activities: "温泉泡浴、度假休憩、山地观景",
    images: [
      "/sc-datav/scenic/gallery/chicheng-wenquan-dujiacun-1.jpeg",
      "/sc-datav/scenic/gallery/chicheng-wenquan-dujiacun-2.jpeg",
      "/sc-datav/scenic/gallery/chicheng-wenquan-dujiacun-3.jpeg",
    ]
  },
  {
    id: "maojingba-senlin-gongyuan",
    city: "承德市",
    name: "茅荆坝国家森林公园",
    longitude: 118.09,
    latitude: 41.514,
    summary: "承德北部的高森林覆盖率公园，是天然氧吧和避暑地。",
    activities: "森林漫步、避暑休闲、生态观光",
    images: [
      "/sc-datav/scenic/gallery/maojingba-senlin-gongyuan-1.jpeg",
      "/sc-datav/scenic/gallery/maojingba-senlin-gongyuan-2.jpeg",
      "/sc-datav/scenic/gallery/maojingba-senlin-gongyuan-3.jpeg",
    ]
  },
  {
    id: "xinglongshan-jingqu",
    city: "承德市",
    name: "兴隆山景区",
    longitude: 117.832536,
    latitude: 40.480528,
    summary: "以高山栈道、悬崖电梯和山谷景观著称的山地景区。",
    activities: "悬崖观景、栈道徒步、电梯登高",
    images: [
      "/sc-datav/scenic/gallery/xinglongshan-jingqu-1.jpeg",
      "/sc-datav/scenic/gallery/xinglongshan-jingqu-2.jpeg",
      "/sc-datav/scenic/gallery/xinglongshan-jingqu-3.jpeg",
    ]
  },
  {
    id: "tangjiawan-zhongyi-kangyangguan",
    city: "承德市",
    name: "唐家湾景区中医康养馆",
    longitude: 118.150174,
    latitude: 40.984084,
    summary: "结合温泉与中医康养的体验点，主打疗愈和放松。",
    activities: "中医康养、温泉疗愈、正骨理疗",
    images: [
      "/sc-datav/scenic/gallery/tangjiawan-zhongyi-kangyangguan-1.jpeg",
      "/sc-datav/scenic/gallery/tangjiawan-zhongyi-kangyangguan-2.jpeg",
      "/sc-datav/scenic/gallery/tangjiawan-zhongyi-kangyangguan-3.jpeg",
    ]
  },
  {
    id: "nandagang-shidi",
    city: "沧州市",
    name: "南大港湿地",
    longitude: 117.493,
    latitude: 38.282,
    summary: "沧州重要湿地生态区，芦苇、水鸟和栈道观景是亮点。",
    activities: "观鸟、湿地栈道、芦苇景观",
    images: [
      "/sc-datav/scenic/gallery/nandagang-shidi-1.jpeg",
      "/sc-datav/scenic/gallery/nandagang-shidi-2.jpeg",
      "/sc-datav/scenic/gallery/nandagang-shidi-3.jpeg",
    ]
  },
  {
    id: "nanchuan-laojie",
    city: "沧州市",
    name: "南川老街",
    longitude: 116.849,
    latitude: 38.303,
    summary: "运河边的复古街区，夜游和运河文化体验感很强。",
    activities: "运河夜游、老街漫步、餐饮打卡",
    images: [
      "/sc-datav/scenic/gallery/nanchuan-laojie-1.jpeg",
      "/sc-datav/scenic/gallery/nanchuan-laojie-2.jpeg",
      "/sc-datav/scenic/gallery/nanchuan-laojie-3.jpeg",
    ]
  },
  {
    id: "guoxin-kangyangyuan",
    city: "沧州市",
    name: "国欣康养园",
    longitude: 116.88,
    latitude: 38.286,
    summary: "以康养服务为核心的休闲园区，适合安静度假和养生体验。",
    activities: "康养体验、休闲度假、园区漫步",
    images: [
      "/sc-datav/scenic/gallery/guoxin-kangyangyuan-1.jpeg",
      "/sc-datav/scenic/gallery/guoxin-kangyangyuan-2.jpeg",
    ]
  },
  {
    id: "yulonghe-gongyuan",
    city: "廊坊市",
    name: "御龙河公园",
    longitude: 116.683,
    latitude: 39.516,
    summary: "廊坊城区的滨水公园，环境开阔，适合日常休闲散步。",
    activities: "滨水慢行、亲子休闲、城市观景",
    images: [
      "/sc-datav/scenic/gallery/yulonghe-gongyuan-1.jpeg",
      "/sc-datav/scenic/gallery/yulonghe-gongyuan-2.jpeg",
      "/sc-datav/scenic/gallery/yulonghe-gongyuan-3.jpeg",
      "/sc-datav/scenic/gallery/yulonghe-gongyuan-4.jpeg",
    ]
  },
  {
    id: "zhiyou-hongloumeng-xiju-huancheng",
    city: "廊坊市",
    name: "只有红楼梦·戏剧幻城",
    longitude: 116.999,
    latitude: 39.887,
    summary: "以《红楼梦》为主题的大型沉浸式戏剧空间，强调演艺体验。",
    activities: "沉浸式戏剧、主题演艺、夜游体验",
    images: [
      "/sc-datav/scenic/gallery/zhiyou-hongloumeng-xiju-huancheng-1.jpeg",
      "/sc-datav/scenic/gallery/zhiyou-hongloumeng-xiju-huancheng-2.jpeg",
      "/sc-datav/scenic/gallery/zhiyou-hongloumeng-xiju-huancheng-3.jpeg",
    ]
  },
  {
    id: "guan-an-laikangjun-kangle-jingqu",
    city: "廊坊市",
    name: "固安来康郡康乐景区",
    longitude: 116.309,
    latitude: 39.432,
    summary: "固安的医疗康养景区，温泉和健康服务是核心卖点。",
    activities: "温泉康养、健康服务、休闲住宿",
    images: [
      "/sc-datav/scenic/gallery/guan-an-laikangjun-kangle-jingqu-1.jpeg",
      "/sc-datav/scenic/gallery/guan-an-laikangjun-kangle-jingqu-2.jpeg",
      "/sc-datav/scenic/gallery/guan-an-laikangjun-kangle-jingqu-3.jpeg",
    ]
  },
  {
    id: "jingzhouta-shelita",
    city: "衡水市",
    name: "景州塔（舍利塔）",
    longitude: 116.285,
    latitude: 37.693,
    summary: "衡水景县的千年古塔，是地方历史文化的重要地标。",
    activities: "古塔参观、历史打卡、周边游览",
    images: [
      "/sc-datav/scenic/gallery/jingzhouta-shelita-1.jpeg",
      "/sc-datav/scenic/gallery/jingzhouta-shelita-2.jpeg",
    ]
  },
  {
    id: "zhouwo-yinyue-xiaozhen",
    city: "衡水市",
    name: "周窝音乐小镇",
    longitude: 115.92,
    latitude: 38.037,
    summary: "以音乐产业和文艺氛围著称的小镇，轻松又有特色。",
    activities: "音乐体验、乐器文化、慢逛小镇",
    images: [
      "/sc-datav/scenic/gallery/zhouwo-yinyue-xiaozhen-1.jpeg",
      "/sc-datav/scenic/gallery/zhouwo-yinyue-xiaozhen-2.jpeg",
      "/sc-datav/scenic/gallery/zhouwo-yinyue-xiaozhen-3.jpeg",
    ]
  },
  {
    id: "gucheng-yiling-kangyang-zhuangyuan",
    city: "衡水市",
    name: "故城以岭康养庄园",
    longitude: 115.975,
    latitude: 37.369,
    summary: "依托中医药资源打造的康养庄园，适合养生旅居。",
    activities: "中医养生、康养住宿、休闲体验",
    images: [
      "/sc-datav/scenic/gallery/gucheng-yiling-kangyang-zhuangyuan-1.jpeg",
      "/sc-datav/scenic/gallery/gucheng-yiling-kangyang-zhuangyuan-2.jpeg",
      "/sc-datav/scenic/gallery/gucheng-yiling-kangyang-zhuangyuan-3.jpeg",
    ]
  },
  {
    id: "hongyihe-shengtai-jingguanqu",
    city: "邢台市",
    name: "洪溢河生态景观区",
    longitude: 114.531,
    latitude: 37.08,
    summary: "邢台城区的滨河生态空间，适合散步和亲水观景。",
    activities: "滨河漫步、生态观景、亲水休闲",
    images: [
      "/sc-datav/scenic/gallery/hongyihe-shengtai-jingguanqu-1.jpeg",
      "/sc-datav/scenic/gallery/hongyihe-shengtai-jingguanqu-2.jpeg",
      "/sc-datav/scenic/gallery/hongyihe-shengtai-jingguanqu-3.jpeg",
    ]
  },
  {
    id: "dahuquan-gongyuan",
    city: "邢台市",
    name: "达活泉公园",
    longitude: 114.49,
    latitude: 37.072,
    summary: "邢台老牌城市公园，湖泉景观和市民休闲氛围浓厚。",
    activities: "泉湖观景、健身散步、亲子游玩",
    images: [
      "/sc-datav/scenic/gallery/dahuquan-gongyuan-1.jpeg",
      "/sc-datav/scenic/gallery/dahuquan-gongyuan-2.jpeg",
      "/sc-datav/scenic/gallery/dahuquan-gongyuan-3.jpeg",
    ]
  },
  {
    id: "bianque-wenhua-kangyang-dujiaqu",
    city: "邢台市",
    name: "扁鹊文化康养度假区",
    longitude: 114.5,
    latitude: 37.283,
    summary: "以扁鹊文化和中医康养为主题的度假区域，适合慢游养生。",
    activities: "扁鹊文化、中医康养、山地度假",
    images: [
      "/sc-datav/scenic/gallery/bianque-wenhua-kangyang-dujiaqu-1.jpeg",
      "/sc-datav/scenic/gallery/bianque-wenhua-kangyang-dujiaqu-2.jpeg",
      "/sc-datav/scenic/gallery/bianque-wenhua-kangyang-dujiaqu-3.jpeg",
    ]
  },
];
