export const fetchData = async (url: string) => {
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

export const url_extension_en =
  "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/extension/Json/en.json";
export const url_extension_ru =
  "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/extension/Json/ru.json";
export const url_extension_vi =
  "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/extension/Json/vi.json";
export const url_extension_zh =
  "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/extension/Json/zh.json";
export const url_extension_ja =
  "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/extension/Json/ja.json";
// Get all URL the data web
export const url_web_en =
  "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/web/Json/en.json";
export const url_web_ru =
  "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/web/Json/ru.json";
export const url_web_vi =
  "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/web/Json/vi.json";
export const url_web_zh =
  "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/web/Json/zh.json";
export const url_web_ja =
  "https://raw.githubusercontent.com/dungnguyen-art/i18n/main/src/crawl/web/Json/ja.json";
// Get all URL the data mobi
export const url_mobi_en =
  "https://raw.githubusercontent.com/Koniverse/SubWallet-Mobile/e593387c588be6e731bf8af4a44895a7ccfc70ca/src/utils/i18n/en_US.json";
export const url_mobi_ru =
  "https://raw.githubusercontent.com/Koniverse/SubWallet-Mobile/e593387c588be6e731bf8af4a44895a7ccfc70ca/src/utils/i18n/ru_RU.json";
export const url_mobi_vi =
  "https://raw.githubusercontent.com/Koniverse/SubWallet-Mobile/e593387c588be6e731bf8af4a44895a7ccfc70ca/src/utils/i18n/vi_VN.json";
export const url_mobi_zh =
  "https://raw.githubusercontent.com/Koniverse/SubWallet-Mobile/e593387c588be6e731bf8af4a44895a7ccfc70ca/src/utils/i18n/zh_CN.json";
export const url_mobi_ja =
  "https://raw.githubusercontent.com/Koniverse/SubWallet-Mobile/e593387c588be6e731bf8af4a44895a7ccfc70ca/src/utils/i18n/ja_JP.json";
