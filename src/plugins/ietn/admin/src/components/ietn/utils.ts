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