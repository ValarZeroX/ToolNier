//app/i18n/index.ts
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

const initI18next = async (lng: string, ns: string | string[]) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend((lng: string, ns: string) => {
        // console.log(`正在加載語言: ${lng}, 命名空間: ${ns}`);
        return import(`./locales/${lng}/${ns}.json`);
      })
    )
    .init({
      ...getOptions(lng, ns),
    //   debug: true, // 啟用調試模式
      load: "currentOnly",
    });
  return i18nInstance;
};

export async function useTranslation(lng: string, ns: string | string[], options = {}) {
  // const i18nextInstance = await initI18next(lng, Array.isArray(ns) ? ns[0] : ns);
  const i18nextInstance = await initI18next(lng, ns);
  return {
    t: i18nextInstance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns),
    i18n: i18nextInstance,
  };
}