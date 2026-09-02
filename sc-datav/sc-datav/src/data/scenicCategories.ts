export type ScenicCategoryId = "culture" | "ecology" | "leisure" | "medical";

export interface ScenicCategory {
  id: ScenicCategoryId;
  label: string;
  persona: string;
  description: string;
}

export const scenicCategories: ScenicCategory[] = [
  {
    id: "culture",
    label: "文化画像",
    persona: "文化探寻者",
    description: "历史古迹、城市文脉与传统文化",
  },
  {
    id: "ecology",
    label: "生态画像",
    persona: "自然热衷者",
    description: "森林、湿地、湖泊与滨海自然景观",
  },
  {
    id: "leisure",
    label: "休闲画像",
    persona: "都市逃离者",
    description: "街区漫游、演艺体验与轻度假",
  },
  {
    id: "medical",
    label: "医疗康养画像",
    persona: "活力养护者",
    description: "温泉、中医、康复与健康旅居",
  },
];

const categorySpotIds: Record<ScenicCategoryId, string[]> = {
  culture: [
    "cangyanshan",
    "zhengding-gucheng",
    "nanhu-kailuan",
    "shanhaiguan",
    "congtai",
    "zhili-zongdushu",
    "dajingmen",
    "bishu-shanzhuang",
    "cangzhou-tieshizi",
    "tianxia-diyicheng",
    "jingzhouta-shelita",
    "kongshan-baiyundong",
  ],
  ecology: [
    "baoduzhai",
    "nanhu-gongyuan",
    "nandaihe",
    "yongnian-wa-shidi",
    "baoding-taihang-budao",
    "caoyuan-tianlu",
    "minghu-shuixiu-gongyuan",
    "maojingba-senlin-gongyuan",
    "nandagang-shidi",
    "hengshuihu",
    "hongyihe-shengtai-jingguanqu",
  ],
  leisure: [
    "hetou-laojie",
    "xigang-huayuan",
    "guangfu-gucheng",
    "baoding-xidajie",
    "xinglongshan-jingqu",
    "nanchuan-laojie",
    "yulonghe-gongyuan",
    "zhiyou-hongloumeng-xiju-huancheng",
    "zhouwo-yinyue-xiaozhen",
    "dahuquan-gongyuan",
  ],
  medical: [
    "bailu-wenquan",
    "jingtianling-jingde-yanglaogongyu",
    "beidaihe-shengming-jiankang-shifanqu",
    "taihang-yaowanggu",
    "lianxiang-taihang-shuizhen",
    "chicheng-wenquan-dujiacun",
    "tangjiawan-zhongyi-kangyangguan",
    "guoxin-kangyangyuan",
    "guan-an-laikangjun-kangle-jingqu",
    "gucheng-yiling-kangyang-zhuangyuan",
    "bianque-wenhua-kangyang-dujiaqu",
  ],
};

export const scenicCategoryBySpotId: Record<string, ScenicCategoryId> =
  Object.entries(categorySpotIds).reduce<Record<string, ScenicCategoryId>>(
    (result, [category, ids]) => {
      ids.forEach((id) => {
        result[id] = category as ScenicCategoryId;
      });
      return result;
    },
    {}
  );

export function getScenicCategory(id: string) {
  return scenicCategoryBySpotId[id];
}
