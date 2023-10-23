import fetch from 'node-fetch';
export default {
    myBigJob: {
      task: async ({ strapi }) => {
        const entries = await strapi.entityService.findMany("api::i18n.i18n", {
          fields: ["key", "en", "vi", "ja", "zh", "es"],
        });
  
        const fetchDataGithub = async (url: string) => {
          try {
            const response = await fetch(url);
  
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
  
            const data = await response.json();
            return data;
          } catch (error) {
            console.error("There was a problem fetching the data:", error);
            throw error;
          }
        };
        interface LanguageData {
          en: string;
          vi: string;
          zh: string;
          ja: string;
          es: string;
        }
  
        interface DataItem {
          [sectionKey: string]: {
            [commonKey: string]: LanguageData;
          };
        }
  
        interface MergeData {
          key: string;
          en: { [platform: string]: string };
          vi: { [platform: string]: string };
          zh: { [platform: string]: string };
          ja: { [platform: string]: string };
          es: { [platform: string]: string };
        }
  
        const fetchAllData = async () => {
          // Get all URL gihub the data extensions
          const url_extension_en =
            "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/extension/Json/en.json";
          const url_extension_es =
            "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/extension/Json/es.json";
          const url_extension_vi =
            "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/extension/Json/vi.json";
          const url_extension_zh =
            "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/extension/Json/zh.json";
          const url_extension_ja =
            "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/extension/Json/ja.json";
          // Get all URL the data web
          const url_web_en =
            "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/web/Json/en.json";
          const url_web_es =
            "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/web/Json/es.json";
          const url_web_vi =
            "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/web/Json/vi.json";
          const url_web_zh =
            "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/web/Json/zh.json";
          const url_web_ja =
            "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/web/Json/ja.json";
          // Get all URL the data mobi
          const url_mobi_en =
            "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/mobile/Json/en.json";
          const url_mobi_es =
            "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/mobile/Json/es.json";
          const url_mobi_vi =
            "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/mobile/Json/vi.json";
          const url_mobi_zh =
            "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/mobile/Json/zh.json";
          const url_mobi_ja =
            "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/mobile/Json/ja.json";
  
          try {
            // Get all data extension
            const data_extension_en: any = await fetchDataGithub(
              url_extension_en
            );
            const data_extension_es: any = await fetchDataGithub(
              url_extension_es
            );
            const data_extension_vi: any = await fetchDataGithub(
              url_extension_vi
            );
            const data_extension_zh: any = await fetchDataGithub(
              url_extension_zh
            );
            const data_extension_ja: any = await fetchDataGithub(
              url_extension_ja
            );
            // console.log("data_extension_en", data_extension_en);
  
            const combinedExtension: DataItem[] = [];
            // Iterate through keys in en.json
            for (const sectionKey in data_extension_en) {
              const item: DataItem = {};
  
              for (const commonKey in data_extension_en[sectionKey]) {
                item[sectionKey] = item[sectionKey] || {}; // Initialize the sectionKey if it doesn't exist
                item[sectionKey][commonKey] = {
                  en: data_extension_en[sectionKey][commonKey],
                  vi: data_extension_vi[sectionKey][commonKey],
                  zh: data_extension_zh[sectionKey][commonKey],
                  ja: data_extension_ja[sectionKey][commonKey],
                  es: data_extension_es[sectionKey][commonKey],
                };
              }
  
              combinedExtension.push(item); // Push the item into the array
            }
  
            // console.log("combinedExtension", combinedExtension);
  
            // Get all data web
            const data_web_en: any = await fetchDataGithub(url_web_en);
            const data_web_es: any = await fetchDataGithub(url_web_es);
            const data_web_vi: any = await fetchDataGithub(url_web_vi);
            const data_web_zh: any = await fetchDataGithub(url_web_zh);
            const data_web_ja: any = await fetchDataGithub(url_web_ja);
  
            // Create an empty combined object
            const combinedWeb: DataItem[] = [];
            // Iterate through keys in en.json
            for (const sectionKey in data_web_en) {
              const item: DataItem = {};
  
              for (const commonKey in data_web_en[sectionKey]) {
                item[sectionKey] = item[sectionKey] || {};
                item[sectionKey][commonKey] = {
                  en: data_web_en[sectionKey][commonKey],
                  vi: data_web_vi[sectionKey][commonKey],
                  zh: data_web_zh[sectionKey][commonKey],
                  ja: data_web_ja[sectionKey][commonKey],
                  es: data_web_es[sectionKey][commonKey],
                };
              }
              combinedWeb.push(item);
            }
  
            // console.log("combinedWeb", combinedWeb);
            // Get all data mobi
            const data_mobi_en: any = await fetchDataGithub(url_mobi_en);
            const data_mobi_es: any = await fetchDataGithub(url_mobi_es);
            const data_mobi_vi: any = await fetchDataGithub(url_mobi_vi);
            const data_mobi_zh: any = await fetchDataGithub(url_mobi_zh);
            const data_mobi_ja: any = await fetchDataGithub(url_mobi_ja);
  
            // Create an empty combined array
            const combinedMobi: DataItem[] = [];
            // Iterate through keys in en.json
            for (const sectionKey in data_mobi_en) {
              const item: DataItem = {};
  
              for (const commonKey in data_mobi_en[sectionKey]) {
                item[sectionKey] = item[sectionKey] || {};
                item[sectionKey][commonKey] = {
                  en: data_mobi_en[sectionKey][commonKey],
                  vi: data_mobi_vi[sectionKey][commonKey],
                  zh: data_mobi_zh[sectionKey][commonKey],
                  ja: data_mobi_ja[sectionKey][commonKey],
                  es: data_mobi_es[sectionKey][commonKey],
                };
              }
              combinedMobi.push(item);
            }
            const MergeDataCrawl: MergeData[] = [];
            for (const index in combinedWeb) {
              for (const key1 in combinedWeb[index]) {
                for (const key2 in combinedWeb[index][key1]) {
                  const mergedItem = {
                    en: {
                      web: combinedWeb[index][key1][key2].en,
                      mobi: combinedMobi[index][key1][key2].en,
                      extension: combinedExtension[index][key1][key2].en,
                    },
                    es: {
                      web: combinedWeb[index][key1][key2].es,
                      mobi: combinedMobi[index][key1][key2].es,
                      extension: combinedExtension[index][key1][key2].es,
                    },
                    ja: {
                      web: combinedWeb[index][key1][key2].ja,
                      mobi: combinedMobi[index][key1][key2].ja,
                      extension: combinedExtension[index][key1][key2].ja,
                    },
                    zh: {
                      web: combinedWeb[index][key1][key2].zh,
                      mobi: combinedMobi[index][key1][key2].zh,
                      extension: combinedExtension[index][key1][key2].zh,
                    },
                    vi: {
                      web: combinedWeb[index][key1][key2].vi,
                      mobi: combinedMobi[index][key1][key2].vi,
                      extension: combinedExtension[index][key1][key2].vi,
                    },
                    key: `${key1}.${key2}`,
                  };
                  const keyToCheck = mergedItem.key;
                  const existingEntry = entries.find(
                    (entry) => entry.key === keyToCheck
                  );
  
                  if (!existingEntry) {
                    const entry = await strapi.entityService.create(
                      "api::i18n.i18n",
                      {
                        data: {
                          key: (mergedItem as any).key,
                          en: (mergedItem as any).en,
                          vi: (mergedItem as any).vi,
                          zh: (mergedItem as any).zh,
                          ja: (mergedItem as any).ja,
                          es: (mergedItem as any).es,
                          publishedAt: new Date(),
                        },
                      }
                    );
                    console.log(mergedItem.key);
                    
                    return entry;
                  }
                  MergeDataCrawl.push(mergedItem);
                }
              }
            }
          } catch (error) {
            // Handle errors here if needed
            console.error("Error:", error);
          }
        };
        fetchAllData();
      },
      options: {
        // Every minute
        rule: "* * * * *",
      },
    },
  };
  