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
    summary: "中国历史文化名山，《卧虎藏龙》取景地。",
    activities: "桥楼殿、福庆寺、登山观景",
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
    summary: "天下奇寨，也是韩信背水一战的古战场。",
    activities: "南天门、五百罗汉堂、客运索道",
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
    summary: "5A级景区，工业遗产与生态修复的典范。",
    activities: "开滦博物馆、丹凤朝阳、环湖骑行",
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
    summary: "国家4A级景区，融合荷花文化与海洋生态。",
    activities: "南戴河国际娱乐中心、仙螺岛跨海索道",
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
    summary: "邯郸城市标志，成语典故“胡服骑射”的发生地。",
    activities: "武灵丛台、七贤祠、碑林",
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
    summary: "中国保存最完整的清代省级衙署。",
    activities: "清代衙署建筑群、历史陈列",
    images: ["/sc-datav/scenic/gallery/zhili-zongdushu-1.png"],
  },
  {
    id: "dajingmen",
    city: "张家口市",
    name: "大境门",
    longitude: 114.887,
    latitude: 40.775,
    summary: "万里长城四大关口之一，始建于顺治元年。",
    activities: "登长城关隘、参观长城博物馆",
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
    summary: "世界文化遗产，中国最大的皇家园林。",
    activities: "宫殿区参观、湖区游船、山区游览",
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
    summary: "天下第一狮，唐代铸成。",
    activities: "观赏铁狮子、了解“镇海吼”传说",
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
    summary: "按1:1比例仿建明清北京皇城建筑群。",
    activities: "前门商业街、仿圆明园、开城仪式",
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
    summary: "5A级景区，华北最大的淡水湿地。",
    activities: "观鸟、乘船游湖、湿地生态游览",
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
    summary: "全球同纬度最大溶洞，距今约5亿年形成。",
    activities: "五大洞厅、喀斯特景观观赏",
    images: [
      "/sc-datav/scenic/gallery/kongshan-baiyundong-1.png",
      "/sc-datav/scenic/gallery/kongshan-baiyundong-2.png",
    ],
  },
];
