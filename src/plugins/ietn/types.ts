export const languages = ["en", "vi", "zh", "ja", "ru"];

export interface TransformedObject {
  [key: string]: LanguageObject | string;
}
export interface LanguageData {
  en: string;
  vi: string;
  zh: string;
  ja: string;
  ru: string;
}
export interface LanguageObject {
  web: string | null;
  mobi: string | null;
  extension: string | null;
}
export interface DataItem {
  [sectionKey: string]: {
    [commonKey: string]: LanguageData;
  };
}

export interface MergeData {
  key: string;
  en: { [platform: string]: string | null };
  vi: { [platform: string]: string | null };
  zh: { [platform: string]: string | null };
  ja: { [platform: string]: string | null };
  ru: { [platform: string]: string | null };
}
