import {
  fetchData,
  url_extension_en,
  url_extension_ja,
  url_extension_ru,
  url_extension_vi,
  url_extension_zh,
  url_mobi_en,
  url_mobi_ja,
  url_mobi_ru,
  url_mobi_vi,
  url_mobi_zh,
  url_web_en,
  url_web_ja,
  url_web_ru,
  url_web_vi,
  url_web_zh,
} from "./utils";

interface LanguageData {
  en: string;
  vi: string;
  zh: string;
  ja: string;
  ru: string;
}
interface LanguageObject {
  web: string | null;
  mobi: string;
  extension: string | null;
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
  en: { [platform: string]: string | null };
  vi: { [platform: string]: string | null };
  zh: { [platform: string]: string | null };
  ja: { [platform: string]: string | null };
  ru: { [platform: string]: string | null };
}

const languages = ["en", "vi", "zh", "ja", "ru"];
// const languages = ["ru"];
// Get all URL gihub the data extensions

/// all functions
function transformObject(input: any): TransformedObject {
  const transformed: TransformedObject = {};
  for (const key in input.attributes) {
    if (languages.includes(key)) {
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
    const dataStrapi = await fetchData(
      "http://localhost:1337/api/i18ns?populate=*"
    );

    const transformedObjects = dataStrapi.data.map(transformObject);

    return transformedObjects;
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



export const fetchDataGithub = async () => {
  try {
    // Get all data extension
    // const data_extension_en: any = await fetchData(url_extension_en);
    // const data_extension_ru: any = await fetchData(url_extension_ru);
    // const data_extension_vi: any = await fetchData(url_extension_vi);
    // const data_extension_zh: any = await fetchData(url_extension_zh);
    // const data_extension_ja: any = await fetchData(url_extension_ja);

    const combinedExtension: DataItem[] = [];
    // Iterate through keys in en.json
    // for (const sectionKey in data_extension_en) {
    //   const item: DataItem = {};
    //   for (const commonKey in data_extension_en[sectionKey]) {
    //     item[sectionKey] = item[sectionKey] || {}; // Initialize the sectionKey if it doesn't exist
    //     item[sectionKey][commonKey] = {
    //       en: data_extension_en[sectionKey][commonKey],
    //       vi: data_extension_vi[sectionKey][commonKey],
    //       zh: data_extension_zh[sectionKey][commonKey],
    //       ja: data_extension_ja[sectionKey][commonKey],
    //       ru: data_extension_ru[sectionKey][commonKey],
    //     };
    //   }
    //   combinedExtension.push(item); // Push the item into the array
    // }
    // Get all data web
    // const data_web_en: any = await fetchData(url_web_en);
    // const data_web_ru: any = await fetchData(url_web_ru);
    // const data_web_vi: any = await fetchData(url_web_vi);
    // const data_web_zh: any = await fetchData(url_web_zh);
    // const data_web_ja: any = await fetchData(url_web_ja);

    // Create an empty combined object
    const combinedWeb: DataItem[] = [];
    // Iterate through keys in en.json
    // for (const sectionKey in data_web_en) {
    //   const item: DataItem = {};
    //   for (const commonKey in data_web_en[sectionKey]) {
    //     item[sectionKey] = item[sectionKey] || {};
    //     item[sectionKey][commonKey] = {
    //       en: data_web_en[sectionKey][commonKey],
    //       vi: data_web_vi[sectionKey][commonKey],
    //       zh: data_web_zh[sectionKey][commonKey],
    //       ja: data_web_ja[sectionKey][commonKey],
    //       ru: data_web_ru[sectionKey][commonKey],
    //     };
    //   }
    //   combinedWeb.push(item);
    // }
    // Get all data mobi
    const data_mobi_en: any = await fetchData(url_mobi_en);
    const data_mobi_ru: any = await fetchData(url_mobi_ru);
    const data_mobi_vi: any = await fetchData(url_mobi_vi);
    const data_mobi_zh: any = await fetchData(url_mobi_zh);
    const data_mobi_ja: any = await fetchData(url_mobi_ja);

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
    for (const index in combinedMobi) {
      for (const key1 in combinedMobi[index]) {
        for (const key2 in combinedMobi[index][key1]) {
          const mergedItem: MergeData = {
            en: {
              web: combinedWeb[index]?.[key1]?.[key2]?.en || null,
              mobi: combinedMobi[index]?.[key1]?.[key2]?.en,
              extension: combinedExtension[index]?.[key1]?.[key2]?.en || null,
            },
            ru: {
              web: combinedWeb[index]?.[key1]?.[key2]?.ru || null,
              mobi: combinedMobi[index]?.[key1]?.[key2]?.ru,
              extension: combinedExtension[index]?.[key1]?.[key2]?.ru || null,
            },
            ja: {
              web: combinedWeb[index]?.[key1]?.[key2]?.ja || null,
              mobi: combinedMobi[index]?.[key1]?.[key2]?.ja,
              extension: combinedExtension[index]?.[key1]?.[key2]?.ja || null,
            },
            zh: {
              web: combinedWeb[index]?.[key1]?.[key2]?.zh || null,
              mobi: combinedMobi[index]?.[key1]?.[key2]?.zh,
              extension: combinedExtension[index]?.[key1]?.[key2]?.zh || null,
            },
            vi: {
              web: combinedWeb[index]?.[key1]?.[key2]?.vi || null,
              mobi: combinedMobi[index]?.[key1]?.[key2]?.vi,
              extension: combinedExtension[index]?.[key1]?.[key2]?.vi || null,
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
