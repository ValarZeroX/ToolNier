export const fallbackLng = "zh-Hant";
export const languages = [fallbackLng, "zh-Hant", "zh-Hans", "en", "ja"];
export const cookieName = "i18next";
export const defaultNS = "translation";

// lng = 採用的語言, ns = 採用的 name space
export function getOptions(lng = fallbackLng, ns: string | string[] = defaultNS) {
    // console.log('getOptions', lng, ns);
  return {
    // debug: true,
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}