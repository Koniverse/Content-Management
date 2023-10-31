interface LanguageData {
  en: string;
  vi: string;
  zh: string;
  ja: string;
  ru: string;
}
interface LanguageObject {
  web: string;
  mobi: string;
  extension: string;
}
interface TransformedObject {
  [key: string]: LanguageObject | string;
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
  ru: { [platform: string]: string };
}

const langueges = ["en", "vi", "zh", "ja", "ru"];
function transformObject(input: any): TransformedObject {
  const transformed: TransformedObject = {};

  for (const key in input.attributes) {
    if (langueges.includes(key)) {
      transformed[key] = {
        web: input.attributes[key].web,
        mobi: input.attributes[key].mobi,
        extension: input.attributes[key].extension,
      };
    }
  }

  transformed["key"] = input.attributes.key;

  return transformed;
}

export const getDataFromStrapi = async () => {
  try {
    const response = await fetch(
      "http://localhost:1337/api/i18ns?populate=*"
    );
    const dataStrapi = await response.json();

    const transformedObjects = dataStrapi.data.map(transformObject);

    return transformedObjects;
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
  }
};

export const getDataToDele = async () => {
  try {
    const response = await fetch(
      "http://localhost:1337/api/i18ns?populate=*"
    );
    const dataStrapi = await response.json();


    return dataStrapi.data;
  } catch (error) {
    console.error("Error fetching data from Strapi:", error);
  }
};


export const createDataToStrapi = async (record) => {
  try {
    const response = await fetch(`http://localhost:1337/api/i18ns`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    });

    if (response.ok) {
      const createdData = await response.json();
    } else {
      console.error(`Failed to create data in Strapi`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

export const deleteAllStrapi = async () => {
  try {
    const dataStrapi = await getDataToDele();
    for (const index in dataStrapi) {
      const id = dataStrapi[index].id;
      try {
        const response = await fetch(
          `http://localhost:1337/api/i18ns/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
            },
          }
        );
        if (response.ok) {
        } else {
          console.error(
            `Failed to delete data with ID ${id} in Strapi. Status: ${response.status}`
          );
          const errorResponse = await response.text();
          console.error(`Error response: ${errorResponse}`);
        }
      } catch (error) {
        console.error(`Error deleting data with ID ${id}: ${error}`);
      }
    }
  } catch (error) {}
};

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

export const fetchAllData = async () => {
  // Get all URL gihub the data extensions
  const url_extension_en =
    "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/extension/Json/en.json";
  const url_extension_ru =
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
  const url_web_ru =
    "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/web/Json/es.json";
  const url_web_vi =
    "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/web/Json/vi.json";
  const url_web_zh =
    "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/web/Json/zh.json";
  const url_web_ja =
    "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/web/Json/ja.json";
  // Get all URL the data mobi
  const url_mobi_en =
    "https://raw.githubusercontent.com/Koniverse/SubWallet-Mobile/e593387c588be6e731bf8af4a44895a7ccfc70ca/src/utils/i18n/en_US.json";
  const url_mobi_ru =
    "https://raw.githubusercontent.com/Koniverse/SubWallet-Mobile/e593387c588be6e731bf8af4a44895a7ccfc70ca/src/utils/i18n/ru_RU.json";
  const url_mobi_vi =
    "https://raw.githubusercontent.com/Koniverse/SubWallet-Mobile/e593387c588be6e731bf8af4a44895a7ccfc70ca/src/utils/i18n/vi_VN.json";
  const url_mobi_zh =
    "https://raw.githubusercontent.com/Koniverse/SubWallet-Mobile/e593387c588be6e731bf8af4a44895a7ccfc70ca/src/utils/i18n/zh_CN.json";
  const url_mobi_ja =
    "https://raw.githubusercontent.com/Koniverse/SubWallet-Mobile/e593387c588be6e731bf8af4a44895a7ccfc70ca/src/utils/i18n/ja_JP.json";

  try {
    // Get all data extension
    const data_extension_en: any = await fetchDataGithub(url_extension_en);
    const data_extension_ru: any = await fetchDataGithub(url_extension_ru);
    const data_extension_vi: any = await fetchDataGithub(url_extension_vi);
    const data_extension_zh: any = await fetchDataGithub(url_extension_zh);
    const data_extension_ja: any = await fetchDataGithub(url_extension_ja);

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
          ru: data_extension_ru[sectionKey][commonKey],
        };
      }
      combinedExtension.push(item); // Push the item into the array
    }

    // Get all data web
    const data_web_en: any = await fetchDataGithub(url_web_en);
    const data_web_ru: any = await fetchDataGithub(url_web_ru);
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
          ru: data_web_ru[sectionKey][commonKey],
        };
      }
      combinedWeb.push(item);
    }

    // Get all data mobi
    const data_mobi_en: any = await fetchDataGithub(url_mobi_en);
    const data_mobi_ru: any = await fetchDataGithub(url_mobi_ru);
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
          ru: data_mobi_ru[sectionKey][commonKey],
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
            ru: {
              web: combinedWeb[index][key1][key2].ru,
              mobi: combinedMobi[index][key1][key2].ru,
              extension: combinedExtension[index][key1][key2].ru,
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
          MergeDataCrawl.push(mergedItem);
        }
      }
    }
    return MergeDataCrawl;
  } catch (error) {
    console.error("Error:", error);
  }
};
