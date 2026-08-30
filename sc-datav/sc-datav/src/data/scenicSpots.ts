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
];
