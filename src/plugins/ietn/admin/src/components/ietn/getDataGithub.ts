import {
  fetchData,
  url_mobi_en,
  url_mobi_ja,
  url_mobi_ru,
  url_mobi_vi,
  url_mobi_zh,
} from "./utils";

import {DataItem, MergeData} from "../../../../types";

export const fetchDataGithub = async () => {
  try {
    const combinedExtension: DataItem[] = [];
    const combinedWeb: DataItem[] = [];

    const data_mobi_en: any = await fetchData(url_mobi_en);
    const data_mobi_ru: any = await fetchData(url_mobi_ru);
    const data_mobi_vi: any = await fetchData(url_mobi_vi);
    const data_mobi_zh: any = await fetchData(url_mobi_zh);
    const data_mobi_ja: any = await fetchData(url_mobi_ja);
    
    const combinedMobi: DataItem[] = [];

    for (const sectionKey in data_mobi_en) {
      const item: DataItem = {};
      for (const commonKey in data_mobi_en[sectionKey]) {
        item[sectionKey] = item[sectionKey] || {};

        if (typeof data_mobi_en[sectionKey][commonKey] === "object") {
          item[sectionKey][commonKey] = item[sectionKey][commonKey] || {};
          for (const finalKey in data_mobi_en[sectionKey][commonKey]) {
            item[sectionKey][commonKey][finalKey] = {
              en: data_mobi_en[sectionKey][commonKey][finalKey],
              vi: data_mobi_vi[sectionKey][commonKey][finalKey],
              zh: data_mobi_zh[sectionKey][commonKey][finalKey],
              ja: data_mobi_ja[sectionKey][commonKey][finalKey],
              ru: data_mobi_ru[sectionKey][commonKey][finalKey],
            };
          }
        } else if (typeof data_mobi_en[sectionKey][commonKey] === "string") {
          item[sectionKey][commonKey] = {
            en: data_mobi_en[sectionKey][commonKey],
            vi: data_mobi_vi[sectionKey][commonKey],
            zh: data_mobi_zh[sectionKey][commonKey],
            ja: data_mobi_ja[sectionKey][commonKey],
            ru: data_mobi_ru[sectionKey][commonKey],
          };
        }
      }
      combinedMobi.push(item);
    }

    const MergeDataCrawl: MergeData[] = [];
    for (const index in combinedMobi) {
      for (const key1 in combinedMobi[index]) {
        for (const key2 in combinedMobi[index][key1]) {
          if (combinedMobi[index][key1][key2].en === undefined) {
            for (const key3 in combinedMobi[index][key1][key2]) {
              const mergedItem: MergeData = {
                en: {
                  web: combinedWeb[index]?.[key1]?.[key2]?.[key3]?.en || null,
                  mobi: combinedMobi[index]?.[key1]?.[key2]?.[key3]?.en || null,
                  extension:
                    combinedExtension[index]?.[key1]?.[key3]?.[key3]?.en ||
                    null,
                },
                ru: {
                  web: combinedWeb[index]?.[key1]?.[key2]?.[key3]?.ru || null,
                  mobi: combinedMobi[index]?.[key1]?.[key2]?.[key3]?.ru || null,
                  extension:
                    combinedExtension[index]?.[key1]?.[key2]?.[key3]?.ru ||
                    null,
                },
                ja: {
                  web: combinedWeb[index]?.[key1]?.[key2]?.[key3]?.ja || null,
                  mobi: combinedMobi[index]?.[key1]?.[key2]?.[key3]?.ja || null,
                  extension:
                    combinedExtension[index]?.[key1]?.[key2]?.[key3]?.ja ||
                    null,
                },
                zh: {
                  web: combinedWeb[index]?.[key1]?.[key2]?.[key3]?.zh || null,
                  mobi: combinedMobi[index]?.[key1]?.[key2]?.[key3]?.zh || null,
                  extension:
                    combinedExtension[index]?.[key1]?.[key2]?.[key3]?.zh ||
                    null,
                },
                vi: {
                  web: combinedWeb[index]?.[key1]?.[key2]?.[key3]?.vi || null,
                  mobi: combinedMobi[index]?.[key1]?.[key2]?.[key3]?.vi || null,
                  extension:
                    combinedExtension[index]?.[key1]?.[key2]?.[key3]?.vi ||
                    null,
                },
                key: `${key1}.${key2}.${key3}`,
              };
              MergeDataCrawl.push(mergedItem)
            }
          } else {
            const mergedItem: MergeData = {
              en: {
                web: combinedWeb[index]?.[key1]?.[key2]?.en || null,
                mobi: combinedMobi[index]?.[key1]?.[key2]?.en || null,
                extension: combinedExtension[index]?.[key1]?.[key2]?.en || null,
              },
              ru: {
                web: combinedWeb[index]?.[key1]?.[key2]?.ru || null,
                mobi: combinedMobi[index]?.[key1]?.[key2]?.ru || null,
                extension: combinedExtension[index]?.[key1]?.[key2]?.ru || null,
              },
              ja: {
                web: combinedWeb[index]?.[key1]?.[key2]?.ja || null,
                mobi: combinedMobi[index]?.[key1]?.[key2]?.ja || null,
                extension: combinedExtension[index]?.[key1]?.[key2]?.ja || null,
              },
              zh: {
                web: combinedWeb[index]?.[key1]?.[key2]?.zh || null,
                mobi: combinedMobi[index]?.[key1]?.[key2]?.zh || null,
                extension: combinedExtension[index]?.[key1]?.[key2]?.zh || null,
              },
              vi: {
                web: combinedWeb[index]?.[key1]?.[key2]?.vi || null,
                mobi: combinedMobi[index]?.[key1]?.[key2]?.vi || null,
                extension: combinedExtension[index]?.[key1]?.[key2]?.vi || null,
              },
              key: `${key1}.${key2}`,
            };
            MergeDataCrawl.push(mergedItem);
          }
        }
      }
    }
    return MergeDataCrawl;
  } catch (error) {
    console.error("Error:", error);
  }
};
